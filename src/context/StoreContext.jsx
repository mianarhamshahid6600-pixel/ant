import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PRODUCTS, 
  CATEGORIES, 
  DISTRIBUTOR_INFO, 
  DEFAULT_CATALOG_SERIES, 
  DEFAULT_SITE_CONTENT, 
  DEFAULT_TICKER_SETTINGS, 
  DEFAULT_PROMOTIONS 
} from '../data/products';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Theme State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('alnoor_theme');
    return saved || 'dark';
  });

  // Active Navigation Page ('home', 'shop', 'catalog', 'about', 'contact', 'admin', 'demo', 'product')
  const [currentPage, setCurrentPage] = useState('home');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [priceRange, setPriceRange] = useState(15000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  // Products Dynamic State (LocalStorage persistent)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('alnoor_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Categories Dynamic State (LocalStorage persistent)
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('alnoor_categories');
      return saved ? JSON.parse(saved) : CATEGORIES;
    } catch {
      return CATEGORIES;
    }
  });

  // Catalog Series Dynamic State
  const [catalogSeries, setCatalogSeries] = useState(() => {
    try {
      const saved = localStorage.getItem('alnoor_catalog_series');
      return saved ? JSON.parse(saved) : DEFAULT_CATALOG_SERIES;
    } catch {
      return DEFAULT_CATALOG_SERIES;
    }
  });

  // Distributor Information
  const [distributor, setDistributor] = useState(() => {
    try {
      const saved = localStorage.getItem('alnoor_distributor');
      return saved ? JSON.parse(saved) : DISTRIBUTOR_INFO;
    } catch {
      return DISTRIBUTOR_INFO;
    }
  });

  // Site Content (Hero, About, etc.)
  const [siteContent, setSiteContent] = useState(() => {
    try {
      const saved = localStorage.getItem('alnoor_site_content');
      return saved ? JSON.parse(saved) : DEFAULT_SITE_CONTENT;
    } catch {
      return DEFAULT_SITE_CONTENT;
    }
  });

  // Top Ticker Settings
  const [tickerSettings, setTickerSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('alnoor_ticker_settings');
      return saved ? JSON.parse(saved) : DEFAULT_TICKER_SETTINGS;
    } catch {
      return DEFAULT_TICKER_SETTINGS;
    }
  });

  // Promotional Sales Settings
  const [promotions, setPromotions] = useState(() => {
    try {
      const saved = localStorage.getItem('alnoor_promotions');
      return saved ? JSON.parse(saved) : DEFAULT_PROMOTIONS;
    } catch {
      return DEFAULT_PROMOTIONS;
    }
  });

  // Admin Security & Authentication
  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem('alnoor_admin_pin') || '6600';
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('alnoor_admin_auth') === 'true';
  });

  const [isAdminPinModalOpen, setIsAdminPinModalOpen] = useState(false);

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

  // Orders / WhatsApp Inquiry Logs
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('alnoor_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'ORD-1001',
          date: '2026-09-02 14:30',
          customerName: 'Muhammad Tariq (Contractor)',
          phone: '03001234567',
          city: 'Faisalabad (Madina Town)',
          items: [
            { name: 'Art Series - Matte Black 1-Gang Switch', qty: 40, price: 520 },
            { name: 'Art Series - Space Grey Universal Socket', qty: 25, price: 710 }
          ],
          total: 38550,
          status: 'Confirmed',
          type: 'Contractor Order'
        },
        {
          id: 'ORD-1002',
          date: '2026-09-03 11:15',
          customerName: 'Sheikh Imran (Architect)',
          phone: '03219876543',
          city: 'Faisalabad (D Ground)',
          items: [
            { name: 'LG Real Glass Series - 8-Gang Luxury Board', qty: 6, price: 2950 },
            { name: 'OptiGlow 12W 3-in-1 SMD Panel', qty: 30, price: 580 }
          ],
          total: 35100,
          status: 'Pending',
          type: 'WhatsApp Quote'
        }
      ];
    } catch {
      return [];
    }
  });

  // Apply Theme class to document body
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-light';
    localStorage.setItem('alnoor_theme', theme);
  }, [theme]);

  // Sync Data to LocalStorage
  useEffect(() => {
    localStorage.setItem('alnoor_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('alnoor_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('alnoor_catalog_series', JSON.stringify(catalogSeries));
  }, [catalogSeries]);

  useEffect(() => {
    localStorage.setItem('alnoor_distributor', JSON.stringify(distributor));
  }, [distributor]);

  useEffect(() => {
    localStorage.setItem('alnoor_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('alnoor_ticker_settings', JSON.stringify(tickerSettings));
  }, [tickerSettings]);

  useEffect(() => {
    localStorage.setItem('alnoor_promotions', JSON.stringify(promotions));
  }, [promotions]);

  useEffect(() => {
    localStorage.setItem('alnoor_orders', JSON.stringify(orders));
  }, [orders]);

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
    }, 3200);
  };

  // Page Transition Wall State ('idle', 'closing', 'opening')
  const [transitionStatus, setTransitionStatus] = useState('idle');

  const navigateTo = (page, categoryFilter = null) => {
    if (page === currentPage && !categoryFilter) return;

    setTransitionStatus('closing');

    setTimeout(() => {
      setCurrentPage(page);
      if (categoryFilter) {
        setSelectedCategory(categoryFilter);
      }
      window.scrollTo({ top: 0, behavior: 'instant' });

      setTransitionStatus('opening');

      setTimeout(() => {
        setTransitionStatus('idle');
      }, 680);
    }, 650);
  };

  // ================= ADMIN AUTHENTICATION =================
  const verifyAdminPin = (enteredPin) => {
    if (enteredPin === adminPin) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('alnoor_admin_auth', 'true');
      setIsAdminPinModalOpen(false);
      showToast('Master Access Granted! Welcome to Admin Panel.', 'success');
      navigateTo('admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('alnoor_admin_auth');
    showToast('Logged out of Admin Portal.', 'info');
    if (currentPage === 'admin') {
      navigateTo('home');
    }
  };

  const updateAdminPin = (newPin) => {
    if (!newPin || newPin.length < 4) {
      showToast('PIN must be at least 4 digits', 'warning');
      return false;
    }
    setAdminPin(newPin);
    localStorage.setItem('alnoor_admin_pin', newPin);
    showToast('Master PIN updated successfully!', 'success');
    return true;
  };

  // ================= PRODUCT CRUD OPERATIONS =================
  const addProduct = (productData) => {
    const newId = productData.id || `prod-${Date.now()}`;
    const newProduct = {
      ...productData,
      id: newId,
      hidden: !!productData.hidden,
      inStock: productData.inStock !== false,
      featured: !!productData.featured,
      rating: Number(productData.rating) || 4.9,
      reviewsCount: Number(productData.reviewsCount) || 10,
      price: Number(productData.price) || 0,
      contractorPrice: Number(productData.contractorPrice) || Number(productData.price) || 0,
      originalPrice: Number(productData.originalPrice) || Number(productData.price) || 0,
      specs: productData.specs || {},
      features: productData.features || []
    };

    setProducts(prev => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name.slice(0, 24)}..." created successfully!`);
    return newProduct;
  };

  const updateProduct = (productId, updatedFields) => {
    setProducts(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const updated = {
            ...item,
            ...updatedFields,
            price: updatedFields.price !== undefined ? Number(updatedFields.price) : item.price,
            contractorPrice: updatedFields.contractorPrice !== undefined ? Number(updatedFields.contractorPrice) : item.contractorPrice,
            originalPrice: updatedFields.originalPrice !== undefined ? Number(updatedFields.originalPrice) : item.originalPrice
          };
          return updated;
        }
        return item;
      })
    );
    showToast('Product updated successfully!');
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(item => item.id !== productId));
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Product deleted from inventory.', 'info');
  };

  const toggleProductVisibility = (productId) => {
    setProducts(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const nextState = !item.hidden;
          showToast(`Product is now ${nextState ? 'Hidden' : 'Visible'} on store.`);
          return { ...item, hidden: nextState };
        }
        return item;
      })
    );
  };

  const toggleProductStock = (productId) => {
    setProducts(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const nextStock = !item.inStock;
          showToast(`Stock marked: ${nextStock ? 'In Stock' : 'Out of Stock'}.`);
          return { ...item, inStock: nextStock };
        }
        return item;
      })
    );
  };

  const toggleProductFeatured = (productId) => {
    setProducts(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const nextFeatured = !item.featured;
          showToast(`Product ${nextFeatured ? 'Featured on Home' : 'Removed from Featured'}.`);
          return { ...item, featured: nextFeatured };
        }
        return item;
      })
    );
  };

  const duplicateProduct = (productId) => {
    const target = products.find(p => p.id === productId);
    if (!target) return;
    const cloned = {
      ...target,
      id: `prod-${Date.now()}`,
      name: `${target.name} (Copy)`,
      featured: false
    };
    setProducts(prev => [cloned, ...prev]);
    showToast(`Duplicated "${target.name.slice(0, 20)}..."`);
  };

  // ================= CATEGORY CRUD OPERATIONS =================
  const addCategory = (categoryData) => {
    const newId = categoryData.id || `cat-${Date.now()}`;
    const newCategory = {
      ...categoryData,
      id: newId,
      hidden: !!categoryData.hidden,
      count: Number(categoryData.count) || 0
    };
    setCategories(prev => [...prev, newCategory]);
    showToast(`Category "${newCategory.name}" added successfully!`);
    return newCategory;
  };

  const updateCategory = (categoryId, updatedFields) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === categoryId ? { ...cat, ...updatedFields } : cat))
    );
    showToast('Category updated successfully!');
  };

  const deleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    showToast('Category deleted.', 'info');
  };

  const toggleCategoryVisibility = (categoryId) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === categoryId) {
          const next = !cat.hidden;
          showToast(`Category is now ${next ? 'Hidden' : 'Visible'}.`);
          return { ...cat, hidden: next };
        }
        return cat;
      })
    );
  };

  // ================= CATALOG SERIES CRUD =================
  const addCatalogSeries = (seriesData) => {
    const newId = seriesData.id || `series-${Date.now()}`;
    const newSeries = { ...seriesData, id: newId };
    setCatalogSeries(prev => [...prev, newSeries]);
    showToast(`Series "${newSeries.title}" added to catalog.`);
    return newSeries;
  };

  const updateCatalogSeries = (seriesId, updatedFields) => {
    setCatalogSeries(prev =>
      prev.map(s => (s.id === seriesId ? { ...s, ...updatedFields } : s))
    );
    showToast('Catalog Series card updated!');
  };

  const deleteCatalogSeries = (seriesId) => {
    setCatalogSeries(prev => prev.filter(s => s.id !== seriesId));
    showToast('Catalog Series card removed.', 'info');
  };

  // ================= CONTENT & PROMOTIONS UPDATES =================
  const updateDistributor = (newInfo) => {
    setDistributor(prev => ({ ...prev, ...newInfo }));
    showToast('Store contact & location updated!');
  };

  const updateHeroContent = (newHero) => {
    setSiteContent(prev => ({ ...prev, hero: { ...prev.hero, ...newHero } }));
    showToast('Hero section content updated!');
  };

  const updateAboutContent = (newAbout) => {
    setSiteContent(prev => ({ ...prev, about: { ...prev.about, ...newAbout } }));
    showToast('About page content updated!');
  };

  const updateTicker = (newTicker) => {
    setTickerSettings(prev => ({ ...prev, ...newTicker }));
    showToast('Top notification ticker updated!');
  };

  const updatePromotionSettings = (newPromo) => {
    setPromotions(prev => ({ ...prev, ...newPromo }));
    showToast('Promotional sales settings saved!');
  };

  // ================= ORDERS / INQUIRY MANAGEMENT =================
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    showToast(`Order status updated to: ${newStatus}`);
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(ord => ord.id !== orderId));
    showToast('Order record removed.', 'info');
  };

  const addManualOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Pending',
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    showToast('Order inquiry logged successfully.');
  };

  // ================= BACKUP & FACTORY RESET =================
  const resetToFactoryDefaults = () => {
    setProducts(PRODUCTS);
    setCategories(CATEGORIES);
    setCatalogSeries(DEFAULT_CATALOG_SERIES);
    setDistributor(DISTRIBUTOR_INFO);
    setSiteContent(DEFAULT_SITE_CONTENT);
    setTickerSettings(DEFAULT_TICKER_SETTINGS);
    setPromotions(DEFAULT_PROMOTIONS);
    setAdminPin('6600');

    localStorage.removeItem('alnoor_products');
    localStorage.removeItem('alnoor_categories');
    localStorage.removeItem('alnoor_catalog_series');
    localStorage.removeItem('alnoor_distributor');
    localStorage.removeItem('alnoor_site_content');
    localStorage.removeItem('alnoor_ticker_settings');
    localStorage.removeItem('alnoor_promotions');
    localStorage.removeItem('alnoor_admin_pin');

    showToast('All store data reset to original factory defaults!', 'info');
  };

  const exportStoreData = () => {
    const backupData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      products,
      categories,
      catalogSeries,
      distributor,
      siteContent,
      tickerSettings,
      promotions
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `alnoor_traders_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Complete Store JSON backup downloaded!', 'success');
  };

  const importStoreData = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.products && Array.isArray(parsed.products)) setProducts(parsed.products);
      if (parsed.categories && Array.isArray(parsed.categories)) setCategories(parsed.categories);
      if (parsed.catalogSeries && Array.isArray(parsed.catalogSeries)) setCatalogSeries(parsed.catalogSeries);
      if (parsed.distributor) setDistributor(parsed.distributor);
      if (parsed.siteContent) setSiteContent(parsed.siteContent);
      if (parsed.tickerSettings) setTickerSettings(parsed.tickerSettings);
      if (parsed.promotions) setPromotions(parsed.promotions);

      showToast('Store data successfully imported and applied!', 'success');
      return true;
    } catch (err) {
      showToast('Invalid JSON backup file!', 'warning');
      return false;
    }
  };

  // ================= CART OPERATIONS =================
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
    const price = isContractorMode ? (item.contractorPrice || item.price) : item.price;
    return sum + price * item.quantity;
  }, 0);

  // Selected Product for Product Detail Page
  const [selectedProduct, setSelectedProduct] = useState(() => {
    return products[0] || null;
  });

  const viewProductDetail = (product) => {
    setTransitionStatus('closing');

    setTimeout(() => {
      setSelectedProduct(product);
      setCurrentPage('product');
      window.scrollTo({ top: 0, behavior: 'instant' });

      setTransitionStatus('opening');

      setTimeout(() => {
        setTransitionStatus('idle');
      }, 680);
    }, 650);
  };

  // Generate Direct WhatsApp URL for a Single Product
  const getWhatsAppProductUrl = (product, quantity = 1, notes = '') => {
    if (!product) {
      return `https://wa.me/${distributor.whatsappNumber}?text=${encodeURIComponent('Hello Alnoor Traders! I would like to order electrical and lighting products.')}`;
    }
    let msg = `*PRODUCT ORDER / INQUIRY - ALNOOR TRADERS*\n\n`;
    msg += `Hello! I want to order / check price for:\n`;
    msg += `📦 *Product:* ${product.name}\n`;
    msg += `🏷️ *Series:* ${product.series || 'Alnoor'}\n`;
    msg += `🔢 *Quantity:* ${quantity} pcs\n`;
    if (notes) {
      msg += `📝 *Note:* ${notes}\n`;
    }
    msg += `\nPlease confirm price and delivery. Thank you!`;
    return `https://wa.me/${distributor.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  // Generate WhatsApp Order Message
  const getWhatsAppOrderUrl = () => {
    if (cart.length === 0) {
      const baseMsg = `Hello Alnoor Traders! I would like to check prices for electrical and lighting products.`;
      return `https://wa.me/${distributor.whatsappNumber}?text=${encodeURIComponent(baseMsg)}`;
    }

    let text = `*NEW ORDER - ALNOOR TRADERS*\n`;
    text += `*Store:* Alnoor Traders (Bawana Bazar, Faisalabad)\n`;
    text += `------------------------------------\n`;

    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.name}*\n`;
      text += `   Quantity: ${item.quantity} pcs\n`;
      text += `   Series: ${item.series || 'Alnoor'}\n`;
    });

    text += `------------------------------------\n`;
    text += `*Total Items:* ${cartCount} pcs\n\n`;
    text += `Please confirm total price and delivery time. Thank you!`;

    // Also record into orders inquiries log
    addManualOrder({
      customerName: 'Online WhatsApp Shopper',
      phone: 'WhatsApp Checkout',
      city: 'Faisalabad & Pakistan',
      items: cart.map(i => ({ name: i.name, qty: i.quantity, price: isContractorMode ? i.contractorPrice : i.price })),
      total: cartSubtotal,
      type: 'Direct Cart WhatsApp'
    });

    return `https://wa.me/${distributor.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        currentPage,
        setCurrentPage,
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
        transitionStatus,
        setTransitionStatus,
        // Dynamic Store Data
        products,
        categories,
        catalogSeries,
        distributor,
        siteContent,
        tickerSettings,
        promotions,
        orders,
        // Admin Auth
        adminPin,
        isAdminAuthenticated,
        isAdminPinModalOpen,
        setIsAdminPinModalOpen,
        verifyAdminPin,
        logoutAdmin,
        updateAdminPin,
        // Product Management
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductVisibility,
        toggleProductStock,
        toggleProductFeatured,
        duplicateProduct,
        // Category Management
        addCategory,
        updateCategory,
        deleteCategory,
        toggleCategoryVisibility,
        // Catalog Series Management
        addCatalogSeries,
        updateCatalogSeries,
        deleteCatalogSeries,
        // Content Management
        updateDistributor,
        updateHeroContent,
        updateAboutContent,
        updateTicker,
        updatePromotionSettings,
        // Orders Management
        updateOrderStatus,
        deleteOrder,
        addManualOrder,
        // Backup & Restore
        resetToFactoryDefaults,
        exportStoreData,
        importStoreData
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
