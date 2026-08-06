import { Document, Types } from 'mongoose';
import { BloodGroup, Gender, MembershipType } from '@ramchandrapur/types';
export type MemberDocument = Member & Document;
export declare class Member {
    userId: Types.ObjectId;
    membershipId: string;
    fullNameBn: string;
    fullNameEn: string;
    fatherName: string;
    motherName: string;
    dateOfBirth: Date;
    gender: Gender;
    bloodGroup: BloodGroup;
    isBloodDonor: boolean;
    lastDonatedDate?: Date;
    nidOrBirthCert: string;
    occupation: string;
    education?: string;
    presentAddress: string;
    permanentAddress: string;
    emergencyContact: {
        name: string;
        relation: string;
        phone: string;
    };
    skills: string[];
    membershipType: MembershipType;
    joiningDate: Date;
    qrCodeUrl: string;
    cardPdfUrl?: string;
    approvedBy?: Types.ObjectId;
    approvedAt?: Date;
}
export declare const MemberSchema: import("mongoose").Schema<Member, import("mongoose").Model<Member, any, any, any, Document<unknown, any, Member, any, {}> & Member & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Member, Document<unknown, {}, import("mongoose").FlatRecord<Member>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Member> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
