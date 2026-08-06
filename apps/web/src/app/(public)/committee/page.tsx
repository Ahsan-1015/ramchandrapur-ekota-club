import React from 'react';
import Link from 'next/link';
import { Users, ShieldCheck, ArrowLeft, Mail, Phone } from 'lucide-react';

export default function CommitteePage() {
  const committeeMembers = [
    {
      name: 'আহসান হাবীব (Ahsan Habib)',
      role: 'Super Admin & Lead Tech',
      phone: '01700000000',
      email: 'aaaa.ahshanhabib@gmail.com',
      image: 'AH',
    },
    {
      name: 'মোঃ রফিকুল ইসলাম (Md. Rafiqul Islam)',
      role: 'সভাপতি (President)',
      phone: '01711111111',
      email: 'president@ekota.club',
      image: 'RI',
    },
    {
      name: 'মাহমুদুল হাসান (Mahmudul Hasan)',
      role: 'সাধারণ সম্পাদক (General Secretary)',
      phone: '01722222222',
      email: 'secretary@ekota.club',
      image: 'MH',
    },
    {
      name: 'তারিকুল ইসলাম (Tariqul Islam)',
      role: 'কোষাধ্যক্ষ (Treasurer)',
      phone: '01733333333',
      email: 'treasurer@ekota.club',
      image: 'TI',
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

      <main className="max-w-6xl mx-auto py-16 px-6 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            কার্যনির্বাহী কমিটি
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-100">
            রামচন্দ্রপুর একতা ক্লাব নির্বাহী পরিষদ (২০২৬-২০২৭)
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            ক্লাবের সার্বিক পরিচালনা, সিদ্ধান্ত গ্রহণ এবং উন্নয়নমূলক কাজ বাস্তবায়নে নিয়োজিত সদস্যবৃন্দ।
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {committeeMembers.map((m, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4 text-center shadow-xl hover:border-emerald-500/40 transition-all">
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-2xl mx-auto">
                {m.image}
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm">{m.name}</h3>
                <span className="text-xs text-emerald-400 font-semibold block mt-1">{m.role}</span>
              </div>
              <div className="pt-3 border-t border-slate-800 space-y-1 text-xs text-slate-400">
                <p className="flex items-center justify-center gap-1.5"><Phone className="w-3 h-3 text-slate-500" /> {m.phone}</p>
                <p className="flex items-center justify-center gap-1.5"><Mail className="w-3 h-3 text-slate-500" /> {m.email}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
