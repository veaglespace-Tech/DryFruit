"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Flame, Star, Award } from "lucide-react";
import Link from "next/link";
import { useStagger, useFadeUp } from "@/lib/gsap";
import ProductCard from "@/components/ui/ProductCard";
import { useGetFeaturedProductsQuery, useGetBestSellersQuery } from "@/store/api/apiSlice";
import gsap from "gsap";

// Static fallback products — used only if server is unavailable
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
    short_description: "Hand-selected California almonds, naturally rich and nutrient-dense",
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
    short_description: "Traditional granular pure cow ghee with rich aroma and delicious taste",
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
    short_description: "A premium blend of Assam teas with 15% long leaves for rich aroma",
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
    short_description: "Unpolished premium quality yellow pigeon peas, rich in protein",
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
    short_description: "Pure turmeric powder with guaranteed minimum 3% curcumin content",
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
    short_description: "Crunchy millet muesli loaded with ragi, oats, almonds, and dry fruits",
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
    short_description: "Ready-to-eat rich paneer butter masala, cooked with premium ingredients",
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
    short_description: "Premium W240 grade whole cashews - creamy, large, perfectly roasted",
  },
];

const TABS = [
  { key: "featured", label: "Featured", icon: <Award size={14} /> },
  { key: "best_seller", label: "Best Sellers", icon: <Flame size={14} /> },
];

export default function FeaturedProducts({
  title = "Our Signature Harvest",
  subtitle = "Hand-selected premium dry fruits, nuts, and organic superfoods sourced directly from the finest farms.",
  filter = "featured",
  limit = 8,
}) {
  const titleRef = useFadeUp({ delay: 0.1 });
  const gridRef = useStagger(".product-card", { stagger: 0.06 });
  const [activeTab, setActiveTab] = useState(filter);
  const [products, setProducts] = useState(FEATURED_PRODUCTS);
  const tabIndicatorRef = useRef(null);
  const tabRefs = useRef([]);

  const isBestSeller = activeTab === "best_seller";

  const { data: featuredData, isSuccess: isFeaturedSuccess, isError: isFeaturedError } =
    useGetFeaturedProductsQuery(undefined, { skip: isBestSeller });
  const { data: bestSellerData, isSuccess: isBestSellerSuccess, isError: isBestSellerError } =
    useGetBestSellersQuery(undefined, { skip: !isBestSeller });

  useEffect(() => {
    const liveData = isBestSeller ? bestSellerData : featuredData;
    const isSuccess = isBestSeller ? isBestSellerSuccess : isFeaturedSuccess;
    const isError = isBestSeller ? isBestSellerError : isFeaturedError;

    if (isSuccess && Array.isArray(liveData) && liveData.length > 0) {
      const formatted = liveData.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: Number(p.price),
        original_price: p.original_price ? Number(p.original_price) : undefined,
        discount_percent: p.discount_percent,
        weight: p.weight,
        thumbnail: p.thumbnail || "/images/categories/almonds.png",
        rating: Number(p.rating),
        review_count: p.review_count,
        is_featured: p.is_featured,
        is_best_seller: p.is_best_seller,
        category: p.category
          ? { name: p.category.name, slug: p.category.slug }
          : { name: "Almonds", slug: "almonds" },
      }));
      setProducts(formatted.slice(0, limit));
    } else if (isSuccess && Array.isArray(liveData) && liveData.length === 0) {
      setProducts([]);
    } else if (isError) {
      setProducts([]);
    }
  }, [activeTab, limit, featuredData, bestSellerData, isFeaturedSuccess, isBestSellerSuccess, isFeaturedError, isBestSellerError, isBestSeller]);

  // Animate grid on tab switch
  const handleTabSwitch = (tabKey, index) => {
    if (tabKey === activeTab) return;
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.querySelectorAll(".product-card"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" }
      );
    }
    setActiveTab(tabKey);
  };

  if (products.length === 0) return null;

  const displayTitle = isBestSeller ? "Best Sellers" : title;
  const displaySubtitle = isBestSeller
    ? "Our top-rated products that customers keep coming back for."
    : subtitle;

  return (
    <section
      style={{
        position: "relative",
        paddingTop: "5rem",
        paddingBottom: "6rem",
        background: "#FFFDF8",
        overflow: "hidden",
      }}
    >
      {/* Subtle background texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212,169,90,0.05) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(107,62,38,0.04) 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      <div className="container-luxury" style={{ position: "relative" }}>

        {/* ── Section Header ── */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>

          {/* Dynamic Ultra-Modern Button Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 24px",
              borderRadius: "100px",
              background: isBestSeller
                ? "linear-gradient(135deg, #D97706 0%, #B45309 100%)"
                : "linear-gradient(135deg, #3D2314 0%, #6B3E26 50%, #8C5332 100%)",
              color: "white",
              fontSize: "12px",
              fontWeight: 800,
              fontFamily: "var(--font-button)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              boxShadow: isBestSeller
                ? "0 8px 25px rgba(217,119,6,0.35), inset 0 1px 1px rgba(255,255,255,0.4)"
                : "0 8px 25px rgba(107,62,38,0.35), inset 0 1px 1px rgba(255,255,255,0.3)",
              border: "1.5px solid rgba(212,169,90,0.4)",
              marginBottom: "1.5rem",
            }}
          >
            {/* Live Gold Pulse Dot */}
            <span style={{ position: "relative", display: "inline-flex", width: "7px", height: "7px" }}>
              <span style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", background: "#D4A95A", opacity: 0.8, animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
              <span style={{ position: "relative", width: "7px", height: "7px", borderRadius: "50%", background: "#F59E0B" }} />
            </span>
            {isBestSeller ? <Flame size={14} style={{ color: "#F59E0B" }} /> : <Award size={14} style={{ color: "#D4A95A" }} />}
            <span>{isBestSeller ? "Best Sellers" : "Signature Harvest"}</span>
          </div>

          {/* Main Heading */}
          <h2
            ref={titleRef}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 800,
              color: "#3D2314",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            {isBestSeller ? (
              <>
                Our{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Best Sellers
                </span>
              </>
            ) : (
              <>
                Our{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #6B3E26 0%, #A97142 50%, #D4A95A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Signature Harvest
                </span>
              </>
            )}
          </h2>

          {/* Ornamental divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "1rem" }}>
            <div style={{ width: "50px", height: "1px", background: "linear-gradient(to right, transparent, #D4A95A)" }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D4A95A" }} />
            <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#A97142" }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D4A95A" }} />
            <div style={{ width: "50px", height: "1px", background: "linear-gradient(to left, transparent, #D4A95A)" }} />
          </div>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "#6B5B4E", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            {displaySubtitle}
          </p>
        </div>

        {/* ── Product Grid ── */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* ── View All CTA ── */}
        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <Link
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              background: "linear-gradient(135deg, #6B3E26, #A97142)",
              color: "white",
              fontFamily: "var(--font-button)",
              fontWeight: 700,
              fontSize: "15px",
              borderRadius: "100px",
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(107,62,38,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(107,62,38,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(107,62,38,0.35)";
            }}
          >
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
