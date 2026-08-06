import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { TransactionInput } from '@ramchandrapur/validation';

@Injectable()
export class FinanceService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async create(input: TransactionInput, userId: string) {
    const txn = new this.transactionModel({
      ...input,
      performedBy: userId,
      transactionDate: new Date(input.transactionDate),
    });
    return txn.save();
  }

  async findAll() {
    return this.transactionModel
      .find()
      .sort({ transactionDate: -1 })
      .populate('performedBy', 'email role')
      .exec();
  }

  async getSummary() {
    const result = await this.transactionModel.aggregate([
      { $match: { isVerified: true } },
      {
        $group: {
          _id: '$type',
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    result.forEach((item) => {
      if (item._id === 'INCOME') totalIncome = item.totalAmount;
      if (item._id === 'EXPENSE') totalExpense = item.totalAmount;
    });

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }
}
