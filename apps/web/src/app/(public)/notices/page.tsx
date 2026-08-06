import React from 'react';
import Link from 'next/link';
import { Bell, Pin, ArrowLeft } from 'lucide-react';

export default function PublicNoticesPage() {
  const notices = [
    {
      id: '1',
      title: 'জরুরি মাসিক সাধারণ সভা সংক্রান্ত বিজ্ঞপ্তি',
      content: 'আগামী ১০ আগস্ট ২০২৬ তারিখ শুক্রবার সন্ধ্যা ৭:০০ ঘটিকায় ক্লাব কার্যালয়ে জরুরি মাসিক সভা অনুষ্ঠিত হইবে। সকল সদস্যকে যথাসময়ে উপস্থিত থাকার জন্য বিনীত অনুরোধ করা হলো।',
      date: '০৫ আগস্ট ২০২৬',
      isPinned: true,
      category: 'MEETING',
    },
    {
      id: '2',
      title: 'বার্ষিক সদস্য চাঁদা পরিশোধের অনুরোধ',
      content: 'সকল সম্মানীত সদস্যদের অবগত করা যাচ্ছে যে ২০২৬ সালের সদস্য ফি আগামী ১৫ আগস্টের মধ্যে পরিশোধ করার অনুরোধ রইল।',
      date: '০১ আগস্ট ২০২৬',
      isPinned: false,
      category: 'FINANCE',
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

      <main className="max-w-4xl mx-auto py-16 px-6 space-y-10">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            অফিশিয়াল নোটিশ বোর্ড
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-100">
            বিজ্ঞপ্তি ও ঘোষণার আর্কাইভ
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            কার্যনির্বাহী পরিষদের অনুমোদিত সকল অফিশিয়াল নোটিশ ও সার্কুলার।
          </p>
        </div>

        <div className="space-y-4">
          {notices.map((n) => (
            <div key={n.id} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-3 shadow-xl">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center space-x-2">
                  {n.isPinned && <Pin className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />}
                  <span className="font-semibold text-emerald-400 uppercase tracking-wider">{n.category}</span>
                </div>
                <span className="text-slate-500">{n.date}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-100">{n.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{n.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
