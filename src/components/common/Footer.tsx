import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, Wrench } from 'lucide-react';
import { IdiotPedalsLogo } from './IdiotPedalsLogo';
import { useNeonFuzzBox } from '../../hooks/useNeonFuzzBox';

export const Footer: React.FC = () => {
  // Price comes from the catalogue; nothing is shown if it cannot be loaded.
  const { priceLabel } = useNeonFuzzBox();

  return (
    <footer className="bg-white border-t border-[#F0D3B8] pt-20 pb-14 text-[#8A6A54] relative overflow-hidden">
      {/* Ambient background bloom */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#FF5E1E]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8 rounded-3xl bg-[#FFF8F1] border border-[#F0D3B8] shadow-[0_8px_40px_-16px_rgba(255,94,30,0.25)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF1E8] border border-[#FF5E1E]/30 flex items-center justify-center text-[#FF5E1E] shrink-0">
              <Wrench size={20} />
            </div>
            <div>
              <div className="text-xs font-mono-tech font-bold text-[#2A1A12] uppercase tracking-wider">
                Direct From Workbench
              </div>
              <div className="text-xs text-[#8A6A54] pt-0.5">No distributor markup or inflated retail pricing.</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF1E8] border border-[#FF5E1E]/30 flex items-center justify-center text-[#FF5E1E] shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-xs font-mono-tech font-bold text-[#2A1A12] uppercase tracking-wider">
                6-Month Warranty
              </div>
              <div className="text-xs text-[#8A6A54] pt-0.5">Comprehensive repair &amp; technical player support.</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-4">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <IdiotPedalsLogo variant="light" size="md" />
            <div className="text-xs font-mono-tech tracking-[0.25em] text-[#FF5E1E] font-bold uppercase">
              CHEAPER. CLASSIC SOUND.
            </div>
            <p className="text-xs sm:text-sm text-[#8A6A54] max-w-sm leading-relaxed font-light">
              Enjoy the too much of everything.
            </p>
            <div className="text-xs font-mono-tech text-[#8A6A54] space-y-2 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-[#FF5E1E] shrink-0" />
                <span>Bardhaman (Burdwan), West Bengal, 713104, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#FF5E1E] shrink-0" />
                <a href="mailto:idiotpedals@gmail.com" className="hover:text-[#FF5E1E] transition-colors">
                  idiotpedals@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#FF5E1E] shrink-0" />
                <a href="tel:+917908585003" className="hover:text-[#FF5E1E] transition-colors">
                  +91 79085 85003 (Mon – Sat, 10 AM – 7 PM IST)
                </a>
              </div>
            </div>
          </div>

          {/* Legal & Policies */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono-tech font-bold uppercase tracking-[0.2em] text-[#2A1A12]">
              Legal &amp; Policies
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tech">
              <li>
                <Link to="/shipping" className="hover:text-[#FF5E1E] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-[#FF5E1E] transition-colors">
                  Return &amp; Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Orders & Account */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono-tech font-bold uppercase tracking-[0.2em] text-[#2A1A12]">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tech">
              <li>
                <Link to="/contact" className="hover:text-[#FF5E1E] transition-colors">
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-[#FF5E1E] transition-colors">
                  Track Existing Order
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-[#FF5E1E] transition-colors">
                  Player Account
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-[#FF5E1E] transition-colors">
                  Direct Checkout
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F0D3B8] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-tech text-[#8A6A54] gap-4">
          <div>
            © {new Date().getFullYear()} IDIOT Pedals. All rights reserved. Handcrafted in Burdwan.
          </div>
          <div className="flex items-center gap-6">
            <span>Play Different.</span>
            <span>Zero Pretension.</span>
            {priceLabel && <span className="text-[#FF5E1E] font-bold">₹{priceLabel} Flat</span>}
          </div>
        </div>
      </div>
    </footer>
  );
};
