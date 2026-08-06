'use client';

import React from 'react';

export function StatsSection() {
  const stats = [
    { value: '৩৫+', label: 'সক্রিয় নিবন্ধিত সদস্য', sub: 'ডাটাবেস রেকর্ডেড' },
    { value: '১০০+', label: 'সফল রক্তদান সেবা', sub: 'জরুরি সহায়তা প্রদান' },
    { value: '৳ ২,৫০,০০০+', label: 'স্বচ্ছ সমাজকল্যাণ ফান্ড', sub: 'উন্মুক্ত রসিদ লেজার' },
    { value: '১০০%', label: 'ডিজিটাল ভাউচার ট্র্যাকিং', sub: 'স্বচ্ছতা নিশ্চিতকৃত' },
  ];

  return (
    <section className="border-y border-slate-800/80 bg-slate-900/40 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              {s.value}
            </p>
            <p className="text-xs md:text-sm text-slate-300 font-bold uppercase tracking-wider mt-2">{s.label}</p>
            <p className="text-[10px] text-slate-500 font-medium">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
