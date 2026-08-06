'use client';

import React from 'react';
import Link from 'next/link';
import { HeartHandshake, Phone, Mail, MapPin } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900 text-xs">
        {/* Brand Col */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-extrabold text-sm">
              REC
            </div>
            <span className="font-bold text-base text-slate-100 block">রামচন্দ্রপুর একতা ক্লাব</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            একতা, সামাজিক প্রগতি ও যুবকল্যাণে চাটমোহর, পাবনার একটি শীর্ষস্থানীয় নিবন্ধিত ডিজিটাল সমাজসেবামূলক প্রতিষ্ঠান।
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <span className="font-bold text-slate-200 uppercase tracking-wider block">দ্রুত লিঙ্কসমূহ</span>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/" className="hover:text-emerald-400 transition-colors">হোম</Link></li>
            <li><Link href="/about" className="hover:text-emerald-400 transition-colors">আমাদের সম্পর্কে</Link></li>
            <li><Link href="/committee" className="hover:text-emerald-400 transition-colors">কার্যনির্বাহী পরিষদ</Link></li>
            <li><Link href="/members" className="hover:text-emerald-400 transition-colors">রক্তদাতা ডিরেক্টরি</Link></li>
            <li><Link href="/events" className="hover:text-emerald-400 transition-colors">ইভেন্ট ক্যালেন্ডার</Link></li>
          </ul>
        </div>

        {/* Services & Transparency */}
        <div className="space-y-3">
          <span className="font-bold text-slate-200 uppercase tracking-wider block">সেবা ও স্বচ্ছতা</span>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/#transparency" className="hover:text-emerald-400 transition-colors">ডিজিটাল অর্থ লেজার</Link></li>
            <li><Link href="/notices" className="hover:text-emerald-400 transition-colors">অফিশিয়াল নোটিশ বোর্ড</Link></li>
            <li><Link href="/register" className="hover:text-emerald-400 transition-colors">মেম্বারশিপ আবেদন</Link></li>
            <li><Link href="/login" className="hover:text-emerald-400 transition-colors">সদস্য ড্যাশবোর্ড</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <span className="font-bold text-slate-200 uppercase tracking-wider block">যোগাযোগ</span>
          <div className="space-y-2 text-slate-400">
            <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> রামচন্দ্রপুর, চাটমোহর, পাবনা</p>
            <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-emerald-400" /> +880 1700-000000</p>
            <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-emerald-400" /> info@ramchandrapurekota.club</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2026 রামচন্দ্রপুর একতা ক্লাব। সর্বস্বত্ব সংরক্ষিত।</p>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-slate-300">গোপনীয়তা নীতি</Link>
          <Link href="/terms" className="hover:text-slate-300">শর্তাবলী</Link>
          <Link href="/contact" className="hover:text-slate-300">যোগাযোগ</Link>
        </div>
      </div>
    </footer>
  );
}
