import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member, MemberDocument } from './schemas/member.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Role } from '@ramchandrapur/types';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private readonly memberModel: Model<MemberDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(query: { bloodGroup?: string; isBloodDonor?: boolean; search?: string }) {
    // 1. Ensure all active Users have a corresponding Member profile
    const activeUsers = await this.userModel.find({ status: { $in: ['ACTIVE', 'SUSPENDED'] } }).exec();
    
    for (const u of activeUsers) {
      const existingMember = await this.memberModel.findOne({ userId: u._id }).exec();
      if (!existingMember) {
        const count = await this.memberModel.countDocuments().exec();
        const membershipId = `REC-2026-${(count + 1).toString().padStart(4, '0')}`;
        const namePart = u.email.split('@')[0];

        const newMember = new this.memberModel({
          userId: u._id,
          membershipId,
          fullNameBn: namePart === 'secretary' ? 'মাহমুদুল হাসান' :
                      namePart === 'treasurer' ? 'তারিকুল ইসলাম' :
                      namePart === 'rafiq' ? 'মোঃ রফিকুল ইসলাম' :
                      namePart === 'robi' ? 'মোঃ রবিউল ইসলাম' : namePart,
          fullNameEn: namePart === 'secretary' ? 'Mahmudul Hasan' :
                      namePart === 'treasurer' ? 'Tariqul Islam' :
                      namePart === 'rafiq' ? 'Md. Rafiqul Islam' :
                      namePart === 'robi' ? 'Robiul Islam' : namePart,
          fatherName: 'N/A',
          motherName: 'N/A',
          nidOrBirthCert: 'N/A',
          dateOfBirth: new Date('2000-01-01'),
          gender: 'MALE',
          bloodGroup: 'O+',
          isBloodDonor: true,
          phone: u.phone || '01700000000',
          presentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
          permanentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
          occupation: u.role === 'SUPER_ADMIN' ? 'সফটওয়্যার ইঞ্জিনিয়ার & ক্লাব অ্যাডমিন' :
                      u.role === 'PRESIDENT' ? 'ব্যবসায়ী' :
                      u.role === 'SECRETARY' ? 'শিক্ষক' :
                      u.role === 'TREASURER' ? 'ব্যাংকার' : 'সদস্য',
          emergencyContact: {
            name: 'জরুরি অভিভাবক',
            relation: 'অভিভাবক',
            phone: u.phone || '01700000000',
          },
          membershipType: (u.role === 'SUPER_ADMIN' || u.role === 'PRESIDENT' || u.role === 'SECRETARY' || u.role === 'TREASURER') ? 'LIFE' : 'GENERAL',
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${membershipId}`,
          joiningDate: new Date(),
        });
        await newMember.save();
      }
    }

    // 2. Query member records
    const filter: any = {};
    if (query.bloodGroup) filter.bloodGroup = query.bloodGroup;
    if (query.isBloodDonor !== undefined) filter.isBloodDonor = query.isBloodDonor;
    if (query.search) {
      filter.$or = [
        { fullNameEn: { $regex: query.search, $options: 'i' } },
        { fullNameBn: { $regex: query.search, $options: 'i' } },
        { membershipId: { $regex: query.search, $options: 'i' } },
      ];
    }
    return this.memberModel.find(filter).populate('userId', 'email phone role status').exec();
  }

  async findPendingUsers(): Promise<UserDocument[]> {
    return this.userModel.find({ status: 'PENDING' }).exec();
  }

  async createDirectMember(dto: {
    fullNameBn: string;
    fullNameEn: string;
    email: string;
    phone: string;
    role: Role;
    bloodGroup: string;
    occupation: string;
  }): Promise<{ user: UserDocument; member: MemberDocument }> {
    const existing = await this.userModel.findOne({ email: dto.email }).exec();
    if (existing) {
      throw new BadRequestException('User with this email already exists');
    }

    const user = new this.userModel({
      email: dto.email,
      phone: dto.phone,
      passwordHash: '$2a$10$6NXqDivTPCuBZ7yhKmHI7u82YKNtwamMqG891gK87fbwpkBCut95.',
      role: dto.role || 'MEMBER',
      status: 'ACTIVE',
      isEmailVerified: true,
    });
    await user.save();

    const count = await this.memberModel.countDocuments().exec();
    const membershipId = `REC-2026-${(count + 1).toString().padStart(4, '0')}`;

    const member = new this.memberModel({
      userId: user._id,
      membershipId,
      fullNameBn: dto.fullNameBn,
      fullNameEn: dto.fullNameEn,
      fatherName: 'N/A',
      motherName: 'N/A',
      nidOrBirthCert: 'N/A',
      dateOfBirth: new Date('1995-01-01'),
      gender: 'MALE',
      bloodGroup: dto.bloodGroup || 'O+',
      isBloodDonor: true,
      phone: dto.phone,
      presentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
      permanentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
      occupation: dto.occupation || 'সদস্য',
      emergencyContact: {
        name: 'জরুরি অভিভাবক',
        relation: 'অভিভাবক',
        phone: dto.phone || '01700000000',
      },
      membershipType: (dto.role === 'SUPER_ADMIN' || dto.role === 'PRESIDENT' || dto.role === 'SECRETARY' || dto.role === 'TREASURER') ? 'LIFE' : 'GENERAL',
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${membershipId}`,
      joiningDate: new Date(),
    });
    await member.save();

    return { user, member };
  }

  async approveUser(userId: string, customRole?: Role): Promise<{ user: UserDocument; member: MemberDocument }> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('Pending user not found');

    const roleToAssign = customRole || 'MEMBER';
    user.status = 'ACTIVE';
    user.role = roleToAssign;
    await user.save();

    let member = await this.memberModel.findOne({ userId: user._id }).exec();
    if (!member) {
      const count = await this.memberModel.countDocuments().exec();
      const membershipId = `REC-2026-${(count + 1).toString().padStart(4, '0')}`;
      const namePart = user.email.split('@')[0];

      member = new this.memberModel({
        userId: user._id,
        membershipId,
        fullNameBn: namePart,
        fullNameEn: namePart,
        fatherName: 'N/A',
        motherName: 'N/A',
        nidOrBirthCert: 'N/A',
        dateOfBirth: new Date('2000-01-01'),
        gender: 'MALE',
        bloodGroup: 'O+',
        isBloodDonor: true,
        phone: user.phone || '01700000000',
        presentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
        permanentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
        occupation: 'সদস্য',
        emergencyContact: {
          name: 'জরুরি অভিভাবক',
          relation: 'অভিভাবক',
          phone: user.phone || '01700000000',
        },
        membershipType: (roleToAssign === 'SUPER_ADMIN' || roleToAssign === 'PRESIDENT' || roleToAssign === 'SECRETARY' || roleToAssign === 'TREASURER') ? 'LIFE' : 'GENERAL',
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${membershipId}`,
        joiningDate: new Date(),
      });
      await member.save();
    } else {
      member.membershipType = (roleToAssign === 'SUPER_ADMIN' || roleToAssign === 'PRESIDENT' || roleToAssign === 'SECRETARY' || roleToAssign === 'TREASURER') ? 'LIFE' : 'GENERAL';
      await member.save();
    }

    return { user, member };
  }

  async updateUserRole(userId: string, role: Role): Promise<UserDocument> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('User not found');

    user.role = role;
    await user.save();

    // Also update associated Member profile membershipType
    const member = await this.memberModel.findOne({ userId: user._id }).exec();
    if (member) {
      member.membershipType = (role === 'SUPER_ADMIN' || role === 'PRESIDENT' || role === 'SECRETARY' || role === 'TREASURER') ? 'LIFE' : 'GENERAL';
      await member.save();
    }

    return user;
  }

  async updateUserStatus(userId: string, status: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('User not found');
    user.status = status as any;
    return user.save();
  }

  async deleteUserAccount(userId: string): Promise<{ success: boolean }> {
    await this.userModel.findByIdAndDelete(userId).exec();
    await this.memberModel.findOneAndDelete({ userId }).exec();
    return { success: true };
  }

  async rejectUser(userId: string): Promise<{ success: boolean }> {
    return this.deleteUserAccount(userId);
  }

  async findByMembershipId(membershipId: string): Promise<MemberDocument> {
    const member = await this.memberModel
      .findOne({ membershipId })
      .populate('userId', 'email phone role status')
      .exec();
    if (!member) throw new NotFoundException('Member not found');
    return member;
  }

  async findProfileByEmail(email: string): Promise<MemberDocument> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new NotFoundException('User not found');

    let member = await this.memberModel.findOne({ userId: user._id }).populate('userId', 'email phone role status').exec();
    if (!member) {
      const count = await this.memberModel.countDocuments().exec();
      const membershipId = `REC-2026-${(count + 1).toString().padStart(4, '0')}`;
      const namePart = user.email.split('@')[0];

      member = new this.memberModel({
        userId: user._id,
        membershipId,
        fullNameBn: namePart,
        fullNameEn: namePart,
        fatherName: 'N/A',
        motherName: 'N/A',
        nidOrBirthCert: 'N/A',
        dateOfBirth: new Date('2000-01-01'),
        gender: 'MALE',
        bloodGroup: 'O+',
        isBloodDonor: true,
        phone: user.phone || '01700000000',
        presentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
        permanentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
        occupation: 'সদস্য',
        emergencyContact: {
          name: 'জরুরি অভিভাবক',
          relation: 'অভিভাবক',
          phone: user.phone || '01700000000',
        },
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${membershipId}`,
        joiningDate: new Date(),
      });
      await member.save();
      member = await this.memberModel.findOne({ userId: user._id }).populate('userId', 'email phone role status').exec();
    }
    return member;
  }

  async updateProfileByEmail(email: string, dto: any): Promise<MemberDocument> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new NotFoundException('User not found');

    if (dto.phone) {
      user.phone = dto.phone;
      await user.save();
    }

    let member = await this.memberModel.findOne({ userId: user._id }).exec();
    if (!member) {
      await this.findProfileByEmail(email);
      member = await this.memberModel.findOne({ userId: user._id }).exec();
    }

    if (dto.fullNameBn !== undefined) member.fullNameBn = dto.fullNameBn;
    if (dto.fullNameEn !== undefined) member.fullNameEn = dto.fullNameEn;
    if (dto.fatherName !== undefined) member.fatherName = dto.fatherName;
    if (dto.motherName !== undefined) member.motherName = dto.motherName;
    if (dto.dateOfBirth) member.dateOfBirth = new Date(dto.dateOfBirth);
    if (dto.gender) member.gender = dto.gender;
    if (dto.bloodGroup) member.bloodGroup = dto.bloodGroup;
    if (dto.isBloodDonor !== undefined) member.isBloodDonor = dto.isBloodDonor;
    if (dto.nidOrBirthCert !== undefined) member.nidOrBirthCert = dto.nidOrBirthCert;
    if (dto.occupation !== undefined) member.occupation = dto.occupation;
    if (dto.presentAddress !== undefined) member.presentAddress = dto.presentAddress;
    if (dto.permanentAddress !== undefined) member.permanentAddress = dto.permanentAddress;
    if (dto.emergencyContact) member.emergencyContact = dto.emergencyContact;
    if (dto.skills) member.skills = dto.skills;
    if (dto.photoUrl !== undefined) member.photoUrl = dto.photoUrl;

    await member.save();
    return this.memberModel.findById(member._id).populate('userId', 'email phone role status').exec();
  }
}
