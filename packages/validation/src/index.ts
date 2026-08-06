import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  fullNameEn: z.string().min(3, 'English full name is required'),
  fullNameBn: z.string().min(3, 'Bengali full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(11, 'Please enter a valid Bangladeshi phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fatherName: z.string().min(2, 'Father name is required'),
  motherName: z.string().min(2, 'Mother name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  isBloodDonor: z.boolean().default(true),
  nidOrBirthCert: z.string().min(10, 'NID or Birth Certificate number is required'),
  occupation: z.string().min(2, 'Occupation is required'),
  presentAddress: z.string().min(5, 'Present address is required'),
  permanentAddress: z.string().min(5, 'Permanent address is required'),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(11, 'Emergency contact phone is required'),
  emergencyContactRelation: z.string().min(2, 'Relation is required'),
  membershipType: z.enum(['GENERAL', 'LIFE', 'HONORARY', 'ADVISORY']).default('GENERAL'),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const TransactionSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE']),
  category: z.enum([
    'MEMBERSHIP_FEE',
    'DONATION',
    'EVENT_FUND',
    'UTILITIES',
    'AID_DISTRIBUTION',
    'SPORTS_EQUIPMENT',
    'MAINTENANCE',
    'OTHER',
  ]),
  amount: z.number().positive('Amount must be greater than 0'),
  title: z.string().min(3, 'Title is required'),
  description: z.string().optional(),
  transactionDate: z.string(),
  paymentMethod: z.enum(['CASH', 'BKASH', 'NAGAD', 'BANK_TRANSFER']),
  referenceNo: z.string().optional(),
});

export type TransactionInput = z.infer<typeof TransactionSchema>;
