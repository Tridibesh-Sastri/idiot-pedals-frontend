import React from "react";
import { HeroFullscreenScrub } from "../components/HeroFullscreenScrub";
// NOTE (hidden 2026-09-25): Product + Tone Demo + ExplodedView components remain in
// src/components/ and are kept commented out here so unused animation dependencies
// (motion/react) are tree-shaken out of the production bundle for faster mobile LCP/INP.
// import { SoundDemoSection } from "../components/pedal/SoundDemoSection";
// import { PedalPhotoGallery } from "../components/pedal/PedalPhotoGallery";
// import { ExplodedView } from "../components/ExplodedView";
import { ControlsOverview } from "../components/pedal/ControlsOverview";
import { Specifications } from "../components/pedal/Specifications";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import JsonLd from "../components/JsonLd";
import { ORGANIZATION_SCHEMA } from "../lib/structuredData";

// Change this to the real account — the Workbench CTA links straight to it.
const INSTAGRAM_URL = "https://www.instagram.com/idiot.pedals/";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Catalogue is server-driven now, so the landing CTA routes to the shop
  // instead of fabricating a cart line for a hardcoded product.
  const handleShop = () => navigate("/products");

  return (
    <div className="bg-[#FFF8F1] text-[#2A1A12]">
      <SEO
        title="Boutique Guitar Effects Pedals Made in India"
        description="Handcrafted boutique guitar effects pedals engineered in India. Explore interactive 3D models, studio clean & fuzz audio demos, and pan-India shipping."
        canonicalPath="/"
      />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      {/* ================= STATIC HERO ================= */}
      <HeroFullscreenScrub />

      {/*
        HIDDEN FROM WEBSITE (kept in code):
        - <PedalPhotoGallery />  (Product / Hardware Showcase Gallery)
        - <SoundDemoSection />   (Tone Demo / Audio Test Bench)
        Uncomment below to restore them on the landing page.
      */}
      {/* <div className="relative z-10 bg-[#0B0E14]">
        <_PedalPhotoGallery />
      </div> */}

      {/* <div id="demo" className="relative z-10 bg-[#0B0E14]">
        <_SoundDemoSection />
      </div> */}

      {/* ================= CONTROLS BREAKDOWN ================= */}
      <div id="controls" className="relative z-10 bg-[#FFF8F1] scroll-mt-28">
        <ControlsOverview />
      </div>

      {/* ================= SPECIFICATIONS DATA SHEET ================= */}
      <div id="specs" className="relative z-10 bg-[#FFF8F1] scroll-mt-28">
        <Specifications />
      </div>

      {/* ================= MANIFESTO / WORKSHOP TEASER ================= */}
      <section
        id="workshop"
        className="py-28 bg-white border-t border-[#F0D3B8] relative overflow-hidden scroll-mt-28"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF5E1E]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="flex items-center justify-center gap-3 text-xs font-mono-tech tracking-[0.3em] text-[#FF5E1E] uppercase">
            <span className="w-8 h-px bg-[#FF5E1E]" />
            <span>OUR WORKBENCH</span>
            <span className="w-8 h-px bg-[#FF5E1E]" />
          </div>

          <h2 className="text-4xl sm:text-6xl font-editorial tracking-tight text-[#2A1A12]">
            Hand-wired and tested to give the exact tone every time.
          </h2>

          <p className="max-w-2xl mx-auto text-[#8A6A54] text-base sm:text-lg font-sans leading-relaxed">
            Every IDIOT pedal is hand-soldered, individually biased, and
            spectrum-tested in small batches of 25 units. Built to survive jam
            sessions and stage!
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleShop}
              className="px-8 py-4 bg-gradient-to-r from-[#FF7A00] to-[#FF4500] hover:from-[#FF8A00] hover:to-[#FF5500] text-white text-xs font-mono-tech font-bold tracking-[0.2em] uppercase rounded-full shadow-xl shadow-[#FF5E1E]/30 glow-neon-orange transition-all cursor-pointer"
            >
              Shop Pedals
            </button>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#FFF1E6] hover:bg-[#FFE8D3] text-[#2A1A12] border border-[#F0D3B8] text-xs font-mono-tech tracking-[0.2em] uppercase rounded-full transition-all flex items-center gap-2"
            >
              <span>Our Instagram Page</span>
              <ArrowRight size={14} className="text-[#FF5E1E]" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= FLOATING WHATSAPP WIDGET ================= */}
      <a
        href={`https://wa.me/917908585003?text=${encodeURIComponent('Hey, I have a query about IDIOT Pedals.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with IDIOT Pedals on WhatsApp"
        className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-50 group flex items-center gap-2 sm:gap-2.5"
      >
        {/* Animated message bubble */}
        <div className="bg-white border border-[#F0D3B8] text-[#2A1A12] px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full shadow-lg shadow-[#FF5E1E]/15 flex items-center gap-1.5 sm:gap-2 animate-bounce [animation-duration:3s]">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5E1E] animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-xs font-mono-tech font-bold tracking-wide whitespace-nowrap">
            Got a query? Chat with us
          </span>
        </div>

        {/* Orange & white WhatsApp icon button */}
        <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF4500] group-hover:from-[#FF8A00] group-hover:to-[#FF5500] text-white flex items-center justify-center shadow-xl shadow-[#FF5E1E]/35 glow-neon-orange transition-transform group-hover:scale-105 shrink-0">
          <span className="absolute inset-0 rounded-full bg-[#FF5E1E]/40 animate-ping [animation-duration:2.5s] pointer-events-none" />
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.08c-.24.68-1.41 1.3-1.95 1.38-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3s.75-2.12 1.01-2.41c.26-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.31.38-.44.51-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.26.1 1.69.8 1.98.94.29.14.48.22.55.34.07.12.07.7-.17 1.38z" />
          </svg>
        </div>
      </a>
    </div>
  );
};
