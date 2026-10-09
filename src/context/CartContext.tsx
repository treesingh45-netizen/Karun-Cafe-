import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, initialMenuItems, CafeConfig, initialCafeConfig } from '../data/menuData';

export interface CartItem {
  cartItemId: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  temperature: 'Iced' | 'Hot';
  milkOption: string;
  sweetness: string;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, options?: { temperature?: 'Iced' | 'Hot'; milkOption?: string; sweetness?: string; quantity?: number }) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  taxesAndFees: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  menuItems: MenuItem[];
  updateMenuItemPrice: (id: string, newPrice: number) => void;
  toggleMenuItemAvailability: (id: string) => void;
  cafeConfig: CafeConfig;
  updateCafeConfig: (newConfig: Partial<CafeConfig>) => void;
  activePage: string;
  setActivePage: (page: string) => void;
  activeCategoryFilter: string;
  setActiveCategoryFilter: (category: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('karun_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      // Clear all legacy and stale menu storage caches so fresh images and items always load
      localStorage.removeItem('karun_menu_items');
      localStorage.removeItem('karun_menu_items_v2');
      localStorage.removeItem('karun_menu_v1');
      localStorage.removeItem('karun_menu_10_drinks');
      localStorage.removeItem('karun_menu');
      return initialMenuItems;
    } catch {
      return initialMenuItems;
    }
  });

  const [cafeConfig, setCafeConfig] = useState<CafeConfig>(() => {
    try {
      const saved = localStorage.getItem('karun_config');
      return saved ? JSON.parse(saved) : initialCafeConfig;
    } catch {
      return initialCafeConfig;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('karun_cart', JSON.stringify(items));
    } catch (e) {
      console.warn('Storage save failed', e);
    }
  }, [items]);

  // Persist menu changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('karun_menu_10_drinks', JSON.stringify(menuItems));
    } catch (e) {
      console.warn('Storage save failed', e);
    }
  }, [menuItems]);

  const addItem = (
    item: MenuItem,
    options?: { temperature?: 'Iced' | 'Hot'; milkOption?: string; sweetness?: string; quantity?: number }
  ) => {
    const temperature = options?.temperature || (item.category === 'Matcha' ? 'Iced' : 'Hot');
    const milkOption = options?.milkOption || 'Whole Milk';
    const sweetness = options?.sweetness || 'Standard Sweetness';
    const quantity = options?.quantity || 1;

    const cartItemId = `${item.id}-${temperature}-${milkOption}-${sweetness}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            menuItemId: item.id,
            name: item.name,
            price: item.price,
            quantity,
            temperature,
            milkOption,
            sweetness,
            image: item.image,
          },
        ];
      }
    });
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const updateMenuItemPrice = (id: string, newPrice: number) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: newPrice } : item))
    );
  };

  const toggleMenuItemAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, available: !item.available } : item))
    );
  };

  const updateCafeConfig = (newConfig: Partial<CafeConfig>) => {
    setCafeConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxesAndFees = subtotal * cafeConfig.taxRate;
  const total = subtotal + taxesAndFees;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        taxesAndFees,
        total,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        menuItems,
        updateMenuItemPrice,
        toggleMenuItemAvailability,
        cafeConfig,
        updateCafeConfig,
        activePage,
        setActivePage,
        activeCategoryFilter,
        setActiveCategoryFilter,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
