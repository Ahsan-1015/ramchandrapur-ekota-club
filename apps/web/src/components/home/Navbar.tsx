'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  HeartHandshake, 
  Droplet, 
  Menu, 
  X, 
  Search, 
  Bell, 
  User, 
  ArrowRight, 
  TrendingUp 
} from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'হোম', href: '/' },
    { label: 'আমাদের সম্পর্কে', href: '/about' },
    { label: 'রক্তদান কেন্দ্র', href: '/members', isBlood: true },
    { label: 'আর্থিক স্বচ্ছতা', href: '/#transparency' },
    { label: 'ইভেন্টসমূহ', href: '/events' },
    { label: 'নোটিশ বোর্ড', href: '/notices' },
    { label: 'কমিটি', href: '/committee' },
    { label: 'যোগাযোগ', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base md:text-lg text-slate-100 tracking-tight block">
                রামচন্দ্রপুর একতা ক্লাব
              </span>
              <span className="text-[10px] text-emerald-400 font-medium tracking-widest uppercase block">
                Ramchandrapur Ekota Club
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-emerald-400 ${
                  link.isBlood ? 'text-rose-400 hover:text-rose-300 flex items-center gap-1' : ''
                }`}
              >
                {link.isBlood && <Droplet className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center space-x-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notification Bell */}
            <Link
              href="/notices"
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
            </Link>

            {/* Login / Register CTAs */}
            <div className="hidden sm:flex items-center space-x-2">
              <Link
                href="/login"
                className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl hover:bg-slate-900 transition-colors"
              >
                লগইন
              </Link>
              <Link
                href="/register"
                className="text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-2 rounded-xl shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center gap-1.5"
              >
                সদস্য হন <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-start pt-20 px-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">গ্লোবাল সার্চ (Search Platform)</span>
              <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="রক্তদাতা, সদস্য, ইভেন্ট বা নোটিশ খুঁজুন..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">দ্রুত লিঙ্কসমূহ</span>
              <div className="flex flex-wrap gap-2 text-xs">
                <Link href="/members?bloodGroup=O%2B" onClick={() => setSearchOpen(false)} className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">O+ রক্তদাতা</Link>
                <Link href="/events" onClick={() => setSearchOpen(false)} className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">আসন্ন ইভেন্ট</Link>
                <Link href="/notices" onClick={() => setSearchOpen(false)} className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">জরুরি নোটিশ</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[73px] z-40 bg-slate-950/95 border-b border-slate-800 p-6 space-y-4 lg:hidden backdrop-blur-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-200 hover:text-emerald-400 py-2 border-b border-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 flex flex-col space-y-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-slate-900 text-slate-200 py-2.5 rounded-xl text-xs font-semibold"
            >
              লগইন করুন
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-emerald-500 text-slate-950 py-2.5 rounded-xl text-xs font-bold"
            >
              সদস্য পোর্টালে যুক্ত হন
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
