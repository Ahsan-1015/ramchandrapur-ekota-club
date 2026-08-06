'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Wallet, 
  Calendar, 
  ShieldCheck, 
  QrCode, 
  TrendingUp, 
  FileSpreadsheet, 
  Droplet 
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const [summary, setSummary] = useState<{ totalIncome: number; totalExpense: number; balance: number } | null>(null);
  const [membersCount, setMembersCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

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
        console.error('Failed to fetch dashboard summary', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Dashboard KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>নিবন্ধিত সদস্য (Members)</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">{loading ? '...' : `${membersCount} জন`}</div>
          <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" /> সক্রিয় ডাটাবেস রেকর্ড
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>মোট তহবিল আয় (Total Income)</span>
            <Wallet className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">
            {loading || !summary ? '...' : `৳ ${summary.totalIncome.toLocaleString()}`}
          </div>
          <p className="text-xs text-slate-400 font-medium">চাঁদা ও অনুদান</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>মোট ব্যয় (Total Expense)</span>
            <FileSpreadsheet className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">
            {loading || !summary ? '...' : `৳ ${summary.totalExpense.toLocaleString()}`}
          </div>
          <p className="text-xs text-slate-400 font-medium">ক্যাম্প ও সেবা খরচ</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>বর্তমান ব্যালেন্স (Balance)</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            {loading || !summary ? '...' : `৳ ${summary.balance.toLocaleString()}`}
          </div>
          <p className="text-xs text-emerald-400 font-medium">ব্যাংক ও ওয়ালেট তহবিল</p>
        </div>
      </div>

      {/* Digital Membership Card & Financial Ledger Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Digital Membership Card Preview */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-sm text-slate-100">সুপার অ্যাডমিন কার্ড</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">REC-2026-0001</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl">
              AH
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-100 text-base">আহসান হাবীব</h3>
              <p className="text-xs text-emerald-400 font-semibold">Super Admin & Lead Architect</p>
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

        {/* Quick Recent Transactions Activity */}
        <div className="md:col-span-2 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <h3 className="font-bold text-slate-100 text-base">লাইভ আর্থিক লেনদেনসমূহ (Live Transactions)</h3>
            <Link href="/dashboard/finance" className="text-xs text-emerald-400 hover:underline">অর্থ ও হিসাব পেজে যান</Link>
          </div>

          <div className="space-y-3">
            {[
              { title: 'প্রবাসী একতা ফান্ড অনুদান', type: 'INCOME', amount: '৳ ৫০,০০০', date: '০৩ আগস্ট ২০২৬', method: 'Bank Transfer' },
              { title: 'বিনামূল্যে ব্লাড গ্রুপিং ও স্বাস্থ্য ক্যাম্প খরচ', type: 'EXPENSE', amount: '৳ ১৮,৫০০', date: '০৫ আগস্ট ২০২৬', method: 'Cash' },
              { title: 'বার্ষিক সদস্য চাঁদা সংগৃহীত (২০২৬)', type: 'INCOME', amount: '৳ ১৫,০০০', date: '০১ আগস্ট ২০২৬', method: 'bKash' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-sm">
                <div>
                  <span className="font-semibold text-slate-200 block">{item.title}</span>
                  <span className="text-xs text-slate-500">{item.date} • {item.method}</span>
                </div>
                <span className={`font-bold ${item.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {item.type === 'INCOME' ? '+' : '-'}{item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
