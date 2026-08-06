import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role, UserStatus } from '@ramchandrapur/types';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ index: true })
  phone?: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({
    required: true,
    enum: [
      'SUPER_ADMIN',
      'PRESIDENT',
      'SECRETARY',
      'TREASURER',
      'COMMITTEE_MEMBER',
      'VOLUNTEER',
      'MEMBER',
      'GUEST',
    ],
    default: 'GUEST',
  })
  role: Role;

  @Prop({
    required: true,
    enum: ['PENDING', 'ACTIVE', 'SUSPENDED', 'REJECTED'],
    default: 'PENDING',
  })
  status: UserStatus;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop()
  avatarUrl?: string;

  @Prop()
  lastLoginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
