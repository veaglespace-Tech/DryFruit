"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Leaf,
  Tag,
  User,
  Share2,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const FALLBACK_POSTS = [
  {
    id: 1,
    title: "Top 5 Health Benefits of Kashmiri Walnuts for Brain & Heart",
    excerpt:
      "Discover why Kashmiri walnuts are regarded as nature's brain superfood, packed with rich Omega-3 fatty acids, plant sterols, and heart-protective anti-oxidants.",
    created_at: "2026-06-28T00:00:00.000Z",
    read_time: "4 min read",
    category: "Nutrition",
    image: "/images/categories/dry-fruits-seeds.png",
    author: "Dr. Ritu Sharma",
    featured: true,
  },
  {
    id: 2,
    title: "How to Store Your Dry Fruits to Maintain Crunch & Zero Moisture",
    excerpt:
      "Crunchiness matters. Learn the best moisture-proofing storage secrets to preserve raw nuts quality for more than 12 months without losing oil content.",
    created_at: "2026-06-15T00:00:00.000Z",
    read_time: "3 min read",
    category: "Storage Tips",
    image: "/images/categories/oils-ghee.png",
    author: "Chef Vikram",
    featured: false,
  },
  {
    id: 3,
    title: "Dates: The Perfect Natural Superfood Alternative to Processed Sugar",
    excerpt:
      "Break your sweet tooth addiction. Find out how Medjool & Kimia dates satisfy dessert cravings naturally while providing high potassium and iron.",
    created_at: "2026-06-02T00:00:00.000Z",
    read_time: "5 min read",
    category: "Recipes & Diet",
    image: "/images/categories/breakfast-essentials.png",
    author: "Ananya Patel",
    featured: false,
  },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState(FALLBACK_POSTS);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    async function loadBlogs() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          (typeof window !== "undefined"
            ? `http://${window.location.hostname}:5000/api`
            : "http://localhost:5000/api");

        const res = await fetch(`${baseUrl}/blogs`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setBlogs(data.data);
        }
      } catch (err) {
        // Fallback safely
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const filteredBlogs =
    activeFilter === "all"
      ? blogs
      : blogs.filter((b) =>
          b.category?.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main style={{ paddingTop: "90px", background: "#FFFDF8" }}>
        
        {/* ── 1. Hero Blog Header ── */}
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
              <span>Learn & Grow Journal</span>
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
              Wellness & Nutrition Blog
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
              Tips, guides, and expert nutrition insights to help you build healthier daily eating habits for your family.
            </p>
          </div>
        </section>

        {/* ── 2. Category Filter Pills Bar ── */}
        <section
          style={{
            padding: "18px 0",
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
                { id: "all", label: "All Articles" },
                { id: "nutrition", label: "Nutrition & Health" },
                { id: "storage", label: "Storage Tips" },
                { id: "recipes", label: "Recipes & Diet" },
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

        {/* ── 3. Articles Grid Showcase ── */}
        <section style={{ padding: "clamp(50px, 7vw, 90px) 0", background: "#FFFDF8" }}>
          <div className="container-luxury">
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#6B5A4E", fontFamily: "var(--font-body)" }}>
                Loading nutrition journal...
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((post) => (
                  <article
                    key={post.id}
                    className="group"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: "28px",
                      background: "#FFFDF8",
                      border: "1.5px solid rgba(212, 169, 90, 0.35)",
                      boxShadow: "0 10px 30px rgba(61, 35, 20, 0.06)",
                      overflow: "hidden",
                      position: "relative",
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
                    {/* Top Metallic Gold Accent Line */}
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
                          aspectRatio: "16 / 9",
                          overflow: "hidden",
                          background: "#25130A",
                        }}
                      >
                        <Image
                          src={post.image || "/images/categories/dry-fruits-seeds.png"}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-108"
                        />

                        {/* Floating Category Badge */}
                        <span
                          style={{
                            position: "absolute",
                            top: "14px",
                            left: "14px",
                            padding: "5px 14px",
                            borderRadius: "100px",
                            background: "rgba(37, 19, 10, 0.88)",
                            border: "1px solid rgba(212, 169, 90, 0.4)",
                            backdropFilter: "blur(10px)",
                            color: "#D4A95A",
                            fontSize: "11px",
                            fontWeight: 800,
                            fontFamily: "var(--font-button)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <BookOpen size={11} style={{ color: "#D4A95A" }} />
                          <span>{post.category || "Nutrition"}</span>
                        </span>
                      </div>

                      {/* Content Body */}
                      <div style={{ padding: "24px 24px 16px" }}>
                        {/* Meta info */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            fontSize: "11px",
                            fontFamily: "var(--font-body)",
                            color: "#A97142",
                            fontWeight: 700,
                            marginBottom: "10px",
                          }}
                        >
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Calendar size={12} />
                            {new Date(post.created_at || Date.now()).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Clock size={12} />
                            {post.read_time || "4 min read"}
                          </span>
                        </div>

                        {/* Title */}
                        <h2
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.2rem",
                            fontWeight: 800,
                            color: "#3D2314",
                            lineHeight: 1.35,
                            margin: "0 0 10px",
                            transition: "color 0.25s ease",
                          }}
                          className="group-hover:text-[#A97142]"
                        >
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "13px",
                            color: "#7E6E62",
                            lineHeight: 1.6,
                            margin: 0,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {post.excerpt || post.content}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div
                      style={{
                        padding: "16px 24px 22px",
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
                        <span>Read Full Guide</span>
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
                  </article>
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
