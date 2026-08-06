'use client';

import React from 'react';
import { Calendar, PlusCircle, MapPin, Clock, QrCode, Users } from 'lucide-react';

export default function EventsDashboardPage() {
  const sampleEvents = [
    {
      id: '1',
      title: 'বিনামূল্যে রক্তদান শিবির ও ব্লাড গ্রুপিং ক্যাম্প',
      venue: 'রামচন্দ্রপুর সরকারি প্রাথমিক বিদ্যালয় প্রাঙ্গণ',
      date: '১৫ আগস্ট ২০২৬',
      time: 'সকাল ৯:০০ টা - দুপুর ৩:০০ টা',
      status: 'UPCOMING',
      budget: '৳ ১৫,০০০',
    },
    {
      id: '2',
      title: 'বার্ষিক ব্যাডমিন্টন টুর্নামেন্ট ২০২৬',
      venue: 'রামচন্দ্রপুর ক্লাব মাঠ',
      date: '২৫ নভেম্বর ২০২৬',
      time: 'সন্ধ্যা ৬:০০ টা',
      status: 'UPCOMING',
      budget: '৳ ২৫,০০০',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" /> সামাজিক ইভেন্ট ও অনুষ্ঠান ম্যানেজমেন্ট
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            ক্লাবের ক্রিয়া, সাংস্কৃতিক ও সামাজিক কর্মকাণ্ড পরিকল্পনা এবং QR স্ক্যানার ভিত্তিক উপস্থিতি।
          </p>
        </div>

        <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 text-xs flex items-center gap-2 transition-all">
          <PlusCircle className="w-4 h-4" /> নতুন ইভেন্ট তৈরি করুন
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sampleEvents.map((ev) => (
          <div key={ev.id} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
                {ev.status}
              </span>
              <span className="text-xs text-slate-400 font-mono">বাজেট: {ev.budget}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-100">{ev.title}</h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{ev.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{ev.date} • {ev.time}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-500" /> সদস্য প্রবেশাধিকার
              </span>
              <button className="bg-slate-800 hover:bg-slate-700 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                <QrCode className="w-4 h-4" /> QR উপস্থিতি স্ক্যান করুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
