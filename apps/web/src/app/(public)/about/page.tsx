import React from 'react';
import Link from 'next/link';
import { HeartHandshake, ShieldCheck, Target, Eye, Users, ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-extrabold text-sm">
              REC
            </div>
            <span className="font-bold text-lg text-slate-100">রামচন্দ্রপুর একতা ক্লাব</span>
          </Link>
          <Link href="/" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> হোমপেজে ফিরে যান
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-16 px-6 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            আমাদের পরিচিতি
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-100">
            রামচন্দ্রপুর একতা ক্লাবের ইতিহাস ও লক্ষ্য
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
            একতা, প্রগতি এবং সামাজিক কল্যাণ—এই তিন মূলনীতির ওপর ভিত্তি করে রামচন্দ্রপুর গ্রামের তরুণ সমাজকে সুসংগঠিত করা।
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">আমাদের লক্ষ্য (Mission)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              গ্রামে মাদক মুক্ত সুস্থ ক্রীড়া পরিবেশ গড়ে তোলা, জরুরি প্রয়োজনে স্থানীয় রোগীদের তাৎক্ষণিক রক্তের ব্যবস্থা করা, এবং ১০০% ডিজিটাল ও স্বচ্ছ আর্থিক ব্যবস্থাপনার মাধ্যমে সুবিধাবঞ্চিত মানুষের পাশে দাঁড়ানো।
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">আমাদের ভিশন (Vision)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              রামচন্দ্রপুর গ্রামকে বাংলাদেশের অন্যতম আদর্শ, প্রযুক্তিগতভাবে উন্নত এবং স্বাবলম্বী ডিজিটাল গ্রামিক অর্গানাইজেশন হিসেবে প্রতিষ্ঠা করা।
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
