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
import {
  subscribeToStoreData,
  saveProductsToCloud,
  saveCategoriesToCloud,
  saveCatalogSeriesToCloud,
  saveSiteContentToCloud,
  saveTickerToCloud,
  savePromotionsToCloud,
  saveDistributorToCloud,
  saveSecurityPinToCloud,
  saveOrderToCloud,
  updateOrderStatusInCloud,
  deleteOrderFromCloud,
  syncAllToCloud,
  checkDatabaseInitialized
} from '../services/firestoreService';

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

  // Cloud Database Status
  const [cloudStatus, setCloudStatus] = useState('connecting'); // 'connecting' | 'connected' | 'offline'
  const [lastSyncTime, setLastSyncTime] = useState('');
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  // Products Dynamic State (LocalStorage + Cloud Firestore)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('alnoor_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Categories Dynamic State (LocalStorage + Cloud Firestore)
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

  // Orders / Real Customer Inquiry Logs (No sample or placeholder fake orders)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('alnoor_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter out legacy dummy sample orders if any exist
        return parsed.filter(o => o.id !== 'ORD-1001' && o.id !== 'ORD-1002');
      }
      return [];
    } catch {
      return [];
    }
  });

  // Real-time Firestore Cloud Synchronization & Auto-Seed
  useEffect(() => {
    // Initial verification: seed cloud database if empty
    checkDatabaseInitialized()
      .then((initialized) => {
        if (!initialized) {
          syncAllToCloud({
            products,
            categories,
            catalogSeries,
            siteContent,
            tickerSettings,
            promotions,
            distributor,
            adminPin
          }).then((res) => {
            if (res.success) {
              setCloudStatus('connected');
              setLastSyncTime(new Date().toLocaleTimeString());
            }
          }).catch(() => {});
        } else {
          setCloudStatus('connected');
        }
      })
      .catch(() => {});

    // Listen to real-time updates from Firebase Cloud Firestore
    const unsubscribe = subscribeToStoreData({
      onProducts: (cloudProducts) => {
        if (Array.isArray(cloudProducts) && cloudProducts.length > 0) {
          setProducts(cloudProducts);
          setLastSyncTime(new Date().toLocaleTimeString());
        }
      },
      onCategories: (cloudCategories) => {
        if (Array.isArray(cloudCategories) && cloudCategories.length > 0) {
          setCategories(cloudCategories);
          setLastSyncTime(new Date().toLocaleTimeString());
        }
      },
      onCatalogSeries: (cloudSeries) => {
        if (Array.isArray(cloudSeries) && cloudSeries.length > 0) {
          setCatalogSeries(cloudSeries);
        }
      },
      onSiteContent: (cloudContent) => {
        if (cloudContent && typeof cloudContent === 'object') {
          setSiteContent(cloudContent);
        }
      },
      onTicker: (cloudTicker) => {
        if (cloudTicker && typeof cloudTicker === 'object') {
          setTickerSettings(cloudTicker);
        }
      },
      onPromotions: (cloudPromos) => {
        if (cloudPromos && typeof cloudPromos === 'object') {
          setPromotions(cloudPromos);
        }
      },
      onDistributor: (cloudDistributor) => {
        if (cloudDistributor && typeof cloudDistributor === 'object') {
          setDistributor(cloudDistributor);
        }
      },
      onSecurityPin: (cloudPin) => {
        if (cloudPin && typeof cloudPin === 'string') {
          setAdminPin(cloudPin);
        }
      },
      onOrders: (cloudOrders) => {
        if (Array.isArray(cloudOrders)) {
          const cleanOrders = cloudOrders.filter(o => o.id !== 'ORD-1001' && o.id !== 'ORD-1002');
          setOrders(cleanOrders);
        }
      },
      onStatusChange: (status) => {
        setCloudStatus(status);
        if (status === 'connected') {
          setLastSyncTime(new Date().toLocaleTimeString());
        }
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Apply Theme class to document body
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-light';
    localStorage.setItem('alnoor_theme', theme);
  }, [theme]);

  // Sync Data to LocalStorage (Instant local cache)
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
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Page Navigation
  const [transitionStatus, setTransitionStatus] = useState('idle');

  const navigateTo = (pageName, category = 'all') => {
    if (pageName === 'shop' && category !== 'all') {
      setSelectedCategory(category);
    }
    
    setTransitionStatus('closing');

    setTimeout(() => {
      setCurrentPage(pageName);
      window.scrollTo({ top: 0, behavior: 'instant' });

      setTransitionStatus('opening');

      setTimeout(() => {
        setTransitionStatus('idle');
      }, 680);
    }, 650);
  };

  // Admin PIN verification
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
    saveSecurityPinToCloud(newPin);
    showToast('Master PIN updated and saved to database!', 'success');
    return true;
  };

  // ================= PRODUCT CRUD OPERATIONS (SYNCED TO CLOUD) =================
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

    const nextList = [newProduct, ...products];
    setProducts(nextList);
    saveProductsToCloud(nextList);
    showToast(`Product "${newProduct.name.slice(0, 24)}..." created & saved to database!`);
    return newProduct;
  };

  const updateProduct = (productId, updatedFields) => {
    const nextList = products.map(item => {
      if (item.id === productId) {
        return {
          ...item,
          ...updatedFields,
          price: updatedFields.price !== undefined ? Number(updatedFields.price) : item.price,
          contractorPrice: updatedFields.contractorPrice !== undefined ? Number(updatedFields.contractorPrice) : item.contractorPrice,
          originalPrice: updatedFields.originalPrice !== undefined ? Number(updatedFields.originalPrice) : item.originalPrice
        };
      }
      return item;
    });
    setProducts(nextList);
    saveProductsToCloud(nextList);
    showToast('Product updated in database!');
  };

  const deleteProduct = (productId) => {
    const nextList = products.filter(item => item.id !== productId);
    setProducts(nextList);
    setCart(prev => prev.filter(item => item.id !== productId));
    saveProductsToCloud(nextList);
    showToast('Product deleted from database.', 'info');
  };

  const toggleProductVisibility = (productId) => {
    let nextState;
    const nextList = products.map(item => {
      if (item.id === productId) {
        nextState = !item.hidden;
        return { ...item, hidden: nextState };
      }
      return item;
    });
    setProducts(nextList);
    saveProductsToCloud(nextList);
    showToast(`Product is now ${nextState ? 'Hidden' : 'Visible'} on store & database.`);
  };

  const toggleProductStock = (productId) => {
    let nextStock;
    const nextList = products.map(item => {
      if (item.id === productId) {
        nextStock = !item.inStock;
        return { ...item, inStock: nextStock };
      }
      return item;
    });
    setProducts(nextList);
    saveProductsToCloud(nextList);
    showToast(`Stock marked: ${nextStock ? 'In Stock' : 'Out of Stock'} in database.`);
  };

  const toggleProductFeatured = (productId) => {
    let nextFeatured;
    const nextList = products.map(item => {
      if (item.id === productId) {
        nextFeatured = !item.featured;
        return { ...item, featured: nextFeatured };
      }
      return item;
    });
    setProducts(nextList);
    saveProductsToCloud(nextList);
    showToast(`Product ${nextFeatured ? 'Featured on Home' : 'Removed from Featured'} in database.`);
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
    const nextList = [cloned, ...products];
    setProducts(nextList);
    saveProductsToCloud(nextList);
    showToast(`Duplicated "${target.name.slice(0, 20)}..." in database`);
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
    const nextList = [...categories, newCategory];
    setCategories(nextList);
    saveCategoriesToCloud(nextList);
    showToast(`Category "${newCategory.name}" saved to database!`);
    return newCategory;
  };

  const updateCategory = (categoryId, updatedFields) => {
    const nextList = categories.map(cat => (cat.id === categoryId ? { ...cat, ...updatedFields } : cat));
    setCategories(nextList);
    saveCategoriesToCloud(nextList);
    showToast('Category updated in database!');
  };

  const deleteCategory = (categoryId) => {
    const nextList = categories.filter(cat => cat.id !== categoryId);
    setCategories(nextList);
    saveCategoriesToCloud(nextList);
    showToast('Category deleted from database.', 'info');
  };

  const toggleCategoryVisibility = (categoryId) => {
    let next;
    const nextList = categories.map(cat => {
      if (cat.id === categoryId) {
        next = !cat.hidden;
        return { ...cat, hidden: next };
      }
      return cat;
    });
    setCategories(nextList);
    saveCategoriesToCloud(nextList);
    showToast(`Category is now ${next ? 'Hidden' : 'Visible'} in database.`);
  };

  // ================= CATALOG SERIES CRUD =================
  const addCatalogSeries = (seriesData) => {
    const newId = seriesData.id || `series-${Date.now()}`;
    const newSeries = { ...seriesData, id: newId };
    const nextList = [...catalogSeries, newSeries];
    setCatalogSeries(nextList);
    saveCatalogSeriesToCloud(nextList);
    showToast(`Series "${newSeries.title}" added and saved to database.`);
    return newSeries;
  };

  const updateCatalogSeries = (seriesId, updatedFields) => {
    const nextList = catalogSeries.map(s => (s.id === seriesId ? { ...s, ...updatedFields } : s));
    setCatalogSeries(nextList);
    saveCatalogSeriesToCloud(nextList);
    showToast('Catalog Series card updated in database!');
  };

  const deleteCatalogSeries = (seriesId) => {
    const nextList = catalogSeries.filter(s => s.id !== seriesId);
    setCatalogSeries(nextList);
    saveCatalogSeriesToCloud(nextList);
    showToast('Catalog Series card removed from database.', 'info');
  };

  // ================= CONTENT & PROMOTIONS UPDATES =================
  const updateDistributor = (newInfo) => {
    const updated = { ...distributor, ...newInfo };
    setDistributor(updated);
    saveDistributorToCloud(updated);
    showToast('Store contact & location saved to database!');
  };

  const updateHeroContent = (newHero) => {
    const updated = { ...siteContent, hero: { ...siteContent.hero, ...newHero } };
    setSiteContent(updated);
    saveSiteContentToCloud(updated);
    showToast('Hero section updated in database!');
  };

  const updateAboutContent = (newAbout) => {
    const updated = { ...siteContent, about: { ...siteContent.about, ...newAbout } };
    setSiteContent(updated);
    saveSiteContentToCloud(updated);
    showToast('About page content updated in database!');
  };

  const updateTicker = (newTicker) => {
    const updated = { ...tickerSettings, ...newTicker };
    setTickerSettings(updated);
    saveTickerToCloud(updated);
    showToast('Top notification ticker updated in database!');
  };

  const updatePromotionSettings = (newPromo) => {
    const updated = { ...promotions, ...newPromo };
    setPromotions(updated);
    savePromotionsToCloud(updated);
    showToast('Promotional sales settings saved to database!');
  };

  // ================= ORDERS & QUOTE INQUIRIES =================
  const updateOrderStatus = (orderId, newStatus) => {
    const nextOrders = orders.map(ord => (ord.id === orderId ? { ...ord, status: newStatus } : ord));
    setOrders(nextOrders);
    updateOrderStatusInCloud(orderId, newStatus);
    showToast(`Order status updated to: ${newStatus}`);
  };

  const deleteOrder = (orderId) => {
    const nextOrders = orders.filter(ord => ord.id !== orderId);
    setOrders(nextOrders);
    deleteOrderFromCloud(orderId);
    showToast('Order record removed from database.', 'info');
  };

  const addManualOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Pending',
      ...orderData
    };
    const nextOrders = [newOrder, ...orders];
    setOrders(nextOrders);
    saveOrderToCloud(newOrder);
    showToast('Customer inquiry recorded and saved to database.');
    return newOrder;
  };

  // Manual Force Cloud Synchronization
  const syncNowWithCloud = async () => {
    setIsCloudSyncing(true);
    showToast('Syncing all data with Firebase Cloud Database...', 'info');
    try {
      const res = await syncAllToCloud({
        products,
        categories,
        catalogSeries,
        siteContent,
        tickerSettings,
        promotions,
        distributor,
        adminPin
      });
      if (res.success) {
        setCloudStatus('connected');
        setLastSyncTime(new Date().toLocaleTimeString());
        showToast('All store data successfully synced to Firebase Database!', 'success');
      } else {
        showToast('Cloud sync completed with notices. Check permissions.', 'warning');
      }
    } catch (err) {
      showToast('Cloud sync error: ' + err.message, 'warning');
    } finally {
      setIsCloudSyncing(false);
    }
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

    // Also sync defaults to cloud
    syncAllToCloud({
      products: PRODUCTS,
      categories: CATEGORIES,
      catalogSeries: DEFAULT_CATALOG_SERIES,
      siteContent: DEFAULT_SITE_CONTENT,
      tickerSettings: DEFAULT_TICKER_SETTINGS,
      promotions: DEFAULT_PROMOTIONS,
      distributor: DISTRIBUTOR_INFO,
      adminPin: '6600'
    });

    showToast('All store data reset to factory defaults and synced to cloud!', 'info');
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

      // Sync imported data to cloud
      syncAllToCloud({
        products: parsed.products || products,
        categories: parsed.categories || categories,
        catalogSeries: parsed.catalogSeries || catalogSeries,
        distributor: parsed.distributor || distributor,
        siteContent: parsed.siteContent || siteContent,
        tickerSettings: parsed.tickerSettings || tickerSettings,
        promotions: parsed.promotions || promotions,
        adminPin
      });

      showToast('Store data successfully imported and synced to database!', 'success');
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

    // Also record into orders inquiries log and save to Firebase Cloud!
    addManualOrder({
      customerName: 'WhatsApp Online Customer',
      phone: 'Direct Checkout',
      city: 'Pakistan Delivery',
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
        // Cloud Status & Controls
        cloudStatus,
        lastSyncTime,
        isCloudSyncing,
        syncNowWithCloud,
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
