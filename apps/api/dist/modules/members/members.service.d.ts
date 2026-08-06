import { Model } from 'mongoose';
import { Member, MemberDocument } from './schemas/member.schema';
export declare class MembersService {
    private readonly memberModel;
    constructor(memberModel: Model<MemberDocument>);
    findAll(query: {
        bloodGroup?: string;
        isBloodDonor?: boolean;
        search?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, MemberDocument, {}, {}> & Member & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findByMembershipId(membershipId: string): Promise<MemberDocument>;
}
