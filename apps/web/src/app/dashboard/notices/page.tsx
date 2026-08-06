'use client';

import React from 'react';
import { Bell, PlusCircle, Pin, FileText, Download } from 'lucide-react';

export default function NoticesDashboardPage() {
  const notices = [
    {
      id: '1',
      title: 'জরুরি মাসিক সাধারণ সভা সংক্রান্ত বিজ্ঞপ্তি',
      content: 'আগামী ১০ আগস্ট ২০২৬ তারিখ শুক্রবার সন্ধ্যা ৭:০০ ঘটিকায় ক্লাব কার্যালয়ে জরুরি মাসিক সভা অনুষ্ঠিত হইবে।',
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-400" /> অফিশিয়াল নোটিশ বোর্ড ও ঘোষণা
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            ক্লাবের অফিশিয়াল সিদ্ধান্ত, জরুরি নোটিশ এবং পিডিএফ সংযুক্তি প্রকাশ কেন্দ্র।
          </p>
        </div>

        <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 text-xs flex items-center gap-2 transition-all">
          <PlusCircle className="w-4 h-4" /> নতুন নোটিশ প্রকাশ করুন
        </button>
      </div>

      <div className="space-y-4">
        {notices.map((n) => (
          <div key={n.id} className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3 relative shadow-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {n.isPinned && <Pin className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />}
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{n.category}</span>
              </div>
              <span className="text-xs text-slate-500">{n.date}</span>
            </div>

            <h3 className="text-base font-bold text-slate-100">{n.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{n.content}</p>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500">প্রকাশক: সাধারণ সম্পাদক (Secretary)</span>
              <button className="text-emerald-400 hover:underline flex items-center gap-1">
                <Download className="w-3.5 h-3.5" /> PDF রসিদ ডাউনলোড
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
