'use client';

import { useState, useRef } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X, Leaf } from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard, { ProductCardProps } from '@/components/ui/ProductCard';
import { useStagger } from '@/lib/gsap';

const ALL_PRODUCTS: ProductCardProps[] = [
  { id: 1, name: 'Premium California Almonds', slug: 'premium-california-almonds', price: 599, original_price: 799, discount_percent: 25, weight: '500g', thumbnail: '/images/categories/almonds.png', rating: 4.8, review_count: 247, is_featured: true, is_best_seller: true, category: { name: 'Almonds', slug: 'almonds' } },
  { id: 2, name: 'Whole Cashews W240 Grade', slug: 'whole-cashews-w240', price: 799, original_price: 999, discount_percent: 20, weight: '500g', thumbnail: '/images/categories/cashews.png', rating: 4.9, review_count: 189, is_featured: true, is_best_seller: true, category: { name: 'Cashews', slug: 'cashews' } },
  { id: 3, name: 'Iranian Roasted Pistachios', slug: 'iranian-roasted-pistachios', price: 1199, original_price: 1499, discount_percent: 20, weight: '500g', thumbnail: '/images/categories/pistachios.png', rating: 4.7, review_count: 142, is_featured: true, is_best_seller: false, category: { name: 'Pistachios', slug: 'pistachios' } },
  { id: 4, name: 'Kashmiri Walnut Kernels', slug: 'kashmiri-walnut-kernels', price: 699, original_price: 899, discount_percent: 22, weight: '500g', thumbnail: '/images/categories/walnuts.png', rating: 4.8, review_count: 201, is_featured: true, is_best_seller: true, category: { name: 'Walnuts', slug: 'walnuts' } },
  { id: 5, name: 'Medjool Dates Premium', slug: 'medjool-dates-premium', price: 899, original_price: 1099, discount_percent: 18, weight: '500g', thumbnail: '/images/categories/dates.png', rating: 4.9, review_count: 315, is_featured: false, is_best_seller: true, category: { name: 'Dates', slug: 'dates' } },
  { id: 6, name: 'Golden Raisins Kishmish', slug: 'golden-raisins-kishmish', price: 349, original_price: 449, discount_percent: 22, weight: '500g', thumbnail: '/images/categories/raisins.png', rating: 4.6, review_count: 178, is_featured: false, is_best_seller: false, category: { name: 'Raisins', slug: 'raisins' } },
  { id: 7, name: 'Royal Mixed Nuts Deluxe', slug: 'royal-mixed-nuts-deluxe', price: 999, original_price: 1299, discount_percent: 23, weight: '500g', thumbnail: '/images/categories/mixed-nuts.png', rating: 4.8, review_count: 256, is_featured: true, is_best_seller: true, category: { name: 'Mixed Nuts', slug: 'mixed-nuts' } },
  { id: 8, name: 'Superberry Blend', slug: 'superberry-blend', price: 649, original_price: 849, discount_percent: 24, weight: '300g', thumbnail: '/images/categories/dried-berries.png', rating: 4.7, review_count: 134, is_featured: true, is_best_seller: false, category: { name: 'Dried Berries', slug: 'dried-berries' } },
  { id: 9, name: 'Premium Dried Figs', slug: 'premium-dried-figs', price: 549, original_price: 699, discount_percent: 21, weight: '400g', thumbnail: '/images/categories/figs.png', rating: 4.6, review_count: 98, is_featured: false, is_best_seller: false, category: { name: 'Dried Berries', slug: 'dried-berries' } },
];

const categories = ['All', 'Almonds', 'Cashews', 'Pistachios', 'Walnuts', 'Dates', 'Raisins', 'Mixed Nuts', 'Dried Berries'];
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Popularity', value: 'popularity' },
];

export default function ProductsPageClient() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const gridRef = useStagger('.product-card', { stagger: 0.06 });

  // Filter products
  let filtered = ALL_PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'All' || p.category.name === selectedCategory;
    return matchSearch && matchCat;
  });

  // Sort products
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popularity') return b.review_count - a.review_count;
    return b.id - a.id;
  });

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: '110px' }}>

        {/* Page Header */}
        <div className="section-padding bg-background border-b border-border-DEFAULT">
          <div className="container-luxury">
            <div className="flex items-center gap-2 text-sm font-body text-text-muted mb-4">
              <a href="/" className="hover:text-primary-DEFAULT transition-colors">Home</a>
              <span>/</span>
              <span className="text-primary-DEFAULT font-semibold">Products</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-heading text-primary-DEFAULT mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}>
                  All Products
                </h1>
                <p className="text-text-muted font-body">{filtered.length} products found</p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border-DEFAULT bg-surface font-body text-sm outline-none focus:border-accent-DEFAULT transition-colors"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X size={16} className="text-text-muted" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container-luxury py-8">
          <div className="flex gap-8">

            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="sticky top-32">
                <div className="p-5 rounded-2xl border border-border-DEFAULT bg-surface mb-4">
                  <h3 className="font-heading text-sm font-semibold text-primary-DEFAULT mb-4 flex items-center gap-2">
                    <Leaf size={14} className="text-accent-DEFAULT" />
                    Categories
                  </h3>
                  <div className="space-y-1.5">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-body transition-all ${
                          selectedCategory === cat
                            ? 'bg-primary-DEFAULT text-white font-semibold'
                            : 'text-text-DEFAULT hover:bg-background hover:text-primary-DEFAULT'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="p-5 rounded-2xl border border-border-DEFAULT bg-surface">
                  <h3 className="font-heading text-sm font-semibold text-primary-DEFAULT mb-4">Sort By</h3>
                  <div className="space-y-1.5">
                    {sortOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setSortBy(opt.value)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-body transition-all ${
                          sortBy === opt.value
                            ? 'bg-accent-DEFAULT text-white font-semibold'
                            : 'text-text-DEFAULT hover:bg-background'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Mobile Filter Row */}
              <div className="lg:hidden flex gap-3 mb-6 overflow-x-auto pb-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-button font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary-DEFAULT text-white'
                        : 'bg-surface border border-border-DEFAULT text-text-DEFAULT hover:border-primary-DEFAULT'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {filtered.length > 0 ? (
                <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mx-auto mb-4">
                    <Search size={28} className="text-text-muted" />
                  </div>
                  <h3 className="font-heading text-xl text-primary-DEFAULT mb-2">No products found</h3>
                  <p className="text-text-muted font-body text-sm">Try adjusting your search or category filters</p>
                  <button onClick={() => { setSearch(''); setSelectedCategory('All'); }} className="btn-outline-luxury mt-6 text-sm">
                    <span>Clear Filters</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
