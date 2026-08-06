import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member, MemberDocument } from './schemas/member.schema';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private readonly memberModel: Model<MemberDocument>,
  ) {}

  async findAll(query: { bloodGroup?: string; isBloodDonor?: boolean; search?: string }) {
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

  async findByMembershipId(membershipId: string): Promise<MemberDocument> {
    const member = await this.memberModel
      .findOne({ membershipId })
      .populate('userId', 'email phone role status')
      .exec();
    if (!member) throw new NotFoundException('Member not found');
    return member;
  }
}
