import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Clock, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PublicEventsPage() {
  const events = [
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
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

      <main className="max-w-6xl mx-auto py-16 px-6 space-y-10">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            সামাজিক অনুষ্ঠান ও ক্রিয়া
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-100">
            আসন্ন ও চলমান ইভেন্টসমূহ
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            রামচন্দ্রপুর একতা ক্লাব পরিচালিত সকল জনকল্যাণমূলক ও খেলাধুলা আয়োজনের সময়সূচি।
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((ev) => (
            <div key={ev.id} className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
                  {ev.status}
                </span>
                <span className="text-xs text-slate-400">বাজেট: {ev.budget}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-100">{ev.title}</h3>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{ev.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>{ev.date} • {ev.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
