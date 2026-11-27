import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, FileText } from 'lucide-react';
import SEO from '../SEO';

export interface PolicySection {
  title: string;
  body: React.ReactNode;
}

interface PolicyLayoutProps {
  seoTitle: string;
  seoDescription: string;
  canonicalPath: '/shipping' | '/refund' | '/privacy' | '/terms';
  badge: string;
  heading: string;
  intro: string;
  sections: PolicySection[];
  locationText?: string;
}

const POLICY_NAV: { label: string; to: '/shipping' | '/refund' | '/privacy' | '/terms' }[] = [
  { label: 'Shipping Policy', to: '/shipping' },
  { label: 'Return & Refund Policy', to: '/refund' },
];

export const PolicyLayout: React.FC<PolicyLayoutProps> = ({
  seoTitle,
  seoDescription,
  canonicalPath,
  badge,
  heading,
  intro,
  sections,
  locationText = 'Bardhaman (Burdwan), West Bengal, 713104, India',
}) => {
  return (
    <div className="bg-[#FFF8F1] text-[#2A1A12] pt-28 pb-20 overflow-hidden relative min-h-screen">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={canonicalPath}
        noindex={false}
      />

      {/* Ambient glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[680px] h-[420px] bg-[#FF5E1E]/10 blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Header */}
        <header className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#FF5E1E]/30 rounded-full text-xs font-mono-tech uppercase tracking-[0.25em] text-[#FF5E1E] shadow-sm">
            <FileText size={13} />
            <span>{badge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-normal tracking-tight uppercase text-[#2A1A12]">
            {heading}
          </h1>
          <p className="text-sm sm:text-base text-[#8A6A54] font-light max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
          <div className="text-[11px] font-mono-tech uppercase tracking-widest text-[#8A6A54]">
            Effective Date: November 2026 • IDIOT Pedals (idiotpedals.shop)
          </div>
        </header>

        {/* Policy quick navigation */}
        <nav
          aria-label="Legal and policy pages"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {POLICY_NAV.map((item) => {
            const active = item.to === canonicalPath;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-4 py-2 rounded-full text-[11px] font-mono-tech uppercase tracking-wider border transition-colors ${
                  active
                    ? 'bg-[#FF5E1E] text-white border-[#FF5E1E] font-bold shadow-md shadow-[#FF5E1E]/25'
                    : 'bg-white text-[#8A6A54] border-[#F0D3B8] hover:border-[#FF5E1E] hover:text-[#2A1A12]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Policy content card */}
        <article className="bg-white border border-[#F0D3B8] rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_8px_40px_-16px_rgba(255,94,30,0.2)] space-y-8">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className={index > 0 ? 'pt-7 border-t border-[#F0D3B8]/80 space-y-3' : 'space-y-3'}
            >
              <h2 className="text-xl sm:text-2xl font-editorial font-bold text-[#2A1A12]">
                {section.title}
              </h2>
              <div className="text-sm text-[#5A4234] leading-relaxed font-sans space-y-3">
                {section.body}
              </div>
            </section>
          ))}
        </article>

        {/* Direct support card */}
        <aside className="bg-white border border-[#F0D3B8] rounded-3xl p-6 sm:p-8 shadow-lg space-y-5">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-editorial font-bold text-[#2A1A12]">
              Need Help With an Order or Policy Question?
            </h2>
            <p className="text-xs text-[#8A6A54] font-mono-tech">
              Speak directly with the IDIOT Pedals workbench team — Mon–Sat, 10 AM – 7 PM IST.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-tech">
            <a
              href="tel:+917908585003"
              className="p-4 rounded-2xl bg-[#FFF8F1] border border-[#F0D3B8] hover:border-[#FF5E1E] transition-colors flex items-start gap-3"
            >
              <Phone size={15} className="text-[#FF5E1E] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#2A1A12] uppercase">Phone / WhatsApp</div>
                <div className="text-[#8A6A54] pt-0.5">+91 79085 85003</div>
              </div>
            </a>

            <a
              href="mailto:idiotpedals@gmail.com"
              className="p-4 rounded-2xl bg-[#FFF8F1] border border-[#F0D3B8] hover:border-[#FF5E1E] transition-colors flex items-start gap-3"
            >
              <Mail size={15} className="text-[#FF5E1E] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#2A1A12] uppercase">Email Support</div>
                <div className="text-[#8A6A54] pt-0.5 break-all">idiotpedals@gmail.com</div>
              </div>
            </a>

            <Link
              to="/contact"
              className="p-4 rounded-2xl bg-[#FFF8F1] border border-[#F0D3B8] hover:border-[#FF5E1E] transition-colors flex items-start gap-3"
            >
              <MessageSquare size={15} className="text-[#FF5E1E] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#2A1A12] uppercase">Contact Form</div>
                <div className="text-[#8A6A54] pt-0.5">idiotpedals.shop/contact</div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono-tech text-[#8A6A54] pt-1">
            <MapPin size={13} className="text-[#FF5E1E] shrink-0" />
            <span>IDIOT Pedals — {locationText}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};
