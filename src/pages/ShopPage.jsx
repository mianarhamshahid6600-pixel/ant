import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, Grid, List, Star, 
  ShoppingBag, Eye, X, Filter, Sparkles, RotateCcw 
} from 'lucide-react';

export const ShopPage = () => {
  const { 
    products, 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    priceRange, 
    sortBy, 
    setSortBy,
    addToCart, 
    setQuickViewProduct,
    isContractorMode,
    setIsContractorMode
  } = useStore();

  const [viewMode, setViewMode] = useState('grid');
  const [selectedSeries, setSelectedSeries] = useState('all');

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    if (selectedSeries !== 'all' && product.series !== selectedSeries) {
      return false;
    }

    const effectivePrice = isContractorMode ? product.contractorPrice : product.price;
    if (effectivePrice > priceRange) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchSeries = product.series.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      if (!matchName && !matchSeries && !matchDesc) {
        return false;
      }
    }

    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = isContractorMode ? a.contractorPrice : a.price;
    const priceB = isContractorMode ? b.contractorPrice : b.price;

    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
    return 0;
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
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="badge badge-prime" style={{ marginBottom: '0.6rem' }}>
            <Sparkles size={13} />
            Alnoor Traders Catalog
          </div>
          <h1>
            Prime Electrical <span className="text-electric-blue">Store & Stock</span>
          </h1>
          <p style={{ marginTop: '0.5rem', maxWidth: '650px', fontSize: '1.05rem' }}>
            Browse our full stock of switches, luxury glass plates, ceiling lights, low-power fans, and circuit breakers.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div 
          className="glass-card"
          style={{
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
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
              placeholder="Search by switch model, wattage, series, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', color: 'var(--text-primary)' }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X size={16} style={{ color: 'var(--text-muted)' }} />
              </button>
            )}
          </div>

          {/* Sort & View Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '0.55rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Top Reviewed</option>
              </select>
            </div>

            {/* Contractor Mode Switch */}
            <button
              onClick={() => setIsContractorMode(!isContractorMode)}
              className="badge"
              style={{
                cursor: 'pointer',
                background: isContractorMode ? '#10B981' : 'var(--bg-tertiary)',
                color: isContractorMode ? '#FFFFFF' : 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
                padding: '0.5rem 0.85rem',
                fontSize: '0.8rem'
              }}
            >
              {isContractorMode ? '✓ Wholesale Rates ON' : 'Wholesale Rates'}
            </button>

            {/* View Mode Toggle */}
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
              padding: '0.5rem 1.15rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              background: selectedCategory === 'all' 
                ? 'linear-gradient(135deg, var(--electric-cyan), var(--electric-blue))' 
                : 'var(--bg-card)',
              color: selectedCategory === 'all' ? '#070B14' : 'var(--text-secondary)',
              border: `1px solid ${selectedCategory === 'all' ? '#00D2FF' : 'var(--border-card)'}`,
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
                  padding: '0.5rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  background: isSelected 
                    ? 'linear-gradient(135deg, var(--electric-cyan), var(--electric-blue))' 
                    : 'var(--bg-card)',
                  color: isSelected ? '#070B14' : 'var(--text-secondary)',
                  border: `1px solid ${isSelected ? '#00D2FF' : 'var(--border-card)'}`,
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
                Try adjusting your search keyword or clearing the category filter.
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
              const displayPrice = isContractorMode ? product.contractorPrice : product.price;

              return (
                <div key={product.id} className="glass-card product-card">
                  
                  {product.badge && (
                    <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                      <span className="badge badge-prime" style={{ fontSize: '0.65rem' }}>
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
                      onClick={() => setQuickViewProduct(product)}
                      className="btn btn-primary btn-sm"
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        opacity: 0.95,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                        padding: '0.4rem 0.85rem',
                        fontSize: '0.8rem',
                        gap: '0.35rem'
                      }}
                    >
                      <Eye size={14} />
                      <span>Quick Specs</span>
                    </button>
                  </div>

                  <div className="product-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--electric-cyan)', textTransform: 'uppercase' }}>
                        {product.series}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', color: '#F59E0B' }}>
                        <Star size={13} fill="#F59E0B" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                      color: 'var(--text-primary)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '2.4em'
                    }}>
                      {product.name}
                    </h4>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1rem' }}>
                      {product.features?.slice(0, 2).map((feat, i) => (
                        <span 
                          key={i} 
                          style={{
                            fontSize: '0.7rem',
                            background: 'var(--bg-tertiary)',
                            color: 'var(--text-secondary)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: '1px solid var(--border-subtle)'
                          }}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid var(--border-subtle)'
                    }}>
                      <div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          Rs. {displayPrice.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: isContractorMode ? '#10B981' : 'var(--text-muted)' }}>
                          {isContractorMode ? 'Wholesale Price' : `Wholesale: Rs. ${product.contractorPrice.toLocaleString()}`}
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(product, 1)}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '0.5rem 0.85rem', gap: '0.35rem' }}
                      >
                        <ShoppingBag size={15} />
                        <span>Add</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sortedProducts.map((product) => {
              const displayPrice = isContractorMode ? product.contractorPrice : product.price;

              return (
                <div 
                  key={product.id}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    padding: '1.25rem',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{
                    width: '100px',
                    height: '100px',
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
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--electric-cyan)', textTransform: 'uppercase' }}>
                        {product.series}
                      </span>
                      {product.badge && (
                        <span className="badge badge-prime" style={{ fontSize: '0.65rem' }}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{product.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      {product.description}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.5rem',
                    minWidth: '150px'
                  }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Rs. {displayPrice.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: isContractorMode ? '#10B981' : 'var(--text-muted)' }}>
                        {isContractorMode ? 'Wholesale Price' : `Wholesale: Rs. ${product.contractorPrice.toLocaleString()}`}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="btn btn-outline btn-sm"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="btn btn-primary btn-sm"
                      >
                        <ShoppingBag size={14} />
                        <span>Add</span>
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
