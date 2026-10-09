import React from 'react';
import { Instagram, Mail, MapPin, Clock, ExternalLink, Settings } from 'lucide-react';
import { KarunLogo } from './KarunLogo';
import { useCart } from '../context/CartContext';

interface FooterProps {
  onOpenCafeManager?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCafeManager }) => {
  const { setActivePage, cafeConfig } = useCart();

  const handleNav = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#155D59] text-[#FFF5E4] pt-16 pb-12 border-t border-[#F4B54F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Column 1: Brand & Ethos */}
          <div className="space-y-4">
            <KarunLogo variant="light" />
            <p className="text-sm text-[#FFF5E4]/80 leading-relaxed max-w-sm pt-2">
              Boutique specialty coffee, stone-ground ceremonial matcha, and slow-simmered spiced chai.
              Serving daily rituals from our open-air bar at Civic Center Park in Denver, Colorado.
            </p>
            <div className="pt-2">
              <a
                href={cafeConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#F4B54F] hover:text-[#FFF5E4] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow {cafeConfig.instagramHandle}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-lg font-semibold tracking-wide text-[#F4B54F]">
              Pages & Ordering
            </h4>
            <ul className="space-y-2 text-sm text-[#FFF5E4]/80">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#F4B54F] transition-colors cursor-pointer"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-[#F4B54F] transition-colors cursor-pointer font-medium text-[#FFF5E4]"
                >
                  Menu & Online Ordering
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('story')}
                  className="hover:text-[#F4B54F] transition-colors cursor-pointer"
                >
                  Our Story & Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('seasonal')}
                  className="hover:text-[#F4B54F] transition-colors cursor-pointer"
                >
                  Seasonal Specials
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('visit')}
                  className="hover:text-[#F4B54F] transition-colors cursor-pointer"
                >
                  Visit Us / Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-[#F4B54F] transition-colors cursor-pointer"
                >
                  Visual Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-[#F4B54F] transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Schedule */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-lg font-semibold tracking-wide text-[#F4B54F]">
              Park Hours
            </h4>
            <div className="space-y-2 text-sm text-[#FFF5E4]/80">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F4B54F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#FFF5E4]">Weekday Service</p>
                  <p className="text-xs text-[#FFF5E4]/70">{cafeConfig.hours.weekdays}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#F4B54F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#FFF5E4]">Weekend Gatherings</p>
                  <p className="text-xs text-[#FFF5E4]/70">{cafeConfig.hours.weekends}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Location & Inquiries */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-lg font-semibold tracking-wide text-[#F4B54F]">
              Civic Center Park
            </h4>
            <div className="space-y-3 text-sm text-[#FFF5E4]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F4B54F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#FFF5E4]">Denver Location</p>
                  <p className="text-xs text-[#FFF5E4]/70">{cafeConfig.fullAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#F4B54F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#FFF5E4]">Order Desk Notifications</p>
                  <a
                    href={`mailto:${cafeConfig.orderEmail}`}
                    className="text-xs text-[#F4B54F] hover:underline"
                  >
                    {cafeConfig.orderEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#FFF5E4]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF5E4]/60">
          <p>© {new Date().getFullYear()} Karun Cafe. All rights reserved. Civic Center Park, Denver, Colorado.</p>
          <div className="flex items-center gap-6">
            <span>Orders dispatched directly to {cafeConfig.orderEmail}</span>
            {onOpenCafeManager && (
              <button
                onClick={onOpenCafeManager}
                className="inline-flex items-center gap-1.5 text-xs text-[#F4B54F] hover:text-[#FFF5E4] cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Cafe Manager & Order Desk</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
