import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginInput, RegisterInput } from '@ramchandrapur/validation';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(input: RegisterInput): Promise<{
        message: string;
        userId: import("mongoose").Types.ObjectId;
    }>;
    login(input: LoginInput): Promise<{
        accessToken: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
            phone: string;
            role: import("@ramchandrapur/types").Role;
            status: "ACTIVE";
        };
    }>;
}
