'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Droplet, ArrowUp } from 'lucide-react';

export function FloatingWidgets() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-rose-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* Floating Emergency Blood Button */}
        <Link
          href="/members"
          className="bg-rose-600 hover:bg-rose-700 text-white p-3.5 rounded-2xl shadow-2xl shadow-rose-600/50 transition-transform hover:scale-110 flex items-center gap-2 text-xs font-bold"
          title="জরুরি রক্তদাতা খুঁজুন"
        >
          <Droplet className="w-5 h-5 fill-current animate-pulse" />
          <span className="hidden sm:inline">জরুরি রক্তদাতা</span>
        </Link>

        {/* Back to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 p-3 rounded-2xl shadow-xl transition-all self-end"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </>
  );
}
