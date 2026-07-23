"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitText, useStagger } from "@/lib/gsap";
import { useGetPublicCategoriesQuery } from "@/store/api/apiSlice";
import { getImageUrl } from "@/lib/getImageUrl";

gsap.registerPlugin(ScrollTrigger);

const STATIC_CATEGORIES = [
  {
    name: "Dry Fruits & Seeds",
    slug: "dry-fruits-seeds",
    description: "Premium handpicked dry fruits, nuts & healthy seeds",
    image: "/images/categories/dry-fruits-seeds.png",
    count: null,
    emoji: "🌰",
    gradient: "from-[#F5E6D3] to-[#EDD5B3]",
    accentColor: "#C4874A",
  },
  {
    name: "Oils & Ghee",
    slug: "oils-ghee",
    description: "Cold-pressed oils and pure cow ghee for healthy cooking",
    image: "/images/categories/oils-ghee.png",
    count: null,
    emoji: "🫙",
    gradient: "from-[#FEF3C7] to-[#FDE68A]",
    accentColor: "#D97706",
  },
  {
    name: "Tea, Coffee & Beverages",
    slug: "tea-coffee-beverages",
    description: "Refreshing premium leaf teas and gourmet instant coffees",
    image: "/images/categories/tea-coffee-beverages.png",
    count: null,
    emoji: "🍵",
    gradient: "from-[#D1FAE5] to-[#A7F3D0]",
    accentColor: "#059669",
  },
  {
    name: "Atta, Rice & Dal",
    slug: "atta-rice-dal",
    description: "Organic unpolished flours, basmati rice & protein-rich pulses",
    image: "/images/categories/atta-rice-dal.png",
    count: null,
    emoji: "🌾",
    gradient: "from-[#FEF9EC] to-[#FDE9A2]",
    accentColor: "#B45309",
  },
  {
    name: "Masala, Spices & Salt",
    slug: "masala-spices-salt",
    description: "Pure spice powders, whole spices and rock salts",
    image: "/images/categories/masala-spices-salt.png",
    count: null,
    emoji: "🌶️",
    gradient: "from-[#FEE2E2] to-[#FECACA]",
    accentColor: "#DC2626",
  },
  {
    name: "Breakfast Essentials",
    slug: "breakfast-essentials",
    description: "Healthy millet muesli, ragi bites and instant oats",
    image: "/images/categories/breakfast-essentials.png",
    count: null,
    emoji: "🥣",
    gradient: "from-[#EDE9FE] to-[#DDD6FE]",
    accentColor: "#7C3AED",
  },
  {
    name: "Sauces & Spreads",
    slug: "sauces-instant-foods",
    description: "Premium ready-to-eat meals, spreads and cooking pastes",
    image: "/images/categories/sauces-instant-foods.png",
    count: null,
    emoji: "🍯",
    gradient: "from-[#FCE7F3] to-[#FBCFE8]",
    accentColor: "#DB2777",
  },
];

