import React, { useState } from 'react';
import { ArrowRight, Sparkles, Calendar, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SunflowerIcon } from '../components/KarunLogo';

export const SeasonalPage: React.FC = () => {
  const { menuItems, addItem, setIsCartOpen, setActivePage, setActiveCategoryFilter } = useCart();
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Campaign state (editable by staff)
  const [campaignTitle, setCampaignTitle] = useState('Autumn in the Park: Harvest & Warm Spices');
  const [campaignSeason, setCampaignSeason] = useState('Fall 2026 Collection');
  const [campaignNote, setCampaignNote] = useState(
    'Real roasted pumpkin puree, Vermont maple reduction, spiced honeycrisp apple cider, and wild mountain blueberries.'
  );

  // Filter specific seasonal items
  const pumpkinCollection = menuItems.filter((i) => i.name.toLowerCase().includes('pumpkin'));

  const featuredFlavorNames = [
    'Caramel Apple Latte',
    'Maple Cinnamon Latte',
    'Blueberry Tart Matcha',
    'Peach Matcha',
    'Banana Cream Matcha',
  ];
  const featuredFlavors = menuItems.filter((i) => featuredFlavorNames.includes(i.name));

  const handleQuickAdd = (item: any) => {
    addItem(item, {
      temperature: item.category === 'Matcha' ? 'Iced' : 'Hot',
      quantity: 1,
    });
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1800);
  };

  const handleGoToMenu = () => {
    setActiveCategoryFilter('Seasonal');
    setActivePage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO */}
      <section className="bg-[#FFF5E4] border-b border-[#287F7B]/15 pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8B5E3C] bg-white px-3 py-1.5 rounded-md border border-[#8B5E3C]/20">
                <Sparkles className="w-4 h-4 text-[#F4B54F]" />
                <span>{campaignSeason}</span>
              </div>

              <div>
                <span className="font-signature text-3xl sm:text-4xl text-[#287F7B] block -mb-1">
                  limited harvest release
                </span>
                <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#155D59] leading-[1.1]">
                  A New Season. A New Favorite.
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#2D3748]/85 leading-relaxed max-w-xl">
                As golden foliage envelops Civic Center Park, Karun Cafe unveils our curated seasonal palette. Spiced aromatics, velvety foam, and orchard warmth designed for crisp Denver mornings.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={handleGoToMenu}
                  className="px-7 py-3.5 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Order Seasonal Drinks on Menu</span>
                  <ArrowRight className="w-4 h-4 text-[#F4B54F]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#287F7B]/20 aspect-[4/3] bg-white">
                <img
                  src="/images/cafe/autumn_collection_real.jpg"
                  alt="Authentic Autumn Pumpkin Spice seasonal collection at Karun Cafe"
                  width={600}
                  height={450}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/drinks/pumpkin_spice_latte.jpg';
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PUMPKIN SPICE COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-signature text-3xl sm:text-4xl text-[#287F7B] block -mb-1">
            autumn centerpiece
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#155D59]">
            The Pumpkin Spice Trio
          </h2>
          <p className="text-sm text-[#2D3748]/80 leading-relaxed">
            Real roasted pumpkin puree simmered with autumn spices. Experience this seasonal favorite three ways: paired with rich espresso, ceremonial Uji matcha, or slow-simmered black chai tea.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pumpkinCollection.map((drink) => (
            <div
              key={drink.id}
              className="bg-[#FFFCF6] rounded-2xl overflow-hidden border border-[#287F7B]/15 hover:border-[#287F7B] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-[#FFF5E4] overflow-hidden">
                  <img
                    src={drink.image}
                    alt={`${drink.name} — Karun Cafe Autumn Special`}
                    width={600}
                    height={450}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/drinks/pumpkin_spice_latte.jpg';
                    }}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#FFFCF6]/90 px-2.5 py-1 rounded text-[11px] font-semibold text-[#8B5E3C] uppercase tracking-wider">
                    {drink.category} Special
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif-display text-xl font-bold text-[#155D59]">
                      {drink.name}
                    </h3>
                    <span className="text-base font-semibold text-[#8B5E3C] tabular-nums">
                      ${drink.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-[#2D3748]/80 leading-relaxed">
                    {drink.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handleQuickAdd(drink)}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    justAddedId === drink.id
                      ? 'bg-[#155D59] text-[#FFF5E4]'
                      : 'bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4]'
                  }`}
                >
                  {justAddedId === drink.id ? (
                    <>
                      <Check className="w-4 h-4 text-[#F4B54F]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-[#F4B54F]" />
                      <span>Add to Order Request</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED FLAVOR GALLERY */}
      <section className="bg-[#FFF5E4] py-16 border-y border-[#287F7B]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-signature text-3xl sm:text-4xl text-[#287F7B] block -mb-1">
              extended flavor showcase
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#155D59]">
              Featured Flavor Gallery
            </h2>
            <p className="text-sm text-[#2D3748]/80">
              Autumn warmth meets refreshing botanical fruit notes in our signature handcrafted favorites.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFlavors.map((drink) => (
              <div
                key={drink.id}
                className="bg-[#FFFCF6] rounded-xl overflow-hidden border border-[#287F7B]/15 p-4 flex gap-4 items-center hover:border-[#287F7B] transition-all"
              >
                <img
                  src={drink.image}
                  alt={`${drink.name} — Karun Cafe Specialty Beverage`}
                  width={80}
                  height={80}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/drinks/dulce_de_leche_latte.jpg';
                  }}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-lg object-cover bg-[#FFF5E4] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#287F7B] uppercase tracking-wider block">
                    {drink.category}
                  </span>
                  <h4 className="font-serif-display text-base font-bold text-[#155D59] truncate">
                    {drink.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#8B5E3C] tabular-nums mt-0.5">
                    ${drink.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleQuickAdd(drink)}
                    className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#287F7B] hover:text-[#155D59] cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>+ Quick Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={handleGoToMenu}
              className="px-7 py-3 bg-[#155D59] hover:bg-[#287F7B] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>View All Drinks with Cart on Menu Page</span>
              <ArrowRight className="w-4 h-4 text-[#F4B54F]" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. CAMPAIGN NOTES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-[#FFFCF6] border border-[#287F7B]/20 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs text-[#8B5E3C]">
              <Calendar className="w-4 h-4" />
              <span>Seasonal Availability Note</span>
            </div>
            <h4 className="font-serif-display text-2xl font-bold text-[#155D59]">
              {campaignTitle}
            </h4>
            <p className="text-xs text-[#2D3748]/80 max-w-xl">
              {campaignNote}
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('menu');
              setIsCartOpen(true);
            }}
            className="px-6 py-3 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Open Order Bag
          </button>
        </div>
      </section>
    </div>
  );
};
