export type Role =
  | 'SUPER_ADMIN'
  | 'PRESIDENT'
  | 'SECRETARY'
  | 'TREASURER'
  | 'COMMITTEE_MEMBER'
  | 'VOLUNTEER'
  | 'MEMBER'
  | 'GUEST';

export type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'REJECTED';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type MembershipType = 'GENERAL' | 'LIFE' | 'HONORARY' | 'ADVISORY';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface IUser {
  id: string;
  email: string;
  phone?: string;
  role: Role;
  status: UserStatus;
  isEmailVerified: boolean;
  avatarUrl?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMember {
  id: string;
  userId: string;
  membershipId: string;
  fullNameBn: string;
  fullNameEn: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup: BloodGroup;
  isBloodDonor: boolean;
  lastDonatedDate?: string;
  nidOrBirthCert: string;
  occupation: string;
  education?: string;
  presentAddress: string;
  permanentAddress: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  skills: string[];
  membershipType: MembershipType;
  joiningDate: string;
  qrCodeUrl: string;
  cardPdfUrl?: string;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type TransactionType = 'INCOME' | 'EXPENSE';

export type TransactionCategory =
  | 'MEMBERSHIP_FEE'
  | 'DONATION'
  | 'EVENT_FUND'
  | 'UTILITIES'
  | 'AID_DISTRIBUTION'
  | 'SPORTS_EQUIPMENT'
  | 'MAINTENANCE'
  | 'OTHER';

export type PaymentMethod = 'CASH' | 'BKASH' | 'NAGAD' | 'BANK_TRANSFER';

export interface IFinanceTransaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  title: string;
  description?: string;
  transactionDate: string;
  paymentMethod: PaymentMethod;
  referenceNo?: string;
  receiptUrl?: string;
  performedBy: string;
  verifiedBy?: string;
  isVerified: boolean;
  eventId?: string;
  createdAt: string;
}

export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}
