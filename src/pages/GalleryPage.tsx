import React, { useState } from 'react';
import { X, Instagram, ZoomIn, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SunflowerIcon } from '../components/KarunLogo';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Coffee Creations' | 'Matcha Moments' | 'Chai Favorites' | 'Seasonal Inspiration' | 'Brand Details';
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
  description: string;
}

export const GalleryPage: React.FC = () => {
  const { cafeConfig, setActivePage } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      title: 'Dulce de Leche Latte & Golden Crema',
      category: 'Coffee Creations',
      image: '/images/drinks/dulce_de_leche_latte.jpg',
      aspect: 'portrait',
      description: 'House-made dulce de leche caramel swirling through double espresso and microfoam.',
    },
    {
      id: 'g2',
      title: 'Three-Tier Blueberry Tart Matcha',
      category: 'Matcha Moments',
      image: '/images/drinks/blueberry_tart_matcha.jpg',
      aspect: 'portrait',
      description: 'Handcrafted wild blueberry compote, creamy oat milk, and vibrant green ceremonial Uji matcha.',
    },
    {
      id: 'g3',
      title: 'Banana Cream Matcha',
      category: 'Matcha Moments',
      image: '/images/drinks/banana_cream_matcha.jpg',
      aspect: 'portrait',
      description: 'Rich whipped banana cold cream floating over chilled ceremonial Japanese green tea matcha and iced oat milk.',
    },
    {
      id: 'g4',
      title: 'Peach Matcha on Summer Ice',
      category: 'Matcha Moments',
      image: '/images/drinks/peach_matcha.jpg',
      aspect: 'portrait',
      description: 'Colorado ripe peach puree layered beneath fresh bamboo-whisked ceremonial green tea.',
    },
    {
      id: 'g5',
      title: 'Pumpkin Spice Matcha',
      category: 'Seasonal Inspiration',
      image: '/images/drinks/pumpkin_spice_matcha.jpg',
      aspect: 'portrait',
      description: 'Stone-ground ceremonial grade Uji matcha whisked fresh, topped with velvety pumpkin cold foam and warm fall spices.',
    },
    {
      id: 'g6',
      title: 'Cinnamon Roll Latte',
      category: 'Coffee Creations',
      image: '/images/drinks/cinnamon_roll_latte.jpg',
      aspect: 'portrait',
      description: 'Brown butter brown sugar reduction, sweet vanilla cream notes, double espresso, and fragrant cinnamon drizzle.',
    },
    {
      id: 'g7',
      title: 'Maple Cinnamon Latte Art',
      category: 'Coffee Creations',
      image: '/images/drinks/maple_cinnamon_latte.jpg',
      aspect: 'portrait',
      description: 'Pure Vermont maple syrup and cinnamon quills meeting velvety espresso crema.',
    },
    {
      id: 'g8',
      title: 'Caramel Apple Latte Indulgence',
      category: 'Seasonal Inspiration',
      image: '/images/drinks/caramel_apple_latte.jpg',
      aspect: 'portrait',
      description: 'Spiced honeycrisp apple cider reduction, whipped cream, and artisanal caramel swirl.',
    },
    {
      id: 'g9',
      title: 'Pumpkin Spice Latte',
      category: 'Seasonal Inspiration',
      image: '/images/drinks/pumpkin_spice_latte.jpg',
      aspect: 'portrait',
      description: 'Real roasted pumpkin puree simmered with autumn spices, espresso, velvety milk, and freshly ground nutmeg.',
    },
    {
      id: 'g10',
      title: 'Pumpkin Spice Chai Latte',
      category: 'Chai Favorites',
      image: '/images/drinks/pumpkin_spice_chai_latte.jpg',
      aspect: 'portrait',
      description: 'Slow-simmered organic Assam black tea, fresh ginger, cracked cardamom, and cinnamon combined with spiced pumpkin.',
    },
    {
      id: 'g11',
      title: 'Barista Espresso Craft at the Mobile Bar',
      category: 'Brand Details',
      image: '/images/cafe/karun_barista_craft.jpg',
      aspect: 'landscape',
      description: 'Artisanal espresso preparation and beverage crafting at the Karun mobile bar inside Civic Center Park.',
    },
    {
      id: 'g12',
      title: 'Denver Civic Center Park Morning Light',
      category: 'Brand Details',
      image: '/images/cafe/park_ambience_real.jpg',
      aspect: 'landscape',
      description: 'Enjoying sunny morning fresh air and mountain breezes under the Denver park canopy.',
    },
    {
      id: 'g13',
      title: 'The Pumpkin Spice Collection',
      category: 'Seasonal Inspiration',
      image: '/images/cafe/autumn_collection_real.jpg',
      aspect: 'landscape',
      description: 'Autumn spice dusting, star anise, and roasted pumpkin folded with warm milk.',
    },
    {
      id: 'g14',
      title: 'Karun Mobile Cafe Trailer & Smiling Barista',
      category: 'Brand Details',
      image: '/images/cafe/karun_trailer_service.jpg',
      aspect: 'portrait',
      description: 'The signature handcrafted Karun mobile coffee trailer serving Denver in the park with fresh yellow sunflowers.',
    },
    {
      id: 'g15',
      title: 'Open Window Service with Warm Sunshine',
      category: 'Brand Details',
      image: '/images/cafe/karun_barista_window.jpg',
      aspect: 'portrait',
      description: 'Welcoming guests with genuine smiles and handcrafted beverages at our vintage mobile cart window.',
    },
    {
      id: 'g16',
      title: 'The Mobile Trailer Exterior at Civic Center Park',
      category: 'Brand Details',
      image: '/images/cafe/karun_trailer_exterior.jpg',
      aspect: 'portrait',
      description: 'Boutique custom mobile trailer exterior decorated with fresh flowers under the Denver trees.',
    },
    {
      id: 'g17',
      title: 'Founder Barbara Pavez',
      category: 'Brand Details',
      image: '/images/cafe/barbara_pavez_founder.jpg',
      aspect: 'portrait',
      description: 'Founder Barbara Pavez sharing warm hospitality and intentional beverages with Denver.',
    },
  ];

  const categories = [
    'All',
    'Coffee Creations',
    'Matcha Moments',
    'Chai Favorites',
    'Seasonal Inspiration',
    'Brand Details',
  ];

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeCategory);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO */}
      <section className="bg-[#FFF5E4] border-b border-[#287F7B]/15 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#287F7B]">
            <SunflowerIcon className="w-4 h-4" />
            <span>Visual Journal & Photography</span>
          </div>

          <div>
            <span className="font-signature text-3xl sm:text-4xl text-[#287F7B] block -mb-1">
              a visual journal
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#155D59]">
              A World of Color, One Sip at a Time.
            </h1>
          </div>

          <p className="text-base sm:text-lg text-[#2D3748]/85 max-w-2xl mx-auto leading-relaxed">
            From the rich golden amber of our dulce de leche to the vivid emerald green of stone-ground Uji matcha. Explore our craft through the lens of Denver sunlight.
          </p>
        </div>
      </section>

      {/* 2. FILTER TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 flex-wrap pb-6 border-b border-[#287F7B]/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#287F7B] text-[#FFF5E4]'
                  : 'bg-[#FFF5E4] text-[#155D59] hover:bg-[#287F7B]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. EDITORIAL GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer bg-[#FFFCF6] rounded-2xl overflow-hidden border border-[#287F7B]/15 hover:border-[#287F7B] hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-[#FFF5E4] overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.title} — Karun Cafe Visual Journal`}
                  width={600}
                  height={450}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/drinks/dulce_de_leche_latte.jpg';
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="p-2.5 bg-black/60 rounded-full backdrop-blur-xs">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-[#FFFCF6]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-bold text-[#155D59] uppercase tracking-wider">
                  {item.category}
                </div>
              </div>

              <div className="p-5 space-y-1 text-left flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif-display text-lg font-bold text-[#155D59] group-hover:text-[#287F7B] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#2D3748]/75 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-[#FFFCF6] rounded-2xl overflow-hidden shadow-2xl border border-[#287F7B]/30 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh]">
              <div className="md:col-span-8 bg-black flex items-center justify-center">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[80vh] w-full object-contain"
                />
              </div>

              <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 text-left bg-[#FFFCF6]">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#287F7B]">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#155D59]">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2D3748]/85 leading-relaxed">
                    {selectedImage.description}
                  </p>
                  <div className="pt-2 text-[11px] text-[#8B5E3C]">
                    Civic Center Park, Denver · Handcrafted to Order
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#287F7B]/15">
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setActivePage('menu');
                    }}
                    className="w-full py-2.5 px-4 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Order Drinks on Menu</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F4B54F]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. INSTAGRAM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#155D59] text-[#FFF5E4] rounded-3xl p-8 sm:p-14 text-center space-y-5 border border-[#F4B54F]/25">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#F4B54F]">
            Stay Connected
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold">
            More Moments with Karun.
          </h2>
          <p className="text-sm text-[#FFF5E4]/80 max-w-lg mx-auto">
            Tag @karuncafe on your park visits and follow along for secret weekly syrups, seasonal drink drops, and Denver weather updates.
          </p>
          <div className="pt-2">
            <a
              href={cafeConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F4B54F] hover:bg-[#FFF5E4] text-[#155D59] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @karuncafe</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
