import React, { useState } from 'react';
import { X, Sparkles, Loader2, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SunflowerIcon } from './KarunLogo';

interface SommelierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlavorSommelierModal: React.FC<SommelierModalProps> = ({ isOpen, onClose }) => {
  const { menuItems, addItem, setIsCartOpen } = useCart();
  const [tasteQuery, setTasteQuery] = useState('');
  const [milkPref, setMilkPref] = useState('Oat Milk');
  const [caffeinePref, setCaffeinePref] = useState('Moderate');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [addedItem, setAddedItem] = useState(false);

  if (!isOpen) return null;

  const handleGetRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendation(null);
    setAddedItem(false);

    try {
      const res = await fetch('/api/sommelier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tastePreferences: tasteQuery || 'Aromatic, subtle sweetness, rich mouthfeel',
          milkPreference: milkPref,
          caffeinePreference: caffeinePref,
          mood: 'Relaxing afternoon in Civic Center Park',
        }),
      });

      const data = await res.json();
      if (data && data.topPick) {
        setRecommendation(data);
      } else {
        // Fallback default
        setRecommendation({
          topPick: {
            drinkName: 'Dulce de Leche Latte',
            category: 'Coffee',
            flavorProfile: 'Velvety espresso with buttery caramel sweetness and golden crema',
            whyYouWillLoveIt:
              'Our most beloved signature latte, perfectly balanced with handcrafted dulce de leche to brighten your Denver morning.',
            customizationTip: 'Try it hot with oat milk for exceptional silky texture.',
          },
        });
      }
    } catch (err) {
      console.error(err);
      setRecommendation({
        topPick: {
          drinkName: 'Blueberry Tart Matcha',
          category: 'Matcha',
          flavorProfile: 'Layered wild blueberry compote with stone-ground ceremonial matcha',
          whyYouWillLoveIt:
            'A vibrant favorite pairing bright berry notes with umami-rich green tea for sustained focus and smooth energy.',
          customizationTip: 'Best enjoyed iced with oat milk for the three-tone aesthetic.',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTopPick = () => {
    if (!recommendation?.topPick) return;
    const foundItem = menuItems.find(
      (m) => m.name.toLowerCase() === recommendation.topPick.drinkName.toLowerCase()
    ) || menuItems[0];

    addItem(foundItem, {
      milkOption: milkPref,
      temperature: foundItem.category === 'Matcha' ? 'Iced' : 'Hot',
      quantity: 1,
    });
    setAddedItem(true);
    setTimeout(() => {
      onClose();
      setIsCartOpen(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative transform overflow-hidden rounded-2xl bg-[#FFFCF6] text-left shadow-2xl transition-all sm:w-full sm:max-w-xl border border-[#287F7B]/20">
          {/* Header */}
          <div className="px-6 py-5 bg-[#FFF5E4] border-b border-[#287F7B]/15 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#287F7B]" />
              <div>
                <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#155D59]">
                  Flavor & Dietary Sommelier
                </h3>
                <p className="text-[11px] text-[#8B5E3C]">
                  Deep reasoning powered by Gemini 3.1 Pro Preview
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#155D59] hover:text-[#287F7B] hover:bg-[#287F7B]/10 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            <p className="text-xs text-[#2D3748]/80 leading-relaxed">
              Tell our virtual sommelier what flavors, sweetness levels, or dietary requirements you prefer, and we will analyze the full Karun Cafe catalog to find your drink.
            </p>

            <form onSubmit={handleGetRecommendation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#155D59] mb-1">
                  What flavors or notes are you craving today?
                </label>
                <input
                  type="text"
                  value={tasteQuery}
                  onChange={(e) => setTasteQuery(e.target.value)}
                  placeholder="e.g. Mildly sweet, warming autumn spice, or fruity & floral"
                  className="w-full px-3.5 py-2.5 bg-[#FFF5E4]/60 border border-[#287F7B]/20 rounded-lg text-xs text-[#155D59] placeholder-[#155D59]/40 focus:outline-none focus:ring-1 focus:ring-[#287F7B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#155D59] mb-1">Milk / Base</label>
                  <select
                    value={milkPref}
                    onChange={(e) => setMilkPref(e.target.value)}
                    className="w-full px-2.5 py-2 bg-[#FFF5E4] border border-[#287F7B]/20 rounded-lg text-[#155D59]"
                  >
                    <option value="Oat Milk">Barista Oat Milk (Dairy-Free)</option>
                    <option value="Whole Milk">Whole Dairy Milk</option>
                    <option value="Almond Milk">Almond Milk</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#155D59] mb-1">Caffeine Goal</label>
                  <select
                    value={caffeinePref}
                    onChange={(e) => setCaffeinePref(e.target.value)}
                    className="w-full px-2.5 py-2 bg-[#FFF5E4] border border-[#287F7B]/20 rounded-lg text-[#155D59]"
                  >
                    <option value="High (Espresso punch)">High (Espresso punch)</option>
                    <option value="Sustained & Calm (Ceremonial Matcha)">Sustained (Matcha L-Theanine)</option>
                    <option value="Gentle & Soothing (Spiced Chai)">Gentle (Spiced Chai)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] font-semibold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#F4B54F]" />
                    <span>Analyzing Palate with Deep Thinking...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#F4B54F]" />
                    <span>Find My Recommended Drink</span>
                  </>
                )}
              </button>
            </form>

            {/* Recommendation Result */}
            {recommendation && recommendation.topPick && (
              <div className="p-4 bg-[#FFF5E4] rounded-xl border border-[#287F7B]/25 space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-[#287F7B]/15 pb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#287F7B]">
                    Top Match For You
                  </span>
                  <span className="text-xs font-semibold text-[#8B5E3C]">
                    {recommendation.topPick.category}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif-display text-xl font-bold text-[#155D59]">
                    {recommendation.topPick.drinkName}
                  </h4>
                  <p className="text-xs text-[#8B5E3C] italic mt-0.5">
                    {recommendation.topPick.flavorProfile}
                  </p>
                </div>

                <p className="text-xs text-[#2D3748]/85 leading-relaxed">
                  {recommendation.topPick.whyYouWillLoveIt}
                </p>

                {recommendation.topPick.customizationTip && (
                  <div className="p-2.5 bg-white/80 rounded border border-[#287F7B]/10 text-[11px] text-[#155D59]">
                    <strong>Barista Suggestion:</strong> {recommendation.topPick.customizationTip}
                  </div>
                )}

                <button
                  onClick={handleAddTopPick}
                  className="w-full py-2 px-3 bg-[#155D59] hover:bg-[#287F7B] text-[#FFF5E4] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {addedItem ? (
                    <>
                      <Check className="w-4 h-4 text-[#F4B54F]" />
                      <span>Added to Bag! Opening...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-[#F4B54F]" />
                      <span>Add {recommendation.topPick.drinkName} to Order</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
