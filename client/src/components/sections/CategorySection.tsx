'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSplitText, useStagger } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: 'Almonds', slug: 'almonds', description: 'Rich in Vitamin E & Protein', image: '/images/categories/almonds.png', count: '12 Products', color: '#F0DCCC' },
  { name: 'Cashews', slug: 'cashews', description: 'Creamy & Buttery Perfection', image: '/images/categories/cashews.png', count: '8 Products', color: '#F4E4CE' },
  { name: 'Pistachios', slug: 'pistachios', description: 'Vibrant & Naturally Roasted', image: '/images/categories/pistachios.png', count: '6 Products', color: '#E8F5E9' },
  { name: 'Walnuts', slug: 'walnuts', description: 'Omega-3 Brain Superfoods', image: '/images/categories/walnuts.png', count: '5 Products', color: '#FBF4EC' },
  { name: 'Medjool Dates', slug: 'dates', description: 'The King of Dates', image: '/images/categories/dates.png', count: '7 Products', color: '#FFF3E0' },
  { name: 'Raisins', slug: 'raisins', description: 'Sun-Dried Sweetness', image: '/images/categories/raisins.png', count: '4 Products', color: '#FCE4EC' },
  { name: 'Mixed Nuts', slug: 'mixed-nuts', description: 'Curated Premium Blends', image: '/images/categories/mixed-nuts.png', count: '5 Products', color: '#F3E5F5' },
  { name: 'Dried Berries', slug: 'dried-berries', description: 'Antioxidant Superfoods', image: '/images/categories/dried-berries.png', count: '8 Products', color: '#FCE4EC' },
];

export default function CategorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useSplitText({ delay: 0.1 });
  const gridRef = useStagger('.category-card', { stagger: 0.08 });

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

        {/* Category Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="category-card group"
              aria-label={`Browse ${cat.name}`}
            >
              <div
                className="relative overflow-hidden rounded-2xl border border-border-DEFAULT transition-all duration-500 group-hover:shadow-luxury-lg group-hover:border-accent-DEFAULT/30"
                style={{ backgroundColor: cat.color }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="category-image object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Count Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-button font-semibold text-primary-DEFAULT shadow-sm">
                    {cat.count}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-heading text-base font-semibold text-primary-DEFAULT mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-text-muted text-xs font-body mb-3 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-1 text-accent-DEFAULT text-xs font-button font-semibold">
                    <span>Explore</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Hover overlay line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-DEFAULT to-accent-DEFAULT transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
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
