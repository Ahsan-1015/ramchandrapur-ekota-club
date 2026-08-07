'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Search, 
  Droplet, 
  CheckCircle2, 
  UserCheck, 
  AlertCircle, 
  X, 
  UserPlus, 
  Trash2, 
  Ban 
} from 'lucide-react';
import { Role } from '@ramchandrapur/types';
import { useRbac } from '../layout';

interface IMemberItem {
  _id: string;
  membershipId: string;
  fullNameBn: string;
  fullNameEn: string;
  bloodGroup: string;
  isBloodDonor: boolean;
  occupation: string;
  joiningDate: string;
  photoUrl?: string;
  userId?: {
    _id: string;
    email: string;
    phone?: string;
    role: Role;
    status: string;
  };
}

interface IPendingUser {
  _id: string;
  email: string;
  phone?: string;
  role: Role;
  status: string;
  createdAt: string;
}

export default function MembersDashboardPage() {
  const { activeRole, loggedInRole } = useRbac();
  const currentRole = activeRole || loggedInRole;
  const canManageRoles = currentRole === 'SUPER_ADMIN' || currentRole === 'PRESIDENT';
  const canApprove = currentRole === 'SUPER_ADMIN' || currentRole === 'PRESIDENT' || currentRole === 'SECRETARY';

  const [members, setMembers] = useState<IMemberItem[]>([]);
  const [pendingRequests, setPendingRequests] = useState<IPendingUser[]>([]);
  const [search, setSearch] = useState('');
  const [bloodFilter, setBloodFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Member Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    fullNameBn: '',
    fullNameEn: '',
    email: '',
    phone: '',
    role: 'MEMBER' as Role,
    bloodGroup: 'O+',
    occupation: 'সদস্য',
  });
  const [selectedRoles, setSelectedRoles] = useState<Record<string, Role>>({});

  useEffect(() => {
    fetchMembers();
    fetchPendingRequests();
  }, [bloodFilter]);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

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

  async function fetchPendingRequests() {
    try {
      const res = await fetch('http://localhost:5000/api/v1/members/pending');
      const data = await res.json();
      if (data.success) {
        setPendingRequests(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch pending requests', err);
    }
  }

  const handleApprove = async (userId: string, email: string) => {
    if (!canApprove) {
      showToast('error', 'আপনার সদস্য অনুমোদন করার অনুমতি নেই');
      return;
    }

    const roleToAssign = selectedRoles[userId] || 'MEMBER';
    try {
      const res = await fetch(`http://localhost:5000/api/v1/members/approve/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: roleToAssign }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', `সদস্য "${email}"-কে [${roleToAssign}] হিসেবে সফলভাবে অনুমোদন করা হয়েছে!`);
        fetchPendingRequests();
        fetchMembers();
      } else {
        showToast('error', data.message || 'অনুমোদন প্রক্রিয়া ব্যর্থ হয়েছে');
      }
    } catch (err: any) {
      showToast('error', err.message || 'সার্ভার সংযোগ সমস্যা');
    }
  };

  const handleRoleChange = async (userId: string, newRole: Role, email: string) => {
    if (!canManageRoles) {
      showToast('error', 'শুধুমাত্র সভাপতি ও সুপার অ্যাডমিন সদস্যের রোল পরিবর্তন করতে পারবেন');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/v1/members/user/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', `সদস্য "${email}"-এর পদ আপডেট করে [${newRole}] করা হয়েছে!`);
        fetchMembers();
      }
    } catch (err: any) {
      showToast('error', 'রোল আপডেট করা সম্ভব হয়নি');
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: string, email: string) => {
    if (!canManageRoles) {
      showToast('error', 'শুধুমাত্র সভাপতি ও সুপার অ্যাডমিন সদস্য সাসপেন্ড বা সক্রিয় করতে পারবেন');
      return;
    }

    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      const res = await fetch(`http://localhost:5000/api/v1/members/user/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(nextStatus === 'SUSPENDED' ? 'error' : 'success', `সদস্য "${email}"-এর স্ট্যাটাস [${nextStatus}] করা হয়েছে!`);
        fetchMembers();
      }
    } catch (err: any) {
      showToast('error', 'স্ট্যাটাস পরিবর্তন করা সম্ভব হয়নি');
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (!canManageRoles) {
      showToast('error', 'শুধুমাত্র সভাপতি ও সুপার অ্যাডমিন সদস্য ডিলিট করতে পারবেন');
      return;
    }

    if (!confirm(`আপনি কি নিশ্চিত যে সদস্য "${email}"-কে চিরতরে মুছে ফেলতে চান?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/members/user/${userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast('error', `সদস্য "${email}"-কে সফলভাবে ডাটাবেস থেকে ডিলিট করা হয়েছে।`);
        fetchMembers();
      }
    } catch (err: any) {
      showToast('error', 'ডিলিট প্রক্রিয়া ব্যর্থ হয়েছে');
    }
  };

  const handleReject = async (userId: string, email: string) => {
    if (!canApprove) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/members/reject/${userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast('error', `আবেদনকারী "${email}"-এর আবেদন বাতিল করা হয়েছে।`);
        fetchPendingRequests();
      }
    } catch (err: any) {
      showToast('error', err.message || 'সার্ভার সংযোগ সমস্যা');
    }
  };

  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canManageRoles) return;

    try {
      const res = await fetch('http://localhost:5000/api/v1/members/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', `নতুন সদস্য "${newMember.fullNameBn}" সফলভাবে তৈরি হয়েছে!`);
        setShowAddModal(false);
        setNewMember({
          fullNameBn: '',
          fullNameEn: '',
          email: '',
          phone: '',
          role: 'MEMBER',
          bloodGroup: 'O+',
          occupation: 'সদস্য',
        });
        fetchMembers();
      } else {
        showToast('error', data.message || 'সদস্য তৈরিতে ব্যর্থ হয়েছে');
      }
    } catch (err: any) {
      showToast('error', err.message || 'সার্ভার ত্রুটি');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMembers();
  };

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className={`fixed top-6 right-6 z-50 p-4 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
            toastMessage.type === 'success'
              ? 'bg-slate-900 border-emerald-500/50 text-emerald-400'
              : 'bg-slate-900 border-rose-500/50 text-rose-400'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          )}
          <span className="text-xs font-bold">{toastMessage.text}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" /> রামচন্দ্রপুর একতা ক্লাব সদস্য ডিরেক্টরি
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            বর্তমান অ্যাক্টিভ রোল: <span className="text-emerald-400 font-mono font-bold">{currentRole}</span> • 
            {canManageRoles ? ' আপনার সদস্য রোল আপডেট ও ম্যানেজ করার পূর্ণ অনুমতি আছে।' : ' আপনি রোল পরিবর্তন করতে পারবেন না (শুধুমাত্র সভাপতি ও সুপার অ্যাডমিন অনুমোদিত)।'}
          </p>
        </div>

        {canManageRoles && (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" /> + নতুন সদস্য যুক্ত করুন
            </button>
          </div>
        )}
      </div>

      {/* DYNAMIC PENDING APPROVALS QUEUE (FOR SECRETARY / PRESIDENT / SUPER ADMIN) */}
      {canApprove && pendingRequests.length > 0 && (
        <div className="bg-slate-900/90 border border-amber-500/40 p-6 rounded-2xl space-y-4 shadow-2xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-400" /> নতুন সদস্য নিবন্ধন অনুমোদন কিউ (Pending Approvals Queue)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">সভাপতি / সম্পাদক / অ্যাডমিন সাইন-অফ</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {pendingRequests.map((req) => (
              <div key={req._id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">{req.email}</h4>
                    <p className="text-xs text-slate-400">ফোন: {req.phone || 'N/A'}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                    PENDING
                  </span>
                </div>

                {canManageRoles ? (
                  <div className="space-y-1.5 pt-2 border-t border-slate-900">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">বরাদ্দকৃত পদ (Assign Role):</label>
                    <select
                      value={selectedRoles[req._id] || 'MEMBER'}
                      onChange={(e) => setSelectedRoles({ ...selectedRoles, [req._id]: e.target.value as Role })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-3 text-xs text-emerald-400 font-bold focus:outline-none"
                    >
                      <option value="MEMBER">General Member (সাধারণ সদস্য)</option>
                      <option value="VOLUNTEER">Volunteer (স্বেচ্ছাসেবক)</option>
                      <option value="COMMITTEE_MEMBER">Committee Member (কমিটি সদস্য)</option>
                      <option value="TREASURER">Treasurer (কোষাধ্যক্ষ)</option>
                      <option value="SECRETARY">Secretary (সাধারণ সম্পাদক)</option>
                      <option value="PRESIDENT">President (সভাপতি)</option>
                      <option value="SUPER_ADMIN">Super Admin (সুপার অ্যাডমিন)</option>
                    </select>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-slate-900 text-xs text-slate-400">
                    ডিফল্ট পদ: <span className="text-emerald-400 font-mono font-bold">MEMBER</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 text-xs">
                  <span className="text-slate-500 text-[11px]">
                    তারিখ: {new Date(req.createdAt).toLocaleDateString('bn-BD')}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleReject(req._id, req.email)}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-semibold"
                    >
                      বাতিল
                    </button>
                    <button
                      onClick={() => handleApprove(req._id, req.email)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-1"
                    >
                      <UserCheck className="w-3.5 h-3.5" /> অনুমোদন করুন
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* ALL ACTIVE MEMBERS TABLE */}
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
                  {canManageRoles && <th className="py-3.5 px-6 text-right">অ্যাকশন (Control)</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {members.map((m) => {
                  const uId = m.userId?._id || '';
                  const uEmail = m.userId?.email || m.fullNameEn;
                  const currentMemberRole = m.userId?.role || 'MEMBER';
                  const currentStatus = m.userId?.status || 'ACTIVE';

                  return (
                    <tr key={m._id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm overflow-hidden flex-shrink-0">
                            {m.photoUrl ? (
                              <img src={m.photoUrl} alt={m.fullNameEn} className="w-full h-full object-cover" />
                            ) : (
                              m.fullNameEn ? m.fullNameEn.substring(0, 2).toUpperCase() : 'ME'
                            )}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-100 block">{m.fullNameBn}</span>
                            <span className="text-xs text-slate-400 block">{uEmail}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-emerald-400 font-semibold">
                        {m.membershipId}
                      </td>
                      <td className="py-4 px-6">
                        {/* ONLY SUPER ADMIN AND PRESIDENT CAN CHANGE ROLE */}
                        {canManageRoles ? (
                          <select
                            value={currentMemberRole}
                            onChange={(e) => handleRoleChange(uId, e.target.value as Role, uEmail)}
                            className={`bg-slate-950 border rounded-xl py-1 px-2.5 text-xs font-mono font-bold focus:outline-none ${
                              currentMemberRole === 'SUPER_ADMIN' ? 'border-purple-500/50 text-purple-400' :
                              currentMemberRole === 'PRESIDENT' ? 'border-amber-500/50 text-amber-400' :
                              currentMemberRole === 'SECRETARY' ? 'border-cyan-500/50 text-cyan-400' :
                              currentMemberRole === 'TREASURER' ? 'border-emerald-500/50 text-emerald-400' :
                              'border-slate-800 text-slate-300'
                            }`}
                          >
                            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                            <option value="PRESIDENT">PRESIDENT</option>
                            <option value="SECRETARY">SECRETARY</option>
                            <option value="TREASURER">TREASURER</option>
                            <option value="COMMITTEE_MEMBER">COMMITTEE_MEMBER</option>
                            <option value="VOLUNTEER">VOLUNTEER</option>
                            <option value="MEMBER">MEMBER</option>
                          </select>
                        ) : (
                          <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${
                            currentMemberRole === 'SUPER_ADMIN' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                            currentMemberRole === 'PRESIDENT' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            currentMemberRole === 'SECRETARY' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                            currentMemberRole === 'TREASURER' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            'bg-slate-800 text-slate-200 border border-slate-700'
                          }`}>
                            {currentMemberRole}
                          </span>
                        )}
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
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                          currentStatus === 'ACTIVE'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" /> {currentStatus}
                        </span>
                      </td>
                      {canManageRoles && (
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {/* Ban / Suspend Button */}
                            <button
                              onClick={() => handleStatusToggle(uId, currentStatus, uEmail)}
                              title={currentStatus === 'ACTIVE' ? 'সাসপেন্ড/ব্যান করুন' : 'পুনরায় সক্রিয় করুন'}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                currentStatus === 'ACTIVE'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                              }`}
                            >
                              <Ban className="w-4 h-4" />
                            </button>

                            {/* Delete Account Button */}
                            <button
                              onClick={() => handleDeleteUser(uId, uEmail)}
                              title="অ্যাকাউন্ট ডিলিট করুন"
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE MEMBER MODAL (SUPER ADMIN & PRESIDENT ONLY) */}
      {canManageRoles && showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-400" /> নতুন সক্রিয় সদস্য তৈরি করুন (Add Member)
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">নাম (বাংলা)</label>
                  <input
                    type="text"
                    required
                    value={newMember.fullNameBn}
                    onChange={(e) => setNewMember({ ...newMember, fullNameBn: e.target.value })}
                    placeholder="মোঃ রফিকুল ইসলাম"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Name (English)</label>
                  <input
                    type="text"
                    required
                    value={newMember.fullNameEn}
                    onChange={(e) => setNewMember({ ...newMember, fullNameEn: e.target.value })}
                    placeholder="Md. Rafiqul Islam"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">ইমেইল (Email)</label>
                  <input
                    type="email"
                    required
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    placeholder="rafiq@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">ফোন (Phone)</label>
                  <input
                    type="text"
                    required
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    placeholder="01700000000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">পদ/রোল (Role)</label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value as Role })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-emerald-400 font-bold focus:outline-none"
                  >
                    <option value="MEMBER">Member</option>
                    <option value="VOLUNTEER">Volunteer</option>
                    <option value="COMMITTEE_MEMBER">Committee</option>
                    <option value="TREASURER">Treasurer</option>
                    <option value="SECRETARY">Secretary</option>
                    <option value="PRESIDENT">President</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">রক্তের গ্রুপ</label>
                  <select
                    value={newMember.bloodGroup}
                    onChange={(e) => setNewMember({ ...newMember, bloodGroup: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-rose-400 font-bold focus:outline-none"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">পেশা</label>
                  <input
                    type="text"
                    value={newMember.occupation}
                    onChange={(e) => setNewMember({ ...newMember, occupation: e.target.value })}
                    placeholder="Software Engineer"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                >
                  সদস্য যুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
