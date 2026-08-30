import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, Grid, List, Star, 
  ShoppingBag, Eye, Filter, Sparkles, RotateCcw, MessageSquare, ArrowRight 
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
    getWhatsAppProductUrl
  } = useStore();

  const [viewMode, setViewMode] = useState('grid');
  const [selectedSeries, setSelectedSeries] = useState('all');

  // Extract all unique series
  const allSeries = ['all', ...Array.from(new Set(products.map(p => p.series).filter(Boolean)))];

  // Filtering Logic
  const filteredProducts = products.filter(product => {
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
    return 0; // Default popular order
  });

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSeries('all');
    setSearchQuery('');
    setSortBy('popular');
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '80vh', padding: '3rem 0 5rem' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="badge badge-prime" style={{ marginBottom: '0.6rem' }}>
            <Sparkles size={13} />
            Alnoor Traders Wholesale Catalog
          </div>
          <h1>
            Prime Electrical <span className="text-electric-blue">Product Catalog</span>
          </h1>
          <p style={{ marginTop: '0.5rem', maxWidth: '650px', fontSize: '1.05rem' }}>
            Browse our full stock of switches, luxury tempered glass plates, SMD downlights, low-wattage BLDC fans, and circuit breakers.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div 
          className="glass-card"
          style={{
            padding: '1.25rem 1.5rem',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.6rem 1rem',
            flex: '1 1 300px'
          }}>
            <Search size={18} style={{ color: 'var(--electric-cyan)' }} />
            <input 
              type="text"
              placeholder="Search switch model, wattage, series, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                outline: 'none',
                width: '100%',
                fontSize: '0.9rem'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            
            {/* Series Filter */}
            <select
              value={selectedSeries}
              onChange={(e) => setSelectedSeries(e.target.value)}
              style={{
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Series</option>
              {allSeries.filter(s => s !== 'all').map((series) => (
                <option key={series} value={series}>
                  {series}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>

            {/* View Mode Switcher */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '2px'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '0.4rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  background: viewMode === 'grid' ? 'var(--electric-blue)' : 'transparent',
                  color: viewMode === 'grid' ? '#FFFFFF' : 'var(--text-muted)'
                }}
                title="Grid View"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '0.4rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  background: viewMode === 'list' ? 'var(--electric-blue)' : 'transparent',
                  color: viewMode === 'list' ? '#FFFFFF' : 'var(--text-muted)'
                }}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>

          </div>

        </div>

        {/* Category Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '1rem',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              background: selectedCategory === 'all' 
                ? 'var(--badge-bg)' 
                : 'var(--bg-card)',
              color: selectedCategory === 'all' ? 'var(--text-accent)' : 'var(--text-secondary)',
              border: `1px solid ${selectedCategory === 'all' ? 'var(--border-card-hover)' : 'var(--border-card)'}`,
              boxShadow: selectedCategory === 'all' ? 'var(--glow-electric)' : 'none',
              cursor: 'pointer'
            }}
          >
            All Categories ({products.length})
          </button>

          {categories.map((cat) => {
            const count = products.filter(p => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  background: isSelected 
                    ? 'var(--badge-bg)' 
                    : 'var(--bg-card)',
                  color: isSelected ? 'var(--text-accent)' : 'var(--text-secondary)',
                  border: `1px solid ${isSelected ? 'var(--border-card-hover)' : 'var(--border-card)'}`,
                  boxShadow: isSelected ? 'var(--glow-electric)' : 'none',
                  cursor: 'pointer'
                }}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Products Display */}
        {sortedProducts.length === 0 ? (
          <div 
            className="glass-card"
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem'
            }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
            }}>
              <Filter size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>No matching products found</h3>
              <p style={{ marginTop: '0.35rem', color: 'var(--text-muted)' }}>
                Try adjusting your search keyword or resetting the filters.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="btn btn-primary btn-sm"
              style={{ gap: '0.4rem' }}
            >
              <RotateCcw size={15} />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid-products">
            {sortedProducts.map((product) => {
              return (
                <div 
                  key={product.id} 
                  className="glass-card product-card"
                  onClick={() => viewProductDetail(product)}
                  style={{ cursor: 'pointer' }}
                >
                  
                  {product.badge && (
                    <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
                      <span className="badge badge-prime" style={{ fontSize: '0.62rem', padding: '0.15rem 0.45rem' }}>
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <div className="product-image-wrap">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.src = product.fallbackImage;
                      }}
                    />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="btn btn-primary btn-sm"
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        opacity: 0.95,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.75rem',
                        gap: '0.3rem'
                      }}
                    >
                      <Eye size={13} />
                      <span>Quick View</span>
                    </button>
                  </div>

                  <div className="product-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-accent)', textTransform: 'uppercase' }}>
                        {product.series}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', color: '#F59E0B' }}>
                        <Star size={12} fill="#F59E0B" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h4 style={{
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      marginBottom: '0.35rem',
                      color: 'var(--text-primary)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '2.4em',
                      lineHeight: 1.3
                    }}>
                      {product.name}
                    </h4>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.6rem' }}>
                      {product.features?.slice(0, 2).map((feat, i) => (
                        <span 
                          key={i} 
                          style={{
                            fontSize: '0.68rem',
                            background: 'var(--bg-tertiary)',
                            color: 'var(--text-secondary)',
                            padding: '1px 5px',
                            borderRadius: '3px',
                            border: '1px solid var(--border-subtle)'
                          }}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                      paddingTop: '0.55rem',
                      borderTop: '1px solid var(--border-subtle)',
                      gap: '0.4rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>
                          Wholesale Price
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          In Stock
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <a
                          href={getWhatsAppProductUrl(product, 1)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-whatsapp btn-sm"
                          style={{ padding: '0.35rem 0.55rem', gap: '0.3rem', fontSize: '0.75rem' }}
                          title="Order on WhatsApp"
                        >
                          <MessageSquare size={14} />
                          <span>WhatsApp</span>
                        </a>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '0.35rem 0.55rem', fontSize: '0.75rem' }}
                          title="Add to Cart"
                        >
                          <ShoppingBag size={13} />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sortedProducts.map((product) => {
              return (
                <div 
                  key={product.id}
                  className="glass-card"
                  onClick={() => viewProductDetail(product)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '1.15rem',
                    flexWrap: 'wrap',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: 'var(--radius-md)',
                    background: 'radial-gradient(circle at center, rgba(0, 102, 255, 0.1) 0%, transparent 70%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{ maxHeight: '80%', maxWidth: '80%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.src = product.fallbackImage;
                      }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-accent)', textTransform: 'uppercase' }}>
                        {product.series}
                      </span>
                      {product.badge && (
                        <span className="badge badge-prime" style={{ fontSize: '0.65rem' }}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{product.name}</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      {product.description}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.5rem',
                    minWidth: '180px'
                  }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#10B981' }}>
                        Wholesale Rate
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        In Stock • Faisalabad
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <a
                        href={getWhatsAppProductUrl(product, 1)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-whatsapp btn-sm"
                        style={{ gap: '0.35rem' }}
                      >
                        <MessageSquare size={14} />
                        <span>WhatsApp</span>
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        className="btn btn-primary btn-sm"
                        style={{ gap: '0.35rem' }}
                      >
                        <ShoppingBag size={14} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
