import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FinanceService } from './finance.service';
import { TransactionInput } from '@ramchandrapur/validation';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Finance')
@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get public financial transparency ledger summary' })
  async getSummary() {
    const data = await this.financeService.getSummary();
    return { success: true, data };
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Get all transactions log' })
  async findAll() {
    const data = await this.financeService.findAll();
    return { success: true, data };
  }

  @Post('transactions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new financial income/expense transaction' })
  async create(@Body() input: TransactionInput, @Req() req: any) {
    const data = await this.financeService.create(input, req.user._id);
    return { success: true, message: 'Transaction logged successfully', data };
  }
}
