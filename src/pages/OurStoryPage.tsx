import React from 'react';
import { ArrowRight, Coffee, Sparkles, Sun, Palette } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SunflowerIcon, KarunLogo } from '../components/KarunLogo';

export const OurStoryPage: React.FC = () => {
  const { setActivePage, setActiveCategoryFilter } = useCart();

  const handleGoToMenu = (category?: string) => {
    if (category) {
      setActiveCategoryFilter(category);
    }
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
              <div>
                <span className="font-signature text-3xl sm:text-4xl text-[#287F7B] block -mb-1">
                  our heritage & vision
                </span>
                <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#155D59] leading-[1.1]">
                  A Thoughtful Take on Your Daily Ritual.
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#2D3748]/85 leading-relaxed max-w-xl">
                Coffee shouldn’t be a rushed commodity. At Karun Cafe, we view every beverage as a sensorial ceremony—a bright moment of pause nestled in Denver’s Civic Center Park.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => handleGoToMenu()}
                  className="px-7 py-3.5 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Explore the Menu</span>
                  <ArrowRight className="w-4 h-4 text-[#F4B54F]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#287F7B]/20 aspect-[4/3] bg-white">
                <img
                  src="/images/cafe/karun_barista_craft.jpg"
                  alt="Barista crafting specialty coffee at Karun Cafe"
                  width={600}
                  height={450}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/cafe/karun_trailer_service.jpg';
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND IDENTITY & SUNFLOWER EMBLEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="p-8 bg-[#FFF5E4] rounded-3xl border border-[#287F7B]/20 text-center space-y-4 max-w-sm w-full shadow-md">
              <div className="w-28 h-28 mx-auto flex items-center justify-center bg-white rounded-full shadow-md p-1 border-2 border-[#F4B54F]">
                <img
                  src="/karun-logo.jpg"
                  alt="Official Karun Cafe Emblem"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-serif-display text-2xl font-bold text-[#155D59]">
                  The Karun Emblem
                </h3>
                <p className="text-xs text-[#8B5E3C] mt-1 font-medium">
                  Optimism · Radiant Warmth · Natural Vitality
                </p>
              </div>
              <div className="pt-2 border-t border-[#287F7B]/10 grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2 bg-white rounded border border-[#287F7B]/10">
                  <div className="w-4 h-4 rounded-full bg-[#287F7B] mx-auto mb-1" />
                  <span className="font-semibold text-[#155D59]">Teal</span>
                </div>
                <div className="p-2 bg-white rounded border border-[#287F7B]/10">
                  <div className="w-4 h-4 rounded-full bg-[#F4B54F] mx-auto mb-1" />
                  <span className="font-semibold text-[#155D59]">Gold</span>
                </div>
                <div className="p-2 bg-white rounded border border-[#287F7B]/10">
                  <div className="w-4 h-4 rounded-full bg-[#FFF5E4] border border-gray-300 mx-auto mb-1" />
                  <span className="font-semibold text-[#155D59]">Cream</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 text-left">
            <div>
              <span className="font-signature text-3xl sm:text-4xl text-[#287F7B] block -mb-1">
                brand symbolism & light
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#155D59]">
                The Meaning Behind Our Mark & Colors
              </h2>
            </div>
            <p className="text-sm text-[#2D3748]/85 leading-relaxed">
              The Karun Cafe sunflower is more than an illustration—it represents our commitment to tracking the light. Sunflowers turn their faces toward the sun throughout the day, just as our café seeks to bring genuine warmth and good spirits to everyone strolling through Civic Center Park.
            </p>
            <p className="text-sm text-[#2D3748]/85 leading-relaxed">
              Our primary palette pairs <strong>Deep & Primary Teal (#287F7B & #155D59)</strong>, symbolizing calm presence and natural botanicals, with <strong>Golden Yellow (#F4B54F)</strong>, evoking morning sunlight and handcrafted honey notes. Together with <strong>Warm Cream (#FFF5E4)</strong> and <strong>Soft Ivory (#FFFCF6)</strong>, our physical and digital spaces feel inviting, artistic, and peaceful.
            </p>
          </div>
        </div>
      </section>

      {/* 3. EXPLORE THE THREE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-signature text-3xl sm:text-4xl text-[#287F7B] block -mb-1">
            our three pillars
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#155D59]">
            Coffee, Matcha, and Chai
          </h2>
          <p className="text-sm text-[#2D3748]/80">
            Each family has its own distinct heritage, temperature profile, and brewing philosophy.
          </p>
        </div>

        {/* Pillar 1: Coffee */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFCF6] p-8 rounded-3xl border border-[#287F7B]/15">
          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF5E4]">
            <img
              src="/images/drinks/dulce_de_leche_latte.jpg"
              alt="Artisanal Dulce de Leche Latte at Karun Cafe"
              width={600}
              height={450}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/drinks/dulce_de_leche_latte.jpg';
              }}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#287F7B]">
              01 · The Coffee Program
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#155D59]">
              Specialty Espresso & House Confections
            </h3>
            <p className="text-sm text-[#2D3748]/85 leading-relaxed">
              We pull balanced double shots featuring notes of milk chocolate, toasted hazelnut, and dark stone fruit. Our lattes celebrate scratch-made culinary reductions: slow-cooked dulce de leche caramel, pure Vermont maple syrup, brown butter cinnamon, and spiced autumn apple reduction.
            </p>
            <button
              onClick={() => handleGoToMenu('Coffee')}
              className="text-xs font-bold text-[#287F7B] hover:text-[#155D59] tracking-wider uppercase inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore 5 Coffee Creations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pillar 2: Matcha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFCF6] p-8 rounded-3xl border border-[#287F7B]/15">
          <div className="lg:col-span-5 lg:order-2 aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF5E4]">
            <img
              src="/images/drinks/blueberry_tart_matcha.jpg"
              alt="Layered Blueberry Tart Matcha at Karun Cafe"
              width={600}
              height={450}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/drinks/blueberry_tart_matcha.jpg';
              }}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 lg:order-1 space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#287F7B]">
              02 · The Matcha Program
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#155D59]">
              Stone-Ground Ceremonial Uji Matcha
            </h3>
            <p className="text-sm text-[#2D3748]/85 leading-relaxed">
              Our ceremonial matcha is harvested from shade-grown tencha in Kyoto Prefecture, Japan. Whisked traditionally using bamboo chasen, it delivers an emerald liquor rich in L-theanine and clean antioxidant energy. We pair it with fruit compotes like wild blueberries and sweet peaches to create stunning layered visual drinks.
            </p>
            <button
              onClick={() => handleGoToMenu('Matcha')}
              className="text-xs font-bold text-[#287F7B] hover:text-[#155D59] tracking-wider uppercase inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore 4 Matcha Creations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pillar 3: Chai */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFCF6] p-8 rounded-3xl border border-[#287F7B]/15">
          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF5E4]">
            <img
              src="/images/drinks/pumpkin_spice_chai_latte.jpg"
              alt="Pumpkin Spice Chai Latte at Karun Cafe"
              width={600}
              height={450}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/drinks/pumpkin_spice_chai_latte.jpg';
              }}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#287F7B]">
              03 · The Chai Program
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#155D59]">
              Slow-Steeped Whole Spices & Warm Pumpkin
            </h3>
            <p className="text-sm text-[#2D3748]/85 leading-relaxed">
              Never made from artificial powders or concentrated syrup pumps. We simmer organic whole Assam black tea leaves alongside crushed green cardamom pods, cracked cinnamon quills, fresh crushed ginger, and cloves, folded with roasted spiced pumpkin. It is autumn comfort in a cup.
            </p>
            <button
              onClick={() => handleGoToMenu('Chai')}
              className="text-xs font-bold text-[#287F7B] hover:text-[#155D59] tracking-wider uppercase inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Spiced Chai Creation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. OUR VISUAL WORLD & STORY DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF5E4] rounded-3xl p-8 sm:p-12 border border-[#287F7B]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="font-signature text-3xl sm:text-4xl text-[#287F7B] block -mb-1">
                  denver park roots
                </span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#155D59]">
                  Our Civic Center Park Story
                </h2>
              </div>

              <div className="space-y-4 text-sm text-[#2D3748]/85 leading-relaxed">
                <p>
                  Karun Cafe was born from an appreciation for open-air park culture in Denver, Colorado. Civic Center Park connects our city’s premier cultural landmarks—the Denver Art Museum, the Clyfford Still Museum, and the Colorado State Capitol.
                </p>
                <p>
                  Founded by Barbara Pavez, Karun Cafe brings the warmth of handcrafted coffee, ceremonial matcha, and whole-spiced chai into Denver's civic green. We believe park-goers, art museum visitors, and neighbors deserve a welcoming haven where each cup is prepared with intention and genuine warmth.
                </p>
                <p>
                  Whether you are grabbing a quick Dulce de Leche Latte before morning meetings or lounging on the park grass with an iced Peach Matcha, we invite you to take a breath and enjoy a little sunshine in every sip.
                </p>
              </div>

              <div className="pt-4 border-t border-[#287F7B]/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#155D59] block">
                    Location & Contact
                  </span>
                  <span className="text-xs text-[#8B5E3C]">
                    Civic Center Park, Denver CO 80205 · karuncafe@gmail.com
                  </span>
                </div>
                <button
                  onClick={() => handleGoToMenu()}
                  className="px-6 py-3 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Browse & Order Drinks
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#287F7B]/20 aspect-[3/4] bg-white group">
                <img
                  src="/images/cafe/barbara_pavez_founder.jpg"
                  alt="Barbara Pavez, Founder of Karun Cafe in Denver"
                  width={600}
                  height={800}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/cafe/karun_trailer_service.jpg';
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-center text-xs text-[#8B5E3C] italic">
                Barbara Pavez · Founder of Karun Cafe
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
