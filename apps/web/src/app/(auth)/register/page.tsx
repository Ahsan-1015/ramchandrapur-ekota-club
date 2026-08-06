'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeartHandshake, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullNameEn: '',
    fullNameBn: '',
    email: '',
    phone: '',
    password: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: 'MALE',
    bloodGroup: 'O+',
    isBloodDonor: true,
    nidOrBirthCert: '',
    occupation: '',
    presentAddress: '',
    permanentAddress: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    membershipType: 'GENERAL',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccessMsg(data.message || 'আপনার মেম্বারশিপ আবেদন সফলভাবে জমা হয়েছে।');
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-xl shadow-emerald-900/30">
            <HeartHandshake className="w-7 h-7 text-white" />
          </Link>
          <h2 className="text-2xl font-bold text-slate-100">রামচন্দ্রপুর একতা ক্লাব — সদস্য আবেদন ফরম</h2>
          <p className="text-xs text-slate-400">মেম্বারশিপ ফর্ম পূরণ করুন এবং নির্বাহী কমিটির অনুমোদনের জন্য অপেক্ষা করুন।</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-8 rounded-2xl text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold">আবেদন সফল হয়েছে!</h3>
            <p className="text-sm text-slate-300">{successMsg}</p>
            <Link href="/login" className="inline-block bg-emerald-500 text-slate-950 px-6 py-2.5 rounded-xl font-semibold text-sm">
              লগইন পেজে যান
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl space-y-6 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">পূর্ণ নাম (বাংলায়)</label>
                <input
                  type="text"
                  name="fullNameBn"
                  required
                  value={formData.fullNameBn}
                  onChange={handleChange}
                  placeholder="যেমন: মোঃ রফিকুল ইসলাম"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Full Name (English)</label>
                <input
                  type="text"
                  name="fullNameEn"
                  required
                  value={formData.fullNameEn}
                  onChange={handleChange}
                  placeholder="Md. Rafiqul Islam"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">ইমেইল (Email)</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="rafiq@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">মোবাইল নম্বর (Phone)</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01700000000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">পাসওয়ার্ড (Password)</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">রক্তের গ্রুপ (Blood Group)</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-semibold py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'আবেদন জমা হচ্ছে...' : 'আবেদন জমা দিন'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
