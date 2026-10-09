import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    cartCount,
    subtotal,
    taxesAndFees,
    total,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    setActivePage,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setActivePage('menu');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFCF6] shadow-2xl flex flex-col border-l border-[#287F7B]/20">
          {/* Header */}
          <div className="px-6 py-5 bg-[#FFF5E4] border-b border-[#287F7B]/15 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#287F7B]" />
              <h2 className="font-serif-display text-xl font-bold text-[#155D59]">
                Your Order Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#155D59] hover:text-[#287F7B] hover:bg-[#287F7B]/10 rounded-md transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#287F7B]/10">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FFF5E4] flex items-center justify-center text-[#287F7B]">
                  <Coffee className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif-display text-xl font-semibold text-[#155D59]">
                    Your bag is empty
                  </h3>
                  <p className="text-sm text-[#2D3748]/70 mt-1">
                    Select a specialty coffee, ceremonial matcha, or spiced chai from our menu to begin.
                  </p>
                </div>
                <button
                  onClick={handleContinueShopping}
                  className="px-5 py-2.5 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Explore Drinks
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.cartItemId} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={`${item.name} in bag`}
                    width={72}
                    height={72}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/drinks/dulce_de_leche_latte.jpg';
                    }}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-lg object-cover bg-[#FFF5E4] border border-[#287F7B]/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif-display text-lg font-bold text-[#155D59] leading-snug truncate">
                        {item.name}
                      </h4>
                      <span className="text-sm font-semibold text-[#8B5E3C] tabular-nums shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-[#2D3748]/70 mt-0.5">
                      {item.temperature} · {item.milkOption}
                    </p>

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity adjuster */}
                      <div className="flex items-center border border-[#287F7B]/20 rounded-md bg-[#FFF5E4] px-1 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#155D59] hover:text-[#287F7B] text-xs font-bold cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-xs font-semibold text-[#155D59] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#155D59] hover:text-[#287F7B] text-xs font-bold cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove item */}
                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove drink from order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-6 bg-[#FFF5E4] border-t border-[#287F7B]/15 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#2D3748]/80">
                  <span>Subtotal</span>
                  <span className="font-medium tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#2D3748]/80">
                  <span>Denver Sales Tax (8.81%)</span>
                  <span className="font-medium tabular-nums">${taxesAndFees.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#155D59] pt-2 border-t border-[#287F7B]/15">
                  <span>Estimated Total</span>
                  <span className="font-serif-display text-xl tabular-nums text-[#8B5E3C]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-[#8B5E3C] leading-snug">
                * Submitted orders are requests pending bar review. Payment is finalized at in-person pickup.
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] font-semibold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#F4B54F]" />
                </button>

                <button
                  onClick={handleContinueShopping}
                  className="w-full py-2 text-xs font-medium text-[#155D59] hover:text-[#287F7B] text-center transition-colors cursor-pointer"
                >
                  Continue Browsing Menu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
