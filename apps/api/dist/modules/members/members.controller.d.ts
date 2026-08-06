import { MembersService } from './members.service';
export declare class MembersController {
    private readonly membersService;
    constructor(membersService: MembersService);
    findAll(bloodGroup?: string, isBloodDonor?: boolean, search?: string): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/member.schema").MemberDocument, {}, {}> & import("./schemas/member.schema").Member & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    findOne(membershipId: string): Promise<{
        success: boolean;
        data: import("./schemas/member.schema").MemberDocument;
    }>;
}
