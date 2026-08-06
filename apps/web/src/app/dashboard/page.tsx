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
  TrendingUp, 
  FileSpreadsheet, 
  Droplet, 
  CheckCircle2, 
  Bell, 
  Award, 
  Activity, 
  Vote, 
  UserCheck, 
  PlusCircle, 
  FileText 
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const { activeRole } = useRbac();
  const [summary, setSummary] = useState<{ totalIncome: number; totalExpense: number; balance: number } | null>(null);
  const [membersCount, setMembersCount] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [sumRes, memRes] = await Promise.all([
          fetch('http://localhost:5000/api/v1/finance/summary'),
          fetch('http://localhost:5000/api/v1/members'),
        ]);

        const sumData = await sumRes.json();
        const memData = await memRes.json();

        if (sumData.success) setSummary(sumData.data);
        if (memData.success) setMembersCount(memData.data.length);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

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
                <span>মোট তহবিল আয়</span>
                <Wallet className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-slate-100">
                {summary ? `৳ ${summary.totalIncome.toLocaleString()}` : '৳ ৬৫,০০০'}
              </div>
              <p className="text-xs text-slate-400 font-medium">চাঁদা ও অনুদান</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
              <div className="flex justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>মোট ব্যয়</span>
                <FileSpreadsheet className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-3xl font-bold text-slate-100">
                {summary ? `৳ ${summary.totalExpense.toLocaleString()}` : '৳ ১৮,৫০০'}
              </div>
              <p className="text-xs text-slate-400 font-medium">ক্যাম্প ও সেবা খরচ</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
              <div className="flex justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>বর্তমান ব্যালেন্স</span>
                <Calendar className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-bold text-emerald-400">
                {summary ? `৳ ${summary.balance.toLocaleString()}` : '৳ ৪৬,৫০০'}
              </div>
              <p className="text-xs text-emerald-400 font-medium">ব্যাংক ও ওয়ালেট তহবিল</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRESIDENT DASHBOARD */}
      {activeRole === 'PRESIDENT' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> সভাপতি এক্সিকিউটিভ ওভারভিউ
            </h3>
            <p className="text-xs text-slate-300">
              ক্লাবের অনুমোদন অপেক্ষমাণ আবেদনসমূহ, আর্থিক ওভারভিউ এবং আগামী সভার সময়সূচি।
            </p>
            <div className="grid md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-semibold">আবেদন অনুমোদন কিউ</span>
                <span className="text-2xl font-bold text-emerald-400 block mt-1">০৩ টি</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-semibold">আসন্ন নির্বাহী সভা</span>
                <span className="text-2xl font-bold text-amber-400 block mt-1">১০ আগস্ট</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-semibold">বর্তমান তহবিল ব্যালেন্স</span>
                <span className="text-2xl font-bold text-cyan-400 block mt-1">৳ ৪৬,৫০০</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SECRETARY DASHBOARD */}
      {activeRole === 'SECRETARY' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" /> সাধারণ সম্পাদক প্রশাসনিক ড্যাশবোর্ড
            </h3>
            <p className="text-xs text-slate-300">
              নতুন সদস্য আবেদন অনুমোদন, নোটিশ প্রকাশ ও সভার রেজুলেশন ট্র্যাকার।
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard/members" className="bg-emerald-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                <UserCheck className="w-4 h-4" /> সদস্য অনুমোদন করুন
              </Link>
              <Link href="/dashboard/notices" className="bg-slate-800 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-emerald-400" /> নোটিশ জারি করুন
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. TREASURER DASHBOARD */}
      {activeRole === 'TREASURER' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <Wallet className="w-5 h-5 text-cyan-400" /> কোষাধ্যক্ষ অর্থ ও ভাউচার প্যানেল
            </h3>
            <p className="text-xs text-slate-300">
              আয় ও ব্যয় ভাউচার ভেরিফিকেশন, ডিজিটাল রসিদ জেনারেটর এবং ব্যাংক অ্যাকাউন্ট লেজার।
            </p>
            <Link href="/dashboard/finance" className="inline-block bg-cyan-500 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold">
              + নতুন রসিদ জেনারেট করুন
            </Link>
          </div>
        </div>
      )}

      {/* 5. VOLUNTEER & MEMBER DASHBOARD */}
      {(activeRole === 'VOLUNTEER' || activeRole === 'MEMBER' || activeRole === 'COMMITTEE_MEMBER') && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-sm text-slate-100">আমার ডিজিটাল সদস্য আইডি কার্ড</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">REC-2026-0001</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl">
                AH
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-100 text-base">আহসান হাবীব</h3>
                <p className="text-xs text-emerald-400 font-semibold">{activeRole.replace('_', ' ')}</p>
                <p className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                  <Droplet className="w-3 h-3 fill-current" /> রক্তে গ্রুপ: O+ (স্বচ্ছাসেবী রক্তদাতা)
                </p>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">QR Attendance Token</span>
                <span className="text-xs text-slate-300 font-mono block">REC-2026-0001</span>
              </div>
              <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center">
                <QrCode className="w-full h-full text-slate-950" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-slate-100 text-base">আমার ইভেন্ট ও উপস্থিতি</h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-semibold block text-slate-200">বিনামূল্যে রক্তদান শিবির</span>
                  <span className="text-[10px] text-slate-500">১৫ আগস্ট ২০২৬</span>
                </div>
                <span className="text-emerald-400 font-bold">উপস্থিত</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
