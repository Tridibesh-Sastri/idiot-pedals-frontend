import React from 'react';
import { ArrowRight } from 'lucide-react';
// NOTE: Audition/Tone-Demo entry kept in code but hidden (Volume2 icon + #demo link removed from UI).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Volume2 as _Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNeonFuzzBox } from '../hooks/useNeonFuzzBox';

void _Volume2;

interface HeroFullscreenScrubProps {
  onTransitionStateChange?: (isMidTransition: boolean, isCompleted: boolean) => void;
}

export function HeroFullscreenScrub({ onTransitionStateChange: _ }: HeroFullscreenScrubProps) {
  // Catalogue-driven price. No cart line is invented here.
  const { priceLabel, compareAtLabel, savingsLabel } = useNeonFuzzBox();
  const navigate = useNavigate();

  /**
   * Sends the visitor to the shop listing to browse. It deliberately does not
   * touch the cart and does not jump to a specific product: this is a
   * "browse the shop" entry point, not a purchase action.
   */
  const handleQuickAdd = () => navigate('/products');

  return (
    <section id="hero" className="relative w-full overflow-hidden" style={{ height: '100dvh' }}>
      {/* ── High-Resolution Background Image (Responsive Picture) ── */}
      <picture className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <source media="(max-width: 1023px)" srcSet="/frames/mobile/image.webp" />
        <img
          src="/frames/web/frame_0001.webp"
          alt="Idiot Pedals Neon Fuzz Box"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center select-none pointer-events-none"
          draggable={false}
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* ── Desktop: Left subtle studio scrim for high readability ── */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[55%] pointer-events-none bg-gradient-to-r from-[#FAF9F6]/95 via-[#FAF9F6]/75 to-transparent" />

      {/* ── Mobile: Subtle edge scrims only (pedal in the center is 100% clean and unwashed) ── */}
      <div className="lg:hidden absolute top-0 inset-x-0 h-40 pointer-events-none bg-gradient-to-b from-[#FAF9F6]/90 via-[#FAF9F6]/40 to-transparent" />
      <div className="lg:hidden absolute bottom-0 inset-x-0 h-52 pointer-events-none bg-gradient-to-t from-[#FAF9F6]/65 via-[#FAF9F6]/50 to-transparent" />

      {/* ═══════════════ DESKTOP EDITORIAL LAYOUT ═══════════════ */}
      <div className="hidden lg:flex absolute inset-0 z-20 flex-col justify-center px-12 lg:px-20 pt-24 pb-12 pointer-events-none">
        <div className="max-w-7xl mx-auto w-full flex justify-start">
          <div className="w-[48%] xl:w-[44%] space-y-6 lg:space-y-7">
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech tracking-widest uppercase text-[#FF5E1E] font-bold">
              <span>Distortion Pedal Electric Guitar</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-5xl lg:text-[4.5rem] font-editorial tracking-tight uppercase leading-[0.90] text-[#0B0E14]">
                Idiot Pedals.<br />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FF5E1E] to-[#FF3E00]">
                  Distortion One.
                </span>
              </h1>
              <p className="max-w-md text-base font-sans text-[#475569] font-normal leading-relaxed pt-1">
                Handmade Guitar Pedal
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {priceLabel && (
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#FF5E1E] font-mono-tech tracking-tight">₹{priceLabel}</span>
                  {compareAtLabel && (
                    <span className="text-lg text-[#94A3B8] line-through font-mono-tech font-medium">₹{compareAtLabel}</span>
                  )}
                  {savingsLabel && (
                    <span className="text-xs font-bold text-white bg-[#FF5E1E] px-3 py-1 rounded-full font-mono-tech shadow-md shadow-[#FF5E1E]/30">
                      Save ₹{savingsLabel} Direct
                    </span>
                  )}
                </div>
              )}
              {priceLabel && (
                <div className="text-xs text-[#475569] flex items-center gap-2 font-mono-tech font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#FF5E1E]" />
                  <span>Ships in 24h</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2 pointer-events-auto">
              <button
                onClick={handleQuickAdd}
                className="px-8 py-4 bg-gradient-to-r from-[#FF7A00] to-[#FF4500] hover:from-[#FF8A00] hover:to-[#FF5500] text-white text-sm font-mono-tech font-bold tracking-[0.2em] uppercase rounded-full flex items-center gap-2.5 transition-all shadow-xl shadow-[#FF5E1E]/30 glow-neon-orange group cursor-pointer"
              >
                <span>Buy Now</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════ MOBILE EDITORIAL LAYOUT ═══════════════ */}
      <div className="lg:hidden absolute inset-0 z-20 flex flex-col justify-between pt-24 pb-6 px-5 pointer-events-none select-none">
        {/* TOP: Headline below the navbar */}
        <div className="shrink-0 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF5E1E]/10 border border-[#FF5E1E]/20 mb-1">
            <span className="text-[10px] font-mono-tech font-bold tracking-[0.2em] uppercase text-[#FF5E1E]">
              Distortion Pedal Electric Guitar
            </span>
          </div>

          <h1
            className="font-editorial tracking-tight uppercase leading-[0.9] text-[#0B0E14]"
            style={{
              fontSize: 'clamp(2.1rem, 8.5vw, 2.6rem)',
            }}
          >
            Idiot Pedals.<br />
            <span
              className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FF5E1E] to-[#FF3E00]"
            >
              Distortion One.
            </span>
          </h1>

          <p
            className="text-[12px] font-sans font-normal leading-snug text-[#475569] pt-0.5"
            style={{ maxWidth: '280px' }}
          >
            Handmade Guitar Pedal
          </p>
        </div>

        {/* MIDDLE: spacing */}
        <div className="flex-1 min-h-0" />

        {/* BOTTOM: Pricing & CTA Controls */}
        <div className="shrink-0 pointer-events-auto space-y-2.5">
          {/* Price strip — original layout, fed by the catalogue */}
          {priceLabel && (
            <div className="relative flex items-center justify-between py-1">
              {/* Soft studio white feather like web behind the price area */}
              <div className="absolute -left-5 -right-5 -top-2.5 -bottom-2.5 bg-gradient-to-r from-[#FAF9F6]/65 via-[#FAF9F6]/55 to-transparent pointer-events-none -z-10 blur-[3px]" />

              <div className="flex items-baseline gap-2 relative z-10">
                <span
                  className="font-extrabold font-mono-tech tracking-tight text-[#FF5E1E] leading-none"
                  style={{ fontSize: 'clamp(2rem, 9vw, 2.5rem)' }}
                >
                  ₹{priceLabel}
                </span>
                {compareAtLabel && (
                  <span
                    className="text-sm font-mono-tech font-medium line-through text-[#94A3B8]"
                  >
                    ₹{compareAtLabel}
                  </span>
                )}
              </div>
              {savingsLabel && (
                <span className="text-[11px] font-mono-tech font-bold text-white bg-[#FF5E1E] px-3 py-1 rounded-full shadow-md shadow-[#FF5E1E]/30 relative z-10">
                  Save ₹{savingsLabel} Direct
                </span>
              )}
            </div>
          )}

          {/* Same restored element, for the mobile price row above. */}
          {priceLabel && (
            <div className="text-xs text-[#475569] flex items-center gap-2 font-mono-tech font-medium">
              <span className="w-2 h-2 rounded-full bg-[#FF5E1E]" />
              <span>Ships in 24h</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={handleQuickAdd}
              className="py-[14px] bg-gradient-to-r from-[#FF7A00] to-[#FF4500] hover:from-[#FF8A00] hover:to-[#FF5500] text-white text-[13px] font-mono-tech font-bold tracking-[0.15em] uppercase rounded-full shadow-xl shadow-[#FF5E1E]/30 flex items-center justify-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
            >
              <span>Buy Now</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>

      {/* ── Hero-scoped WhatsApp CTA (scrolls with hero so it never overlaps lower sections) ── */}
      <a
        href={`https://wa.me/917908585003?text=${encodeURIComponent('Hey, I have a query about IDIOT Pedals.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with IDIOT Pedals on WhatsApp"
        className="absolute bottom-24 right-4 sm:bottom-6 sm:right-6 z-30 group flex items-center gap-2 sm:gap-2.5"
      >
        <div className="bg-white border border-[#F0D3B8] text-[#2A1A12] px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full shadow-lg shadow-[#FF5E1E]/15 flex items-center animate-bounce [animation-duration:3s]">
          <span className="text-[10px] sm:text-xs font-mono-tech font-bold tracking-wide whitespace-nowrap">
            Got a query? Chat with us
          </span>
        </div>

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
    </section>
  );
}
