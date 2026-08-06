import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument>;
    create(userData: Partial<User>): Promise<UserDocument>;
    updateStatus(id: string, status: string): Promise<UserDocument>;
}
