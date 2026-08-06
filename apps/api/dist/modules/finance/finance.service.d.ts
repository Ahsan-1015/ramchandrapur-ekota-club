import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { TransactionInput } from '@ramchandrapur/validation';
export declare class FinanceService {
    private readonly transactionModel;
    constructor(transactionModel: Model<TransactionDocument>);
    create(input: TransactionInput, userId: string): Promise<import("mongoose").Document<unknown, {}, TransactionDocument, {}, {}> & Transaction & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, TransactionDocument, {}, {}> & Transaction & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getSummary(): Promise<{
        totalIncome: number;
        totalExpense: number;
        balance: number;
    }>;
}
