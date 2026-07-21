"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const FALLBACK_CATEGORIES = [
  {
    id: 1,
    name: "Dry Fruits & Seeds",
    slug: "dry-fruits-seeds",
    description: "Premium handpicked dry fruits, nuts, and nutrient-dense healthy seeds",
    image: "/images/categories/dry-fruits-seeds.png",
  },
  {
    id: 2,
    name: "Oils & Ghee",
    slug: "oils-ghee",
    description: "Cold-pressed oils and pure cow ghee for healthy cooking",
    image: "/images/categories/oils-ghee.png",
  },
  {
    id: 3,
    name: "Tea, Coffee & Beverages",
    slug: "tea-coffee-beverages",
    description: "Refreshing premium leaf teas and gourmet instant coffees",
    image: "/images/categories/tea-coffee-beverages.png",
  },
  {
    id: 4,
    name: "Atta, Rice & Dal",
    slug: "atta-rice-dal",
    description: "Organic unpolished flours, basmati rice, and protein-rich pulses",
    image: "/images/categories/atta-rice-dal.png",
  },
  {
    id: 5,
    name: "Masala, Spices & Salt",
    slug: "masala-spices-salt",
    description: "Pure, authentic spice powders, whole spices, and low sodium salts",
    image: "/images/categories/masala-spices-salt.png",
  },
  {
    id: 6,
    name: "Breakfast Essentials",
    slug: "breakfast-essentials",
    description: "Healthy millet muesli, ragi bites, and instant oats for a nutritious morning",
    image: "/images/categories/breakfast-essentials.png",
  },
  {
    id: 7,
    name: "Sauces & Spreads",
    slug: "sauces-instant-foods",
    description: "Premium ready-to-eat meals, spreads, and authentic cooking pastes",
    image: "/images/categories/sauces-instant-foods.png",
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          (typeof window !== "undefined"
            ? `http://${window.location.hostname}:5000/api`
            : "http://localhost:5000/api");

        const res = await fetch(`${baseUrl}/categories?active=true`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCategories(data.data);
        }
      } catch (err) {
        // Fallback gracefully without breaking UI
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: "110px" }}>
        {/* Header */}
        <div className="py-10 md:py-14 bg-background border-b border-border-DEFAULT text-center">
          <div className="container-luxury max-w-xl mx-auto">
            <span className="text-xs font-button font-bold text-accent-DEFAULT uppercase tracking-widest flex items-center justify-center gap-1.5 mb-1">
              <Sparkles size={14} /> Our Curated Collections
            </span>
            <h1
              className="font-heading text-primary-DEFAULT mt-2 mb-3"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)", fontWeight: 700 }}
            >
              Shop By Category
            </h1>
            <div className="section-divider mx-auto my-3" />
            <p className="text-text-muted font-body text-sm md:text-base leading-relaxed">
              Explore our hand-sorted collection of 100% natural dry fruits, organic nuts, dates, and superberries.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <section className="section-padding bg-surface">
          <div className="container-luxury">
            {loading ? (
              <div className="text-center py-12 text-text-muted font-body text-sm">
                Loading categories...
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((cat) => (
                  <Link
                    key={cat.id || cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className="group flex flex-col justify-between p-5 rounded-3xl border border-border-DEFAULT bg-white hover:shadow-luxury-lg hover:border-accent-DEFAULT/40 transition-all duration-400"
                  >
                    <div className="space-y-4">
                      {/* Image frame */}
                      <div className="relative aspect-square rounded-2xl overflow-hidden bg-primary-50 border border-border-light">
                        <Image
                          src={cat.image || `/images/categories/${cat.slug}.png`}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-button font-bold text-primary-DEFAULT shadow-xs">
                          {cat._count?.products !== undefined
                            ? `${cat._count.products} Products`
                            : "Premium Selection"}
                        </span>
                      </div>

                      {/* Meta */}
                      <div>
                        <h3 className="font-heading text-lg font-bold text-primary-DEFAULT group-hover:text-secondary-DEFAULT transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-text-muted font-body text-xs mt-1.5 leading-relaxed line-clamp-2">
                          {cat.description || `Hand-sorted 100% natural ${cat.name.toLowerCase()} packaged fresh.`}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border-light flex items-center justify-between">
                      <span className="text-xs font-button font-bold text-accent-DEFAULT flex items-center gap-1 group-hover:text-primary-DEFAULT transition-colors">
                        Explore Products
                        <ArrowRight
                          size={12}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
