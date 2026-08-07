'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeartHandshake, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || 'Login failed');
      }

      const userData = resData.data?.user || resData.user;
      const userRole = userData?.role || 'MEMBER';
      const userEmail = userData?.email || email;

      // Successful login - persist state
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_email', userEmail);
        localStorage.setItem('user_role', userRole);
        document.cookie = `isLoggedIn=true; path=/; max-age=86400`;
        document.cookie = `user_role=${userRole}; path=/; max-age=86400`;
        document.cookie = `user_email=${userEmail}; path=/; max-age=86400`;
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
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
          <h2 className="text-2xl font-bold text-slate-100">সদস্য পোর্টালে লগইন করুন</h2>
          <p className="text-xs text-slate-400">Ramchandrapur Ekota Club Management System</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl space-y-6 shadow-2xl">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">ইমেইল অ্যাড্রেস (Email)</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aaaa.ahshanhabib@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-100 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">পাসওয়ার্ড (Password)</label>
              <Link href="/forgot-password" className="text-xs text-emerald-400 hover:underline">পাসওয়ার্ড ভুলে গেছেন?</Link>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-100 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-semibold py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          নতুন সদস্য? <Link href="/register" className="text-emerald-400 font-semibold hover:underline">এখানে মেম্বারশিপ আবেদন করুন</Link>
        </p>
      </div>
    </div>
  );
}
