'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  Wallet, 
  Calendar, 
  Bell, 
  UserCheck, 
  Vote, 
  LogOut, 
  Settings, 
  ShieldCheck 
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: 'ড্যাশবোর্ড (Overview)', href: '/dashboard', icon: Users },
    { label: 'সদস্যবৃন্দ (Members)', href: '/dashboard/members', icon: UserCheck },
    { label: 'অর্থ ও হিসাব (Finance)', href: '/dashboard/finance', icon: Wallet },
    { label: 'ইভেন্ট (Events)', href: '/dashboard/events', icon: Calendar },
    { label: 'নোটিশ বোর্ড (Notices)', href: '/dashboard/notices', icon: Bell },
    { label: 'ভোট ও নির্বাচন (Voting)', href: '/dashboard/voting', icon: Vote },
    { label: 'সেটিংস (Settings)', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Persistent Dashboard Sidebar */}
      <aside className="w-64 bg-slate-900/60 border-r border-slate-800/80 p-6 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-8">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-extrabold text-sm shadow-md shadow-emerald-500/20">
              REC
            </div>
            <div>
              <span className="font-bold text-sm text-slate-100 block">একতা ক্লাব</span>
              <span className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider block">Dashboard</span>
            </div>
          </Link>

          <nav className="space-y-1.5 text-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <Link
            href="/login"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" /> লগআউট (Logout)
          </Link>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex justify-between items-center pb-6 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">রামচন্দ্রপুর একতা ক্লাব অ্যাডমিন ড্যাশবোর্ড</h1>
            <p className="text-xs text-slate-400 mt-1">
              সুপার অ্যাডমিন: আহসান হাবীব (aaaa.ahshanhabib@gmail.com) • রোল: SUPER_ADMIN
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> সক্রিয় অ্যাডমিন (Active)
            </span>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
