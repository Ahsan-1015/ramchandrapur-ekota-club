import { FinanceService } from './finance.service';
import { TransactionInput } from '@ramchandrapur/validation';
export declare class FinanceController {
    private readonly financeService;
    constructor(financeService: FinanceService);
    getSummary(): Promise<{
        success: boolean;
        data: {
            totalIncome: number;
            totalExpense: number;
            balance: number;
        };
    }>;
    findAll(): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").TransactionDocument, {}, {}> & import("./schemas/transaction.schema").Transaction & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    create(input: TransactionInput, req: any): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").TransactionDocument, {}, {}> & import("./schemas/transaction.schema").Transaction & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
