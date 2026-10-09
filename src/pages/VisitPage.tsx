import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, ArrowRight, Send, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SunflowerIcon } from '../components/KarunLogo';

export const VisitPage: React.FC = () => {
  const { cafeConfig, setActivePage } = useCart();
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('General Question');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO */}
      <section className="bg-[#FFF5E4] border-b border-[#287F7B]/15 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#287F7B]">
            <SunflowerIcon className="w-4 h-4" />
            <span>Civic Center Park · Denver, Colorado</span>
          </div>

          <div>
            <span className="font-signature text-3xl sm:text-4xl text-[#287F7B] block -mb-1">
              parkside hospitality
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#155D59]">
              Come Find Your Karun Moment.
            </h1>
          </div>

          <p className="text-base sm:text-lg text-[#2D3748]/85 max-w-2xl mx-auto leading-relaxed">
            Nestled amid historic civic monuments, green lawns, and Rocky Mountain views. Visit us for morning rituals, midday refreshes, or weekend community park strolls.
          </p>
        </div>
      </section>

      {/* 2. LOCATION & HOURS CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Location */}
          <div className="p-8 bg-[#FFFCF6] rounded-2xl border border-[#287F7B]/15 space-y-4 shadow-sm text-left">
            <div className="w-12 h-12 rounded-xl bg-[#FFF5E4] flex items-center justify-center text-[#287F7B]">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#155D59]">
              Our Location
            </h3>
            <div className="text-sm text-[#2D3748]/85 space-y-1">
              <p className="font-semibold text-[#155D59]">{cafeConfig.name}</p>
              <p>{cafeConfig.fullAddress}</p>
              <p className="text-xs text-[#8B5E3C] pt-1">
                Located near the historic Greek Amphitheater and central park lawns.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Civic+Center+Park+Denver+CO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#287F7B] hover:text-[#155D59]"
            >
              <span>Google Maps Directions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Hours */}
          <div className="p-8 bg-[#FFFCF6] rounded-2xl border border-[#287F7B]/15 space-y-4 shadow-sm text-left">
            <div className="w-12 h-12 rounded-xl bg-[#FFF5E4] flex items-center justify-center text-[#287F7B]">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#155D59]">
              Service Hours
            </h3>
            <div className="text-sm text-[#2D3748]/85 space-y-2">
              <div>
                <p className="font-semibold text-[#155D59]">Tuesday – Friday</p>
                <p className="text-xs text-[#2D3748]/70">7:30 AM – 3:30 PM</p>
              </div>
              <div>
                <p className="font-semibold text-[#155D59]">Saturday – Sunday</p>
                <p className="text-xs text-[#2D3748]/70">8:00 AM – 4:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-[#8B5E3C]">Mondays</p>
                <p className="text-xs text-[#2D3748]/70">Closed for sourcing & roasting</p>
              </div>
            </div>
          </div>

          {/* Card 3: Inquiries & Social */}
          <div className="p-8 bg-[#FFFCF6] rounded-2xl border border-[#287F7B]/15 space-y-4 shadow-sm text-left">
            <div className="w-12 h-12 rounded-xl bg-[#FFF5E4] flex items-center justify-center text-[#287F7B]">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#155D59]">
              Connect With Us
            </h3>
            <div className="text-sm text-[#2D3748]/85 space-y-2">
              <div>
                <p className="font-semibold text-[#155D59]">Order Desk Email</p>
                <a
                  href={`mailto:${cafeConfig.orderEmail}`}
                  className="text-xs text-[#287F7B] hover:underline"
                >
                  {cafeConfig.orderEmail}
                </a>
              </div>
              <div>
                <p className="font-semibold text-[#155D59]">Phone Inquiries</p>
                <p className="text-xs text-[#2D3748]/70">{cafeConfig.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-[#155D59]">Instagram Community</p>
                <a
                  href={cafeConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#F4B54F] hover:underline font-medium inline-flex items-center gap-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{cafeConfig.instagramHandle}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE VERIFIED MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF5E4] rounded-3xl p-6 sm:p-10 border border-[#287F7B]/20 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E3C]">
                Verified Location Listing
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#155D59]">
                Civic Center Park, Denver, Colorado
              </h3>
            </div>
            <a
              href="https://maps.google.com/?q=Civic+Center+Park+Denver+CO"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2 shrink-0"
            >
              <span>Open in Google Maps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-[#287F7B]/20 bg-white h-[420px]">
            <iframe
              title="Verified Map Listing of Civic Center Park Denver for Karun Cafe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.896749964551!2d-104.98971272347102!3d39.73919997155609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c78d46fb332c9%3A0xc3f0b2f69e6bca7!2sCivic%20Center%20Park!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* 4. CONTACT / CATERING INQUIRY FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFCF6] border border-[#287F7B]/20 rounded-3xl p-8 sm:p-12 space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E3C]">
              Get in Touch
            </span>
            <h3 className="font-serif-display text-3xl font-bold text-[#155D59]">
              Event Inquiries, Park Questions & Group Orders
            </h3>
            <p className="text-sm text-[#2D3748]/80 leading-relaxed">
              Planning a group gathering at Civic Center Park or have questions about our seasonal menu? Send a message directly to our team.
            </p>
          </div>

          {inquirySent ? (
            <div className="p-6 bg-[#FFF5E4] rounded-2xl border border-[#287F7B]/20 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#287F7B] mx-auto" />
              <h4 className="font-serif-display text-2xl font-bold text-[#155D59]">
                Message Received!
              </h4>
              <p className="text-xs text-[#2D3748]/85 max-w-md mx-auto">
                Thank you, {inquiryName}. Your inquiry has been routed to <strong>{cafeConfig.orderEmail}</strong>. A member of the Karun Cafe team will get back to you shortly.
              </p>
              <button
                onClick={() => setInquirySent(false)}
                className="mt-2 text-xs font-bold text-[#287F7B] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#155D59] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    className="w-full px-3.5 py-2.5 bg-[#FFF5E4]/60 border border-[#287F7B]/20 rounded-lg text-xs text-[#155D59] focus:outline-none focus:ring-1 focus:ring-[#287F7B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#155D59] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="e.g. maya@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FFF5E4]/60 border border-[#287F7B]/20 rounded-lg text-xs text-[#155D59] focus:outline-none focus:ring-1 focus:ring-[#287F7B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#155D59] mb-1">
                  Subject / Inquiry Type
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FFF5E4] border border-[#287F7B]/20 rounded-lg text-xs text-[#155D59] focus:outline-none focus:ring-1 focus:ring-[#287F7B]"
                >
                  <option value="General Question">General Question</option>
                  <option value="Park Event Catering">Park Event / Group Drink Order</option>
                  <option value="Ingredient & Allergen Info">Ingredient & Allergen Information</option>
                  <option value="Feedback">Feedback for our Baristas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#155D59] mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="How can we help make your Karun Cafe experience memorable?"
                  className="w-full px-3.5 py-2.5 bg-[#FFF5E4]/60 border border-[#287F7B]/20 rounded-lg text-xs text-[#155D59] focus:outline-none focus:ring-1 focus:ring-[#287F7B]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-[#287F7B] hover:bg-[#155D59] text-[#FFF5E4] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5 text-[#F4B54F]" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
