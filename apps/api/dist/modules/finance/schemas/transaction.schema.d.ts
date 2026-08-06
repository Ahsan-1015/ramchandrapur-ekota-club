import { Document, Types } from 'mongoose';
import { TransactionCategory, TransactionType, PaymentMethod } from '@ramchandrapur/types';
export type TransactionDocument = Transaction & Document;
export declare class Transaction {
    type: TransactionType;
    category: TransactionCategory;
    amount: number;
    title: string;
    description?: string;
    transactionDate: Date;
    paymentMethod: PaymentMethod;
    referenceNo?: string;
    receiptUrl?: string;
    performedBy: Types.ObjectId;
    verifiedBy?: Types.ObjectId;
    isVerified: boolean;
}
export declare const TransactionSchema: import("mongoose").Schema<Transaction, import("mongoose").Model<Transaction, any, any, any, Document<unknown, any, Transaction, any, {}> & Transaction & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Transaction, Document<unknown, {}, import("mongoose").FlatRecord<Transaction>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Transaction> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
