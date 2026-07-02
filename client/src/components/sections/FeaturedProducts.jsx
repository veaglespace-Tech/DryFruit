"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useStagger, useSplitText } from "@/lib/gsap";
import ProductCard from "@/components/ui/ProductCard";
import { publicApi } from "@/lib/api";

// Static featured products data (fallback while API loads)
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Premium California Almonds",
    slug: "premium-california-almonds",
    price: 599,
    original_price: 799,
    discount_percent: 25,
    weight: "500g",
    thumbnail: "/images/categories/almonds.png",
    rating: 4.8,
    review_count: 247,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Dry Fruits & Seeds", slug: "dry-fruits-seeds" },
    short_description:
      "Hand-selected California almonds, naturally rich and nutrient-dense",
  },
  {
    id: 2,
    name: "Tata Sampann Premium Pure Cow Ghee 1L",
    slug: "tata-sampann-cow-ghee-1l",
    price: 649,
    original_price: 720,
    discount_percent: 10,
    weight: "1L",
    thumbnail: "/images/categories/oils-ghee.png",
    rating: 4.9,
    review_count: 231,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Oils & Ghee", slug: "oils-ghee" },
    short_description:
      "Traditional granular pure cow ghee with rich aroma and delicious taste",
  },
  {
    id: 3,
    name: "Tata Tea Gold Premium Leaf Tea 1kg",
    slug: "tata-tea-gold-1kg",
    price: 449,
    original_price: 520,
    discount_percent: 13,
    weight: "1kg",
    thumbnail: "/images/categories/tea-coffee-beverages.png",
    rating: 4.8,
    review_count: 312,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Tea, Coffee & Beverages", slug: "tea-coffee-beverages" },
    short_description:
      "A premium blend of Assam teas with 15% long leaves for rich aroma",
  },
  {
    id: 4,
    name: "Tata Sampann Premium Toor Dal (Arhar) 1kg",
    slug: "tata-sampann-toor-dal-1kg",
    price: 189,
    original_price: 220,
    discount_percent: 14,
    weight: "1kg",
    thumbnail: "/images/categories/atta-rice-dal.png",
    rating: 4.8,
    review_count: 289,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Atta, Rice & Dal", slug: "atta-rice-dal" },
    short_description:
      "Unpolished premium quality yellow pigeon peas, rich in protein",
  },
  {
    id: 5,
    name: "Tata Sampann Turmeric Powder (Haldi) 500g",
    slug: "tata-sampann-turmeric-500g",
    price: 129,
    original_price: 160,
    discount_percent: 19,
    weight: "500g",
    thumbnail: "/images/categories/masala-spices-salt.png",
    rating: 4.8,
    review_count: 222,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Masala, Spices & Salt", slug: "masala-spices-salt" },
    short_description:
      "Pure turmeric powder with guaranteed minimum 3% curcumin content",
  },
  {
    id: 6,
    name: "Tata Soulfull Fruit & Nut Millet Muesli 400g",
    slug: "tata-soulfull-muesli-400g",
    price: 249,
    original_price: 299,
    discount_percent: 16,
    weight: "400g",
    thumbnail: "/images/categories/breakfast-essentials.png",
    rating: 4.8,
    review_count: 134,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Breakfast Essentials", slug: "breakfast-essentials" },
    short_description:
      "Crunchy millet muesli loaded with ragi, oats, almonds, and dry fruits",
  },
  {
    id: 7,
    name: "Tata Sampann Yumside Paneer Butter Masala 300g",
    slug: "tata-sampann-paneer-butter-masala-300g",
    price: 129,
    original_price: 149,
    discount_percent: 13,
    weight: "300g",
    thumbnail: "/images/categories/sauces-instant-foods.png",
    rating: 4.7,
    review_count: 112,
    is_featured: true,
    is_best_seller: false,
    category: { name: "Sauces & Spreads", slug: "sauces-instant-foods" },
    short_description:
      "Ready-to-eat rich paneer butter masala, cooked with premium ingredients",
  },
  {
    id: 8,
    name: "Whole Cashews W240 Grade",
    slug: "whole-cashews-w240",
    price: 799,
    original_price: 999,
    discount_percent: 20,
    weight: "500g",
    thumbnail: "/images/categories/cashews.png",
    rating: 4.9,
    review_count: 189,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Dry Fruits & Seeds", slug: "dry-fruits-seeds" },
    short_description:
      "Premium W240 grade whole cashews - creamy, large, perfectly roasted",
  },
];

export default function FeaturedProducts({
  title = "Featured Products",
  subtitle = "Handpicked selection of our finest premium dry fruits and nuts, loved by thousands of happy customers.",
  filter = "featured",
  limit = 8,
}) {
  const titleRef = useSplitText({ delay: 0.1 });
  const gridRef = useStagger(".product-card", { stagger: 0.07 });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let res;
        if (filter === "best_seller") {
          res = await publicApi.getBestSellers();
        } else {
          res = await publicApi.getFeaturedProducts();
        }
        if (res.data && res.data.length > 0) {
          const formatted = res.data.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: Number(p.price),
            original_price: p.original_price
              ? Number(p.original_price)
              : undefined,
            discount_percent: p.discount_percent,
            weight: p.weight,
            thumbnail: p.thumbnail || "/images/categories/almonds.png",
            rating: Number(p.rating),
            review_count: p.review_count,
            category: p.category
              ? { name: p.category.name, slug: p.category.slug }
              : { name: "Almonds", slug: "almonds" },
          }));
          setProducts(formatted.slice(0, limit));
        } else {
          const staticFallback =
            filter === "best_seller"
              ? FEATURED_PRODUCTS.filter((p) => p.is_best_seller).slice(
                  0,
                  limit,
                )
              : filter === "featured"
                ? FEATURED_PRODUCTS.filter((p) => p.is_featured).slice(0, limit)
                : FEATURED_PRODUCTS.slice(0, limit);
          setProducts(staticFallback);
        }
      } catch (err) {
        console.error(
          "Failed to load live featured products, using fallback:",
          err,
        );
        const staticFallback =
          filter === "best_seller"
            ? FEATURED_PRODUCTS.filter((p) => p.is_best_seller).slice(0, limit)
            : filter === "featured"
              ? FEATURED_PRODUCTS.filter((p) => p.is_featured).slice(0, limit)
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
                {filter === "best_seller" ? "🔥 Top Sellers" : "⭐ Featured"}
              </span>
            </div>
            <h2
              ref={titleRef}
              className="font-heading text-primary-DEFAULT"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                fontWeight: 700,
              }}
            >
              {title}
            </h2>
            <div
              className="section-divider mt-3 ml-0"
            />
            <p className="body-lead max-w-xl">{subtitle}</p>
          </div>
          <Link
            href="/products"
            className="btn-outline-luxury flex-shrink-0 self-start md:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-6 scrollbar-thin scroll-smooth"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-auto">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
