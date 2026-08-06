import React from 'react';
import { Navbar } from '@/components/home/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { PresidentMessage } from '@/components/home/PresidentMessage';
import { DonationSection } from '@/components/home/DonationSection';
import { FAQSection } from '@/components/home/FAQSection';
import { FooterSection } from '@/components/home/FooterSection';
import { FloatingWidgets } from '@/components/home/FloatingWidgets';

export default function MasterHomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1. Sticky Navigation Bar */}
      <Navbar />

      {/* 2. Full-Screen Impact Hero Section */}
      <HeroSection />

      {/* 3. Animated Statistics Counter */}
      <StatsSection />

      {/* 4. President's Speech & Digital Signature */}
      <PresidentMessage />

      {/* 5. 100% Financial Transparency Ledger & Donation */}
      <DonationSection />

      {/* 6. Interactive FAQ Accordion */}
      <FAQSection />

      {/* 7. Rich Footer Section */}
      <FooterSection />

      {/* 8. Floating Emergency Widgets & Scroll Progress Bar */}
      <FloatingWidgets />
    </div>
  );
}
