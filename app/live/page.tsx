"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/informational/HeroSection";
import { HowItWorksSection } from "@/components/informational/HowItWorksSection";
import { InteractiveDisciplineFilter } from "@/components/informational/InteractiveDisciplineFilter";
import { BrandArtifactsShowcase } from "@/components/informational/BrandArtifactsShowcase";
import { PlatformPreview } from "@/components/informational/PlatformPreview";
import { WhyRicozSection } from "@/components/informational/WhyRicozSection";
import { WhoIsItForSection } from "@/components/informational/WhoIsItForSection";
import { FAQSection } from "@/components/informational/FAQSection";
import { FinalCTASection } from "@/components/informational/FinalCTASection";
import { Footer } from "@/components/Footer";
import { ConciergeBriefingModal } from "@/components/informational/ConciergeBriefingModal";
import { Shield, ArrowLeft, LayoutDashboard } from "lucide-react";

export default function LiveWebsitePage() {
  const [briefingModalOpen, setBriefingModalOpen] = useState(false);

  const handleOpenBriefing = () => {
    setBriefingModalOpen(true);
  };

  const handleCloseBriefing = () => {
    setBriefingModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-brand selection:bg-accent selection:text-cream font-sans antialiased overflow-x-hidden">
      {/* FLOATING ADMIN QUICK RETURN BANNER */}
      <div className="bg-[#0A0D14] border-b border-white/10 text-white text-xs py-2 px-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-slate-300">
            Previewing: <strong className="text-white">RICOZ Public Live Website</strong>
          </span>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-[11px] transition-all shadow-sm"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Return to Admin Panel &rarr;</span>
        </Link>
      </div>

      {/* 1. GLOBAL NAVIGATION */}
      <Navbar />

      <main className="flex-1">
        {/* SECTION 1: HERO SECTION WITH CURATED TALENT COMPOSITION */}
        <HeroSection onOpenBriefing={handleOpenBriefing} />

        {/* SECTION 2: HOW RICOZ WORKS (4-STEP PROGRESSION) */}
        <HowItWorksSection />

        {/* SECTION 3: EXPLORE CURATED TALENT & DISCIPLINE FILTER */}
        <InteractiveDisciplineFilter />

        {/* SECTION 4: PRODUCTION ARTIFACTS SHIPPED ACROSS MANDATES */}
        <BrandArtifactsShowcase />

        {/* SECTION 5: AI MATCHER 5-SPECIALIST SQUAD PREVIEW */}
        <PlatformPreview />

        {/* SECTION 6: WHY RICOZ ASYMMETRIC BENTO GRID */}
        <WhyRicozSection />

        {/* SECTION 7: FOR COMPANIES AND CREATIVES */}
        <WhoIsItForSection />

        {/* SECTION 8: FREQUENTLY ASKED QUESTIONS */}
        <FAQSection />

        {/* SECTION 9: FINAL INVITATION / HIGH-CONVERSION CTA */}
        <FinalCTASection onOpenBriefing={handleOpenBriefing} />
      </main>

      {/* GLOBAL FOOTER */}
      <Footer />

      {/* CONCIERGE BRIEFING MODAL */}
      <ConciergeBriefingModal
        isOpen={briefingModalOpen}
        onClose={handleCloseBriefing}
      />
    </div>
  );
}
