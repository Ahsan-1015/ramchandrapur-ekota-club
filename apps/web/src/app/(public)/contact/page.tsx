import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowLeft, Send } from 'lucide-react';

export default function ContactPage() {
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

      <main className="max-w-5xl mx-auto py-16 px-6 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            যোগাযোগ ও অনুসন্ধান
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-100">
            আমাদের সাথে সরাসরি যোগাযোগ করুন
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            যেকোনো জরুরি তথ্য, অনুদান সহায়তা বা ক্লাবের সদস্যতা সংক্রান্ত বিষযয়ে বার্তা পাঠান।
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">অফিস কার্যালয়</h3>
                  <p className="text-xs text-slate-400">রামচন্দ্রপুর, চাটমোহর, পাবনা, বাংলাদেশ</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">জরুরি ফোন হটলাইন</h3>
                  <p className="text-xs text-slate-400">+880 1700-000000 / +880 1711-111111</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">অফিশিয়াল ইমেইল</h3>
                  <p className="text-xs text-slate-400">info@ramchandrapurekota.club</p>
                </div>
              </div>
            </div>
          </div>

          <form className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl space-y-4 shadow-2xl">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">আপনার নাম (Your Name)</label>
              <input type="text" required placeholder="আপনার নাম লিখুন" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">মোবাইল / ইমেইল (Contact)</label>
              <input type="text" required placeholder="01700000000" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">বার্তা (Message)</label>
              <textarea rows={4} required placeholder="আপনার মতামত বা বার্তা লিখুন..." className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none" />
            </div>
            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2 transition-all">
              বার্তা পাঠান <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
