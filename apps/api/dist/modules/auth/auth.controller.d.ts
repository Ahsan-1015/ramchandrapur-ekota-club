import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from '@ramchandrapur/validation';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(input: RegisterInput): Promise<{
        message: string;
        userId: import("mongoose").Types.ObjectId;
    }>;
    login(input: LoginInput, res: Response): Promise<{
        success: boolean;
        message: string;
        data: {
            accessToken: string;
            user: {
                id: import("mongoose").Types.ObjectId;
                email: string;
                phone: string;
                role: import("@ramchandrapur/types").Role;
                status: "ACTIVE";
            };
        };
    }>;
    logout(res: Response): Promise<{
        success: boolean;
        message: string;
    }>;
}
