'use client';

import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useStagger, useSplitText } from '@/lib/gsap';
import ProductCard, { ProductCardProps } from '@/components/ui/ProductCard';
import { publicApi } from '@/lib/api';

// Static featured products data (fallback while API loads)
const FEATURED_PRODUCTS: ProductCardProps[] = [
  {
    id: 1, name: 'Premium California Almonds', slug: 'premium-california-almonds',
    price: 599, original_price: 799, discount_percent: 25, weight: '500g',
    thumbnail: '/images/categories/almonds.png', rating: 4.8, review_count: 247,
    is_featured: true, is_best_seller: true,
    category: { name: 'Almonds', slug: 'almonds' },
    short_description: 'Hand-selected California almonds, naturally rich and nutrient-dense',
  },
  {
    id: 2, name: 'Whole Cashews W240 Grade', slug: 'whole-cashews-w240',
    price: 799, original_price: 999, discount_percent: 20, weight: '500g',
    thumbnail: '/images/categories/cashews.png', rating: 4.9, review_count: 189,
    is_featured: true, is_best_seller: true,
    category: { name: 'Cashews', slug: 'cashews' },
    short_description: 'Premium W240 grade whole cashews - creamy, large, perfectly roasted',
  },
  {
    id: 3, name: 'Iranian Roasted Pistachios', slug: 'iranian-roasted-pistachios',
    price: 1199, original_price: 1499, discount_percent: 20, weight: '500g',
    thumbnail: '/images/categories/pistachios.png', rating: 4.7, review_count: 142,
    is_featured: true, is_best_seller: false,
    category: { name: 'Pistachios', slug: 'pistachios' },
    short_description: 'Naturally roasted Iranian pistachios with vibrant green color',
  },
  {
    id: 4, name: 'Kashmiri Walnut Kernels', slug: 'kashmiri-walnut-kernels',
    price: 699, original_price: 899, discount_percent: 22, weight: '500g',
    thumbnail: '/images/categories/walnuts.png', rating: 4.8, review_count: 201,
    is_featured: true, is_best_seller: true,
    category: { name: 'Walnuts', slug: 'walnuts' },
    short_description: 'Premium Kashmiri walnut kernels, omega-3 rich and brain-healthy',
  },
  {
    id: 5, name: 'Medjool Dates Premium', slug: 'medjool-dates-premium',
    price: 899, original_price: 1099, discount_percent: 18, weight: '500g',
    thumbnail: '/images/categories/dates.png', rating: 4.9, review_count: 315,
    is_featured: false, is_best_seller: true,
    category: { name: 'Dates', slug: 'dates' },
    short_description: 'Plump, glossy, and irresistibly sweet premium Medjool dates',
  },
  {
    id: 6, name: 'Golden Raisins Kishmish', slug: 'golden-raisins-kishmish',
    price: 349, original_price: 449, discount_percent: 22, weight: '500g',
    thumbnail: '/images/categories/raisins.png', rating: 4.6, review_count: 178,
    is_featured: false, is_best_seller: false,
    category: { name: 'Raisins', slug: 'raisins' },
    short_description: 'Sun-dried golden raisins with a natural sweetness and plump texture',
  },
  {
    id: 7, name: 'Royal Mixed Nuts Deluxe', slug: 'royal-mixed-nuts-deluxe',
    price: 999, original_price: 1299, discount_percent: 23, weight: '500g',
    thumbnail: '/images/categories/mixed-nuts.png', rating: 4.8, review_count: 256,
    is_featured: true, is_best_seller: true,
    category: { name: 'Mixed Nuts', slug: 'mixed-nuts' },
    short_description: 'A luxurious blend of premium almonds, cashews, pistachios, and walnuts',
  },
  {
    id: 8, name: 'Superberry Blend', slug: 'superberry-blend',
    price: 649, original_price: 849, discount_percent: 24, weight: '300g',
    thumbnail: '/images/categories/dried-berries.png', rating: 4.7, review_count: 134,
    is_featured: true, is_best_seller: false,
    category: { name: 'Dried Berries', slug: 'dried-berries' },
    short_description: 'Antioxidant powerhouse - cranberries, blueberries, and goji berries',
  },
];

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  filter?: 'featured' | 'best_seller' | 'all';
  limit?: number;
}

export default function FeaturedProducts({
  title = 'Featured Products',
  subtitle = 'Handpicked selection of our finest premium dry fruits and nuts, loved by thousands of happy customers.',
  filter = 'featured',
  limit = 8,
}: FeaturedProductsProps) {
  const titleRef = useSplitText({ delay: 0.1 });
  const gridRef = useStagger('.product-card', { stagger: 0.07 });
  const [products, setProducts] = useState<ProductCardProps[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let res;
        if (filter === 'best_seller') {
          res = await publicApi.getBestSellers();
        } else {
          res = await publicApi.getFeaturedProducts();
        }
        
        if (res.data && res.data.length > 0) {
          const formatted = res.data.map((p: any) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: Number(p.price),
            original_price: p.original_price ? Number(p.original_price) : undefined,
            discount_percent: p.discount_percent,
            weight: p.weight,
            thumbnail: p.thumbnail || '/images/categories/almonds.png',
            rating: Number(p.rating),
            review_count: p.review_count,
            category: p.category ? { name: p.category.name, slug: p.category.slug } : { name: 'Almonds', slug: 'almonds' }
          }));
          setProducts(formatted.slice(0, limit));
        } else {
          const staticFallback = filter === 'best_seller'
            ? FEATURED_PRODUCTS.filter(p => p.is_best_seller).slice(0, limit)
            : filter === 'featured'
            ? FEATURED_PRODUCTS.filter(p => p.is_featured).slice(0, limit)
            : FEATURED_PRODUCTS.slice(0, limit);
          setProducts(staticFallback);
        }
      } catch (err) {
        console.error('Failed to load live featured products, using fallback:', err);
        const staticFallback = filter === 'best_seller'
          ? FEATURED_PRODUCTS.filter(p => p.is_best_seller).slice(0, limit)
          : filter === 'featured'
          ? FEATURED_PRODUCTS.filter(p => p.is_featured).slice(0, limit)
          : FEATURED_PRODUCTS.slice(0, limit);
        setProducts(staticFallback);
      }
    };
    loadProducts();
  }, [filter, limit]);

  return (
    <section className="section-padding bg-surface">
      <div className="container-luxury">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-DEFAULT/20 mb-4">
              <span className="text-accent-DEFAULT text-xs font-button font-semibold uppercase tracking-widest">
                {filter === 'best_seller' ? '🔥 Top Sellers' : '⭐ Featured'}
              </span>
            </div>
            <h2
              ref={titleRef as any}
              className="font-heading text-primary-DEFAULT"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700 }}
            >
              {title}
            </h2>
            <div className="section-divider mt-3 ml-0" style={{ margin: '12px 0' }} />
            <p className="body-lead max-w-xl">{subtitle}</p>
          </div>
          <Link href="/products" className="btn-outline-luxury flex-shrink-0 self-start md:self-auto">
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