// Category Card Component with 3D tilt + magnetic effect
function CategoryCard({ cat, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = -(mouseY / (rect.height / 2)) * 8;
    const rotateY = (mouseX / (rect.width / 2)) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.3,
      ease: "power2.out",
    });

    // Move glow with cursor
    if (glowRef.current) {
      const glowX = ((mouseX + rect.width / 2) / rect.width) * 100;
      const glowY = ((mouseY + rect.height / 2) / rect.height) * 100;
      glowRef.current.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(212,169,90,0.35) 0%, transparent 65%)`;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    gsap.to(cardRef.current, {
      y: -12,
      scale: 1.03,
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(imageRef.current, {
      scale: 1.12,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.inOut",
    });
    if (glowRef.current) {
      glowRef.current.style.background = "transparent";
    }
  }, []);

  return (
    <Link
      href={`/products?category=${cat.slug}`}
      className="category-item-anim block group"
      aria-label={`Browse ${cat.name}`}
      style={{ textDecoration: "none" }}
    >
      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          borderRadius: "24px",
          background: "white",
          border: "1.5px solid rgba(212,169,90,0.18)",
          boxShadow: "0 4px 24px rgba(107,62,38,0.08), 0 1px 4px rgba(212,169,90,0.1)",
          overflow: "hidden",
          cursor: "pointer",
          willChange: "transform",
          transformStyle: "preserve-3d",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* Cursor-following glow layer */}
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "24px",
            zIndex: 1,
            pointerEvents: "none",
            transition: "background 0.1s",
          }}
        />

        {/* Gradient top banner */}
        <div
          className={`bg-gradient-to-br ${cat.gradient}`}
          style={{
            height: "220px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles in background */}
          <div
            style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(2px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "-20px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
            }}
          />

          {/* Emoji badge */}
          <div
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              zIndex: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {cat.emoji}
          </div>

          {/* Product count pill — only shown when real count is available from server */}
          {cat.count && (
            <div
              style={{
                position: "absolute",
                top: "14px",
                left: "14px",
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
                borderRadius: "100px",
                padding: "4px 10px",
                fontSize: "11px",
                fontWeight: 600,
                color: cat.accentColor,
                zIndex: 2,
                fontFamily: "var(--font-button)",
                letterSpacing: "0.02em",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {cat.count}
            </div>
          )}

          {/* Product Image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              ref={imageRef}
              style={{
                position: "relative",
                width: "145px",
                height: "145px",
                borderRadius: "50%",
                overflow: "hidden",
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(4px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                border: "3px solid rgba(255,255,255,0.8)",
                willChange: "transform",
              }}
            >
              <Image
                src={getImageUrl(cat.image, "/images/categories/dry-fruits-seeds.png")}
                alt={cat.name}
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>
          </div>

          {/* Bottom wave/fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40px",
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))",
            }}
          />
        </div>

        {/* Card Body */}
        <div style={{ padding: "18px 20px 20px" }}>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#3D2314",
              marginBottom: "6px",
              lineHeight: 1.3,
              transition: "color 0.25s",
            }}
          >
            {cat.name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "#6B5B4E",
              lineHeight: 1.5,
              marginBottom: "14px",
            }}
          >
            {cat.description}
          </p>

          {/* Explore CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-button)",
              fontSize: "13px",
              fontWeight: 600,
              color: cat.accentColor,
              transition: "gap 0.3s ease",
            }}
            className="category-cta"
          >
            <span>Explore Now</span>
            <ArrowRight
              size={14}
              style={{
                transform: isHovered ? "translateX(4px)" : "translateX(0)",
                transition: "transform 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(to right, ${cat.accentColor}, #D4A95A)`,
            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.4s ease",
          }}
        />
      </div>
    </Link>
  );
}

