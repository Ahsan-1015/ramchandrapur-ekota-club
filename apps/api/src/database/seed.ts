import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';

// Load .env file manually
const envPath = path.join(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...values] = trimmed.split('=');
      process.env[key.trim()] = values.join('=').trim();
    }
  });
}

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://localhost:27017/ramchandrapur_ekota_club';

async function seed() {
  console.log('🌱 Connecting to MongoDB Atlas for seeding...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB Atlas.');

  const db = mongoose.connection.db;

  // Clear existing collections if needed
  const collections = ['users', 'members', 'transactions'];
  for (const colName of collections) {
    try {
      await db.collection(colName).drop();
      console.log(`🧹 Cleared collection: ${colName}`);
    } catch (e) {
      // Collection may not exist, ignore
    }
  }

  const defaultPasswordHash = await bcrypt.hash('Admin@123456', 10);

  // 1. Create Super Admin User (Requested: aaaa.ahshanhabib@gmail.com)
  const superAdminUser = {
    _id: new mongoose.Types.ObjectId(),
    email: 'aaaa.ahshanhabib@gmail.com',
    phone: '01700000000',
    passwordHash: defaultPasswordHash,
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // 2. Create Executive & General Members
  const sampleUsers = [
    {
      _id: new mongoose.Types.ObjectId(),
      email: 'president@ekota.club',
      phone: '01711111111',
      passwordHash: defaultPasswordHash,
      role: 'PRESIDENT',
      status: 'ACTIVE',
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new mongoose.Types.ObjectId(),
      email: 'secretary@ekota.club',
      phone: '01722222222',
      passwordHash: defaultPasswordHash,
      role: 'SECRETARY',
      status: 'ACTIVE',
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new mongoose.Types.ObjectId(),
      email: 'treasurer@ekota.club',
      phone: '01733333333',
      passwordHash: defaultPasswordHash,
      role: 'TREASURER',
      status: 'ACTIVE',
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new mongoose.Types.ObjectId(),
      email: 'rafiq@example.com',
      phone: '01744444444',
      passwordHash: defaultPasswordHash,
      role: 'MEMBER',
      status: 'ACTIVE',
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await db.collection('users').insertMany([superAdminUser, ...sampleUsers]);
  console.log('👤 Inserted Users (Super Admin + Committee + Members)');

  // 3. Create Member Profiles
  const members = [
    {
      _id: new mongoose.Types.ObjectId(),
      userId: superAdminUser._id,
      membershipId: 'REC-2026-0001',
      fullNameBn: 'আহসান হাবীব',
      fullNameEn: 'Ahsan Habib',
      fatherName: 'মোঃ আব্দুল কুদ্দুস',
      motherName: 'মোছাঃ রেজিয়া বেগম',
      dateOfBirth: new Date('1995-05-15'),
      gender: 'MALE',
      bloodGroup: 'O+',
      isBloodDonor: true,
      lastDonatedDate: new Date('2026-05-10'),
      nidOrBirthCert: '19951234567890',
      occupation: 'Software Engineer & Club Admin',
      education: 'B.Sc in Computer Science',
      presentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
      permanentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
      emergencyContact: {
        name: 'হাবিবুর রহমান',
        relation: 'Brother',
        phone: '01700000001',
      },
      skills: ['System Architecture', 'Leadership', 'Web Development'],
      membershipType: 'LIFE',
      joiningDate: new Date('2024-01-01'),
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?data=REC-2026-0001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new mongoose.Types.ObjectId(),
      userId: sampleUsers[0]._id,
      membershipId: 'REC-2026-0002',
      fullNameBn: 'মোঃ রফিকুল ইসলাম',
      fullNameEn: 'Md. Rafiqul Islam',
      fatherName: 'মোঃ মকবুল হোসেন',
      motherName: 'জাহানারা বেগম',
      dateOfBirth: new Date('1988-10-12'),
      gender: 'MALE',
      bloodGroup: 'B+',
      isBloodDonor: true,
      nidOrBirthCert: '19889876543210',
      occupation: 'Business',
      presentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
      permanentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
      emergencyContact: {
        name: 'সাদেক হোসেন',
        relation: 'Uncle',
        phone: '01711111112',
      },
      skills: ['Management', 'Public Speaking'],
      membershipType: 'GENERAL',
      joiningDate: new Date('2024-01-01'),
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?data=REC-2026-0002',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new mongoose.Types.ObjectId(),
      userId: sampleUsers[1]._id,
      membershipId: 'REC-2026-0003',
      fullNameBn: 'মাহমুদুল হাসান',
      fullNameEn: 'Mahmudul Hasan',
      fatherName: 'আবুল কাসেম',
      motherName: 'মাজেদা খাতুন',
      dateOfBirth: new Date('1992-03-22'),
      gender: 'MALE',
      bloodGroup: 'A+',
      isBloodDonor: true,
      nidOrBirthCert: '19925555444433',
      occupation: 'Teacher',
      presentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
      permanentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
      emergencyContact: {
        name: 'হাসান পারভেজ',
        relation: 'Brother',
        phone: '01722222223',
      },
      skills: ['Event Planning', 'Youth Coordination'],
      membershipType: 'GENERAL',
      joiningDate: new Date('2024-02-15'),
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?data=REC-2026-0003',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new mongoose.Types.ObjectId(),
      userId: sampleUsers[2]._id,
      membershipId: 'REC-2026-0004',
      fullNameBn: 'তারিকুল ইসলাম',
      fullNameEn: 'Tariqul Islam',
      fatherName: 'নজরুল ইসলাম',
      motherName: 'সুফিয়া বেগম',
      dateOfBirth: new Date('1990-07-08'),
      gender: 'MALE',
      bloodGroup: 'AB+',
      isBloodDonor: true,
      nidOrBirthCert: '19901122334455',
      occupation: 'Banker',
      presentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
      permanentAddress: 'রামচন্দ্রপুর, চাটমোহর, পাবনা',
      emergencyContact: {
        name: 'ফারুক হোসেন',
        relation: 'Cousin',
        phone: '01733333334',
      },
      skills: ['Accounting', 'Financial Planning'],
      membershipType: 'GENERAL',
      joiningDate: new Date('2024-01-10'),
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?data=REC-2026-0004',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await db.collection('members').insertMany(members);
  console.log('🪪 Inserted Member Profiles');

  // 4. Create Initial Financial Income/Expense Transactions
  const transactions = [
    {
      type: 'INCOME',
      category: 'MEMBERSHIP_FEE',
      amount: 15000,
      title: 'বার্ষিক সদস্য চাঁদা সংগৃহীত (২০২৬)',
      description: '৩০ জন সাধারণ সদস্যের ৫০০ টাকা করে মাসিক/বার্ষিক চাঁদা সংগ্রহ',
      transactionDate: new Date('2026-08-01'),
      paymentMethod: 'BKASH',
      referenceNo: 'TRX987654321',
      performedBy: superAdminUser._id,
      isVerified: true,
      createdAt: new Date(),
    },
    {
      type: 'INCOME',
      category: 'DONATION',
      amount: 50000,
      title: 'প্রবাসী একতা ফান্ড অনুদান',
      description: 'যুক্তরাজ্য প্রবাসী একতা সুহৃদদের পক্ষ থেকে শীতবস্ত্র ও রক্তদান ফান্ডের অনুদান',
      transactionDate: new Date('2026-08-03'),
      paymentMethod: 'BANK_TRANSFER',
      referenceNo: 'BANK88776655',
      performedBy: superAdminUser._id,
      isVerified: true,
      createdAt: new Date(),
    },
    {
      type: 'EXPENSE',
      category: 'AID_DISTRIBUTION',
      amount: 18500,
      title: 'বিনামূল্যে ব্লাড গ্রুপিং ও স্বাস্থ্য ক্যাম্প খরচ',
      description: 'রামচন্দ্রপুর প্রাথমিক বিদ্যালয় প্রাঙ্গণে বিনামূল্যে ব্লাড গ্রুপিং কিট ও প্যান্ডেল খরচ',
      transactionDate: new Date('2026-08-05'),
      paymentMethod: 'CASH',
      referenceNo: 'VOUCHER-2026-001',
      performedBy: superAdminUser._id,
      isVerified: true,
      createdAt: new Date(),
    },
  ];

  await db.collection('transactions').insertMany(transactions);
  console.log('💰 Inserted Initial Financial Ledger Transactions');

  console.log('\n🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
  console.log('----------------------------------------------------');
  console.log('🔑 SUPER ADMIN CREDENTIALS:');
  console.log('   Email:    aaaa.ahshanhabib@gmail.com');
  console.log('   Password: Admin@123456');
  console.log('   Role:     SUPER_ADMIN');
  console.log('----------------------------------------------------');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
