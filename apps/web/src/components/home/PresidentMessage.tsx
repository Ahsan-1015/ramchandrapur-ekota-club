'use client';

import React from 'react';
import { Quote, ShieldCheck } from 'lucide-react';

export function PresidentMessage() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto w-full">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 md:p-12 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Quote className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-3xl shrink-0 shadow-xl">
            RI
          </div>

          <div className="space-y-4 text-center md:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full inline-block">
              সভাপতির বার্তা (President's Message)
            </span>
            <blockquote className="text-slate-200 text-sm sm:text-base leading-relaxed italic">
              "রামচন্দ্রপুর একতা ক্লাব শুধু একটি সংগঠন নয়, এটি আমাদের গ্রামের প্রতিটি মানুষের আবেগ ও বিশ্বাসের প্রতীক। তরুণ সমাজকে সুস্থ ধারার ক্রীড়া ও সমাজসেবায় উদ্বুদ্ধ করতে এবং প্রতিটি আদান-প্রদান ১০০% ডিজিটাল ও স্বচ্ছ রাখতে আমরা প্রতিজ্ঞাবদ্ধ।"
            </blockquote>

            <div>
              <h4 className="font-bold text-slate-100 text-base">মোঃ রফিকুল ইসলাম</h4>
              <p className="text-xs text-emerald-400 font-medium">সভাপতি (President), রামচন্দ্রপুর একতা ক্লাব</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