export default function CategorySection() {
  const sectionRef = useRef(null);
  const titleRef = useSplitText({ delay: 0.1 });
  const gridRef = useStagger(".category-item-anim", { stagger: 0.07 });
  const [categories, setCategories] = useState(STATIC_CATEGORIES);
  const { data: serverCategories, isSuccess, isError } = useGetPublicCategoriesQuery();

  useEffect(() => {
    if (isSuccess && serverCategories && serverCategories.length > 0) {
      const accentColors = [
        "#C4874A", "#D97706", "#059669", "#B45309",
        "#DC2626", "#7C3AED", "#DB2777", "#0284C7",
      ];
      const gradients = [
        "from-[#F5E6D3] to-[#EDD5B3]",
        "from-[#FEF3C7] to-[#FDE68A]",
        "from-[#D1FAE5] to-[#A7F3D0]",
        "from-[#FEF9EC] to-[#FDE9A2]",
        "from-[#FEE2E2] to-[#FECACA]",
        "from-[#EDE9FE] to-[#DDD6FE]",
        "from-[#FCE7F3] to-[#FBCFE8]",
        "from-[#DBEAFE] to-[#BFDBFE]",
      ];
      const emojis = ["🌰", "🫙", "🍵", "🌾", "🌶️", "🥣", "🍯", "🧂"];
      const formatted = serverCategories.map((cat, index) => ({
        name: cat.name,
        slug: cat.slug,
        description: cat.description || "Premium handpicked collection",
        image: cat.image || `/images/categories/${cat.slug}.png`,
        count: (cat.product_count && cat.product_count > 0) ? `${cat.product_count} Products` : null,
        emoji: emojis[index % emojis.length],
        gradient: gradients[index % gradients.length],
        accentColor: accentColors[index % accentColors.length],
      }));
      setCategories(formatted);
    } else if (isError) {
      setCategories(STATIC_CATEGORIES);
    }
  }, [serverCategories, isSuccess, isError]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        paddingTop: "5rem",
        paddingBottom: "6rem",
        background: "linear-gradient(180deg, #FFFDF8 0%, #FBF5EB 50%, #FFFDF8 100%)",
        overflow: "hidden",
      }}
    >
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-120px",
          left: "-80px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,169,90,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,62,38,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: `${8 + i * 4}px`,
            height: `${8 + i * 4}px`,
            borderRadius: "50%",
            background: i % 2 === 0
              ? "rgba(212,169,90,0.18)"
              : "rgba(107,62,38,0.10)",
            top: `${10 + i * 15}%`,
            left: i % 2 === 0 ? `${5 + i * 8}%` : "auto",
            right: i % 2 !== 0 ? `${5 + i * 7}%` : "auto",
            animation: `floatParticle ${3 + i}s ease-in-out infinite alternate`,
            pointerEvents: "none",
          }}
        />
      ))}

      <div className="container-luxury">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          {/* Ultra-Modern Glassmorphic Label Chip */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "7px 22px",
              borderRadius: "100px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(251,245,235,0.88) 100%)",
              border: "1.5px solid rgba(212,169,90,0.35)",
              boxShadow: "0 4px 20px rgba(212,169,90,0.15), inset 0 1px 2px rgba(255,255,255,0.8)",
              backdropFilter: "blur(12px)",
              marginBottom: "1.25rem",
            }}
          >
            {/* Live Pulsing Dot */}
            <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px", alignItems: "center", justifyCenter: "center" }}>
              <span style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", background: "#D4A95A", opacity: 0.75, animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
              <span style={{ position: "relative", width: "8px", height: "8px", borderRadius: "50%", background: "#6B3E26" }} />
            </span>
            <LayoutGrid size={13} style={{ color: "#A97142" }} />
            <span
              style={{
                fontFamily: "var(--font-button)",
                fontSize: "11px",
                fontWeight: 800,
                color: "#3D2314",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Browse Categories
            </span>
          </div>

          {/* Main heading */}
          <h2
            ref={titleRef}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#3D2314",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Shop By{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6B3E26 0%, #A97142 50%, #D4A95A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Category
            </span>
          </h2>

          {/* Ornamental divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "1.25rem",
            }}
          >
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, #D4A95A)" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D4A95A" }} />
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#A97142" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D4A95A" }} />
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(to left, transparent, #D4A95A)" }} />
          </div>

          <p
            className="body-lead"
            style={{ maxWidth: "540px", margin: "0 auto", color: "#6B5B4E" }}
          >
            Explore our curated collection of premium dry fruits and nuts,
            sourced from the finest farms across the globe.
          </p>
        </div>

        {/* Category Container: Horizontal scroll on small/mobile screens, Grid on desktop */}
        <div
          ref={gridRef}
          className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-5 md:gap-6 pb-6 md:pb-0 no-scrollbar px-1 md:px-0"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {categories.map((cat, index) => (
            <div
              key={cat.slug}
              className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-auto snap-start"
            >
              <CategoryCard cat={cat} index={index} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/categories"
            className="btn-primary-luxury"
            style={{ display: "inline-flex" }}
          >
            <span>View All Categories</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* CSS Animations & Utilities */}
      <style jsx>{`
        @keyframes floatParticle {
          from { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          to   { transform: translateY(-18px) rotate(20deg); opacity: 1; }
        }
        .category-cta {
          transition: gap 0.3s ease;
        }
        a:hover .category-cta {
          gap: 10px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
