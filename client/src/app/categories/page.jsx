"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gem, Sparkles, Leaf, ChevronRight } from "lucide-react";
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
    badge: "Bestseller",
    count: "48 Products",
  },
  {
    id: 2,
    name: "Oils & Ghee",
    slug: "oils-ghee",
    description: "Cold-pressed wood-pressed oils and pure A2 cow ghee for healthy cooking",
    image: "/images/categories/oils-ghee.png",
    badge: "100% Pure",
    count: "18 Products",
  },
  {
    id: 3,
    name: "Tea, Coffee & Beverages",
    slug: "tea-coffee-beverages",
    description: "Refreshing premium leaf teas, Kashmiri kahwa, and gourmet instant coffees",
    image: "/images/categories/tea-coffee-beverages.png",
    badge: "Organic",
    count: "24 Products",
  },
  {
    id: 4,
    name: "Atta, Rice & Dal",
    slug: "atta-rice-dal",
    description: "Organic unpolished flours, aged basmati rice, and protein-rich pulses",
    image: "/images/categories/atta-rice-dal.png",
    badge: "Farm Fresh",
    count: "32 Products",
  },
  {
    id: 5,
    name: "Masala, Spices & Salt",
    slug: "masala-spices-salt",
    description: "Pure, authentic spice powders, whole Kashmiri saffron, and pink Himalayan salts",
    image: "/images/categories/masala-spices-salt.png",
    badge: "Authentic",
    count: "36 Products",
  },
  {
    id: 6,
    name: "Breakfast Essentials",
    slug: "breakfast-essentials",
    description: "Healthy millet muesli, ragi bites, and instant oats for a nutritious morning",
    image: "/images/categories/breakfast-essentials.png",
    badge: "Healthy Start",
    count: "16 Products",
  },
  {
    id: 7,
    name: "Sauces & Spreads",
    slug: "sauces-instant-foods",
    description: "Premium ready-to-eat meals, almond butter spreads, and authentic cooking pastes",
    image: "/images/categories/sauces-instant-foods.png",
    badge: "Artisanal",
    count: "14 Products",
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

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
        // Fallback safely
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  const filteredCategories =
    activeFilter === "all"
      ? categories
      : categories.filter((c) => c.slug.includes(activeFilter));

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main style={{ paddingTop: "90px", background: "#FFFDF8" }}>
        
        {/* ── 1. Hero Categories Header ── */}
        <section
          style={{
            position: "relative",
            background: "linear-gradient(135deg, #3D2314 0%, #25130A 60%, #170B05 100%)",
            color: "#FFFDF8",
            padding: "clamp(60px, 8vw, 90px) 0 clamp(40px, 5vw, 60px)",
            borderBottom: "2px solid rgba(212, 169, 90, 0.4)",
            overflow: "hidden",
          }}
        >
          {/* Top Metallic Gold Line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #6B3E26 0%, #D4A95A 50%, #F59E0B 100%)",
            }}
          />

          <div className="container-luxury text-center relative z-10">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 18px",
                borderRadius: "100px",
                background: "rgba(212, 169, 90, 0.15)",
                border: "1px solid rgba(212, 169, 90, 0.4)",
                color: "#D4A95A",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              <Sparkles size={13} style={{ color: "#D4A95A" }} />
              <span>Our Curated Collections</span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.2rem, 5.5vw, 3.75rem)",
                fontWeight: 900,
                background: "linear-gradient(135deg, #FFFDF8 0%, #D4A95A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.15,
                margin: "0 auto 16px",
              }}
            >
              Shop By Category
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
                color: "rgba(255, 253, 248, 0.85)",
                maxWidth: "650px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Explore our hand-sorted collection of 100% natural dry fruits, organic nuts, dates, and superberries.
            </p>
          </div>
        </section>

        {/* ── 2. Category Filter Pills Bar ── */}
        <section
          style={{
            padding: "20px 0",
            background: "#FDF9F3",
            borderBottom: "1px solid rgba(212, 169, 90, 0.25)",
          }}
        >
          <div className="container-luxury">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {[
                { id: "all", label: "All Collections" },
                { id: "dry-fruits", label: "Dry Fruits & Seeds" },
                { id: "oils", label: "Oils & Ghee" },
                { id: "tea", label: "Beverages" },
                { id: "masala", label: "Spices & Salt" },
              ].map((tab) => {
                const active = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    style={{
                      padding: "8px 20px",
                      borderRadius: "100px",
                      fontSize: "12px",
                      fontWeight: 700,
                      fontFamily: "var(--font-button)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      background: active
                        ? "linear-gradient(135deg, #3D2314 0%, #25130A 100%)"
                        : "#FFFDF8",
                      color: active ? "#D4A95A" : "#6B5A4E",
                      border: active
                        ? "1.5px solid #D4A95A"
                        : "1.5px solid rgba(212, 169, 90, 0.3)",
                      boxShadow: active ? "0 4px 14px rgba(61, 35, 20, 0.2)" : "none",
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. Bento Grid Categories Showcase ── */}
        <section style={{ padding: "clamp(50px, 7vw, 90px) 0", background: "#FFFDF8" }}>
          <div className="container-luxury">
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#6B5A4E", fontFamily: "var(--font-body)" }}>
                Loading collections...
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {filteredCategories.map((cat, idx) => (
                  <Link
                    key={cat.id || cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className="group"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "24px",
                      borderRadius: "28px",
                      background: "#FFFDF8",
                      border: "1.5px solid rgba(212, 169, 90, 0.35)",
                      boxShadow: "0 10px 30px rgba(61, 35, 20, 0.06)",
                      textDecoration: "none",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.borderColor = "#D4A95A";
                      e.currentTarget.style.boxShadow = "0 20px 45px rgba(61, 35, 20, 0.16)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.35)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(61, 35, 20, 0.06)";
                    }}
                  >
                    {/* Top Metallic Gold Line on hover */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, #D4A95A, #F59E0B)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      }}
                      className="group-hover:opacity-100"
                    />

                    <div>
                      {/* Image Frame */}
                      <div
                        style={{
                          position: "relative",
                          aspectRatio: "1 / 1",
                          borderRadius: "22px",
                          overflow: "hidden",
                          background: "#FDF9F3",
                          border: "1px solid rgba(212, 169, 90, 0.25)",
                          marginBottom: "18px",
                        }}
                      >
                        <Image
                          src={cat.image || `/images/categories/${cat.slug}.png`}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Floating Top Badge */}
                        <span
                          style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            padding: "5px 12px",
                            borderRadius: "100px",
                            background: "rgba(37, 19, 10, 0.85)",
                            border: "1px solid rgba(212, 169, 90, 0.4)",
                            backdropFilter: "blur(10px)",
                            color: "#D4A95A",
                            fontSize: "10px",
                            fontWeight: 800,
                            fontFamily: "var(--font-button)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {cat.badge || cat.count || "Premium"}
                        </span>
                      </div>

                      {/* Details */}
                      <div>
                        <h3
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.25rem",
                            fontWeight: 800,
                            color: "#3D2314",
                            margin: "0 0 8px",
                            transition: "color 0.25s ease",
                          }}
                          className="group-hover:text-[#A97142]"
                        >
                          {cat.name}
                        </h3>
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "13px",
                            color: "#7E6E62",
                            lineHeight: 1.6,
                            margin: 0,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {cat.description || `Hand-sorted 100% natural ${cat.name.toLowerCase()} packaged fresh.`}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div
                      style={{
                        marginTop: "20px",
                        paddingTop: "14px",
                        borderTop: "1px solid rgba(212, 169, 90, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-button)",
                          fontSize: "12px",
                          fontWeight: 800,
                          color: "#A97142",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>Explore Collection</span>
                      </span>

                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #D4A95A 0%, #F59E0B 100%)",
                          color: "#3D2314",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 10px rgba(212, 169, 90, 0.4)",
                          transition: "transform 0.3s ease",
                        }}
                        className="group-hover:scale-110"
                      >
                        <ArrowRight size={14} />
                      </div>
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
