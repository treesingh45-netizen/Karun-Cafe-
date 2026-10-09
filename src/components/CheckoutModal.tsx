import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, ArrowLeft, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SunflowerIcon } from './KarunLogo';

interface OrderConfirmation {
  orderReference: string;
  submittedAt: string;
  deliveredTo: string;
  customerName: string;
}

export const CheckoutModal: React.FC = () => {
  const {
    items,
    subtotal,
    taxesAndFees,
    total,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    cafeConfig,
  } = useCart();

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fulfillmentMethod, setFulfillmentMethod] = useState(
    'In-Person Pickup at Civic Center Park Bar'
  );
  const [deliverySpot, setDeliverySpot] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [confirmedCheck, setConfirmedCheck] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);
  const [submittedItemsSnapshot, setSubmittedItemsSnapshot] = useState(items);

  if (!isCheckoutOpen) return null;

  const isDelivery = fulfillmentMethod.includes('Bench Delivery');

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name, phone number, and email address.');
      return;
    }

    if (!confirmedCheck) {
      setErrorMsg('Please check the confirmation box acknowledging your order request details.');
      return;
    }

    if (items.length === 0 && !orderConfirmation) {
      setErrorMsg('Your order bag is empty.');
      return;
    }

    setIsSubmitting(true);
    setSubmittedItemsSnapshot([...items]);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: fullName.trim(),
          customerPhone: phone.trim(),
          customerEmail: email.trim(),
          fulfillmentMethod,
          fulfillmentDetails: isDelivery
            ? `Civic Center Park Bench / Landmark: ${deliverySpot.trim() || 'Unspecified location in park'}`
            : 'In-person pickup at Karun Cafe open-air bar, Civic Center Park, Denver',
          customerNotes: orderNotes.trim(),
          items: items.map((i) => ({
            id: i.menuItemId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            temperature: i.temperature,
            milkOption: i.milkOption,
            sweetness: i.sweetness,
          })),
          subtotal,
          taxesAndFees,
          total,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit order request. Please try again.');
      }

      // Success: Clear cart and display confirmation
      setOrderConfirmation({
        orderReference: data.orderReference,
        submittedAt: data.submittedAt,
        deliveredTo: data.deliveredTo,
        customerName: fullName.trim(),
      });
      clearCart();
    } catch (err: any) {
      console.error('Order submission error:', err);
      setErrorMsg(err.message || 'Network error submitting order. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderConfirmation(null);
    setErrorMsg(null);
  };

  const handleBackToCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-2.5 sm:p-4 text-center">
        <div className="relative w-full max-w-2xl my-3 sm:my-8 transform overflow-hidden rounded-2xl bg-[#FFFCF6] text-left shadow-2xl transition-all border border-[#287F7B]/20 max-h-[92vh] flex flex-col">
          {/* Header */}
          <div className="shrink-0 px-4 py-3.5 sm:px-6 sm:py-4 bg-[#FFF5E4] border-b border-[#287F7B]/15 flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <SunflowerIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-[#287F7B]" />
              <div className="min-w-0 flex-1">
                <h3 className="font-serif-display text-sm sm:text-lg md:text-xl font-bold text-[#155D59] whitespace-nowrap tracking-tight sm:tracking-normal leading-tight">
                  {orderConfirmation ? 'Order Received' : 'Review & Submit Order Request'}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#8B5E3C] truncate">
                  Civic Center Park · Denver, Colorado
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-[#155D59] hover:text-[#287F7B] hover:bg-[#287F7B]/10 rounded-md transition-colors cursor-pointer shrink-0"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 sm:p-8 overscroll-contain">
            {orderConfirmation ? (
              /* Success / Confirmation State */
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-[#287F7B]/10 text-[#287F7B] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#155D59]">
                    Thank You for Your Order!
                  </h4>
                  <p className="text-sm text-[#2D3748]/85 max-w-lg mx-auto leading-relaxed">
                    Your order request has been received by Karun Cafe. Our team will review your order and contact you to confirm availability and any outstanding details.
                  </p>
                </div>

                {/* Reference Card */}
                <div className="p-5 bg-[#FFF5E4] rounded-xl border border-[#287F7B]/20 text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-[#287F7B]/15 pb-2.5">
                    <span className="text-xs uppercase font-bold tracking-wider text-[#155D59]">
                      Order Reference
                    </span>
                    <span className="font-mono text-base font-bold text-[#8B5E3C]">
                      {orderConfirmation.orderReference}
                    </span>
                  </div>

                  <div className="text-xs text-[#2D3748]/80 space-y-1">
                    <p>
                      <strong className="text-[#155D59]">Customer:</strong> {orderConfirmation.customerName}
                    </p>
                    <p>
                      <strong className="text-[#155D59]">Submitted:</strong> {orderConfirmation.submittedAt}
                    </p>
                    <p>
                      <strong className="text-[#155D59]">Notification Dispatched to:</strong>{' '}
                      <span className="text-[#287F7B] font-medium">{orderConfirmation.deliveredTo}</span>
                    </p>
                  </div>

                  {/* Summary of submitted drinks */}
                  <div className="pt-2 border-t border-[#287F7B]/10">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#155D59] mb-2">
                      Selected Drinks
                    </p>
                    <ul className="text-xs text-[#2D3748]/80 space-y-1.5 divide-y divide-[#287F7B]/5">
                      {submittedItemsSnapshot.map((i, idx) => (
                        <li key={idx} className="pt-1.5 flex justify-between">
                          <span>
                            {i.quantity}x {i.name} ({i.temperature}, {i.milkOption})
                          </span>
                          <span className="font-medium tabular-nums">
                            ${(i.price * i.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-[#FFFCF6] border border-[#F4B54F]/40 rounded-lg text-xs text-[#8B5E3C] leading-relaxed text-left">
                  <strong>Pending Status Note:</strong> As noted, all orders are treated as order requests pending café confirmation. Our bar team at Civic Center Park will verify real-time ingredient stock and prepare your order accordingly.
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="w-full sm:w-auto px-8 py-3 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Done & Return to Menu
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Section 1: Customer Information */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[#155D59]">
                      1. Customer Information
                    </h4>
                    <span className="text-[11px] text-[#8B5E3C]">* Required fields</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#2D3748] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Jordan Smith"
                        className="w-full px-3.5 py-2.5 bg-[#FFF5E4]/60 border border-[#287F7B]/20 rounded-lg text-sm text-[#155D59] placeholder-[#155D59]/40 focus:outline-none focus:ring-1 focus:ring-[#287F7B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#2D3748] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. (303) 555-0192"
                        className="w-full px-3.5 py-2.5 bg-[#FFF5E4]/60 border border-[#287F7B]/20 rounded-lg text-sm text-[#155D59] placeholder-[#155D59]/40 focus:outline-none focus:ring-1 focus:ring-[#287F7B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2D3748] mb-1">
                      Email Address * (For order updates)
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. jordan@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#FFF5E4]/60 border border-[#287F7B]/20 rounded-lg text-sm text-[#155D59] placeholder-[#155D59]/40 focus:outline-none focus:ring-1 focus:ring-[#287F7B]"
                    />
                  </div>
                </div>

                {/* Section 2: Fulfillment */}
                <div className="space-y-4 pt-4 border-t border-[#287F7B]/10">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#155D59]">
                    2. Fulfillment Method
                  </h4>

                  <div className="space-y-2">
                    {cafeConfig.fulfillmentOptions.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          fulfillmentMethod === opt
                            ? 'bg-[#FFF5E4] border-[#287F7B]'
                            : 'border-[#287F7B]/15 hover:bg-[#FFF5E4]/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="fulfillment"
                          checked={fulfillmentMethod === opt}
                          onChange={() => setFulfillmentMethod(opt)}
                          className="mt-0.5 text-[#287F7B] focus:ring-[#287F7B]"
                        />
                        <div className="text-xs">
                          <span className="font-semibold text-[#155D59]">{opt}</span>
                          {opt.includes('In-Person Pickup') && (
                            <p className="text-[#2D3748]/70 mt-0.5">
                              Pickup directly from our open-air cart at Civic Center Park, Denver.
                            </p>
                          )}
                          {opt.includes('Bench Delivery') && (
                            <p className="text-[#2D3748]/70 mt-0.5">
                              Our barista will bring your drinks to your bench or lawn spot inside Civic Center Park.
                            </p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>

                  {isDelivery && (
                    <div className="p-3 bg-[#FFF5E4] rounded-lg border border-[#287F7B]/15">
                      <label className="block text-xs font-medium text-[#155D59] mb-1">
                        Park Location / Bench Landmark *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliverySpot}
                        onChange={(e) => setDeliverySpot(e.target.value)}
                        placeholder="e.g. Bench near Greek Amphitheater / North lawn under the oak trees"
                        className="w-full px-3 py-2 bg-white border border-[#287F7B]/20 rounded text-xs text-[#155D59] focus:outline-none focus:ring-1 focus:ring-[#287F7B]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-[#2D3748] mb-1">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Special temperature preferences, allergy alerts, extra cinnamon, etc."
                      className="w-full px-3.5 py-2.5 bg-[#FFF5E4]/60 border border-[#287F7B]/20 rounded-lg text-xs text-[#155D59] placeholder-[#155D59]/40 focus:outline-none focus:ring-1 focus:ring-[#287F7B]"
                    />
                  </div>
                </div>

                {/* Section 3: Order Summary */}
                <div className="p-4 bg-[#FFF5E4] rounded-xl border border-[#287F7B]/15 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#287F7B]/15 pb-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-[#155D59]">
                      Order Summary ({items.length} items)
                    </span>
                    <button
                      type="button"
                      onClick={handleBackToCart}
                      className="text-xs font-medium text-[#287F7B] hover:underline cursor-pointer"
                    >
                      Modify Bag
                    </button>
                  </div>

                  <div className="max-h-36 overflow-y-auto space-y-1.5 text-xs text-[#2D3748]/80 pr-1">
                    {items.map((i) => (
                      <div key={i.cartItemId} className="flex justify-between items-center py-1">
                        <span>
                          {i.quantity}x {i.name} ({i.temperature}, {i.milkOption})
                        </span>
                        <span className="font-medium tabular-nums">
                          ${(i.price * i.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#287F7B]/15 space-y-1 text-xs">
                    <div className="flex justify-between text-[#2D3748]/80">
                      <span>Subtotal</span>
                      <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#2D3748]/80">
                      <span>Denver Taxes & Fees (8.81%)</span>
                      <span className="tabular-nums">${taxesAndFees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#155D59] pt-1">
                      <span>Total</span>
                      <span className="font-serif-display text-lg text-[#8B5E3C] tabular-nums">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Required Confirmation Checkbox */}
                <div className="pt-1">
                  <label
                    className={`flex items-start gap-3 p-3 sm:p-3.5 rounded-lg border cursor-pointer transition-colors ${
                      confirmedCheck
                        ? 'bg-[#FFF5E4] border-[#287F7B]'
                        : 'bg-[#FFFCF6] border-[#287F7B]/20 hover:bg-[#FFF5E4]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={confirmedCheck}
                      onChange={(e) => {
                        setConfirmedCheck(e.target.checked);
                        if (errorMsg) setErrorMsg(null);
                      }}
                      className="mt-0.5 w-4 h-4 rounded text-[#287F7B] accent-[#287F7B] focus:ring-[#287F7B] shrink-0 cursor-pointer"
                    />
                    <span className="text-xs text-[#2D3748]/85 leading-snug">
                      I acknowledge that I have checked my order details and understand this is an online order request pending review and confirmation by Karun Cafe.
                    </span>
                  </label>
                </div>

                {/* Dispatch note */}
                <div className="text-[11px] text-[#8B5E3C] flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-[#287F7B] shrink-0" />
                  <span>
                    Your order notification will be dispatched directly to <strong>{cafeConfig.orderEmail}</strong>.
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleBackToCart}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-[#287F7B]/30 hover:bg-[#FFF5E4] text-[#155D59] font-medium text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">Return to Bag</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-3 px-5 sm:px-6 font-semibold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all duration-200 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap ${
                      confirmedCheck
                        ? 'bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] shadow-md active:scale-[0.98]'
                        : 'bg-[#287F7B]/85 hover:bg-[#287F7B] text-[#FFF5E4]'
                    } disabled:bg-gray-300 disabled:text-gray-500`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                        <span className="whitespace-nowrap">Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span className="whitespace-nowrap">Submit Order Request</span>
                        <Send className="w-4 h-4 text-[#F4B54F] shrink-0" />
                      </>
                    )}
                  </button>
                </div>

                {!confirmedCheck && (
                  <p className="text-[11px] text-[#8B5E3C] text-center pt-0.5">
                    * Tap the acknowledgement box above before submitting your request
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
