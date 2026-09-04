import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, Grid, List, Star, 
  ShoppingBag, Eye, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';

export const ShopPage = () => {
  const { 
    products, 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    sortBy, 
    setSortBy,
    addToCart, 
    setQuickViewProduct,
    viewProductDetail,
    getWhatsAppProductUrl,
    distributor
  } = useStore();

  const [viewMode, setViewMode] = useState('grid');
  const [selectedSeries, setSelectedSeries] = useState('all');

  // Extract all unique series from active products
  const activeProducts = products.filter(p => !p.hidden);
  const visibleCategories = categories.filter(c => !c.hidden);
  const allSeries = ['all', ...Array.from(new Set(activeProducts.map(p => p.series).filter(Boolean)))];

  // Filtering Logic
  const filteredProducts = activeProducts.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    if (selectedSeries !== 'all' && product.series !== selectedSeries) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchSeries = product.series && product.series.toLowerCase().includes(q);
      const matchDesc = product.description && product.description.toLowerCase().includes(q);
      if (!matchName && !matchSeries && !matchDesc) {
        return false;
      }
    }

    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'reviews') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // Default order
  });

  // Current category details
  const currentCategoryObj = categories.find(c => c.id === selectedCategory);
  const currentCategoryTitle = selectedCategory === 'all' ? 'All Products' : (currentCategoryObj ? currentCategoryObj.name : 'Category Products');

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '80vh', padding: '1.75rem 0 4.5rem' }}>
      <div className="container">
        
        {/* ================= 1. SEARCH & CATEGORY FILTER BAR (NO TOP TITLE) ================= */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}>
          
          {/* Top Search Bar */}
          <div 
            className="glass-card"
            style={{
              padding: '0.6rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-card-hover)',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--badge-bg)',
              color: 'var(--text-accent)'
            }}>
              <Search size={18} />
            </div>

            <input 
              type="text"
              placeholder="Search by product name, series (Art, 6M, LG Glass, SMD, BLDC), or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                outline: 'none',
                width: '100%',
                fontSize: '0.95rem',
                fontWeight: 500
              }}
            />

            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-tertiary)',
                  cursor: 'pointer'
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Horizontal Scroll Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.35rem',
            scrollbarWidth: 'none'
          }}>
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedSeries('all'); }}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: selectedCategory === 'all' ? 700 : 500,
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                color: selectedCategory === 'all' ? '#FFFFFF' : 'var(--text-secondary)',
                background: selectedCategory === 'all' 
                  ? 'linear-gradient(135deg, #0055FF 0%, #002B80 100%)' 
                  : 'var(--bg-card)',
                border: `1px solid ${selectedCategory === 'all' ? '#0055FF' : 'var(--border-subtle)'}`,
                boxShadow: selectedCategory === 'all' ? 'var(--glow-electric)' : 'none',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              All Products ({activeProducts.length})
            </button>

            {visibleCategories.map((cat) => {
              const count = activeProducts.filter(p => p.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setSelectedSeries('all'); }}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap',
                    color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                    background: isSelected 
                      ? 'linear-gradient(135deg, #0055FF 0%, #002B80 100%)' 
                      : 'var(--bg-card)',
                    border: `1px solid ${isSelected ? '#0055FF' : 'var(--border-subtle)'}`,
                    boxShadow: isSelected ? 'var(--glow-electric)' : 'none',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

        </div>

        {/* ================= 2. SMALL CATEGORY TITLE & SORT BAR ================= */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1.25rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          
          {/* Small Category Title */}
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{currentCategoryTitle}</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                {filteredProducts.length} Products
              </span>
            </h2>
          </div>

          {/* Quick Sorting & View Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>

            <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '2px', border: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                style={{
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  background: viewMode === 'grid' ? 'var(--badge-bg)' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--text-accent)' : 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List view"
                style={{
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  background: viewMode === 'list' ? 'var(--badge-bg)' : 'transparent',
                  color: viewMode === 'list' ? 'var(--text-accent)' : 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <List size={15} />
              </button>
            </div>
          </div>

        </div>

        {/* ================= 3. PRODUCTS IN CATEGORY (DIRECT SMOOTH CLICK TO DETAIL PAGE) ================= */}
        {sortedProducts.length === 0 ? (
          <div 
            className="glass-card" 
            style={{ 
              padding: '3rem 2rem', 
              textAlign: 'center',
              borderRadius: 'var(--radius-xl)',
              marginTop: '1.5rem'
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--badge-bg)',
              color: 'var(--text-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <Search size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>No products found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              We could not find any products matching "{searchQuery}". Try selecting another category or clear search.
            </p>
            <button 
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="btn btn-primary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid-products' : 'flex-list'} style={viewMode === 'list' ? { display: 'flex', flexDirection: 'column', gap: '1rem' } : {}}>
            {sortedProducts.map((product) => (
              <div 
                key={product.id}
                className="glass-card product-card"
                style={{
                  display: 'flex',
                  flexDirection: viewMode === 'list' ? 'row' : 'column',
                  cursor: 'pointer',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'all var(--transition-normal)'
                }}
                onClick={() => viewProductDetail(product)}
              >
                
                {/* Product Image Area */}
                <div 
                  className="product-image-wrap"
                  style={{
                    ...(viewMode === 'list' ? { width: '180px', flexShrink: 0, aspectRatio: 'auto', height: '100%' } : { height: '200px' }),
                    background: 'radial-gradient(circle at center, rgba(0, 85, 255, 0.08) 0%, transparent 70%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.25rem'
                  }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      if (product.fallbackImage && e.target.src !== product.fallbackImage) {
                        e.target.src = product.fallbackImage;
                      }
                    }}
                  />
                </div>

                {/* Product Body */}
                <div className="product-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1.25rem', gap: '0.6rem' }}>
                  
                  {/* Category / Series */}
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-accent)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {product.series}
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.35, color: 'var(--text-primary)' }}>
                    {product.name}
                  </h3>

                  {/* Pricing Status & Action Buttons */}
                  <div style={{ marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#10B981' }}>
                        Wholesale Rate on WhatsApp
                      </span>
                    </div>

                    {/* Button Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        className="btn btn-primary"
                        style={{ gap: '0.4rem', fontSize: '0.88rem', padding: '0.55rem 0.75rem', fontWeight: 700 }}
                      >
                        <ShoppingBag size={15} />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          viewProductDetail(product);
                        }}
                        className="btn btn-outline"
                        style={{ gap: '0.35rem', fontSize: '0.88rem', padding: '0.55rem 0.75rem', fontWeight: 700 }}
                      >
                        <span>View Details</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
