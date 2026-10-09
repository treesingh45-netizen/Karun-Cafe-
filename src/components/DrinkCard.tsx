import React, { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';

interface DrinkCardProps {
  item: MenuItem;
}

export const DrinkCard: React.FC<DrinkCardProps> = ({ item }) => {
  const { addItem, setIsCartOpen } = useCart();
  const [temperature, setTemperature] = useState<'Iced' | 'Hot'>(
    item.category === 'Matcha' ? 'Iced' : 'Hot'
  );
  const [milkOption, setMilkOption] = useState<string>('Oat Milk');
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(item.image);
  const [_imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [retryStep, setRetryStep] = useState<number>(0);

  useEffect(() => {
    setImgSrc(item.image);
    setRetryStep(0);
  }, [item.image]);

  const handleImageError = () => {
    // Generate valid alternative path candidates specifically for this drink
    const candidatePaths = [
      item.image,
      `/${item.name}.jpg`,
      `/images/drinks/${item.name}.jpg`,
      `/images/drinks/${item.name.toLowerCase().replace(/ /g, '_')}.jpg`,
      `/${item.name.toLowerCase().replace(/ /g, '_')}.jpg`,
      `/images/drinks/${encodeURIComponent(item.name)}.jpg`,
      `/${encodeURIComponent(item.name)}.jpg`,
    ];

    if (retryStep + 1 < candidatePaths.length) {
      const nextStep = retryStep + 1;
      setRetryStep(nextStep);
      setImgSrc(candidatePaths[nextStep]);
    }
  };

  const handleAddToCart = () => {
    if (!item.available) return;

    addItem(item, {
      temperature,
      milkOption,
      quantity,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleQuickAddAndOpen = () => {
    handleAddToCart();
    setIsCartOpen(true);
  };

  return (
    <div className="group flex flex-col bg-[#FFFCF6] rounded-xl overflow-hidden border border-[#287F7B]/10 hover:border-[#287F7B]/30 hover:shadow-lg transition-all duration-300">
      {/* Product Image Slot with guaranteed aspect ratio & no layout shift */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF5E4]">
        <img
          src={imgSrc}
          alt={`${item.name} — Karun Cafe Specialty Beverage`}
          width={600}
          height={450}
          onError={handleImageError}
          onLoad={() => setImgLoaded(true)}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          loading="eager"
        />

        {/* Quiet Category and Status Indicators (no static pills) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider bg-[#FFFCF6]/90 backdrop-blur-sm px-2.5 py-1 rounded text-[#155D59]">
          <span>{item.category}</span>
          {item.isSeasonal && (
            <>
              <span aria-hidden="true" className="text-[#F4B54F]">·</span>
              <span className="text-[#8B5E3C]">Autumn Special</span>
            </>
          )}
          {item.isBestLoved && (
            <>
              <span aria-hidden="true" className="text-[#F4B54F]">·</span>
              <span className="text-[#287F7B]">Best-Loved</span>
            </>
          )}
        </div>

        {!item.available && (
          <div className="absolute inset-0 bg-[#FFFCF6]/85 backdrop-blur-[2px] flex items-center justify-center">
            <span className="font-serif-display text-lg font-bold text-[#8B5E3C] uppercase tracking-widest px-4 py-1.5 border border-[#8B5E3C]">
              Temporarily Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Drink Details & Ordering Controls */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between gap-4">
        <div>
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#155D59] group-hover:text-[#287F7B] transition-colors leading-snug">
              {item.name}
            </h3>
            <span className="font-sans text-base sm:text-lg font-semibold text-[#8B5E3C] tabular-nums shrink-0">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <p className="text-sm text-[#2D3748]/80 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Customization Options */}
        <div className="space-y-3 pt-3 border-t border-[#287F7B]/10">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#155D59]/70">Temperature</span>
            <div className="inline-flex p-0.5 bg-[#FFF5E4] rounded-md border border-[#287F7B]/10">
              <button
                type="button"
                onClick={() => setTemperature('Hot')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  temperature === 'Hot'
                    ? 'bg-[#287F7B] text-[#FFF5E4]'
                    : 'text-[#155D59] hover:text-[#287F7B]'
                }`}
              >
                Hot
              </button>
              <button
                type="button"
                onClick={() => setTemperature('Iced')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  temperature === 'Iced'
                    ? 'bg-[#287F7B] text-[#FFF5E4]'
                    : 'text-[#155D59] hover:text-[#287F7B]'
                }`}
              >
                Iced
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#155D59]/70">Milk Pairing</span>
            <select
              value={milkOption}
              onChange={(e) => setMilkOption(e.target.value)}
              className="bg-[#FFF5E4] border border-[#287F7B]/15 text-[#155D59] text-xs rounded px-2 py-1 font-medium focus:outline-none focus:ring-1 focus:ring-[#287F7B]"
            >
              <option value="Oat Milk">Barista Oat Milk</option>
              <option value="Whole Milk">Whole Milk</option>
              <option value="Almond Milk">Almond Milk</option>
            </select>
          </div>

          {/* Stepper & Add to Order CTA */}
          <div className="flex items-center gap-2 pt-2">
            <div className="flex items-center border border-[#287F7B]/20 rounded-lg bg-[#FFF5E4] px-1 py-0.5">
              <button
                type="button"
                disabled={quantity <= 1 || !item.available}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="w-7 h-7 flex items-center justify-center text-[#155D59] hover:text-[#287F7B] disabled:opacity-40 cursor-pointer text-sm font-bold"
              >
                -
              </button>
              <span className="w-6 text-center text-xs font-semibold text-[#155D59] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                disabled={!item.available}
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="w-7 h-7 flex items-center justify-center text-[#155D59] hover:text-[#287F7B] disabled:opacity-40 cursor-pointer text-sm font-bold"
              >
                +
              </button>
            </div>

            <button
              type="button"
              disabled={!item.available}
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 shadow-sm ${
                justAdded
                  ? 'bg-[#155D59] text-[#FFF5E4]'
                  : 'bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] active:scale-[0.98]'
              } disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 text-[#F4B54F]" />
                  <span>Added to Order</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-[#F4B54F]" />
                  <span>Add to Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
