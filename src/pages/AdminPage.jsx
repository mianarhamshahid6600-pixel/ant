import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  LayoutDashboard, Package, Layers, Sparkles, Globe, FileText,
  Settings, Plus, Search, Edit, Trash2, Eye, EyeOff, Copy,
  CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, Download,
  Upload, RotateCcw, LogOut, ExternalLink, Star, Phone, Truck,
  DollarSign, Hash, X, Check, Save, Info, Tag, Sliders
} from 'lucide-react';

export const AdminPage = () => {
  const {
    products,
    categories,
    catalogSeries,
    distributor,
    siteContent,
    tickerSettings,
    promotions,
    orders,
    adminPin,
    navigateTo,
    logoutAdmin,
    updateAdminPin,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductVisibility,
    toggleProductStock,
    toggleProductFeatured,
    duplicateProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryVisibility,
    addCatalogSeries,
    updateCatalogSeries,
    deleteCatalogSeries,
    updateDistributor,
    updateHeroContent,
    updateAboutContent,
    updateTicker,
    updatePromotionSettings,
    updateOrderStatus,
    deleteOrder,
    addManualOrder,
    resetToFactoryDefaults,
    exportStoreData,
    importStoreData,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('products');

  // Product Filters
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  // Modals
  const [editingProduct, setEditingProduct] = useState(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);

  const [editingCategory, setEditingCategory] = useState(null);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [deleteConfirmCategory, setDeleteConfirmCategory] = useState(null);

  const [editingSeries, setEditingSeries] = useState(null);
  const [isNewSeriesModalOpen, setIsNewSeriesModalOpen] = useState(false);

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');

  const [newPinInput, setNewPinInput] = useState('');

  // Preset image choices for easy selection
  const standardImages = [
    { label: 'Art Black', url: '/images/products/art-black.png' },
    { label: 'Art White', url: '/images/products/art-white.png' },
    { label: 'Art Grey', url: '/images/products/art-grey.png' },
    { label: '6M Black', url: '/images/products/6m-black.png' },
    { label: 'LG Glass', url: '/images/products/lg-series.png' },
    { label: 'MM Fan Series', url: '/images/products/mm-series.png' },
    { label: 'SMD Downlight', url: '/images/products/smd.jpg' },
    { label: 'LED Bulb', url: '/images/products/bulb.jpg' },
    { label: 'Circuit Breaker', url: '/images/products/breaker.jpg' },
    { label: 'Flood Light', url: '/images/products/flood-light.jpg' }
  ];

  // Filtered Products
  const filteredProducts = products.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (visibilityFilter === 'visible' && p.hidden) return false;
    if (visibilityFilter === 'hidden' && !p.hidden) return false;
    if (stockFilter === 'inStock' && !p.inStock) return false;
    if (stockFilter === 'outOfStock' && p.inStock) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      const matchName = p.name && p.name.toLowerCase().includes(q);
      const matchSeries = p.series && p.series.toLowerCase().includes(q);
      const matchCat = p.category && p.category.toLowerCase().includes(q);
      if (!matchName && !matchSeries && !matchCat) return false;
    }
    return true;
  });

  // KPI Calculations
  const totalProductsCount = products.length;
  const visibleProductsCount = products.filter(p => !p.hidden).length;
  const hiddenProductsCount = products.filter(p => p.hidden).length;
  const outOfStockCount = products.filter(p => !p.inStock).length;
  const totalCategoriesCount = categories.length;

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '1.5rem 0 5rem' }}>
      <div className="container">

        {/* ================= ADMIN HEADER BAR ================= */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingBottom: '1.5rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #0055FF 0%, #002B80 100%)',
                color: '#FFFFFF',
                padding: '0.3rem 0.65rem',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 0 12px rgba(0, 85, 255, 0.4)'
              }}>
                <ShieldCheck size={15} />
                <span>STORE MASTER ADMIN</span>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                Live Sync Enabled
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', fontWeight: 800, margin: 0 }}>
              Alnoor Traders <span className="text-electric-blue">Management Portal</span>
            </h1>
            <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Control products, categories, pricing, promotional offers, and website information with instant live updates.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo('home')}
              className="btn btn-primary"
              style={{ gap: '0.45rem', padding: '0.65rem 1.25rem', fontSize: '0.9rem', fontWeight: 700 }}
            >
              <ExternalLink size={16} />
              <span>View Storefront</span>
            </button>

            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="btn btn-outline"
              style={{ gap: '0.4rem', padding: '0.65rem 1.1rem', fontSize: '0.9rem', color: '#F59E0B', borderColor: 'rgba(245, 158, 11, 0.4)' }}
              title="Reset all store data to factory defaults"
            >
              <RotateCcw size={15} />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="btn btn-outline"
              style={{ gap: '0.4rem', padding: '0.65rem 1.1rem', fontSize: '0.9rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}
              title="Log out of Admin"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* ================= KPI OVERVIEW METRICS ================= */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div className="glass-card" style={{ padding: '1.1rem 1.25rem', borderLeft: '4px solid #3B82F6' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Total Products</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{totalProductsCount}</div>
            <div style={{ fontSize: '0.78rem', color: '#60A5FA', marginTop: '0.15rem' }}>Active in database</div>
          </div>

          <div className="glass-card" style={{ padding: '1.1rem 1.25rem', borderLeft: '4px solid #10B981' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Visible on Store</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10B981', marginTop: '0.2rem' }}>{visibleProductsCount}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>Publicly accessible</div>
          </div>

          <div className="glass-card" style={{ padding: '1.1rem 1.25rem', borderLeft: '4px solid #F59E0B' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Hidden Products</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F59E0B', marginTop: '0.2rem' }}>{hiddenProductsCount}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>Hidden from customers</div>
          </div>

          <div className="glass-card" style={{ padding: '1.1rem 1.25rem', borderLeft: '4px solid #EF4444' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Out of Stock</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#EF4444', marginTop: '0.2rem' }}>{outOfStockCount}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>Need restocking</div>
          </div>

          <div className="glass-card" style={{ padding: '1.1rem 1.25rem', borderLeft: '4px solid #8B5CF6' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Categories</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#A78BFA', marginTop: '0.2rem' }}>{totalCategoriesCount}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>Active collections</div>
          </div>

          <div className="glass-card" style={{ padding: '1.1rem 1.25rem', borderLeft: '4px solid #06B6D4' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Promo Status</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: promotions.enabled ? '#10B981' : 'var(--text-secondary)', marginTop: '0.45rem' }}>
              {promotions.enabled ? 'ACTIVE' : 'OFF'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {tickerSettings.enabled ? 'Ticker Running' : 'Ticker Off'}
            </div>
          </div>
        </div>

        {/* ================= TAB SWITCHER ================= */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '2rem'
        }}>
          {[
            { id: 'products', label: 'Products', icon: <Package size={17} /> },
            { id: 'categories', label: 'Categories & Cards', icon: <Layers size={17} /> },
            { id: 'promotions', label: 'Promotions & Top Ticker', icon: <Sparkles size={17} /> },
            { id: 'content', label: 'Website Content', icon: <Globe size={17} /> },
            { id: 'catalog', label: 'Catalog Series', icon: <FileText size={17} /> },
            { id: 'orders', label: 'Quotes & Inquiries', icon: <DollarSign size={17} /> },
            { id: 'settings', label: 'Settings & Backup', icon: <Settings size={17} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.2rem',
                borderRadius: 'var(--radius-md)',
                background: activeTab === tab.id ? 'var(--badge-bg)' : 'transparent',
                color: activeTab === tab.id ? 'var(--text-accent)' : 'var(--text-secondary)',
                border: activeTab === tab.id ? '1px solid var(--border-card-hover)' : '1px solid transparent',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '0.92rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ================= TAB 1: PRODUCTS MANAGEMENT ================= */}
        {activeTab === 'products' && (
          <div>
            {/* Filter & Action Bar */}
            <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.75rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                {/* Search Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: 'var(--bg-tertiary)',
                  padding: '0.55rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-card)',
                  flex: '1 1 280px',
                  maxWidth: '450px'
                }}>
                  <Search size={18} style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search products by title, series, category..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  {productSearch && (
                    <button onClick={() => setProductSearch('')} style={{ color: 'var(--text-muted)' }}>
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Add Product Button */}
                <button
                  onClick={() => setIsNewProductModalOpen(true)}
                  className="btn btn-primary"
                  style={{ gap: '0.5rem', padding: '0.65rem 1.4rem', fontWeight: 700 }}
                >
                  <Plus size={18} />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Filter Selectors */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Filter By:</span>
                
                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-card)',
                    color: 'var(--text-primary)',
                    fontSize: '0.84rem'
                  }}
                >
                  <option value="all">All Categories ({products.length})</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>

                {/* Visibility Filter */}
                <select
                  value={visibilityFilter}
                  onChange={(e) => setVisibilityFilter(e.target.value)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-card)',
                    color: 'var(--text-primary)',
                    fontSize: '0.84rem'
                  }}
                >
                  <option value="all">All Visibilities</option>
                  <option value="visible">Visible Only</option>
                  <option value="hidden">Hidden Only</option>
                </select>

                {/* Stock Filter */}
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-card)',
                    color: 'var(--text-primary)',
                    fontSize: '0.84rem'
                  }}
                >
                  <option value="all">All Stock Statuses</option>
                  <option value="inStock">In Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>

                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                  Showing {filteredProducts.length} of {products.length} items
                </span>
              </div>
            </div>

            {/* Products Table */}
            <div className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>Product</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Category & Series</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Wholesale Price</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Contractor Price</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Stock Status</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Storefront</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                          No products match the selected search or filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => {
                        const cat = categories.find(c => c.id === product.category);
                        return (
                          <tr
                            key={product.id}
                            style={{
                              borderBottom: '1px solid var(--border-subtle)',
                              opacity: product.hidden ? 0.65 : 1,
                              background: product.hidden ? 'rgba(245, 158, 11, 0.03)' : 'transparent',
                              transition: 'background 0.2s ease'
                            }}
                          >
                            {/* Product Info with Thumbnail */}
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                <div style={{
                                  width: '46px',
                                  height: '46px',
                                  borderRadius: '8px',
                                  background: 'var(--bg-tertiary)',
                                  border: '1px solid var(--border-card)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  overflow: 'hidden',
                                  flexShrink: 0
                                }}>
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '85%', height: '85%', objectFit: 'contain' }}
                                    onError={(e) => { e.target.src = product.fallbackImage || '/images/products/art-black.png'; }}
                                  />
                                </div>
                                <div>
                                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.25 }}>
                                    {product.name}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '3px' }}>
                                    {product.featured && (
                                      <span style={{ fontSize: '0.72rem', background: 'rgba(234, 179, 8, 0.18)', color: '#FACC15', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                                        ★ Featured
                                      </span>
                                    )}
                                    {product.badge && (
                                      <span style={{ fontSize: '0.72rem', background: 'var(--badge-bg)', color: 'var(--text-accent)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                                        {product.badge}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Category & Series */}
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                                {cat ? cat.name : product.category}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                                {product.series || 'Standard'}
                              </div>
                            </td>

                            {/* Wholesale Price */}
                            <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-accent)' }}>
                              Rs. {product.price?.toLocaleString()}
                            </td>

                            {/* Contractor Price */}
                            <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#10B981' }}>
                              Rs. {(product.contractorPrice || product.price)?.toLocaleString()}
                            </td>

                            {/* Stock Toggle */}
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <button
                                onClick={() => toggleProductStock(product.id)}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  padding: '0.3rem 0.65rem',
                                  borderRadius: '999px',
                                  fontSize: '0.76rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  border: 'none',
                                  background: product.inStock ? 'rgba(16, 185, 129, 0.18)' : 'rgba(239, 68, 68, 0.18)',
                                  color: product.inStock ? '#10B981' : '#EF4444'
                                }}
                                title="Click to toggle In-Stock / Out-of-Stock"
                              >
                                {product.inStock ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                                <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                              </button>
                            </td>

                            {/* Visibility Toggle */}
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <button
                                onClick={() => toggleProductVisibility(product.id)}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  padding: '0.3rem 0.65rem',
                                  borderRadius: '999px',
                                  fontSize: '0.76rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  border: 'none',
                                  background: !product.hidden ? 'rgba(59, 130, 246, 0.18)' : 'rgba(245, 158, 11, 0.18)',
                                  color: !product.hidden ? '#60A5FA' : '#F59E0B'
                                }}
                                title="Click to hide/unhide on public storefront"
                              >
                                {!product.hidden ? <Eye size={12} /> : <EyeOff size={12} />}
                                <span>{!product.hidden ? 'Visible' : 'Hidden'}</span>
                              </button>
                            </td>

                            {/* Action Buttons */}
                            <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                                <button
                                  onClick={() => toggleProductFeatured(product.id)}
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '6px',
                                    background: product.featured ? 'rgba(234, 179, 8, 0.2)' : 'var(--bg-tertiary)',
                                    color: product.featured ? '#FACC15' : 'var(--text-muted)',
                                    border: '1px solid var(--border-card)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                  }}
                                  title={product.featured ? 'Remove from Featured' : 'Mark as Featured on Homepage'}
                                >
                                  <Star size={14} fill={product.featured ? '#FACC15' : 'none'} />
                                </button>

                                <button
                                  onClick={() => duplicateProduct(product.id)}
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '6px',
                                    background: 'var(--bg-tertiary)',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border-card)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                  }}
                                  title="Duplicate Product"
                                >
                                  <Copy size={14} />
                                </button>

                                <button
                                  onClick={() => setEditingProduct(product)}
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '6px',
                                    background: 'var(--badge-bg)',
                                    color: 'var(--text-accent)',
                                    border: '1px solid var(--border-card-hover)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                  }}
                                  title="Edit Product Details"
                                >
                                  <Edit size={14} />
                                </button>

                                <button
                                  onClick={() => setDeleteConfirmProduct(product)}
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '6px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: '#EF4444',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                  }}
                                  title="Delete Product"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CATEGORIES & CARDS ================= */}
        {activeTab === 'categories' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Category Cards & Horizontal Slider Track</h3>
                <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Manage the categories displayed in the home single-line sliding strip and shop filters.
                </p>
              </div>

              <button
                onClick={() => setIsNewCategoryModalOpen(true)}
                className="btn btn-primary"
                style={{ gap: '0.5rem', fontWeight: 700 }}
              >
                <Plus size={16} />
                <span>Add New Category</span>
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem'
            }}>
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    opacity: cat.hidden ? 0.6 : 1,
                    border: cat.hidden ? '1px dashed #F59E0B' : '1px solid var(--border-card-hover)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '12px',
                        background: 'var(--bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        padding: '6px'
                      }}>
                        <img
                          src={cat.image}
                          alt={cat.name}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                          onError={(e) => { e.target.src = cat.fallbackImage || '/images/products/art-black.png'; }}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          onClick={() => toggleCategoryVisibility(cat.id)}
                          style={{
                            padding: '0.3rem 0.55rem',
                            borderRadius: '6px',
                            background: cat.hidden ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.15)',
                            color: cat.hidden ? '#F59E0B' : '#60A5FA',
                            border: 'none',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {cat.hidden ? 'Hidden' : 'Visible'}
                        </button>

                        <button
                          onClick={() => setEditingCategory(cat)}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '6px',
                            background: 'var(--bg-tertiary)',
                            color: 'var(--text-accent)',
                            border: '1px solid var(--border-card)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Edit size={13} />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmCategory(cat)}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '6px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#EF4444',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.2rem' }}>{cat.name}</h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-accent)', fontWeight: 600, marginBottom: '0.4rem' }}>
                      {cat.subtitle || 'General Electrical'}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                      {cat.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span>Badge: <b style={{ color: 'var(--text-primary)' }}>{cat.badge || 'Standard'}</b></span>
                    <span>Count: <b style={{ color: 'var(--text-primary)' }}>{cat.count || 12} items</b></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: PROMOTIONS & TOP TICKER ================= */}
        {activeTab === 'promotions' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.75rem' }}>
            
            {/* Top Moving Ticker Editor */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Top Moving Ticker Patti</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                    Control the animated right-moving strip at the very top of every page.
                  </p>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={tickerSettings.enabled}
                    onChange={(e) => updateTicker({ enabled: e.target.checked })}
                  />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Enable Bar</span>
                </label>
              </div>

              {/* Live Preview of Ticker */}
              <div style={{
                background: 'linear-gradient(90deg, #002B80 0%, #0044CC 50%, #002B80 100%)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                overflow: 'hidden',
                marginBottom: '1.5rem',
                border: '1px solid rgba(0, 102, 255, 0.4)'
              }}>
                <span style={{ background: '#60A5FA', color: '#002B80', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>Preview</span>
                <div style={{ display: 'flex', gap: '1.2rem', whiteSpace: 'nowrap' }}>
                  <span>📞 {tickerSettings.phone1}</span>
                  <span>•</span>
                  <span>📞 {tickerSettings.phone2}</span>
                  <span>•</span>
                  <span style={{ color: '#FDE047' }}>🚚 {tickerSettings.deliveryText}</span>
                  {tickerSettings.customNotice && (
                    <>
                      <span>•</span>
                      <span style={{ color: '#F472B6' }}>⚡ {tickerSettings.customNotice}</span>
                    </>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Primary Phone Number
                  </label>
                  <input
                    type="text"
                    value={tickerSettings.phone1}
                    onChange={(e) => updateTicker({ phone1: e.target.value })}
                    className="admin-input"
                    placeholder="03146600174"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Secondary Phone Number
                  </label>
                  <input
                    type="text"
                    value={tickerSettings.phone2}
                    onChange={(e) => updateTicker({ phone2: e.target.value })}
                    className="admin-input"
                    placeholder="03246600174"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Free Delivery Banner Text
                  </label>
                  <input
                    type="text"
                    value={tickerSettings.deliveryText}
                    onChange={(e) => updateTicker({ deliveryText: e.target.value })}
                    className="admin-input"
                    placeholder="Free Delivery over Faisalabad"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Custom Special Announcement (Optional)
                  </label>
                  <input
                    type="text"
                    value={tickerSettings.customNotice || ''}
                    onChange={(e) => updateTicker({ customNotice: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. Ramadan Special Timings or Eid Wholesale Deals"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Ticker Speed: {tickerSettings.speed || 24} seconds
                  </label>
                  <input
                    type="range"
                    min={12}
                    max={45}
                    value={tickerSettings.speed || 24}
                    onChange={(e) => updateTicker({ speed: Number(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lower is faster, higher is slower</span>
                </div>
              </div>
            </div>

            {/* Homepage Promotional Sales Banner Manager */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Homepage Promotional Sales Banner</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                    Prominently showcase limited-time offers, contractor packages, or holiday sales.
                  </p>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={promotions.enabled}
                    onChange={(e) => updatePromotionSettings({ enabled: e.target.checked })}
                  />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: promotions.enabled ? '#10B981' : 'var(--text-muted)' }}>
                    {promotions.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </label>
              </div>

              {/* Live Preview of Promotional Card */}
              {promotions.enabled && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(0, 85, 255, 0.18) 0%, rgba(0, 43, 128, 0.25) 100%)',
                  border: '1.5px solid rgba(0, 102, 255, 0.5)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                  boxShadow: '0 8px 24px rgba(0, 85, 255, 0.2)'
                }}>
                  <span style={{ fontSize: '0.74rem', background: '#F59E0B', color: '#000', padding: '2px 8px', borderRadius: '999px', fontWeight: 800, textTransform: 'uppercase' }}>
                    {promotions.badge || 'Special Wholesale Offer'}
                  </span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.5rem 0 0.25rem', color: 'var(--text-primary)' }}>
                    {promotions.title}
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
                    {promotions.subtitle}
                  </p>
                  <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10B981' }}>
                      🔥 {promotions.discountPercent || 15}% Instant Discount
                    </span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Promo Badge Tag
                  </label>
                  <input
                    type="text"
                    value={promotions.badge || ''}
                    onChange={(e) => updatePromotionSettings({ badge: e.target.value })}
                    className="admin-input"
                    placeholder="Special Wholesale Offer"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={promotions.title || ''}
                    onChange={(e) => updatePromotionSettings({ title: e.target.value })}
                    className="admin-input"
                    placeholder="⚡ Mega Builder & Contractor Discount Week!"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Promo Subtitle / Details
                  </label>
                  <textarea
                    rows={2}
                    value={promotions.subtitle || ''}
                    onChange={(e) => updatePromotionSettings({ subtitle: e.target.value })}
                    className="admin-input"
                    placeholder="Describe the offer..."
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                      Discount Rate (%)
                    </label>
                    <input
                      type="number"
                      value={promotions.discountPercent || 15}
                      onChange={(e) => updatePromotionSettings({ discountPercent: Number(e.target.value) })}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={promotions.btnText || ''}
                      onChange={(e) => updatePromotionSettings({ btnText: e.target.value })}
                      className="admin-input"
                      placeholder="Claim Offer on WhatsApp"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 4: WEBSITE CONTENT & STORE INFO ================= */}
        {activeTab === 'content' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.75rem' }}>
            
            {/* Store Information & Contact */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 1rem' }}>
                Store Contact & Location Settings
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Store Business Name
                  </label>
                  <input
                    type="text"
                    value={distributor.shopName}
                    onChange={(e) => updateDistributor({ shopName: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={distributor.tagline}
                    onChange={(e) => updateDistributor({ tagline: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                      Primary Phone
                    </label>
                    <input
                      type="text"
                      value={distributor.phone1}
                      onChange={(e) => updateDistributor({ phone1: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                      Secondary Phone
                    </label>
                    <input
                      type="text"
                      value={distributor.phone2}
                      onChange={(e) => updateDistributor({ phone2: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    WhatsApp Direct Number (Format: 923146600174)
                  </label>
                  <input
                    type="text"
                    value={distributor.whatsappNumber}
                    onChange={(e) => updateDistributor({ whatsappNumber: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Store Street Address
                  </label>
                  <input
                    type="text"
                    value={distributor.address}
                    onChange={(e) => updateDistributor({ address: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Store Operating Timings
                  </label>
                  <input
                    type="text"
                    value={distributor.timings}
                    onChange={(e) => updateDistributor({ timings: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Google Maps URL
                  </label>
                  <input
                    type="text"
                    value={distributor.googleMapsUrl}
                    onChange={(e) => updateDistributor({ googleMapsUrl: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>
            </div>

            {/* Homepage Hero Section Content */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 1rem' }}>
                Hero Section Headlines & Description
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Main Greeting Title
                  </label>
                  <input
                    type="text"
                    value={siteContent.hero?.title || ''}
                    onChange={(e) => updateHeroContent({ title: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Blue Highlight Phrase
                  </label>
                  <input
                    type="text"
                    value={siteContent.hero?.highlight || ''}
                    onChange={(e) => updateHeroContent({ highlight: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Hero Description Paragraph
                  </label>
                  <textarea
                    rows={4}
                    value={siteContent.hero?.description || ''}
                    onChange={(e) => updateHeroContent({ description: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      value={siteContent.hero?.primaryBtnText || 'Shop All Products'}
                      onChange={(e) => updateHeroContent({ primaryBtnText: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                      Secondary Button Text
                    </label>
                    <input
                      type="text"
                      value={siteContent.hero?.secondaryBtnText || 'View Catalog'}
                      onChange={(e) => updateHeroContent({ secondaryBtnText: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.5rem' }}>About Page Statistics</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Years:</span>
                      <input
                        type="text"
                        value={siteContent.about?.experienceYears || '15+'}
                        onChange={(e) => updateAboutContent({ experienceYears: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Contractors:</span>
                      <input
                        type="text"
                        value={siteContent.about?.contractorsCount || '1,200+'}
                        onChange={(e) => updateAboutContent({ contractorsCount: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Products:</span>
                      <input
                        type="text"
                        value={siteContent.about?.productsCount || '500+'}
                        onChange={(e) => updateAboutContent({ productsCount: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 5: CATALOG SERIES CARDS ================= */}
        {activeTab === 'catalog' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Digital Catalog Series Showcase</h3>
                <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Manage the luxury series overview cards displayed on the Catalog page with their full specifications and finishes.
                </p>
              </div>

              <button
                onClick={() => setIsNewSeriesModalOpen(true)}
                className="btn btn-primary"
                style={{ gap: '0.5rem', fontWeight: 700 }}
              >
                <Plus size={16} />
                <span>Add Series Card</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {catalogSeries.map((series) => (
                <div key={series.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '10px',
                        background: 'var(--bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px'
                      }}>
                        <img
                          src={series.cover}
                          alt={series.title}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                          onError={(e) => { e.target.src = series.fallbackCover || '/images/products/art-black.png'; }}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => setEditingSeries(series)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            background: 'var(--badge-bg)',
                            color: 'var(--text-accent)',
                            border: '1px solid var(--border-card-hover)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title="Edit Series"
                        >
                          <Edit size={14} />
                        </button>

                        <button
                          onClick={() => deleteCatalogSeries(series.id)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#EF4444',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title="Delete Series"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem' }}>{series.title}</h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-accent)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {series.subtitle}
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      <b>Finishes:</b> {series.finishes?.join(', ') || 'Various'}
                    </div>

                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      Specs: {series.specs?.length || 0} technical specifications listed
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: ORDERS & QUOTES INQUIRIES ================= */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Customer Quotes & Order Inquiries</h3>
                <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Logs of quote inquiries and cart orders placed via WhatsApp or contractor requests.
                </p>
              </div>

              <button
                onClick={() => addManualOrder({
                  customerName: 'Direct Walk-in Contractor',
                  phone: '03146600174',
                  city: 'Faisalabad (Rail Bazaar)',
                  items: [{ name: 'Art Series Switches Package', qty: 20, price: 680 }],
                  total: 13600,
                  type: 'Walk-in Inquiry'
                })}
                className="btn btn-outline"
                style={{ gap: '0.4rem', fontWeight: 700 }}
              >
                <Plus size={15} />
                <span>+ Log Test Order</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.length === 0 ? (
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No orders or quote inquiries logged yet.
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="glass-card"
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-accent)', fontSize: '0.95rem' }}>
                          {order.id}
                        </span>
                        <span style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '999px',
                          background: order.status === 'Confirmed' ? 'rgba(16, 185, 129, 0.2)' : order.status === 'Pending' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                          color: order.status === 'Confirmed' ? '#10B981' : order.status === 'Pending' ? '#F59E0B' : '#60A5FA'
                        }}>
                          {order.status}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {order.date}
                        </span>
                      </div>

                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>
                        {order.customerName} • <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{order.phone}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Location: {order.city} | Type: {order.type || 'WhatsApp'}
                      </div>

                      <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {order.items?.map((item, idx) => (
                          <span key={idx} style={{ fontSize: '0.76rem', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-card)' }}>
                            {item.name} (x{item.qty})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Total Value</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-accent)' }}>
                          Rs. {order.total?.toLocaleString()}
                        </div>
                      </div>

                      {/* Status Selector */}
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        style={{
                          padding: '0.45rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-card)',
                          color: 'var(--text-primary)',
                          fontSize: '0.82rem',
                          fontWeight: 600
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => deleteOrder(order.id)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#EF4444',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        title="Delete record"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 7: SETTINGS & BACKUP ================= */}
        {activeTab === 'settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
            
            {/* PIN Settings */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.5rem' }}>
                Admin Master PIN Security
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0 0 1.25rem' }}>
                Current PIN is: <b style={{ color: 'var(--text-accent)' }}>{adminPin}</b>. You can change this to any 4-digit code.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="Enter new 4-digit PIN"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value.replace(/\D/g, ''))}
                  className="admin-input"
                  style={{ flex: 1 }}
                />
                <button
                  onClick={() => {
                    if (newPinInput.length >= 4) {
                      updateAdminPin(newPinInput);
                      setNewPinInput('');
                    } else {
                      showToast('PIN must be at least 4 digits', 'warning');
                    }
                  }}
                  className="btn btn-primary"
                  style={{ fontWeight: 700 }}
                >
                  Update PIN
                </button>
              </div>
            </div>

            {/* Complete Data Backup & Restore */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.5rem' }}>
                Database Backup & Migration
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0 0 1.25rem' }}>
                Download a complete JSON snapshot of all products, prices, categories, and content, or restore from a backup file.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={exportStoreData}
                  className="btn btn-primary"
                  style={{ gap: '0.5rem', fontWeight: 700 }}
                >
                  <Download size={16} />
                  <span>Download Backup (JSON)</span>
                </button>

                <button
                  onClick={() => setIsImportModalOpen(true)}
                  className="btn btn-outline"
                  style={{ gap: '0.5rem', fontWeight: 700 }}
                >
                  <Upload size={16} />
                  <span>Import Backup (JSON)</span>
                </button>
              </div>
            </div>

            {/* Factory Reset */}
            <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.35)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#EF4444' }}>
                Factory Reset All Data
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0 0 1.25rem' }}>
                Restores original genuine Alnoor Traders catalog and contact data, resetting all products, prices, and settings.
              </p>

              <button
                onClick={() => setIsResetConfirmOpen(true)}
                className="btn"
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: '#EF4444',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  gap: '0.5rem',
                  fontWeight: 700
                }}
              >
                <RotateCcw size={16} />
                <span>Reset to Factory Defaults</span>
              </button>
            </div>

          </div>
        )}

        {/* ================= MODAL: ADD / EDIT PRODUCT ================= */}
        {(isNewProductModalOpen || editingProduct) && (
          <ProductFormModal
            product={editingProduct}
            categories={categories}
            standardImages={standardImages}
            onClose={() => {
              setIsNewProductModalOpen(false);
              setEditingProduct(null);
            }}
            onSave={(formData) => {
              if (editingProduct) {
                updateProduct(editingProduct.id, formData);
              } else {
                addProduct(formData);
              }
              setIsNewProductModalOpen(false);
              setEditingProduct(null);
            }}
          />
        )}

        {/* ================= MODAL: ADD / EDIT CATEGORY ================= */}
        {(isNewCategoryModalOpen || editingCategory) && (
          <CategoryFormModal
            category={editingCategory}
            standardImages={standardImages}
            onClose={() => {
              setIsNewCategoryModalOpen(false);
              setEditingCategory(null);
            }}
            onSave={(formData) => {
              if (editingCategory) {
                updateCategory(editingCategory.id, formData);
              } else {
                addCategory(formData);
              }
              setIsNewCategoryModalOpen(false);
              setEditingCategory(null);
            }}
          />
        )}

        {/* ================= MODAL: ADD / EDIT CATALOG SERIES ================= */}
        {(isNewSeriesModalOpen || editingSeries) && (
          <SeriesFormModal
            series={editingSeries}
            standardImages={standardImages}
            onClose={() => {
              setIsNewSeriesModalOpen(false);
              setEditingSeries(null);
            }}
            onSave={(formData) => {
              if (editingSeries) {
                updateCatalogSeries(editingSeries.id, formData);
              } else {
                addCatalogSeries(formData);
              }
              setIsNewSeriesModalOpen(false);
              setEditingSeries(null);
            }}
          />
        )}

        {/* ================= MODAL: DELETE PRODUCT CONFIRM ================= */}
        {deleteConfirmProduct && (
          <ConfirmModal
            title="Delete Product?"
            message={`Are you sure you want to permanently remove "${deleteConfirmProduct.name}" from your catalog?`}
            confirmLabel="Yes, Delete"
            confirmColor="#EF4444"
            onCancel={() => setDeleteConfirmProduct(null)}
            onConfirm={() => {
              deleteProduct(deleteConfirmProduct.id);
              setDeleteConfirmProduct(null);
            }}
          />
        )}

        {/* ================= MODAL: DELETE CATEGORY CONFIRM ================= */}
        {deleteConfirmCategory && (
          <ConfirmModal
            title="Delete Category?"
            message={`Are you sure you want to delete category "${deleteConfirmCategory.name}"?`}
            confirmLabel="Yes, Delete"
            confirmColor="#EF4444"
            onCancel={() => setDeleteConfirmCategory(null)}
            onConfirm={() => {
              deleteCategory(deleteConfirmCategory.id);
              setDeleteConfirmCategory(null);
            }}
          />
        )}

        {/* ================= MODAL: RESET FACTORY CONFIRM ================= */}
        {isResetConfirmOpen && (
          <ConfirmModal
            title="Restore Factory Defaults?"
            message="This will reset all products, prices, categories, promotional banners, and contact information to their original defaults. Are you sure?"
            confirmLabel="Yes, Reset Everything"
            confirmColor="#EF4444"
            onCancel={() => setIsResetConfirmOpen(false)}
            onConfirm={() => {
              resetToFactoryDefaults();
              setIsResetConfirmOpen(false);
            }}
          />
        )}

        {/* ================= MODAL: IMPORT JSON DATA ================= */}
        {isImportModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            background: 'rgba(3, 7, 18, 0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <div className="glass-card" style={{
              width: '100%',
              maxWidth: '560px',
              background: 'var(--bg-secondary)',
              borderRadius: '16px',
              padding: '1.75rem',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Import Store JSON Backup</h3>
                <button onClick={() => setIsImportModalOpen(false)} style={{ color: 'var(--text-muted)' }}>
                  <X size={20} />
                </button>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 1rem' }}>
                Paste the contents of your exported JSON backup file below or select a file:
              </p>

              <input
                type="file"
                accept=".json,application/json"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setImportJsonText(event.target.result);
                    };
                    reader.readAsText(file);
                  }
                }}
                style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-primary)' }}
              />

              <textarea
                rows={8}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='Paste JSON here... { "products": [...], ... }'
                className="admin-input"
                style={{ fontFamily: 'monospace', fontSize: '0.8rem', marginBottom: '1.25rem' }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button onClick={() => setIsImportModalOpen(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (importJsonText.trim()) {
                      const success = importStoreData(importJsonText);
                      if (success) {
                        setIsImportModalOpen(false);
                        setImportJsonText('');
                      }
                    } else {
                      showToast('Please paste or select a JSON file first', 'warning');
                    }
                  }}
                  className="btn btn-primary"
                >
                  Apply & Restore
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Admin Utility CSS */}
      <style>{`
        .admin-input {
          width: 100%;
          padding: 0.55rem 0.85rem;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-card);
          color: var(--text-primary);
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .admin-input:focus {
          border-color: var(--electric-blue);
          box-shadow: 0 0 0 2px rgba(0, 85, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

// ================= COMPONENT: PRODUCT FORM MODAL =================
const ProductFormModal = ({ product, categories, standardImages, onClose, onSave }) => {
  const isEdit = !!product;

  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || categories[0]?.id || 'switches-sockets');
  const [series, setSeries] = useState(product?.series || 'Art Luxury Series');
  const [price, setPrice] = useState(product?.price || 650);
  const [contractorPrice, setContractorPrice] = useState(product?.contractorPrice || 520);
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice || 750);
  const [badge, setBadge] = useState(product?.badge || '');
  const [image, setImage] = useState(product?.image || '/images/products/art-black.png');
  const [fallbackImage, setFallbackImage] = useState(product?.fallbackImage || '');
  const [description, setDescription] = useState(product?.description || '');
  const [inStock, setInStock] = useState(product ? product.inStock : true);
  const [featured, setFeatured] = useState(product ? !!product.featured : false);
  const [hidden, setHidden] = useState(product ? !!product.hidden : false);

  // Dynamic Specs & Features
  const [specs, setSpecs] = useState(() => {
    if (product?.specs) {
      return Object.entries(product.specs).map(([key, value]) => ({ key, value }));
    }
    return [
      { key: 'Working Voltage', value: '220V - 250V AC' },
      { key: 'Material', value: 'Flame-retardant Polycarbonate' },
      { key: 'Warranty', value: '10 Years Replacement Warranty' }
    ];
  });

  const [features, setFeatures] = useState(() => {
    return product?.features || ['Smooth click operation', 'Pure copper terminals', 'Fire resistant'];
  });

  const handleAddSpec = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleSpecChange = (index, field, val) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const handleRemoveSpec = (index) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleFeatureChange = (index, val) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Convert specs array back to object
    const specsObj = {};
    specs.forEach(s => {
      if (s.key.trim()) specsObj[s.key.trim()] = s.value.trim();
    });

    onSave({
      name: name.trim(),
      category,
      series: series.trim(),
      price: Number(price),
      contractorPrice: Number(contractorPrice),
      originalPrice: Number(originalPrice),
      badge: badge.trim(),
      image: image.trim(),
      fallbackImage: fallbackImage.trim(),
      description: description.trim(),
      inStock,
      featured,
      hidden,
      specs: specsObj,
      features: features.filter(f => f.trim())
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      background: 'rgba(3, 7, 18, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: 'var(--bg-secondary)',
        borderRadius: '20px',
        border: '1px solid var(--border-card-hover)',
        padding: '2rem',
        boxShadow: 'var(--glow-electric)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
              {isEdit ? 'Edit Product' : 'Create New Product'}
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Fill in the product details and specifications
            </span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Basic Info */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Product Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="admin-input"
              placeholder="e.g. Art Series - Matte Black 1-Gang Switch"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="admin-input"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Series Name
              </label>
              <input
                type="text"
                value={series}
                onChange={(e) => setSeries(e.target.value)}
                className="admin-input"
                placeholder="e.g. Art Luxury Series"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Badge Text (Optional)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="admin-input"
                placeholder="e.g. Bestseller, Top Rated"
              />
            </div>
          </div>

          {/* Pricing Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Wholesale Price (PKR) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="admin-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Contractor Price (PKR)
              </label>
              <input
                type="number"
                value={contractorPrice}
                onChange={(e) => setContractorPrice(e.target.value)}
                className="admin-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Original Retail Price (PKR)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="admin-input"
              />
            </div>
          </div>

          {/* Visibility & Stock Toggles */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            padding: '0.85rem 1rem',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-card)',
            flexWrap: 'wrap'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
              />
              <span>In Stock</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <span>Feature on Homepage (★)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, color: hidden ? '#F59E0B' : 'inherit' }}>
              <input
                type="checkbox"
                checked={hidden}
                onChange={(e) => setHidden(e.target.checked)}
              />
              <span>Hide from Public Storefront</span>
            </label>
          </div>

          {/* Image Presets & Inputs */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Product Image URL
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.6rem' }}>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="admin-input"
                placeholder="/images/products/art-black.png"
              />
              <div style={{
                width: '45px',
                height: '45px',
                borderRadius: '8px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img
                  src={image}
                  alt="Preview"
                  style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                  onError={(e) => { e.target.src = '/images/products/art-black.png'; }}
                />
              </div>
            </div>

            {/* Quick Image Pickers */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Presets:</span>
              {standardImages.map(img => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setImage(img.url)}
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.74rem',
                    background: image === img.url ? 'var(--badge-bg)' : 'var(--bg-tertiary)',
                    border: '1px solid var(--border-card)',
                    color: image === img.url ? 'var(--text-accent)' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Product Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="admin-input"
              placeholder="Sleek matte finish, fire-proof polymer, copper terminals..."
            />
          </div>

          {/* Dynamic Technical Specs Editor */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 700 }}>Technical Specifications</label>
              <button
                type="button"
                onClick={handleAddSpec}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
              >
                + Add Spec Row
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {specs.map((spec, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Spec Name (e.g. Voltage)"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(i, 'key', e.target.value)}
                    className="admin-input"
                    style={{ flex: '1 1 40%' }}
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 220V AC)"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                    className="admin-input"
                    style={{ flex: '1 1 50%' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(i)}
                    style={{ color: '#EF4444', background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Features Bullet Points */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 700 }}>Key Bullet Features</label>
              <button
                type="button"
                onClick={handleAddFeature}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
              >
                + Add Bullet
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {features.map((feat, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="e.g. Smooth, quiet click"
                    value={feat}
                    onChange={(e) => handleFeatureChange(i, e.target.value)}
                    className="admin-input"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(i)}
                    style={{ color: '#EF4444', background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ gap: '0.45rem', fontWeight: 700 }}>
              <Save size={16} />
              <span>{isEdit ? 'Save Changes' : 'Create Product'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// ================= COMPONENT: CATEGORY FORM MODAL =================
const CategoryFormModal = ({ category, standardImages, onClose, onSave }) => {
  const isEdit = !!category;

  const [id, setId] = useState(category?.id || '');
  const [name, setName] = useState(category?.name || '');
  const [subtitle, setSubtitle] = useState(category?.subtitle || '');
  const [badge, setBadge] = useState(category?.badge || 'Popular');
  const [count, setCount] = useState(category?.count || 12);
  const [description, setDescription] = useState(category?.description || '');
  const [image, setImage] = useState(category?.image || '/images/products/art-black.png');
  const [fallbackImage, setFallbackImage] = useState(category?.fallbackImage || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: id || `cat-${Date.now()}`,
      name: name.trim(),
      subtitle: subtitle.trim(),
      badge: badge.trim(),
      count: Number(count),
      description: description.trim(),
      image: image.trim(),
      fallbackImage: fallbackImage.trim()
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      background: 'rgba(3, 7, 18, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '560px',
        background: 'var(--bg-secondary)',
        borderRadius: '18px',
        padding: '1.75rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
            {isEdit ? 'Edit Category' : 'Create Category'}
          </h3>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="admin-input"
              placeholder="e.g. Smart Switches & Sockets"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Subtitle / Focus
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="admin-input"
              placeholder="e.g. Luxury Glass & Designer Series"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Badge Pill Text
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="admin-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Item Count
              </label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="admin-input"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="admin-input"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Category</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ================= COMPONENT: CATALOG SERIES FORM MODAL =================
const SeriesFormModal = ({ series, standardImages, onClose, onSave }) => {
  const isEdit = !!series;

  const [title, setTitle] = useState(series?.title || '');
  const [subtitle, setSubtitle] = useState(series?.subtitle || '');
  const [cover, setCover] = useState(series?.cover || '/images/products/art-black.png');
  const [finishesText, setFinishesText] = useState(series?.finishes ? series.finishes.join(', ') : 'Matte Black, Pure White');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: series?.id || `series-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim(),
      cover: cover.trim(),
      fallbackCover: cover.trim(),
      finishes: finishesText.split(',').map(f => f.trim()).filter(Boolean),
      specs: series?.specs || [
        { label: 'Voltage & Power', value: '220V - 250V AC' },
        { label: 'Lifespan', value: '40,000+ Clicks' }
      ]
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      background: 'rgba(3, 7, 18, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '560px',
        background: 'var(--bg-secondary)',
        borderRadius: '18px',
        padding: '1.75rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
            {isEdit ? 'Edit Series Card' : 'Create Series Card'}
          </h3>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Series Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="admin-input"
              placeholder="e.g. Art Luxury Switch Series"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Subtitle / Overview
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Cover Image URL
            </label>
            <input
              type="text"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Finishes List (Comma separated)
            </label>
            <input
              type="text"
              value={finishesText}
              onChange={(e) => setFinishesText(e.target.value)}
              className="admin-input"
              placeholder="Matte Black, Pure White, Space Grey"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Series Card</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ================= COMPONENT: CONFIRM MODAL =================
const ConfirmModal = ({ title, message, confirmLabel, confirmColor, onCancel, onConfirm }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      background: 'rgba(3, 7, 18, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '440px',
        background: 'var(--bg-secondary)',
        borderRadius: '16px',
        padding: '1.75rem',
        border: '1px solid var(--border-card-hover)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.15)',
          color: '#EF4444',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <AlertTriangle size={28} />
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button onClick={onCancel} className="btn btn-outline" style={{ flex: 1 }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn"
            style={{
              flex: 1,
              background: confirmColor || '#EF4444',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700
            }}
          >
            {confirmLabel || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};
