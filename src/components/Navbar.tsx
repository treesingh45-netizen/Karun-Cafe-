import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Sparkles } from 'lucide-react';
import { KarunLogo } from './KarunLogo';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenSommelier?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSommelier }) => {
  const { cartCount, setIsCartOpen, activePage, setActivePage } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'story', label: 'Our Story' },
    { id: 'seasonal', label: 'Seasonal Specials' },
    { id: 'visit', label: 'Visit Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isTransparentHero = activePage === 'home' && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparentHero
          ? 'bg-gradient-to-b from-black/60 via-black/25 to-transparent border-b border-white/10'
          : 'bg-[#FFFCF6]/95 backdrop-blur-md border-b border-[#287F7B]/10 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Karun Cafe Logo on the left */}
          <div onClick={() => handleNavClick('home')} className="shrink-0">
            <KarunLogo variant={isTransparentHero ? 'light' : 'dark'} />
          </div>

          {/* Zone 2 & 3: Navigation Links aligned to the right on desktop */}
          <div className="flex items-center gap-7">
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isTransparentHero
                        ? isActive
                          ? 'text-[#F4B54F] font-semibold'
                          : 'text-[#FFFCF6]/90 hover:text-[#F4B54F]'
                        : isActive
                        ? 'text-[#155D59] font-semibold'
                        : 'text-[#155D59]/75 hover:text-[#155D59]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                          isTransparentHero ? 'bg-[#F4B54F]' : 'bg-[#287F7B]'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Actions: Flavor Matcher + Cart Button */}
            <div className="flex items-center gap-3 shrink-0">
              {onOpenSommelier && (
                <button
                  onClick={onOpenSommelier}
                  title="Palate & Dietary Sommelier"
                  className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isTransparentHero
                      ? 'text-[#FFFCF6] bg-white/10 border-white/20 hover:bg-white/20'
                      : 'text-[#287F7B] bg-[#FFF5E4] hover:bg-[#F4B54F]/20 border-[#287F7B]/20'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F4B54F]" />
                  <span>Flavor Matcher</span>
                </button>
              )}

              <button
                onClick={() => setIsCartOpen(true)}
                aria-label={`View order bag with ${cartCount} items`}
                className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 ${
                  isTransparentHero
                    ? 'bg-[#F4B54F] hover:bg-[#F4B54F]/90 text-[#155D59]'
                    : 'bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4]'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-[#155D59]" />
                <span className="hidden sm:inline">Order Bag</span>
                <span
                  className={`text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center tabular-nums ${
                    isTransparentHero
                      ? 'bg-[#155D59] text-[#FFF5E4]'
                      : 'bg-[#FFF5E4] text-[#155D59]'
                  }`}
                >
                  {cartCount}
                </span>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className={`lg:hidden p-2 focus:outline-none cursor-pointer transition-colors ${
                  isTransparentHero ? 'text-[#FFFCF6] hover:text-[#F4B54F]' : 'text-[#155D59] hover:text-[#287F7B]'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#287F7B]/15 bg-[#FFFCF6] text-[#155D59] px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#287F7B] text-[#FFF5E4]'
                      : 'text-[#155D59] hover:bg-[#287F7B]/10'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {onOpenSommelier && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSommelier();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-[#155D59] bg-[#FFF5E4] border border-[#287F7B]/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F4B54F]" />
              <span>Flavor Sommelier & Matcher</span>
            </button>
          )}

          <div className="pt-2 border-t border-[#287F7B]/15 text-xs text-[#8B5E3C] text-center">
            Civic Center Park, Denver, CO · Open Tuesday – Sunday
          </div>
        </div>
      )}
    </header>
  );
};
