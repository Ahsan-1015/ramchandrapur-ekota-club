'use client';

import React, { useEffect, useState } from 'react';
import { Users, Search, Droplet, CheckCircle2, ShieldCheck, Mail, Phone, QrCode } from 'lucide-react';

interface IMemberItem {
  _id: string;
  membershipId: string;
  fullNameBn: string;
  fullNameEn: string;
  bloodGroup: string;
  isBloodDonor: boolean;
  occupation: string;
  joiningDate: string;
  userId?: {
    email: string;
    phone?: string;
    role: string;
    status: string;
  };
}

export default function MembersDashboardPage() {
  const [members, setMembers] = useState<IMemberItem[]>([]);
  const [search, setSearch] = useState('');
  const [bloodFilter, setBloodFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, [bloodFilter]);

  async function fetchMembers() {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/v1/members';
      const params = new URLSearchParams();
      if (bloodFilter) params.append('bloodGroup', bloodFilter);
      if (search) params.append('search', search);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setMembers(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch members', err);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMembers();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" /> রামচন্দ্রপুর একতা ক্লাব সদস্য ডিরেক্টরি
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            নিবন্ধিত সকল সদস্য, রক্তের গ্রুপ এবং মেম্বারশিপ পদের তালিকা।
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            মোট সদস্য: {members.length} জন
          </span>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="নাম বা সদস্য আইডি দিয়ে খুঁজুন..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
          />
        </form>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
            <Droplet className="w-3.5 h-3.5 text-rose-500" /> রক্তের গ্রুপ:
          </span>
          <select
            value={bloodFilter}
            onChange={(e) => setBloodFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
          >
            <option value="">সকল গ্রুপ (All Groups)</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">সদস্য তথ্য লোড হচ্ছে...</div>
        ) : members.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">কোনো সদস্য পাওয়া যায়নি।</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-6">সদস্য (Member)</th>
                  <th className="py-3.5 px-6">আইডি (ID)</th>
                  <th className="py-3.5 px-6">রোল (Role)</th>
                  <th className="py-3.5 px-6">রক্তের গ্রুপ (Blood)</th>
                  <th className="py-3.5 px-6">পেশা (Occupation)</th>
                  <th className="py-3.5 px-6">স্ট্যাটাস (Status)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {members.map((m) => (
                  <tr key={m._id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                          {m.fullNameEn ? m.fullNameEn.substring(0, 2).toUpperCase() : 'ME'}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-100 block">{m.fullNameBn}</span>
                          <span className="text-xs text-slate-400 block">{m.fullNameEn}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-emerald-400 font-semibold">
                      {m.membershipId}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200">
                        {m.userId?.role || 'MEMBER'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold flex items-center gap-1 w-fit">
                        <Droplet className="w-3 h-3 fill-rose-500" /> {m.bloodGroup}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-300">
                      {m.occupation}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {m.userId?.status || 'ACTIVE'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
