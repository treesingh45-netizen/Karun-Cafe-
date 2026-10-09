import React, { useState, useEffect } from 'react';
import { X, Save, Mail, DollarSign, Check, RefreshCw, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CafeManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CafeManagerModal: React.FC<CafeManagerModalProps> = ({ isOpen, onClose }) => {
  const { menuItems, updateMenuItemPrice, toggleMenuItemAvailability, cafeConfig, updateCafeConfig } =
    useCart();
  const [activeTab, setActiveTab] = useState<'prices' | 'orders' | 'settings'>('prices');
  const [serverOrders, setServerOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [selectedOrderView, setSelectedOrderView] = useState<any | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (isOpen && activeTab === 'orders') {
      fetchServerOrders();
    }
  }, [isOpen, activeTab]);

  const fetchServerOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data && data.orders) {
        setServerOrders(data.orders);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative transform overflow-hidden rounded-2xl bg-[#FFFCF6] text-left shadow-2xl transition-all sm:w-full sm:max-w-3xl border border-[#287F7B]/30">
          {/* Header */}
          <div className="px-6 py-5 bg-[#155D59] text-[#FFF5E4] flex items-center justify-between">
            <div>
              <h3 className="font-serif-display text-xl font-bold tracking-wide">
                Karun Cafe Manager & Order Desk
              </h3>
              <p className="text-xs text-[#F4B54F]">
                Configure drink pricing, availability & monitor email deliveries to {cafeConfig.orderEmail}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#FFF5E4]/80 hover:text-white rounded-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 border-b border-[#287F7B]/15 bg-[#FFF5E4] flex gap-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('prices')}
              className={`py-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'prices'
                  ? 'border-[#287F7B] text-[#155D59]'
                  : 'border-transparent text-[#2D3748]/70 hover:text-[#155D59]'
              }`}
            >
              Drink Prices & Availability
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'border-[#287F7B] text-[#155D59]'
                  : 'border-transparent text-[#2D3748]/70 hover:text-[#155D59]'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Dispatched Orders ({serverOrders.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'settings'
                  ? 'border-[#287F7B] text-[#155D59]'
                  : 'border-transparent text-[#2D3748]/70 hover:text-[#155D59]'
              }`}
            >
              Taxes & Fulfillment
            </button>
          </div>

          {/* Body */}
          <div className="p-6 max-h-[65vh] overflow-y-auto">
            {activeTab === 'prices' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#8B5E3C] bg-[#FFF5E4] p-3 rounded-lg border border-[#287F7B]/10">
                  <span>
                    As per café instructions, all drink prices are fully configurable by staff. Adjust amounts or mark items out of stock in real-time.
                  </span>
                  {savedNotice && (
                    <span className="flex items-center gap-1 text-[#287F7B] font-bold">
                      <Check className="w-3.5 h-3.5" /> Saved
                    </span>
                  )}
                </div>

                <div className="divide-y divide-[#287F7B]/10 border border-[#287F7B]/15 rounded-xl overflow-hidden bg-white">
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FFF5E4]/30"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded object-cover border border-[#287F7B]/10 shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-[#155D59]">{item.name}</h4>
                          <span className="text-[11px] text-[#8B5E3C]">
                            {item.category} {item.isSeasonal ? '· Seasonal' : ''}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <label className="flex items-center gap-1.5 text-xs text-[#2D3748]">
                          <span className="text-[#8B5E3C] font-semibold">$</span>
                          <input
                            type="number"
                            step="0.25"
                            min="0"
                            value={item.price}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              updateMenuItemPrice(item.id, val);
                              setSavedNotice(true);
                              setTimeout(() => setSavedNotice(false), 1500);
                            }}
                            className="w-20 px-2 py-1 bg-[#FFF5E4] border border-[#287F7B]/20 rounded text-xs font-semibold tabular-nums text-[#155D59] focus:outline-none focus:ring-1 focus:ring-[#287F7B]"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => toggleMenuItemAvailability(item.id)}
                          className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                            item.available
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {item.available ? 'In Stock' : 'Sold Out'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#2D3748]/80">
                    Incoming customer order requests delivered to <strong>{cafeConfig.orderEmail}</strong>.
                  </p>
                  <button
                    onClick={fetchServerOrders}
                    className="inline-flex items-center gap-1 text-xs text-[#287F7B] hover:text-[#155D59] font-medium cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingOrders ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>

                {serverOrders.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#2D3748]/70 bg-[#FFF5E4] rounded-xl border border-[#287F7B]/15">
                    No orders have been submitted yet. Go to the Menu page, add drinks, and submit a test order request to see the full notification payload here!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {serverOrders.map((ord, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white rounded-xl border border-[#287F7B]/15 shadow-2xs space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between border-b border-[#287F7B]/10 pb-2">
                          <span className="font-mono font-bold text-[#155D59]">
                            {ord.orderReference}
                          </span>
                          <span className="text-[11px] text-[#8B5E3C]">{ord.submittedAt}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[#2D3748]/80">
                          <div>
                            <strong>Customer:</strong> {ord.customerName} ({ord.customerPhone})
                          </div>
                          <div>
                            <strong>Total:</strong> ${ord.total?.toFixed(2)} ({ord.items?.length} items)
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-emerald-700 font-medium">
                            ✓ Dispatched to {ord.destinationEmail}
                          </span>
                          <button
                            onClick={() =>
                              setSelectedOrderView(selectedOrderView === ord ? null : ord)
                            }
                            className="inline-flex items-center gap-1 text-xs text-[#287F7B] hover:underline cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{selectedOrderView === ord ? 'Hide Raw Email' : 'View Raw Email'}</span>
                          </button>
                        </div>

                        {selectedOrderView === ord && (
                          <pre className="p-3 bg-[#155D59] text-[#FFF5E4] rounded-lg text-[11px] whitespace-pre-wrap font-mono mt-2 overflow-x-auto">
                            {ord.emailPayload?.body}
                          </pre>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#155D59] mb-1">
                    Notification Recipient Email
                  </label>
                  <input
                    type="email"
                    value={cafeConfig.orderEmail}
                    onChange={(e) => updateCafeConfig({ orderEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#287F7B]/20 rounded text-[#155D59]"
                  />
                  <p className="text-[11px] text-[#8B5E3C] mt-1">
                    Confirmed café inbox: karuncafe@gmail.com
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-[#155D59] mb-1">
                    Sales Tax Rate (Denver Combined ~8.81%)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={cafeConfig.taxRate}
                    onChange={(e) =>
                      updateCafeConfig({ taxRate: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#287F7B]/20 rounded text-[#155D59]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#155D59] mb-1">
                    Instagram Handle & URL
                  </label>
                  <input
                    type="text"
                    value={cafeConfig.instagramUrl}
                    onChange={(e) => updateCafeConfig({ instagramUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#287F7B]/20 rounded text-[#155D59]"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-[#FFF5E4] border-t border-[#287F7B]/15 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
