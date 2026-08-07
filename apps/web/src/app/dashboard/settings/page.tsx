'use client';

import React, { useEffect, useState } from 'react';
import { 
  User, 
  Settings, 
  ShieldCheck, 
  Droplet, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  Camera, 
  Upload,
  Award, 
  HeartHandshake 
} from 'lucide-react';
import { useRbac } from '../layout';

export default function ProfileSettingsDashboardPage() {
  const { userEmail, activeRole } = useRbac();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [profile, setProfile] = useState({
    membershipId: '',
    fullNameBn: '',
    fullNameEn: '',
    fatherName: '',
    motherName: '',
    phone: '',
    dateOfBirth: '',
    gender: 'MALE',
    bloodGroup: 'O+',
    isBloodDonor: true,
    nidOrBirthCert: '',
    occupation: '',
    presentAddress: '',
    permanentAddress: '',
    emergencyContact: {
      name: '',
      relation: '',
      phone: '',
    },
    skills: [] as string[],
    skillsInput: '',
    photoUrl: '',
    membershipType: 'GENERAL',
  });

  useEffect(() => {
    if (userEmail) {
      fetchProfile();
    }
  }, [userEmail]);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  async function fetchProfile() {
    setLoading(true);
    try {
      const emailToUse = userEmail || localStorage.getItem('user_email') || '';
      const res = await fetch(`http://localhost:5000/api/v1/members/profile/me?email=${encodeURIComponent(emailToUse)}`);
      const data = await res.json();
      if (data.success && data.data) {
        const d = data.data;
        setProfile({
          membershipId: d.membershipId || '',
          fullNameBn: d.fullNameBn || '',
          fullNameEn: d.fullNameEn || '',
          fatherName: d.fatherName || '',
          motherName: d.motherName || '',
          phone: d.phone || d.userId?.phone || '',
          dateOfBirth: d.dateOfBirth ? new Date(d.dateOfBirth).toISOString().split('T')[0] : '',
          gender: d.gender || 'MALE',
          bloodGroup: d.bloodGroup || 'O+',
          isBloodDonor: d.isBloodDonor !== undefined ? d.isBloodDonor : true,
          nidOrBirthCert: d.nidOrBirthCert || '',
          occupation: d.occupation || '',
          presentAddress: d.presentAddress || '',
          permanentAddress: d.permanentAddress || '',
          emergencyContact: d.emergencyContact || { name: '', relation: '', phone: '' },
          skills: d.skills || [],
          skillsInput: Array.isArray(d.skills) ? d.skills.join(', ') : '',
          photoUrl: d.photoUrl || '',
          membershipType: d.membershipType || 'GENERAL',
        });
      }
    } catch (err) {
      console.error('Profile fetch error', err);
    } finally {
      setLoading(false);
    }
  }

  // Handle direct file selection from local device/folder
  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('error', 'ছবির সাইজ সর্ব্বোচ্চ 5MB হতে পারবে');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photoUrl: reader.result as string }));
        showToast('success', 'ছবি সফলভাবে নির্বাচন করা হয়েছে! সেভ করতে আপডেট বাটনে ক্লিক করুন।');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const emailToUse = userEmail || localStorage.getItem('user_email') || '';
    const skillsArray = profile.skillsInput
      ? profile.skillsInput.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    try {
      const res = await fetch('http://localhost:5000/api/v1/members/profile/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailToUse,
          ...profile,
          skills: skillsArray,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'আপনার প্রোফাইল তথ্য ও ছবি সফলভাবে সংরক্ষণ করা হয়েছে!');
        fetchProfile();
      } else {
        showToast('error', data.message || 'প্রোফাইল আপডেট করা সম্ভব হয়নি');
      }
    } catch (err: any) {
      showToast('error', err.message || 'সার্ভার সংযোগ ত্রুটি');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 p-12 rounded-3xl text-center text-slate-400 text-sm">
        প্রোফাইল তথ্য লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      {/* Toast Alert */}
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

      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" /> আমার প্রোফাইল ও সদস্য তথ্য আপডেট
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            আপনার গ্যালারি/ফোল্ডার থেকে প্রোফাইল ছবি আপলোড এবং সকল তথ্য সহজে পরিবর্তন করুন।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold rounded-xl">
            আইডি: {profile.membershipId}
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono font-bold rounded-xl">
            {activeRole}
          </span>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-8">
        {/* Profile Card & Avatar Banner */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-slate-800">
            {/* Avatar Preview & Direct File Select */}
            <div className="relative group">
              <div className="w-28 h-28 rounded-3xl bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-2xl overflow-hidden shadow-2xl relative">
                {profile.photoUrl ? (
                  <img src={profile.photoUrl} alt="Profile Avatar" className="w-full h-full object-cover" />
                ) : (
                  profile.fullNameEn ? profile.fullNameEn.substring(0, 2).toUpperCase() : 'ME'
                )}

                {/* Hover Camera Overlay */}
                <label
                  htmlFor="profile-image-upload"
                  className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-emerald-400 cursor-pointer transition-opacity text-xs font-bold gap-1"
                >
                  <Camera className="w-6 h-6" />
                  <span>ছবি পরিবর্তন</span>
                </label>
              </div>

              {/* Hidden File Input */}
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageFileSelect}
                className="hidden"
              />
            </div>

            <div className="space-y-2 text-center md:text-left flex-1">
              <h3 className="text-lg font-bold text-slate-100">{profile.fullNameBn || 'সদস্যের নাম'}</h3>
              <p className="text-xs text-slate-400 font-mono">{userEmail}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold flex items-center gap-1">
                  <Droplet className="w-3 h-3 fill-rose-500" /> {profile.bloodGroup}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold">
                  {profile.membershipType} MEMBER
                </span>
              </div>
            </div>

            {/* Direct File Select Button + Optional URL Input */}
            <div className="w-full md:w-80 space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">প্রোফাইল ছবি সিলেক্ট করুন (Select Photo)</label>
              
              <label
                htmlFor="profile-image-upload"
                className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-700 text-emerald-400 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
              >
                <Upload className="w-4 h-4" /> ফোল্ডার থেকে ছবি বেছে নিন
              </label>

              <div className="relative pt-1">
                <input
                  type="url"
                  value={profile.photoUrl}
                  onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
                  placeholder="অথবা সরাসরি ইমেজ লিংক (Image URL) লিখুন"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-1.5 px-3 text-[11px] text-slate-300 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <User className="w-4 h-4" /> সাধারণ তথ্য (Basic Info)
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">নাম (বাংলায়)</label>
                <input
                  type="text"
                  required
                  value={profile.fullNameBn}
                  onChange={(e) => setProfile({ ...profile, fullNameBn: e.target.value })}
                  placeholder="মোঃ রফিকুল ইসলাম"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Full Name (English)</label>
                <input
                  type="text"
                  required
                  value={profile.fullNameEn}
                  onChange={(e) => setProfile({ ...profile, fullNameEn: e.target.value })}
                  placeholder="Md. Rafiqul Islam"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">পিতার নাম (Father's Name)</label>
                <input
                  type="text"
                  value={profile.fatherName}
                  onChange={(e) => setProfile({ ...profile, fatherName: e.target.value })}
                  placeholder="মোঃ মকবুল হোসেন"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">মাতার নাম (Mother's Name)</label>
                <input
                  type="text"
                  value={profile.motherName}
                  onChange={(e) => setProfile({ ...profile, motherName: e.target.value })}
                  placeholder="জাহানারা বেগম"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">মোবাইল নম্বর (Phone)</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="01700000000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">জন্ম তারিখ (Date of Birth)</label>
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">লিঙ্গ (Gender)</label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="MALE">পুরুষ (Male)</option>
                  <option value="FEMALE">মহিলা (Female)</option>
                  <option value="OTHER">অন্যান্য (Other)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">পেশা (Occupation)</label>
                <input
                  type="text"
                  value={profile.occupation}
                  onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                  placeholder="Software Engineer"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">NID / জন্ম সনদ (NID/Birth Cert)</label>
                <input
                  type="text"
                  value={profile.nidOrBirthCert}
                  onChange={(e) => setProfile({ ...profile, nidOrBirthCert: e.target.value })}
                  placeholder="19951234567890"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">দক্ষতা (Skills - কমা দিয়ে আলাদা করুন)</label>
                <input
                  type="text"
                  value={profile.skillsInput}
                  onChange={(e) => setProfile({ ...profile, skillsInput: e.target.value })}
                  placeholder="Web Development, Event Planning, Medical Support"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Medical & Emergency Contact */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <Droplet className="w-4 h-4" /> রক্তদান ও জরুরি যোগাযোগ (Medical & Emergency Contact)
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">রক্তের গ্রুপ (Blood Group)</label>
                <select
                  value={profile.bloodGroup}
                  onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-rose-400 font-bold focus:border-emerald-500 focus:outline-none"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-3 pt-5">
                <input
                  type="checkbox"
                  id="isDonor"
                  checked={profile.isBloodDonor}
                  onChange={(e) => setProfile({ ...profile, isBloodDonor: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
                <label htmlFor="isDonor" className="text-xs text-slate-200 font-semibold cursor-pointer">
                  জরুরি রক্তদাতা হিসেবে ইচ্ছুক (Ready to Donate Blood)
                </label>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 mt-2">
              <span className="text-xs font-bold text-slate-300 block">জরুরি অভিভাবক তথ্য (Emergency Contact)</span>
              <div className="grid md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">অভিভাবকের নাম</label>
                  <input
                    type="text"
                    value={profile.emergencyContact.name}
                    onChange={(e) => setProfile({
                      ...profile,
                      emergencyContact: { ...profile.emergencyContact, name: e.target.value }
                    })}
                    placeholder="অভিভাবকের নাম"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-3 text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">সম্পর্ক</label>
                  <input
                    type="text"
                    value={profile.emergencyContact.relation}
                    onChange={(e) => setProfile({
                      ...profile,
                      emergencyContact: { ...profile.emergencyContact, relation: e.target.value }
                    })}
                    placeholder="পিতা / ভাই / অভিভাবক"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-3 text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">ফোন নম্বর</label>
                  <input
                    type="text"
                    value={profile.emergencyContact.phone}
                    onChange={(e) => setProfile({
                      ...profile,
                      emergencyContact: { ...profile.emergencyContact, phone: e.target.value }
                    })}
                    placeholder="01700000000"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-3 text-slate-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Addresses */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> ঠিকানা (Address Details)
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">বর্তমান ঠিকানা (Present Address)</label>
                <textarea
                  rows={2}
                  value={profile.presentAddress}
                  onChange={(e) => setProfile({ ...profile, presentAddress: e.target.value })}
                  placeholder="রামচন্দ্রপুর, চাটমোহর, পাবনা"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">স্থায়ী ঠিকানা (Permanent Address)</label>
                <textarea
                  rows={2}
                  value={profile.permanentAddress}
                  onChange={(e) => setProfile({ ...profile, permanentAddress: e.target.value })}
                  placeholder="রামচন্দ্রপুর, চাটমোহর, পাবনা"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/20 text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" /> {saving ? 'সংরক্ষণ হচ্ছে...' : 'প্রোফাইল তথ্য ও ছবি সংরক্ষণ করুন'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
