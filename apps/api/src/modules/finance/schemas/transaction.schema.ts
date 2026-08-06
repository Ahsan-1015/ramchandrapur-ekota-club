import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TransactionCategory, TransactionType, PaymentMethod } from '@ramchandrapur/types';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, enum: ['INCOME', 'EXPENSE'], index: true })
  type: TransactionType;

  @Prop({
    required: true,
    enum: [
      'MEMBERSHIP_FEE',
      'DONATION',
      'EVENT_FUND',
      'UTILITIES',
      'AID_DISTRIBUTION',
      'SPORTS_EQUIPMENT',
      'MAINTENANCE',
      'OTHER',
    ],
    index: true,
  })
  category: TransactionCategory;

  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true, default: Date.now, index: true })
  transactionDate: Date;

  @Prop({
    required: true,
    enum: ['CASH', 'BKASH', 'NAGAD', 'BANK_TRANSFER'],
    default: 'CASH',
  })
  paymentMethod: PaymentMethod;

  @Prop()
  referenceNo?: string;

  @Prop()
  receiptUrl?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  performedBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  verifiedBy?: Types.ObjectId;

  @Prop({ default: true, index: true })
  isVerified: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
