import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FinanceService } from './finance.service';
import { TransactionInput } from '@ramchandrapur/validation';

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
  @ApiOperation({ summary: 'Create new financial income/expense transaction' })
  async create(@Body() input: TransactionInput, @Req() req: any) {
    const userId = req.user?._id || req.user?.sub || '6a74d79fd81596c0bd7c117a';
    const data = await this.financeService.create(input, userId);
    return { success: true, message: 'Transaction logged successfully', data };
  }
}
