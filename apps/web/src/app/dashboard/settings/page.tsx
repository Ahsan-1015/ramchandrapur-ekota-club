'use client';

import React from 'react';
import { Settings, ShieldCheck, Mail, Key, Bell, Database } from 'lucide-react';

export default function SettingsDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-400" /> সিস্টেম ও প্রোফাইল সেটিংস
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          অ্যাডমিন কনফিগারেশন, নোটিফিকেশন গেটওয়ে এবং নিরাপত্তা পাসওয়ার্ড পরিবর্তন।
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> ক্লাব প্রোফাইল সেটিংস
          </h3>
          <div className="space-y-3 text-xs text-slate-300">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">সংগঠনের নাম</label>
              <input type="text" readOnly value="রামচন্দ্রপুর একতা ক্লাব (Ramchandrapur Ekota Club)" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-200" />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">অফিস ঠিকানা</label>
              <input type="text" readOnly value="রামচন্দ্রপুর, চাটমোহর, পাবনা, বাংলাদেশ" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-200" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Key className="w-5 h-5 text-cyan-400" /> নিরাপত্তা ও পাসওয়ার্ড পরিবর্তন
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">বর্তমান পাসওয়ার্ড</label>
              <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-200" />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">নতুন পাসওয়ার্ড</label>
              <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-200" />
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs transition-all">
              পাসওয়ার্ড আপডেট করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
