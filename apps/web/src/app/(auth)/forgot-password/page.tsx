'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeartHandshake, KeyRound, Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে');
      }

      setMessage({ type: 'success', text: data.message || 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!' });
      setTimeout(() => {
        router.push('/login');
      }, 2500);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'একটি ত্রুটি ঘটেছে' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-xl shadow-emerald-900/30">
            <HeartHandshake className="w-7 h-7 text-white" />
          </Link>
          <h2 className="text-2xl font-bold text-slate-100">পাসওয়ার্ড পুনরুদ্ধার করুন</h2>
          <p className="text-xs text-slate-400">Ramchandrapur Ekota Club Management System</p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-xl text-sm flex items-center gap-3 border ${
              message.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl space-y-6 shadow-2xl">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">আপনার নিবন্ধিত ইমেইল অ্যাড্রেস</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="testuser@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-100 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">নতুন পাসওয়ার্ড লিখুন</label>
            <div className="relative">
              <KeyRound className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="88888888"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-100 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-semibold py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'পাসওয়ার্ড পরিবর্তন হচ্ছে...' : 'পাসওয়ার্ড রিসেট করুন'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          মনে পড়েছে? <Link href="/login" className="text-emerald-400 font-semibold hover:underline">লগইন পৃষ্ঠায় ফিরে যান</Link>
        </p>
      </div>
    </div>
  );
}
