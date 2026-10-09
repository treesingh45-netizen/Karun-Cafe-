import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FlavorSommelierModal } from './components/FlavorSommelierModal';
import { CafeManagerModal } from './components/CafeManagerModal';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { SeasonalPage } from './pages/SeasonalPage';
import { VisitPage } from './pages/VisitPage';
import { GalleryPage } from './pages/GalleryPage';
import { FaqPage } from './pages/FaqPage';

const AppContent: React.FC = () => {
  const { activePage } = useCart();
  const [isSommelierOpen, setIsSommelierOpen] = useState(false);
  const [isCafeManagerOpen, setIsCafeManagerOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage onOpenSommelier={() => setIsSommelierOpen(true)} />;
      case 'menu':
        return (
          <MenuPage
            onOpenSommelier={() => setIsSommelierOpen(true)}
            onOpenCafeManager={() => setIsCafeManagerOpen(true)}
          />
        );
      case 'story':
        return <OurStoryPage />;
      case 'seasonal':
        return <SeasonalPage />;
      case 'visit':
        return <VisitPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'faq':
        return <FaqPage />;
      default:
        return <HomePage onOpenSommelier={() => setIsSommelierOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFCF6] text-[#2D3748]">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar onOpenSommelier={() => setIsSommelierOpen(true)} />

      {/* Main Page View */}
      <main className={`flex-1 ${activePage === 'home' ? '' : 'pt-20'}`}>
        {renderCurrentPage()}
      </main>

      {/* Integrated Cart Drawer */}
      <CartDrawer />

      {/* Integrated Same-Page Checkout Modal */}
      <CheckoutModal />

      {/* Flavor Sommelier (Gemini 3.1 Pro Thinking Mode) */}
      <FlavorSommelierModal
        isOpen={isSommelierOpen}
        onClose={() => setIsSommelierOpen(false)}
      />

      {/* Cafe Manager & Order Desk Modal */}
      <CafeManagerModal
        isOpen={isCafeManagerOpen}
        onClose={() => setIsCafeManagerOpen(false)}
      />

      {/* Branded Footer */}
      <Footer onOpenCafeManager={() => setIsCafeManagerOpen(true)} />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
