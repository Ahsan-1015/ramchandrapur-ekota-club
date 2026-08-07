'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRbac } from './layout';
import { 
  Users, 
  Wallet, 
  Calendar, 
  ShieldCheck, 
  QrCode, 
  FileSpreadsheet, 
  Droplet, 
  Bell, 
  UserCheck, 
  PlusCircle, 
  FileText,
  User
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const { activeRole, userEmail } = useRbac();
  const [summary, setSummary] = useState<{ totalIncome: number; totalExpense: number; balance: number } | null>(null);
  const [membersCount, setMembersCount] = useState<number>(0);
  const [myProfile, setMyProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const emailToUse = userEmail || localStorage.getItem('user_email') || '';
        const [sumRes, memRes, profRes] = await Promise.all([
          fetch('http://localhost:5000/api/v1/finance/summary'),
          fetch('http://localhost:5000/api/v1/members'),
          emailToUse ? fetch(`http://localhost:5000/api/v1/members/profile/me?email=${encodeURIComponent(emailToUse)}`) : Promise.resolve(null),
        ]);

        const sumData = await sumRes.json();
        const memData = await memRes.json();

        if (sumData.success) setSummary(sumData.data);
        if (memData.success) setMembersCount(memData.data.length);
        if (profRes) {
          const profData = await profRes.json();
          if (profData.success) setMyProfile(profData.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [userEmail]);

  const userName = myProfile?.fullNameBn || (userEmail ? userEmail.split('@')[0] : 'ক্লাব সদস্য');
  const membershipId = myProfile?.membershipId || 'REC-2026-MEMBER';
  const bloodGroup = myProfile?.bloodGroup || 'O+';
  const photoUrl = myProfile?.photoUrl || '';

  return (
    <div className="space-y-8">
      {/* 1. SUPER ADMIN DASHBOARD */}
      {activeRole === 'SUPER_ADMIN' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
              <div className="flex justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>মোট নিবন্ধিত সদস্য</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-slate-100">{membersCount} জন</div>
              <p className="text-xs text-emerald-400 font-medium">সক্রিয় ডাটাবেস রেকর্ড</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
              <div className="flex justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>বর্তমান ক্লাব ফান্ড</span>
                <Wallet className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-slate-100">
                ৳ {summary ? summary.balance.toLocaleString() : '0'}
              </div>
              <p className="text-xs text-cyan-400 font-medium">১০০% মেম্বারশিপ স্বচ্ছতা</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
              <div className="flex justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>আসন্ন ইভেন্ট</span>
                <Calendar className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-slate-100">২ টি</div>
              <p className="text-xs text-purple-400 font-medium">বার্ষিক ক্রীড়া ও ক্যাম্প</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
              <div className="flex justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>অ্যাক্টিভ ভূমিকা</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl font-bold text-emerald-400 uppercase font-mono">SUPER_ADMIN</div>
              <p className="text-xs text-amber-400 font-medium">পূর্ণ নিয়ন্ত্রণ অনুমতি</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-100 text-base">দ্রুত অ্যাকশন (Quick Actions)</h3>
              <p className="text-xs text-slate-400">সদস্য ডিরেক্টরি, অর্থনৈতিক ভাউচার বা নতুন নোটিশ নির্বাচন করুন</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/dashboard/members"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all"
              >
                <UserCheck className="w-4 h-4" /> সদস্য ম্যানেজ করুন
              </Link>
              <Link
                href="/dashboard/finance"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all border border-slate-700"
              >
                <PlusCircle className="w-4 h-4" /> ভাউচার যোগ করুন
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRESIDENT DASHBOARD */}
      {activeRole === 'PRESIDENT' && (
        <div className="space-y-8">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> সভাপতি নির্বাহী প্যানেল
            </h3>
            <p className="text-xs text-slate-400">
              আপনি সভাপতির দায়িত্বে আছেন। নতুন সদস্য অনুমোদন, ক্লাব বাজেট ও সিদ্ধান্ত পরিচালনা করুন।
            </p>
            <div className="flex gap-3 pt-2">
              <Link
                href="/dashboard/members"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all"
              >
                <UserCheck className="w-4 h-4" /> সদস্য ডিরেক্টরি ও ভূমিকা আপডেট
              </Link>
              <Link
                href="/dashboard/finance"
                className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all"
              >
                <Wallet className="w-4 h-4" /> আর্থিক স্টেটমেন্ট দেখুন
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 3. SECRETARY DASHBOARD */}
      {activeRole === 'SECRETARY' && (
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" /> সাধারণ সম্পাদক প্যানেল
          </h3>
          <p className="text-xs text-slate-400">
            সভা আহ্বান, কার্যবিবরণী ও ক্লাব নোটিশ প্রকাশ করুন।
          </p>
        </div>
      )}

      {/* 4. TREASURER DASHBOARD */}
      {activeRole === 'TREASURER' && (
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-400" /> কোষাধ্যক্ষ প্যানেল
          </h3>
          <p className="text-xs text-slate-400">
            আর্থিক রেজিস্টার পরিচালনা এবং নতুন আয়/ব্যয় ভাউচার স্ক্যান করুন।
          </p>
        </div>
      )}

      {/* 5. MEMBER / VOLUNTEER DIGITAL CARD PORTAL */}
      {(activeRole === 'MEMBER' || activeRole === 'VOLUNTEER' || activeRole === 'COMMITTEE_MEMBER' || activeRole === 'GUEST') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Member ID Card with Uploaded Avatar */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-sm text-slate-100">আমার ডিজিটাল আইডি কার্ড</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-full font-bold">
                {membershipId}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-xl overflow-hidden shadow-lg flex-shrink-0">
                {photoUrl ? (
                  <img src={photoUrl} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  userName.substring(0, 2).toUpperCase()
                )}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-100 text-base">{userName}</h3>
                <p className="text-xs text-emerald-400 font-semibold">{userEmail}</p>
                <p className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                  <Droplet className="w-3 h-3 fill-current text-rose-500" /> রক্তে গ্রুপ: {bloodGroup} (স্বচ্ছাসেবী রক্তদাতা)
                </p>
                <Link href="/dashboard/settings" className="text-[11px] text-cyan-400 underline block pt-1">
                  ✏️ প্রোফাইল ও ছবি পরিবর্তন করুন
                </Link>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">QR Attendance Token</span>
                <span className="text-xs text-slate-300 font-mono block">{membershipId}</span>
              </div>
              <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center">
                <QrCode className="w-full h-full text-slate-950" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-400" /> নোটিশ ও নতুন আপডেট
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>বিনামূল্যে রক্তদান শিবির ও মেডিকেল ক্যাম্প</span>
                  <span className="text-[10px] text-amber-400 font-mono">জরুরি</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  আগামী ১৫ই আগস্ট ক্লাবের পক্ষ থেকে চাটমোহর ডিগ্রি কলেজ মাঠে বিনামূল্যে রক্তদান ক্যাম্প পরিচালিত হবে।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
