import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginInput, RegisterInput } from '@ramchandrapur/validation';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: RegisterInput) {
    const existing = await this.usersService.findByEmail(input.email);
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = await this.usersService.create({
      email: input.email,
      phone: input.phone,
      passwordHash,
      role: 'MEMBER',
      status: 'PENDING',
    });

    return {
      message:
        'Registration submitted successfully. Please wait for committee approval.',
      userId: user._id,
    };
  }

  async login(input: LoginInput) {
    const user = await this.usersService.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(input.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status === 'PENDING') {
      throw new UnauthorizedException('Your account is pending committee approval');
    }

    if (user.status === 'SUSPENDED' || user.status === 'REJECTED') {
      throw new UnauthorizedException('Your account has been suspended or rejected');
    }

    const payload = { sub: user._id.toString(), email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
    };
  }
}
