'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Role } from '@ramchandrapur/types';
import { 
  User,
  Users, 
  Wallet, 
  Calendar, 
  Bell, 
  UserCheck, 
  Vote, 
  LogOut, 
  Settings, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  QrCode, 
  Activity, 
  Home, 
  ArrowLeft 
} from 'lucide-react';

// Context for Active User Role
interface IRbacContext {
  activeRole: Role;
  setActiveRole: (role: Role) => void;
  loggedInRole: Role;
  userEmail: string;
}

const RbacContext = createContext<IRbacContext>({
  activeRole: 'SUPER_ADMIN',
  setActiveRole: () => {},
  loggedInRole: 'SUPER_ADMIN',
  userEmail: '',
});

export const useRbac = () => useContext(RbacContext);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [activeRole, setActiveRole] = useState<Role>('SUPER_ADMIN');
  const [loggedInRole, setLoggedInRole] = useState<Role>('SUPER_ADMIN');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // Check authentication and fetch live role from DB
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('user_email');
      const storedRole = localStorage.getItem('user_role') as Role;
      const isLoggedInCookie = document.cookie.includes('isLoggedIn=true');

      if (!email && !isLoggedInCookie) {
        // Unauthenticated user - redirect to login immediately
        router.push('/login');
        return;
      }

      const initialEmail = email || '';
      setUserEmail(initialEmail);

      // Default role fallback
      let initialRole: Role = storedRole || 'MEMBER';
      if (initialEmail === 'aaaa.ahshanhabib@gmail.com') initialRole = 'SUPER_ADMIN';
      else if (initialEmail === 'president@ekota.club') initialRole = 'PRESIDENT';
      else if (initialEmail === 'secretary@ekota.club') initialRole = 'SECRETARY';
      else if (initialEmail === 'treasurer@ekota.club') initialRole = 'TREASURER';

      setLoggedInRole(initialRole);
      setActiveRole(initialRole);
      setIsAuthChecked(true);

      // Fetch live user role from MongoDB to keep in sync when Super Admin updates role
      if (initialEmail) {
        fetch('http://localhost:5000/api/v1/members')
          .then((res) => res.json())
          .then((data) => {
            if (data.success && Array.isArray(data.data)) {
              const matchedMember = data.data.find(
                (m: any) => m.userId?.email?.toLowerCase() === initialEmail.toLowerCase()
              );
              if (matchedMember && matchedMember.userId?.role) {
                const liveRole = matchedMember.userId.role as Role;
                setLoggedInRole(liveRole);
                setActiveRole(liveRole);
                localStorage.setItem('user_role', liveRole);
                document.cookie = `user_role=${liveRole}; path=/; max-age=86400`;
              }
            }
          })
          .catch((err) => console.error('Role sync error', err));
      }
    }
  }, [router]);

  // Role Navigation Specs with Profile Settings for all roles
  const navSpecs: Record<Role, { label: string; href: string; icon: any }[]> = {
    SUPER_ADMIN: [
      { label: 'অ্যাডমিন ড্যাশবোর্ড', href: '/dashboard', icon: ShieldCheck },
      { label: 'সদস্য অনুমোদন ও তালিকা', href: '/dashboard/members', icon: UserCheck },
      { label: 'অর্থ ও বাজেট হিসাব', href: '/dashboard/finance', icon: Wallet },
      { label: 'ইভেন্ট ও কিউআর স্ক্যানার', href: '/dashboard/events', icon: Calendar },
      { label: 'নোটিশ বোর্ড', href: '/dashboard/notices', icon: Bell },
      { label: 'ভোট ও পোলিং', href: '/dashboard/voting', icon: Vote },
      { label: 'আমার প্রোফাইল ও সেটিংস', href: '/dashboard/settings', icon: Settings },
    ],
    PRESIDENT: [
      { label: 'সভাপতি ড্যাশবোর্ড', href: '/dashboard', icon: ShieldCheck },
      { label: 'সদস্য অনুমোদন ও তালিকা', href: '/dashboard/members', icon: UserCheck },
      { label: 'অর্থনৈতিক ওভারভিউ', href: '/dashboard/finance', icon: Wallet },
      { label: 'ইভেন্ট তদারকি', href: '/dashboard/events', icon: Calendar },
      { label: 'অফিশিয়াল নোটিশ', href: '/dashboard/notices', icon: Bell },
      { label: 'নির্বাচন তদারকি', href: '/dashboard/voting', icon: Vote },
      { label: 'আমার প্রোফাইল ও সেটিংস', href: '/dashboard/settings', icon: Settings },
    ],
    SECRETARY: [
      { label: 'সম্পাদক ড্যাশবোর্ড', href: '/dashboard', icon: FileText },
      { label: 'সদস্য অনুমোদন কিউ', href: '/dashboard/members', icon: UserCheck },
      { label: 'সভা ও ইভেন্ট পরিকল্পনা', href: '/dashboard/events', icon: Calendar },
      { label: 'নোটিশ প্রকাশ', href: '/dashboard/notices', icon: Bell },
      { label: 'আমার প্রোফাইল ও সেটিংস', href: '/dashboard/settings', icon: Settings },
    ],
    TREASURER: [
      { label: 'কোষাধ্যক্ষ ড্যাশবোর্ড', href: '/dashboard', icon: Wallet },
      { label: 'আয় ও ব্যয় রসিদ', href: '/dashboard/finance', icon: Wallet },
      { label: 'চাঁদা ও অনুদান ফান্ড', href: '/dashboard/finance', icon: CreditCard },
      { label: 'আমার প্রোফাইল ও সেটিংস', href: '/dashboard/settings', icon: Settings },
    ],
    COMMITTEE_MEMBER: [
      { label: 'কমিটি ড্যাশবোর্ড', href: '/dashboard', icon: Users },
      { label: 'বরাদ্দকৃত কাজ ও ইভেন্ট', href: '/dashboard/events', icon: Calendar },
      { label: 'ক্লাব নোটিশ', href: '/dashboard/notices', icon: Bell },
      { label: 'আমার প্রোফাইল ও সেটিংস', href: '/dashboard/settings', icon: Settings },
    ],
    VOLUNTEER: [
      { label: 'স্বেচ্ছাসেবক ড্যাশবোর্ড', href: '/dashboard', icon: Activity },
      { label: 'ইভেন্ট QR স্ক্যানার', href: '/dashboard/events', icon: QrCode },
      { label: 'নোটিশ', href: '/dashboard/notices', icon: Bell },
      { label: 'আমার প্রোফাইল ও সেটিংস', href: '/dashboard/settings', icon: Settings },
    ],
    MEMBER: [
      { label: 'সদস্য ড্যাশবোর্ড', href: '/dashboard', icon: User },
      { label: 'আমার ডিজিটাল আইডি কার্ড', href: '/dashboard', icon: QrCode },
      { label: 'রক্তদান ডিরেক্টরি', href: '/dashboard/members', icon: Users },
      { label: 'ক্লাব নোটিশ', href: '/dashboard/notices', icon: Bell },
      { label: 'আমার প্রোফাইল ও সেটিংস', href: '/dashboard/settings', icon: Settings },
    ],
    GUEST: [
      { label: 'গেস্ট প্যানেল', href: '/dashboard', icon: User },
      { label: 'আমার প্রোফাইল ও সেটিংস', href: '/dashboard/settings', icon: Settings },
    ]
  };

  const navItems = navSpecs[activeRole] || navSpecs.SUPER_ADMIN;

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_role');
      document.cookie = 'token=; Max-Age=0; path=/;';
      document.cookie = 'isLoggedIn=; Max-Age=0; path=/;';
      document.cookie = 'user_role=; Max-Age=0; path=/;';
      document.cookie = 'user_email=; Max-Age=0; path=/;';
      router.push('/login');
    }
  };

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold">লগইন ও ভূমিকা সিঙ্ক করা হচ্ছে...</span>
        </div>
      </div>
    );
  }

  // Only SUPER_ADMIN gets the role switcher dropdown
  const canSwitchRoles = loggedInRole === 'SUPER_ADMIN';

  return (
    <RbacContext.Provider value={{ activeRole, setActiveRole, loggedInRole, userEmail }}>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex">
        {/* Persistent Dynamic Sidebar */}
        <aside className="w-64 bg-slate-900/60 border-r border-slate-800/80 p-6 flex flex-col justify-between hidden md:flex shrink-0">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-extrabold text-sm shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                REC
              </div>
              <div>
                <span className="font-bold text-sm text-slate-100 block">একতা ক্লাব</span>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">
                  {activeRole.replace('_', ' ')}
                </span>
              </div>
            </Link>

            {/* Back to Home Page Button in Sidebar */}
            <Link
              href="/"
              className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm"
            >
              <Home className="w-4 h-4 text-emerald-400" />
              <span>ওয়েবসাইটে ফিরে যান</span>
            </Link>

            <nav className="space-y-1.5 text-xs font-semibold pt-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.label}
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

          <div className="border-t border-slate-800 pt-4 space-y-3">
            <Link
              href="/dashboard/settings"
              className="block px-3 py-2 bg-slate-950 hover:bg-slate-800/80 border border-slate-800/80 rounded-xl text-[11px] text-slate-300 font-mono truncate transition-colors"
            >
              👤 {userEmail || 'User'}
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> লগআউট (Logout)
            </button>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
          {/* Header with Back to Home Button & Role Switcher */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 px-3 py-1.5 rounded-xl transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> হোমপেজ
                </Link>
                <span className="text-xs text-slate-500 font-mono">/</span>
                <span className="text-xs text-slate-400 font-medium">ড্যাশবোর্ড</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-100">
                {activeRole === 'SUPER_ADMIN' && 'সুপার অ্যাডমিন কন্ট্রোল প্যানেল'}
                {activeRole === 'PRESIDENT' && 'সভাপতি এক্সিকিউティブ ড্যাশবোর্ড'}
                {activeRole === 'SECRETARY' && 'সাধারণ সম্পাদক কার্যনির্বাহী ড্যাশবোর্ড'}
                {activeRole === 'TREASURER' && 'কোষাধ্যক্ষ অর্থ ও বাজেট প্যানেল'}
                {activeRole === 'COMMITTEE_MEMBER' && 'কার্যনির্বাহী কমিটি সদস্য ড্যাশবোর্ড'}
                {activeRole === 'VOLUNTEER' && 'স্বেচ্ছাসেবক ফিল্ড ওয়ার্ক প্যানেল'}
                {activeRole === 'MEMBER' && 'সাধারণ সদস্য পোর্টাল'}
              </h1>
            </div>

            {/* Role Display / Switcher Selector */}
            <div className="bg-slate-900 border border-slate-800 p-2 rounded-2xl flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase px-2">ইউজার পদ (Role):</span>
              {canSwitchRoles ? (
                <select
                  value={activeRole}
                  onChange={(e) => setActiveRole(e.target.value as Role)}
                  className="bg-slate-950 border border-slate-800 text-xs font-bold text-emerald-400 py-1.5 px-3 rounded-xl focus:outline-none cursor-pointer"
                >
                  <option value="SUPER_ADMIN">1. Super Admin</option>
                  <option value="PRESIDENT">2. President (সভাপতি)</option>
                  <option value="SECRETARY">3. Secretary (সাধারণ সম্পাদক)</option>
                  <option value="TREASURER">4. Treasurer (কোষাধ্যক্ষ)</option>
                  <option value="COMMITTEE_MEMBER">5. Committee Member</option>
                  <option value="VOLUNTEER">6. Volunteer</option>
                  <option value="MEMBER">7. General Member</option>
                </select>
              ) : (
                <span className="bg-slate-950 border border-slate-800 text-xs font-bold text-emerald-400 py-1.5 px-3 rounded-xl font-mono uppercase">
                  {loggedInRole}
                </span>
              )}
            </div>
          </div>

          {children}
        </main>
      </div>
    </RbacContext.Provider>
  );
}
