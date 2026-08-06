import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MembersService } from './members.service';

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

  @Get(':membershipId')
  @ApiOperation({ summary: 'Get member by membership ID' })
  async findOne(@Param('membershipId') membershipId: string) {
    const data = await this.membersService.findByMembershipId(membershipId);
    return { success: true, data };
  }
}
