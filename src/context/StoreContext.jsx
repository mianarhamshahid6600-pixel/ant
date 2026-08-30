import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES, DISTRIBUTOR_INFO } from '../data/products';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Theme State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('alnoor_theme');
    return saved || 'dark';
  });

  // Active Navigation Page ('home', 'shop', 'catalog', 'about', 'contact')
  const [currentPage, setCurrentPage] = useState('home');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [priceRange, setPriceRange] = useState(15000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  // Cart & Quote State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('alnoor_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isContractorMode, setIsContractorMode] = useState(false);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Toast Notification
  const [toast, setToast] = useState(null);

  // Apply Theme class to document body
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-light';
    localStorage.setItem('alnoor_theme', theme);
  }, [theme]);

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('alnoor_cart', JSON.stringify(cart));
  }, [cart]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const navigateTo = (page, categoryFilter = null) => {
    setCurrentPage(page);
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Functions
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 26)}..." to your cart!`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared.', 'info');
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    const price = isContractorMode ? item.contractorPrice : item.price;
    return sum + price * item.quantity;
  }, 0);

  // Selected Product for Product Detail Page
  const [selectedProduct, setSelectedProduct] = useState(() => {
    return PRODUCTS[0] || null;
  });

  const viewProductDetail = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate Direct WhatsApp URL for a Single Product
  const getWhatsAppProductUrl = (product, quantity = 1, notes = '') => {
    if (!product) {
      return `https://wa.me/${DISTRIBUTOR_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Alnoor Traders! I would like to order Prime Lighting products.')}`;
    }
    let msg = `*PRODUCT ORDER / INQUIRY - ALNOOR TRADERS*\n\n`;
    msg += `Hello! I want to order / check price for:\n`;
    msg += `📦 *Product:* ${product.name}\n`;
    msg += `🏷️ *Series:* ${product.series || 'Prime'}\n`;
    msg += `🔢 *Quantity:* ${quantity} pcs\n`;
    if (notes) {
      msg += `📝 *Note:* ${notes}\n`;
    }
    msg += `\nPlease confirm price and delivery. Thank you!`;
    return `https://wa.me/${DISTRIBUTOR_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  // Generate WhatsApp Order Message
  const getWhatsAppOrderUrl = () => {
    if (cart.length === 0) {
      const baseMsg = `Hello Alnoor Traders! I would like to check prices for Prime Lighting products.`;
      return `https://wa.me/${DISTRIBUTOR_INFO.whatsappNumber}?text=${encodeURIComponent(baseMsg)}`;
    }

    let text = `*NEW ORDER - ALNOOR TRADERS*\n`;
    text += `*Distributor:* Alnoor Traders (Bawana Bazar, Faisalabad)\n`;
    text += `------------------------------------\n`;

    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.name}*\n`;
      text += `   Quantity: ${item.quantity} pcs\n`;
      text += `   Series: ${item.series}\n`;
    });

    text += `------------------------------------\n`;
    text += `*Total Items:* ${cartCount} pcs\n\n`;
    text += `Please confirm total price and delivery time. Thank you!`;

    return `https://wa.me/${DISTRIBUTOR_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        currentPage,
        navigateTo,
        selectedProduct,
        setSelectedProduct,
        viewProductDetail,
        getWhatsAppProductUrl,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedSeries,
        setSelectedSeries,
        priceRange,
        setPriceRange,
        onlyInStock,
        setOnlyInStock,
        sortBy,
        setSortBy,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        isContractorMode,
        setIsContractorMode,
        quickViewProduct,
        setQuickViewProduct,
        toast,
        showToast,
        getWhatsAppOrderUrl,
        products: PRODUCTS,
        categories: CATEGORIES,
        distributor: DISTRIBUTOR_INFO
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
