import React from 'react';
import { ArrowRight, MapPin, Instagram, Heart, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DrinkCard } from '../components/DrinkCard';
import { SunflowerIcon } from '../components/KarunLogo';

interface HomePageProps {
  onOpenSommelier?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenSommelier: _onOpenSommelier }) => {
  const { menuItems, setActivePage, setActiveCategoryFilter, cafeConfig } = useCart();

  const bestLovedDrinks = menuItems.filter((item) => item.isBestLoved);

  const handleCategoryClick = (category: string) => {
    setActiveCategoryFilter(category);
    setActivePage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    const el = document.getElementById('discover-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION — FULL-SCREEN CINEMATIC CAFE BACKGROUND (100% REAL PHOTOGRAPHY, NO AI) */}
      <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Full-width Authentic Background Photograph */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/cafe/karun_trailer_service.jpg"
            alt="Karun Cafe authentic mobile coffee trailer in Denver with smiling barista and fresh yellow sunflowers"
            width={1920}
            height={1080}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/cafe/hero_real_cafe.jpg';
            }}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-[1.01] transition-all duration-500"
            loading="eager"
          />

          {/* Balanced Cinematic Scrim: Preserves authentic photo vibrancy while keeping text crisp */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#155D59]/65 via-black/40 to-black/75 pointer-events-none" />

          {/* Vignette Depth Accent */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/40 pointer-events-none" />
        </div>

        {/* 2. CENTERED HERO CONTENT (No Box or Card Container) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-7 animate-in fade-in duration-700">
          {/* Eyebrow Text */}
          <div className="inline-flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-[#F4B54F]">
            <SunflowerIcon className="w-4 h-4 shrink-0" />
            <span>Karun Cafe · Denver, Colorado</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-bold text-[#FFFCF6] leading-[1.06] tracking-tight drop-shadow-sm">
            A Little Sunshine<br className="hidden sm:inline" /> in Every Sip.
          </h1>

          {/* Flowing Signature-Style Subtitle (Warm Cream #FFF5E4 over dark hero photography) */}
          <div className="font-signature text-2xl sm:text-3xl md:text-4xl text-[#FFF5E4] font-normal tracking-wide drop-shadow-sm -mt-2">
            handcrafted coffee, matcha & chai
          </div>

          {/* 3. CALL-TO-ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-3 w-full sm:w-auto">
            <button
              onClick={() => handleNav('menu')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#F4B54F] hover:bg-[#F4B54F]/90 text-[#155D59] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Explore the Menu</span>
              <ArrowRight className="w-4 h-4 text-[#155D59]" />
            </button>

            <button
              onClick={() => handleNav('visit')}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-[#FFFCF6]/15 text-[#FFFCF6] border border-[#FFFCF6]/75 hover:border-[#FFFCF6] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#F4B54F]" />
              <span>Find Us</span>
            </button>
          </div>
        </div>

        {/* 6. DISCREET SCROLL INDICATOR */}
        <button
          onClick={handleScrollDown}
          aria-label="Scroll to discover menu"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-[#FFFCF6]/75 hover:text-[#F4B54F] transition-colors cursor-pointer group"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium opacity-80 group-hover:opacity-100">
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce opacity-80 group-hover:opacity-100" />
        </button>
      </section>

      {/* 7. NEXT SECTION BELOW THE HERO: "Your Next Favorite Sip Awaits." */}
      <section id="discover-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="font-signature text-3xl sm:text-4xl text-[#287F7B] block -mb-1">
            crafted with intention
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#155D59]">
            Your Next Favorite Sip Awaits.
          </h2>
          <p className="text-sm sm:text-base text-[#2D3748]/80 leading-relaxed max-w-xl mx-auto pt-1">
            Explore a colorful menu of coffee, matcha, and chai, with flavors to make every visit a little more special.
          </p>
        </div>

        {/* Three Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coffee Card */}
          <div
            onClick={() => handleCategoryClick('Coffee')}
            className="group cursor-pointer bg-[#FFFCF6] rounded-2xl overflow-hidden border border-[#287F7B]/15 hover:border-[#287F7B] hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF5E4]">
              <img
                src="/images/drinks/Dulce de Leche Latte.jpg"
                alt="Artisanal specialty coffee — Dulce de Leche Latte"
                width={600}
                height={450}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/Dulce de Leche Latte.jpg';
                }}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-[#FFFCF6]/90 px-3 py-1 rounded text-xs font-semibold text-[#155D59] tracking-wider uppercase">
                Coffee
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif-display text-2xl font-bold text-[#155D59] group-hover:text-[#287F7B] transition-colors">
                  Specialty Coffee
                </h3>
                <p className="text-xs text-[#2D3748]/80 mt-2 leading-relaxed">
                  Smooth double shots, creamy microfoam, and scratch-made reductions like Dulce de Leche and Pure Vermont Maple.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-[#287F7B] group-hover:translate-x-1 transition-transform">
                <span>View 5 Coffee Drinks</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </div>

          {/* Matcha Card */}
          <div
            onClick={() => handleCategoryClick('Matcha')}
            className="group cursor-pointer bg-[#FFFCF6] rounded-2xl overflow-hidden border border-[#287F7B]/15 hover:border-[#287F7B] hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF5E4]">
              <img
                src="/images/drinks/Blueberry Tart Matcha.jpg"
                alt="Ceremonial Japanese Matcha — Layered Blueberry Tart Matcha"
                width={600}
                height={450}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/Blueberry Tart Matcha.jpg';
                }}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-[#FFFCF6]/90 px-3 py-1 rounded text-xs font-semibold text-[#155D59] tracking-wider uppercase">
                Matcha
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif-display text-2xl font-bold text-[#155D59] group-hover:text-[#287F7B] transition-colors">
                  Ceremonial Matcha
                </h3>
                <p className="text-xs text-[#2D3748]/80 mt-2 leading-relaxed">
                  Stone-ground green tea whisked fresh to order, paired with vibrant fruit purées like Wild Blueberry and Peach.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-[#287F7B] group-hover:translate-x-1 transition-transform">
                <span>View 4 Matcha Drinks</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </div>

          {/* Chai Card */}
          <div
            onClick={() => handleCategoryClick('Chai')}
            className="group cursor-pointer bg-[#FFFCF6] rounded-2xl overflow-hidden border border-[#287F7B]/15 hover:border-[#287F7B] hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF5E4]">
              <img
                src="/images/drinks/Pumpkin Spice Chai Latte.jpg"
                alt="Spiced Chai Latte — Pumpkin Spice Chai Latte"
                width={600}
                height={450}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/Pumpkin Spice Chai Latte.jpg';
                }}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-[#FFFCF6]/90 px-3 py-1 rounded text-xs font-semibold text-[#155D59] tracking-wider uppercase">
                Chai
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif-display text-2xl font-bold text-[#155D59] group-hover:text-[#287F7B] transition-colors">
                  Spiced Chai
                </h3>
                <p className="text-xs text-[#2D3748]/80 mt-2 leading-relaxed">
                  Slow-steeped Assam black tea, cracked green cardamom, cinnamon, and whole pumpkin spice blend.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-[#287F7B] group-hover:translate-x-1 transition-transform">
                <span>View Spiced Chai Selection</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEST-LOVED DRINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-3.5 h-3.5 fill-[#F4B54F] text-[#F4B54F]" />
              <span className="font-signature text-2xl sm:text-3xl text-[#287F7B]">
                denver's park favorites
              </span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#155D59]">
              Best-Loved Drinks
            </h2>
            <p className="text-xs sm:text-sm text-[#2D3748]/75 mt-1 max-w-xl">
              From the supplied Karun Cafe menu, these are our guests' most requested daily selections. Add them directly to your order below.
            </p>
          </div>

          <button
            onClick={() => handleNav('menu')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#287F7B] hover:text-[#155D59] transition-colors cursor-pointer self-start md:self-end"
          >
            <span>See Full 10-Drink Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestLovedDrinks.map((drink) => (
            <DrinkCard key={drink.id} item={drink} />
          ))}
        </div>
      </section>

      {/* SEASONAL HIGHLIGHTS */}
      <section className="bg-[#FFF5E4] border-y border-[#287F7B]/15 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#287F7B]/20 bg-white aspect-[4/3]">
                <img
                  src="/images/cafe/autumn_collection_real.jpg"
                  alt="Authentic pumpkin spice seasonal collection with autumn spices"
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

            <div className="lg:col-span-7 space-y-5 text-left">
              <div>
                <span className="font-signature text-2xl sm:text-3xl text-[#287F7B] block -mb-1">
                  autumn palette & limited run
                </span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#155D59] leading-tight">
                  Warm Cream, Golden Spices & Seasonal Comfort
                </h2>
              </div>

              <p className="text-sm text-[#2D3748]/85 leading-relaxed">
                Celebrate Colorado’s changing seasons with our signature pumpkin-spice creations. Made with real roasted pumpkin purée, slow-simmered cinnamon, clove, and nutmeg folded across your choice of espresso latte, ceremonial matcha, or slow-steeped chai.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 bg-white/80 rounded-lg border border-[#287F7B]/10">
                  <span className="font-bold text-[#155D59] block">Pumpkin Spice Latte</span>
                  <span className="text-[#8B5E3C]">$7.00 · Espresso & Cream</span>
                </div>
                <div className="p-3 bg-white/80 rounded-lg border border-[#287F7B]/10">
                  <span className="font-bold text-[#155D59] block">Pumpkin Spice Matcha</span>
                  <span className="text-[#8B5E3C]">$7.25 · Uji Green Tea</span>
                </div>
                <div className="p-3 bg-white/80 rounded-lg border border-[#287F7B]/10">
                  <span className="font-bold text-[#155D59] block">Pumpkin Spice Chai</span>
                  <span className="text-[#8B5E3C]">$6.75 · Assam Spices</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleNav('seasonal')}
                  className="px-6 py-3 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Explore Seasonal Specials</span>
                  <ArrowRight className="w-4 h-4 text-[#F4B54F]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND INTRODUCTION & STORY TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFCF6] border border-[#287F7B]/20 rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <SunflowerIcon className="w-10 h-10" />
            <div>
              <span className="font-signature text-2xl sm:text-3xl text-[#287F7B] block -mb-1">
                a thoughtful daily ritual
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#155D59]">
                The Karun Philosophy: A Thoughtful Daily Ritual
              </h2>
            </div>
            <p className="text-sm text-[#2D3748]/85 leading-relaxed">
              Named after the warmth of the sun and rooted in the vibrancy of Denver’s Civic Center Park, Karun Cafe reimagines what a parkside coffee experience can be. From the sunflower in our emblem to our signature palette of deep teal, golden yellow, and warm cream, every element is designed to offer a gentle pause in your busy day.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#FFF5E4] rounded-xl border border-[#287F7B]/15 text-xs text-[#155D59] space-y-1">
                <span className="font-bold block text-[#8B5E3C]">Uncompromised Sourcing</span>
                <p className="text-[#2D3748]/80">Specialty single-origin espresso, ceremonial Uji matcha, and slow-steeped organic chai.</p>
              </div>
              <div className="p-4 bg-[#FFF5E4] rounded-xl border border-[#287F7B]/15 text-xs text-[#155D59] space-y-1">
                <span className="font-bold block text-[#8B5E3C]">Denver Park Hospitality</span>
                <p className="text-[#2D3748]/80">Situated in Civic Center Park with open-air views, sunshine, and mountain breezes.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNav('story')}
                className="text-xs font-bold text-[#287F7B] hover:text-[#155D59] tracking-wider uppercase inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read Our Full Story & Craft</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-[#287F7B]/20 bg-white aspect-[4/3] group">
              <img
                src="/images/cafe/karun_trailer_exterior.jpg"
                alt="Karun Cafe custom mobile trailer setup in Denver's Civic Center Park"
                width={600}
                height={450}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/cafe/karun_trailer_service.jpg';
                }}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-2 text-center">
              <span className="text-[11px] text-[#8B5E3C] italic">Our mobile coffee trailer in Civic Center Park, Denver</span>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFF5E4] rounded-3xl p-8 sm:p-12 border border-[#287F7B]/20">
          <div className="lg:col-span-6 space-y-4 text-left">
            <div>
              <span className="font-signature text-2xl sm:text-3xl text-[#287F7B] block -mb-1">
                find our parkside bar
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#155D59]">
                Visit Us at Civic Center Park
              </h2>
            </div>
            <p className="text-sm text-[#2D3748]/85 leading-relaxed">
              Located right in the heart of Denver, Colorado. Join us before your morning stroll, during lunch break, or while visiting the Denver Art Museum and State Capitol grounds.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#155D59]">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#287F7B] shrink-0" />
                <span className="font-semibold">{cafeConfig.fullAddress}</span>
              </p>
              <p className="text-[#8B5E3C] pl-6">
                Open Tuesday – Sunday · Closed Mondays
              </p>
            </div>

            <div className="pt-3 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=Civic+Center+Park+Denver+CO"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Get Verified Directions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => handleNav('visit')}
                className="px-6 py-3 bg-white text-[#155D59] border border-[#287F7B]/20 text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Hours & Inquiries
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#287F7B]/20 bg-white aspect-[16/10]">
              <iframe
                title="Karun Cafe Location Map at Civic Center Park"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.896749964551!2d-104.98971272347102!3d39.73919997155609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c78d46fb332c9%3A0xc3f0b2f69e6bca7!2sCivic%20Center%20Park!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div>
          <span className="font-signature text-2xl sm:text-3xl text-[#287F7B] block -mb-1">
            visual moments & sunshine
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#155D59] mt-1">
            Follow Our Sunshine on Instagram
          </h2>
          <p className="text-xs sm:text-sm text-[#2D3748]/75 mt-1">
            Daily drink specials, park weather updates, and behind-the-bar moments.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-[#FFF5E4] border border-[#287F7B]/15 group">
            <img
              src="/images/drinks/peach_matcha.jpg"
              alt="Peach Matcha drink at Karun Cafe"
              width={400}
              height={400}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/drinks/dulce_de_leche_latte.jpg';
              }}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden bg-[#FFF5E4] border border-[#287F7B]/15 group">
            <img
              src="/images/drinks/maple_cinnamon_latte.jpg"
              alt="Maple Cinnamon Latte art at Karun Cafe"
              width={400}
              height={400}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/drinks/dulce_de_leche_latte.jpg';
              }}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden bg-[#FFF5E4] border border-[#287F7B]/15 group">
            <img
              src="/images/drinks/caramel_apple_latte.jpg"
              alt="Caramel Apple Latte at Karun Cafe"
              width={400}
              height={400}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/drinks/dulce_de_leche_latte.jpg';
              }}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden bg-[#FFF5E4] border border-[#287F7B]/15 group">
            <img
              src="/images/drinks/banana_cream_matcha.jpg"
              alt="Banana Cream Matcha at Karun Cafe"
              width={400}
              height={400}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/drinks/dulce_de_leche_latte.jpg';
              }}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <a
          href={cafeConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#155D59] hover:bg-[#287F7B] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
        >
          <Instagram className="w-4 h-4 text-[#F4B54F]" />
          <span>Follow {cafeConfig.instagramHandle}</span>
        </a>
      </section>
    </div>
  );
};
