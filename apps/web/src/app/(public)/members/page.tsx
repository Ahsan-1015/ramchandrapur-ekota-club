'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Droplet, Search, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface IMemberItem {
  _id: string;
  membershipId: string;
  fullNameBn: string;
  fullNameEn: string;
  bloodGroup: string;
  isBloodDonor: boolean;
  occupation: string;
  presentAddress: string;
}

export default function PublicMembersPage() {
  const [members, setMembers] = useState<IMemberItem[]>([]);
  const [bloodFilter, setBloodFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, [bloodFilter]);

  async function fetchMembers() {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/v1/members';
      if (bloodFilter) url += `?bloodGroup=${bloodFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) setMembers(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

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
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
            রক্তদাতা ও সদস্য ডিরেক্টরি
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-100">
            জরুরি রক্তদাতা ও সদস্য তালিকা
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            প্রয়োজনে যেকোনো গ্রুপের রক্তদাতার সাথে সরাসরি যোগাযোগ করার জন্য ফিল্টার অপশন ব্যবহার করুন।
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setBloodFilter('')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              bloodFilter === '' ? 'bg-emerald-500 text-slate-950 border-emerald-500' : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}
          >
            সকল রক্তদাতা
          </button>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
            <button
              key={bg}
              onClick={() => setBloodFilter(bg)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                bloodFilter === bg ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              {bg}
            </button>
          ))}
        </div>

        {/* Members Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-slate-400 text-sm py-12">তথ্য লোড হচ্ছে...</div>
          ) : members.length === 0 ? (
            <div className="col-span-full text-center text-slate-400 text-sm py-12">এই গ্রুপের কোনো রক্তদাতা পাওয়া যায়নি।</div>
          ) : (
            members.map((m) => (
              <div key={m._id} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-100 text-base">{m.fullNameBn}</h3>
                    <p className="text-xs text-slate-400">{m.fullNameEn}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold flex items-center gap-1">
                    <Droplet className="w-3.5 h-3.5 fill-rose-500" /> {m.bloodGroup}
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-1 border-t border-slate-800/80 pt-3">
                  <p><span className="text-slate-500 font-semibold">মেম্বারশিপ ID:</span> {m.membershipId}</p>
                  <p><span className="text-slate-500 font-semibold">পেশা:</span> {m.occupation}</p>
                  <p><span className="text-slate-500 font-semibold">ঠিকানা:</span> {m.presentAddress}</p>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> রক্তদানে সম্মত
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
