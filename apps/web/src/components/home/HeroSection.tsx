'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Droplet, 
  TrendingUp, 
  ArrowRight, 
  HeartHandshake, 
  Calendar, 
  Sparkles 
} from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-24 px-6 overflow-hidden min-h-[85vh] flex items-center justify-center">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-600/20 via-teal-500/10 to-rose-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase shadow-lg shadow-emerald-950/50">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>ডিজিটাল ক্লাব ম্যানেজমেন্ট প্লাটফর্ম</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-100 tracking-tight leading-[1.15]">
          একতা, সামাজিক প্রগতি ও যুবকল্যাণে <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            রামচন্দ্রপুর একতা ক্লাব
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed">
          গ্রামের তরুণ সমাজকে ঐক্যবদ্ধ করে জরুরি রক্তদান সেবা, শিক্ষা সহায়তা, ক্রিয়া প্রতিযোগিতা এবং ১০০% স্বচ্ছ ডিজিটাল আর্থিক ব্যবস্থাপনার মাধ্যমে নতুন দিগন্ত সূচনা।
        </p>

        {/* CTA Button Grid */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <Link
            href="/register"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-7 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center gap-2 text-sm"
          >
            সদস্য পোর্টালে যুক্ত হন <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/members"
            className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-xl shadow-rose-600/25 transition-all flex items-center gap-2 text-sm"
          >
            <Droplet className="w-4.5 h-4.5 fill-current" /> জরুরি রক্তদাতা খুঁজুন
          </Link>

          <Link
            href="/#transparency"
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2 text-sm"
          >
            <TrendingUp className="w-4.5 h-4.5 text-cyan-400" /> আর্থিক স্বচ্ছতা লেজার
          </Link>
        </div>
      </div>
    </section>
  );
}
