import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, Mail, Instagram } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { faqData } from '../data/menuData';
import { SunflowerIcon } from '../components/KarunLogo';

export const FaqPage: React.FC = () => {
  const { cafeConfig, setActivePage } = useCart();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO */}
      <section className="bg-[#FFF5E4] border-b border-[#287F7B]/15 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#287F7B]">
            <SunflowerIcon className="w-4 h-4" />
            <span>Questions & Ordering Details</span>
          </div>

          <div>
            <span className="font-signature text-3xl sm:text-4xl text-[#287F7B] block -mb-1">
              everything you need to know
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#155D59]">
              Frequently Asked Questions
            </h1>
          </div>

          <p className="text-base sm:text-lg text-[#2D3748]/85 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our Civic Center Park location, menu ingredients, and online order request process.
          </p>
        </div>
      </section>

      {/* 2. ACCORDION LIST */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3.5">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FFFCF6] rounded-xl border border-[#287F7B]/15 overflow-hidden transition-all duration-200 hover:border-[#287F7B]/30"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-display text-lg sm:text-xl font-bold text-[#155D59] leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#FFF5E4] flex items-center justify-center text-[#287F7B] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#287F7B] text-[#FFF5E4]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#2D3748]/85 leading-relaxed border-t border-[#287F7B]/10 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. STILL HAVE QUESTIONS BANNER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-[#FFF5E4] rounded-3xl border border-[#287F7B]/20 text-center space-y-4">
          <HelpCircle className="w-10 h-10 text-[#287F7B] mx-auto" />
          <h3 className="font-serif-display text-2xl font-bold text-[#155D59]">
            Have an Additional Question?
          </h3>
          <p className="text-sm text-[#2D3748]/80 max-w-lg mx-auto">
            Our baristas and management team are always glad to help. Send an email to <strong>{cafeConfig.orderEmail}</strong> or send us a direct message on Instagram.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${cafeConfig.orderEmail}`}
              className="px-6 py-2.5 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email {cafeConfig.orderEmail}</span>
            </a>
            <a
              href={cafeConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#155D59] hover:bg-[#287F7B] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <Instagram className="w-3.5 h-3.5 text-[#F4B54F]" />
              <span>DM {cafeConfig.instagramHandle}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
