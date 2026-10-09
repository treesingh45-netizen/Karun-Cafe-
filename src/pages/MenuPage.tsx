import React, { useState } from 'react';
import { Search, Sparkles, ShoppingBag, Coffee, Info, Check, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DrinkCard } from '../components/DrinkCard';
import { SunflowerIcon } from '../components/KarunLogo';

interface MenuPageProps {
  onOpenSommelier?: () => void;
  onOpenCafeManager?: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onOpenSommelier, onOpenCafeManager }) => {
  const {
    menuItems,
    cartCount,
    setIsCartOpen,
    activeCategoryFilter,
    setActiveCategoryFilter,
    cafeConfig,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Coffee', 'Matcha', 'Chai', 'Seasonal'];

  const filteredItems = menuItems.filter((item) => {
    // Category match
    const categoryMatch =
      activeCategoryFilter === 'All'
        ? true
        : activeCategoryFilter === 'Seasonal'
        ? item.isSeasonal
        : item.category === activeCategoryFilter;

    // Search query match
    const searchMatch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return categoryMatch && searchMatch;
  });

  return (
    <div className="pb-24 space-y-12">
      {/* Menu Header */}
      <section className="bg-[#FFF5E4] border-b border-[#287F7B]/15 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#287F7B]">
            <SunflowerIcon className="w-4 h-4" />
            <span>Digital Order Menu · Civic Center Park Denver</span>
          </div>

          <div>
            <span className="font-signature text-3xl sm:text-4xl text-[#287F7B] block -mb-1">
              handcrafted sips & botanicals
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#155D59]">
              The Karun Cafe Menu
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[#2D3748]/85 max-w-2xl mx-auto leading-relaxed">
            Browse our signature specialty coffee, stone-ground ceremonial matcha, and whole-spiced chai. Select your options and add them directly to your order request.
          </p>

          {/* Quick Notice Banner on Order Requests & Email Dispatch */}
          <div className="inline-flex items-center gap-2 p-3 bg-[#FFFCF6] border border-[#287F7B]/20 rounded-xl text-xs text-[#8B5E3C] max-w-xl text-left shadow-2xs">
            <Info className="w-4 h-4 text-[#287F7B] shrink-0" />
            <span>
              <strong>Online Order Requests:</strong> Orders submitted here are delivered instantly to <strong>{cafeConfig.orderEmail}</strong>. Our baristas verify ingredient stock and prepare your order for pickup at Civic Center Park.
            </span>
          </div>
        </div>
      </section>

      {/* Controls & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#287F7B]/10">
          {/* Category Tabs (Segmented control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#287F7B] text-[#FFF5E4] shadow-xs'
                      : 'bg-[#FFF5E4] text-[#155D59] hover:bg-[#287F7B]/10'
                  }`}
                >
                  {cat === 'Seasonal' ? 'Autumn Specials' : cat}
                </button>
              );
            })}
          </div>

          {/* Search Input & Cart Trigger */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-[#155D59]/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee, matcha, chai..."
                className="w-full pl-9 pr-3 py-2 bg-[#FFF5E4] border border-[#287F7B]/20 rounded-lg text-xs text-[#155D59] placeholder-[#155D59]/40 focus:outline-none focus:ring-1 focus:ring-[#287F7B]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>

            {/* Quick Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#155D59] text-[#FFF5E4] hover:bg-[#287F7B] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#F4B54F]" />
              <span>Bag ({cartCount})</span>
            </button>
          </div>
        </div>

        {/* AI Flavor Matcher Hero Card */}
        {onOpenSommelier && (
          <div className="mt-6 p-4 sm:p-5 bg-gradient-to-r from-[#FFF5E4] to-[#FFFCF6] rounded-2xl border border-[#F4B54F]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#287F7B]/10 text-[#287F7B] shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5 text-[#287F7B]" />
              </div>
              <div>
                <h4 className="font-serif-display text-lg font-bold text-[#155D59]">
                  Not sure what to sip today?
                </h4>
                <p className="text-xs text-[#2D3748]/80 mt-0.5">
                  Consult our Virtual Flavor Sommelier powered by Gemini 3.1 Pro (High Thinking Mode) for custom palate and dietary pairings.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenSommelier}
              className="px-5 py-2.5 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Open Flavor Matcher
            </button>
          </div>
        )}
      </section>

      {/* Drink Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 p-8 bg-[#FFF5E4] rounded-2xl border border-[#287F7B]/15 space-y-3">
            <Coffee className="w-10 h-10 text-[#287F7B] mx-auto opacity-70" />
            <h3 className="font-serif-display text-xl font-bold text-[#155D59]">
              No drinks match "{searchQuery}"
            </h3>
            <p className="text-xs text-[#2D3748]/70">
              Try searching for "latte", "matcha", "chai", "peach", or reset the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategoryFilter('All');
              }}
              className="px-4 py-2 bg-[#287F7B] text-[#FFF5E4] text-xs font-semibold rounded-lg hover:bg-[#155D59] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <DrinkCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* How Integrated Ordering Works on Karun Cafe */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#155D59] text-[#FFF5E4] rounded-3xl p-8 sm:p-12 border border-[#F4B54F]/20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#F4B54F]">
              Seamless Workflow
            </span>
            <h3 className="font-serif-display text-3xl font-bold">
              How Ordering at Karun Cafe Works
            </h3>
            <p className="text-xs sm:text-sm text-[#FFF5E4]/80">
              No redirects, no third-party apps, no separate accounts. Everything takes place smoothly on this Menu page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-xs">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#F4B54F] text-[#155D59] font-bold text-sm inline-flex items-center justify-center">
                1
              </span>
              <h5 className="font-serif-display text-base font-semibold text-[#FFF5E4]">
                Choose & Customize
              </h5>
              <p className="text-[#FFF5E4]/70">
                Select Hot or Iced and choose your milk pairing (Oat, Whole, Almond).
              </p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#F4B54F] text-[#155D59] font-bold text-sm inline-flex items-center justify-center">
                2
              </span>
              <h5 className="font-serif-display text-base font-semibold text-[#FFF5E4]">
                Review Your Bag
              </h5>
              <p className="text-[#FFF5E4]/70">
                Click "Add to Order" to inspect quantities and subtotal directly in the side drawer.
              </p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#F4B54F] text-[#155D59] font-bold text-sm inline-flex items-center justify-center">
                3
              </span>
              <h5 className="font-serif-display text-base font-semibold text-[#FFF5E4]">
                Submit Request
              </h5>
              <p className="text-[#FFF5E4]/70">
                Enter your name, phone, and email. Complete checkout right here without leaving.
              </p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#F4B54F] text-[#155D59] font-bold text-sm inline-flex items-center justify-center">
                4
              </span>
              <h5 className="font-serif-display text-base font-semibold text-[#FFF5E4]">
                Email Dispatch
              </h5>
              <p className="text-[#FFF5E4]/70">
                Your order is delivered directly to karuncafe@gmail.com for prompt preparation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
