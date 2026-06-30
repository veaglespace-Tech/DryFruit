'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSplitText, useStagger } from '@/lib/gsap';
import { publicApi } from '@/lib/api';

gsap.registerPlugin(ScrollTrigger);

const STATIC_CATEGORIES = [
  { name: 'Almonds', slug: 'almonds', description: 'Rich in Vitamin E & Protein', image: '/images/categories/almonds.png', count: '13 Products', color: '#F0DCCC' },
  { name: 'Cashews', slug: 'cashews', description: 'Creamy & Buttery Perfection', image: '/images/categories/cashews.png', count: '9 Products', color: '#F4E4CE' },
  { name: 'Pistachios', slug: 'pistachios', description: 'Vibrant & Naturally Roasted', image: '/images/categories/pistachios.png', count: '7 Products', color: '#E8F5E9' },
  { name: 'Walnuts', slug: 'walnuts', description: 'Omega-3 Brain Superfoods', image: '/images/categories/walnuts.png', count: '6 Products', color: '#FBF4EC' },
  { name: 'Medjool Dates', slug: 'dates', description: 'The King of Dates', image: '/images/categories/dates.png', count: '8 Products', color: '#FFF3E0' },
  { name: 'Raisins', slug: 'raisins', description: 'Sun-Dried Sweetness', image: '/images/categories/raisins.png', count: '6 Products', color: '#FCE4EC' },
  { name: 'Mixed Nuts', slug: 'mixed-nuts', description: 'Curated Premium Blends', image: '/images/categories/mixed-nuts.png', count: '8 Products', color: '#F3E5F5' },
  { name: 'Dried Berries', slug: 'dried-berries', description: 'Antioxidant Superfoods', image: '/images/categories/dried-berries.png', count: '8 Products', color: '#FCE4EC' },
  { name: 'Seeds', slug: 'seeds', description: 'Nutrient-Dense Super Seeds', image: '/images/categories/seeds.png', count: '4 Products', color: '#E8F5E9' },
  { name: 'Figs', slug: 'figs', description: 'Premium Sun-Dried Figs', image: '/images/categories/figs.png', count: '3 Products', color: '#FFF3E0' },
];

export default function CategorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useSplitText({ delay: 0.1 });
  const gridRef = useStagger('.category-card', { stagger: 0.08 });
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await publicApi.getCategories();
        if (res.data && res.data.length > 0) {
          const colors = ['#F0DCCC', '#F4E4CE', '#E8F5E9', '#FBF4EC', '#FFF3E0', '#FCE4EC', '#F3E5F5', '#FCE4EC'];
          const formatted = res.data.map((cat: any, index: number) => ({
            name: cat.name,
            slug: cat.slug,
            description: cat.description || 'Premium handpicked collection',
            image: cat.image || `/images/categories/${cat.slug}.png`,
            count: cat.product_count !== undefined ? `${cat.product_count} Products` : 'View Products',
            color: colors[index % colors.length]
          }));
          setCategories(formatted);
        } else {
          setCategories(STATIC_CATEGORIES);
        }
      } catch (err) {
        console.error('Failed to load categories, using fallback:', err);
        setCategories(STATIC_CATEGORIES);
      }
    };
    loadCategories();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="container-luxury">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-border-DEFAULT mb-4">
            <span className="text-primary-DEFAULT text-xs font-button font-semibold uppercase tracking-widest">Browse Categories</span>
          </div>
          <h2
            ref={titleRef as any}
            className="font-heading text-primary-DEFAULT mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}
          >
            Shop By Category
          </h2>
          <div className="section-divider mx-auto" />
          <p className="body-lead max-w-2xl mx-auto mt-4">
            Explore our curated collection of premium dry fruits and nuts, sourced from the finest farms across the globe.
          </p>
        </div>

        {/* Circular Category Grid (Decorative & Classic) */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 justify-items-center justify-center">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="category-card group flex flex-col items-center text-center"
              aria-label={`Browse ${cat.name}`}
            >
              {/* Outer circular stamp border with gold offset shadow */}
              <div 
                className="relative w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-[#3D2314] bg-[#FDFBF7] flex items-center justify-center overflow-hidden transition-all duration-300 shadow-[6px_6px_0px_#D4A95A] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-[2px_2px_0px_#D4A95A]"
              >
                {/* Inner dotted decorative ring */}
                <div className="absolute inset-2 rounded-full border border-dashed border-[#D4A95A]/60 pointer-events-none" />

                {/* Product Image */}
                <div className="relative w-[75%] h-[75%] rounded-full overflow-hidden bg-white/40">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="category-image object-cover transition-transform duration-500 group-hover:scale-115"
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                </div>
              </div>

              {/* Title & Count */}
              <h3 className="font-heading text-sm md:text-base font-bold text-[#3D2314] mt-4 mb-0.5 group-hover:text-[#D4A95A] transition-colors duration-200">
                {cat.name}
              </h3>
              <p className="text-text-muted text-[10px] md:text-xs font-body font-medium">
                {cat.count}
              </p>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link href="/categories" className="btn-outline-luxury inline-flex">
            <span>View All Categories</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
