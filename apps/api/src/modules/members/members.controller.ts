import { Controller, Get, Query, Param, Patch, Delete, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { Role } from '@ramchandrapur/types';

@ApiTags('Members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all members or search blood donors' })
  async findAll(
    @Query('bloodGroup') bloodGroup?: string,
    @Query('isBloodDonor') isBloodDonor?: boolean,
    @Query('search') search?: string,
  ) {
    const data = await this.membersService.findAll({
      bloodGroup,
      isBloodDonor: isBloodDonor !== undefined ? String(isBloodDonor) === 'true' : undefined,
      search,
    });
    return { success: true, data };
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get all pending registration user requests' })
  async findPending() {
    const data = await this.membersService.findPendingUsers();
    return { success: true, data };
  }

  @Get('profile/me')
  @ApiOperation({ summary: 'Get current user profile by email' })
  async getProfile(@Query('email') email: string) {
    const data = await this.membersService.findProfileByEmail(email);
    return { success: true, data };
  }

  @Patch('profile/update')
  @ApiOperation({ summary: 'Update current user profile info' })
  async updateProfile(@Body() body: { email: string; [key: string]: any }) {
    const data = await this.membersService.updateProfileByEmail(body.email, body);
    return { success: true, message: 'Profile updated successfully', data };
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new active member directly (President / Admin)' })
  async create(
    @Body()
    dto: {
      fullNameBn: string;
      fullNameEn: string;
      email: string;
      phone: string;
      role: Role;
      bloodGroup: string;
      occupation: string;
    },
  ) {
    const data = await this.membersService.createDirectMember(dto);
    return { success: true, message: 'New member created successfully', data };
  }

  @Patch('approve/:userId')
  @ApiOperation({ summary: 'Approve a pending user registration request' })
  async approve(
    @Param('userId') userId: string,
    @Body('role') customRole?: Role,
  ) {
    const data = await this.membersService.approveUser(userId, customRole);
    return { success: true, message: 'User registration approved successfully', data };
  }

  @Patch('user/:userId/role')
  @ApiOperation({ summary: 'Update user role (Super Admin control)' })
  async updateRole(
    @Param('userId') userId: string,
    @Body('role') role: Role,
  ) {
    const data = await this.membersService.updateUserRole(userId, role);
    return { success: true, message: `User role updated to ${role}`, data };
  }

  @Patch('user/:userId/status')
  @ApiOperation({ summary: 'Update user status ACTIVE / SUSPENDED / REJECTED' })
  async updateStatus(
    @Param('userId') userId: string,
    @Body('status') status: string,
  ) {
    const data = await this.membersService.updateUserStatus(userId, status);
    return { success: true, message: `User status updated to ${status}`, data };
  }

  @Delete('user/:userId')
  @ApiOperation({ summary: 'Delete user account and member profile' })
  async deleteUser(@Param('userId') userId: string) {
    const data = await this.membersService.deleteUserAccount(userId);
    return { success: true, message: 'User deleted successfully', data };
  }

  @Delete('reject/:userId')
  @ApiOperation({ summary: 'Reject and delete a pending user registration request' })
  async reject(@Param('userId') userId: string) {
    const data = await this.membersService.rejectUser(userId);
    return { success: true, message: 'User registration request rejected', data };
  }

  @Get(':membershipId')
  @ApiOperation({ summary: 'Get member by membership ID' })
  async findOne(@Param('membershipId') membershipId: string) {
    const data = await this.membersService.findByMembershipId(membershipId);
    return { success: true, data };
  }
}
