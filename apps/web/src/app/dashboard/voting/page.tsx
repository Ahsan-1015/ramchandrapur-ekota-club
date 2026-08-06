'use client';

import React from 'react';
import { Vote, PlusCircle, CheckCircle2, ShieldCheck, BarChart2 } from 'lucide-react';

export default function VotingDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Vote className="w-5 h-5 text-emerald-400" /> ডিজিটাল ভোট ও গণতান্ত্রিক নির্বাচন
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            গোপন ব্যালট পেপার ও টোকেন ভিত্তিক সুরক্ষিত অনলাইন পোলিং সিস্টেম।
          </p>
        </div>

        <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 text-xs flex items-center gap-2 transition-all">
          <PlusCircle className="w-4 h-4" /> নতুন পোল তৈরি করুন
        </button>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">সক্রিয় পোল (Active Opinion Poll)</span>
            <h3 className="text-lg font-bold text-slate-100 mt-1">রামচন্দ্রপুর বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬-এর প্রধান খেলা কোনটি হওয়া উচিত?</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            চলমান
          </span>
        </div>

        <div className="space-y-3">
          {[
            { option: '১. ক্রিকেট টুর্নামেন্ট (Cricket)', votes: '১৫ ভোট (৬০%)', pct: 60 },
            { option: '২. ফুটবল টুর্নামেন্ট (Football)', votes: '৮ ভোট (৩২%)', pct: 32 },
            { option: '৩. ব্যাডমিন্টন টুর্নামেন্ট (Badminton)', votes: '২ ভোট (৮%)', pct: 8 },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800/80 p-4 rounded-2xl space-y-2">
              <div className="flex justify-between text-xs font-medium text-slate-200">
                <span>{item.option}</span>
                <span className="text-emerald-400 font-bold">{item.votes}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
