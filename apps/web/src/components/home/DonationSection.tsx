'use client';

import React, { useEffect, useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, DollarSign, ShieldCheck } from 'lucide-react';

export function DonationSection() {
  const [summary, setSummary] = useState<{ totalIncome: number; totalExpense: number; balance: number } | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/finance/summary')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSummary(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="transparency" className="py-20 px-6 bg-slate-900/30 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            ১০০% ডিজিটাল আর্থিক স্বচ্ছতা
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-100">ডিজিটাল রসিদ ও লাইভ ফান্ড লেজার</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            রামচন্দ্রপুর একতা ক্লাব প্রতিটি চাঁদা, অনুদান এবং খরচের হিসাব রিয়েল-টাইমে সর্বসাধারণের দেখার জন্য উন্মুক্ত রাখে।
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3 shadow-xl">
            <div className="flex justify-between items-center text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <span>মোট তহবিল আয় (Income)</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-slate-100">
              {summary ? `৳ ${summary.totalIncome.toLocaleString()}` : '৳ ৬৫,০০০'}
            </div>
            <p className="text-xs text-slate-500">মাসিক চাঁদা, অনুদান ও স্পন্সর ফান্ড</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3 shadow-xl">
            <div className="flex justify-between items-center text-xs font-semibold text-rose-400 uppercase tracking-wider">
              <span>মোট ব্যয় (Expense)</span>
              <TrendingDown className="w-4 h-4" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-slate-100">
              {summary ? `৳ ${summary.totalExpense.toLocaleString()}` : '৳ ১৮,৫০০'}
            </div>
            <p className="text-xs text-slate-500">স্বাস্থ্য ক্যাম্প ও সামাজিক সেবা খরচ</p>
          </div>

          <div className="bg-slate-900 border border-emerald-500/30 bg-emerald-950/10 p-8 rounded-3xl space-y-3 shadow-xl">
            <div className="flex justify-between items-center text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <span>বর্তমান তহবিল (Current Fund)</span>
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-400">
              {summary ? `৳ ${summary.balance.toLocaleString()}` : '৳ ৪৬,৫০০'}
            </div>
            <p className="text-xs text-slate-400">ব্যাংক ও ডিজিটাল ওয়ালেট ব্যালেন্স</p>
          </div>
        </div>
      </div>
    </section>
  );
}
