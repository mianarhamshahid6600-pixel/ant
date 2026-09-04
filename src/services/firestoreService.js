import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  collection, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase';

// Collection and Document references for Store Configuration
const STORE_COLLECTION = 'store_settings';
const DOC_PRODUCTS = 'products';
const DOC_CATEGORIES = 'categories';
const DOC_CATALOG_SERIES = 'catalog_series';
const DOC_SITE_CONTENT = 'site_content';
const DOC_TICKER = 'ticker_settings';
const DOC_PROMOTIONS = 'promotions';
const DOC_DISTRIBUTOR = 'distributor';
const DOC_SECURITY = 'security';

/**
 * Real-time listeners for all store data from Cloud Firestore
 */
export const subscribeToStoreData = ({
  onProducts,
  onCategories,
  onCatalogSeries,
  onSiteContent,
  onTicker,
  onPromotions,
  onDistributor,
  onSecurityPin,
  onOrders,
  onStatusChange
}) => {
  const unsubscribers = [];

  const handleDocSnapshot = (docName, callback, fieldName = 'items') => {
    try {
      const docRef = doc(db, STORE_COLLECTION, docName);
      const unsub = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (data && data[fieldName] !== undefined) {
              callback(data[fieldName]);
            }
          }
          if (onStatusChange) onStatusChange('connected');
        },
        (error) => {
          console.warn(`Firestore [${docName}] subscription notice:`, error.message);
          if (onStatusChange) onStatusChange('offline');
        }
      );
      unsubscribers.push(unsub);
    } catch (err) {
      console.warn(`Could not attach listener for ${docName}:`, err.message);
    }
  };

  // 1. Products listener
  if (onProducts) {
    handleDocSnapshot(DOC_PRODUCTS, onProducts, 'items');
  }

  // 2. Categories listener
  if (onCategories) {
    handleDocSnapshot(DOC_CATEGORIES, onCategories, 'items');
  }

  // 3. Catalog Series listener
  if (onCatalogSeries) {
    handleDocSnapshot(DOC_CATALOG_SERIES, onCatalogSeries, 'items');
  }

  // 4. Site Content listener
  if (onSiteContent) {
    handleDocSnapshot(DOC_SITE_CONTENT, onSiteContent, 'content');
  }

  // 5. Ticker listener
  if (onTicker) {
    handleDocSnapshot(DOC_TICKER, onTicker, 'settings');
  }

  // 6. Promotions listener
  if (onPromotions) {
    handleDocSnapshot(DOC_PROMOTIONS, onPromotions, 'promotions');
  }

  // 7. Distributor listener
  if (onDistributor) {
    handleDocSnapshot(DOC_DISTRIBUTOR, onDistributor, 'info');
  }

  // 8. Security PIN listener
  if (onSecurityPin) {
    handleDocSnapshot(DOC_SECURITY, onSecurityPin, 'pin');
  }

  // 9. Orders collection real-time listener
  if (onOrders) {
    try {
      const ordersCol = collection(db, 'orders');
      const unsubOrders = onSnapshot(
        ordersCol,
        (snapshot) => {
          const list = [];
          snapshot.forEach((d) => {
            list.push({ id: d.id, ...d.data() });
          });
          // Sort orders by date descending
          list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
          onOrders(list);
          if (onStatusChange) onStatusChange('connected');
        },
        (error) => {
          console.warn('Firestore [orders] collection notice:', error.message);
        }
      );
      unsubscribers.push(unsubOrders);
    } catch (err) {
      console.warn('Could not attach orders listener:', err.message);
    }
  }

  // Return master cleanup function
  return () => {
    unsubscribers.forEach((unsub) => {
      if (typeof unsub === 'function') unsub();
    });
  };
};

/**
 * Cloud Save Operations
 */
