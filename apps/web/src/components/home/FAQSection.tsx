'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'রামচন্দ্রপুর একতা ক্লাবের সদস্য কীভাবে হওয়া যায়?',
      a: 'আপনি আমাদের ওয়েবসাইটের "সদস্য পোর্টালে যুক্ত হন" লিংকে গিয়ে রেজিস্ট্রেশন ফরম পূরণ করতে পারেন। নির্বাহী কমিটি যাচাই-বাছাই করে অনুমোদন প্রদান করবেন।',
    },
    {
      q: 'জরুরি রক্তদানের প্রয়োজন হলে করণীয় কী?',
      a: 'আমাদের হোমপেজের "জরুরি রক্তদাতা খুঁজুন" উইজেটে আপনার প্রয়োজনীয় রক্তের গ্রুপ নির্বাচন করলেই ক্লাবের নিবন্ধিত রক্তদাতাদের তালিকা পাওয়া যাবে।',
    },
    {
      q: 'ক্লাবের আর্থিক স্বচ্ছতা কীভাবে নিশ্চিত করা হয়?',
      a: 'প্রতিটি আয় ও ব্যয়ের ভাউচার ডিজিটালভাবে প্রসেস করা হয় এবং রিয়েল-টাইমে ওয়েবসাইটের "আর্থিক স্বচ্ছতা" পেজে আপলোড করা হয়।',
    },
    {
      q: 'আমি কি ক্লাব তহবিলে অনুদান পাঠাতে পারি?',
      a: 'হ্যাঁ, আপনি bKash, Nagad বা সরাসরি ব্যাংক ট্রান্সফারের মাধ্যমে সমাজকল্যাণ তহবিলে অনুদান প্রদান করতে পারেন।',
    },
  ];

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto w-full space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          সাধারণ জিজ্ঞাসা (FAQ)
        </span>
        <h2 className="text-3xl font-bold text-slate-100">সচরাচর জিজ্ঞাসিত প্রশ্নাবলী</h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex justify-between items-center text-sm font-semibold text-slate-100"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
