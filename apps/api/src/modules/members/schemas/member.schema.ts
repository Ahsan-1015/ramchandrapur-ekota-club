import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BloodGroup, Gender, MembershipType } from '@ramchandrapur/types';

export type MemberDocument = Member & Document;

@Schema({ timestamps: true })
export class Member {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ required: true, unique: true, index: true })
  membershipId: string;

  @Prop({ required: true })
  fullNameBn: string;

  @Prop({ required: true })
  fullNameEn: string;

  @Prop({ required: true })
  fatherName: string;

  @Prop({ required: true })
  motherName: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true, enum: ['MALE', 'FEMALE', 'OTHER'] })
  gender: Gender;

  @Prop({
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    index: true,
  })
  bloodGroup: BloodGroup;

  @Prop({ default: true, index: true })
  isBloodDonor: boolean;

  @Prop()
  lastDonatedDate?: Date;

  @Prop({ required: true })
  nidOrBirthCert: string;

  @Prop({ required: true })
  occupation: string;

  @Prop()
  education?: string;

  @Prop({ required: true })
  presentAddress: string;

  @Prop({ required: true })
  permanentAddress: string;

  @Prop({
    type: {
      name: { type: String, required: true },
      relation: { type: String, required: true },
      phone: { type: String, required: true },
    },
    required: true,
  })
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop({
    required: true,
    enum: ['GENERAL', 'LIFE', 'HONORARY', 'ADVISORY'],
    default: 'GENERAL',
  })
  membershipType: MembershipType;

  @Prop({ default: Date.now })
  joiningDate: Date;

  @Prop({ required: true })
  qrCodeUrl: string;

  @Prop()
  cardPdfUrl?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  approvedBy?: Types.ObjectId;

  @Prop()
  approvedAt?: Date;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