export const saveProductsToCloud = async (products) => {
  try {
    const ref = doc(db, STORE_COLLECTION, DOC_PRODUCTS);
    await setDoc(ref, { items: products, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (error) {
    console.warn('saveProductsToCloud error:', error.message);
    return { success: false, error: error.message };
  }
};

export const saveCategoriesToCloud = async (categories) => {
  try {
    const ref = doc(db, STORE_COLLECTION, DOC_CATEGORIES);
    await setDoc(ref, { items: categories, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (error) {
    console.warn('saveCategoriesToCloud error:', error.message);
    return { success: false, error: error.message };
  }
};

export const saveCatalogSeriesToCloud = async (catalogSeries) => {
  try {
    const ref = doc(db, STORE_COLLECTION, DOC_CATALOG_SERIES);
    await setDoc(ref, { items: catalogSeries, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (error) {
    console.warn('saveCatalogSeriesToCloud error:', error.message);
    return { success: false, error: error.message };
  }
};

export const saveSiteContentToCloud = async (siteContent) => {
  try {
    const ref = doc(db, STORE_COLLECTION, DOC_SITE_CONTENT);
    await setDoc(ref, { content: siteContent, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (error) {
    console.warn('saveSiteContentToCloud error:', error.message);
    return { success: false, error: error.message };
  }
};

export const saveTickerToCloud = async (tickerSettings) => {
  try {
    const ref = doc(db, STORE_COLLECTION, DOC_TICKER);
    await setDoc(ref, { settings: tickerSettings, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (error) {
    console.warn('saveTickerToCloud error:', error.message);
    return { success: false, error: error.message };
  }
};

export const savePromotionsToCloud = async (promotions) => {
  try {
    const ref = doc(db, STORE_COLLECTION, DOC_PROMOTIONS);
    await setDoc(ref, { promotions, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (error) {
    console.warn('savePromotionsToCloud error:', error.message);
    return { success: false, error: error.message };
  }
};

export const saveDistributorToCloud = async (distributor) => {
  try {
    const ref = doc(db, STORE_COLLECTION, DOC_DISTRIBUTOR);
    await setDoc(ref, { info: distributor, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (error) {
    console.warn('saveDistributorToCloud error:', error.message);
    return { success: false, error: error.message };
  }
};

export const saveSecurityPinToCloud = async (pin) => {
  try {
    const ref = doc(db, STORE_COLLECTION, DOC_SECURITY);
    await setDoc(ref, { pin, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (error) {
    console.warn('saveSecurityPinToCloud error:', error.message);
    return { success: false, error: error.message };
  }
};

export const saveOrderToCloud = async (order) => {
  try {
    const ref = doc(db, 'orders', order.id);
    await setDoc(ref, { ...order, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (error) {
    console.warn('saveOrderToCloud error:', error.message);
    return { success: false, error: error.message };
  }
};

export const updateOrderStatusInCloud = async (orderId, newStatus) => {
  try {
    const ref = doc(db, 'orders', orderId);
    await updateDoc(ref, { status: newStatus, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (error) {
    console.warn('updateOrderStatusInCloud error:', error.message);
    return { success: false, error: error.message };
  }
};

export const deleteOrderFromCloud = async (orderId) => {
  try {
    const ref = doc(db, 'orders', orderId);
    await deleteDoc(ref);
    return { success: true };
  } catch (error) {
    console.warn('deleteOrderFromCloud error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Push all active store state to Firebase Cloud Database in one batch
 */
export const syncAllToCloud = async ({
  products,
  categories,
  catalogSeries,
  siteContent,
  tickerSettings,
  promotions,
  distributor,
  adminPin
}) => {
  const results = await Promise.allSettled([
    products ? saveProductsToCloud(products) : Promise.resolve(),
    categories ? saveCategoriesToCloud(categories) : Promise.resolve(),
    catalogSeries ? saveCatalogSeriesToCloud(catalogSeries) : Promise.resolve(),
    siteContent ? saveSiteContentToCloud(siteContent) : Promise.resolve(),
    tickerSettings ? saveTickerToCloud(tickerSettings) : Promise.resolve(),
    promotions ? savePromotionsToCloud(promotions) : Promise.resolve(),
    distributor ? saveDistributorToCloud(distributor) : Promise.resolve(),
    adminPin ? saveSecurityPinToCloud(adminPin) : Promise.resolve()
  ]);

  const allPassed = results.every(r => r.status === 'fulfilled');
  return { success: allPassed };
};

/**
 * Check if the database has already been initialized with products
 */
export const checkDatabaseInitialized = async () => {
  try {
    const ref = doc(db, STORE_COLLECTION, DOC_PRODUCTS);
    const snap = await getDoc(ref);
    return snap.exists() && Array.isArray(snap.data()?.items) && snap.data().items.length > 0;
  } catch {
    return false;
  }
};
