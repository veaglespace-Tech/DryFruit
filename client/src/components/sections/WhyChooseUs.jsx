"use client";

import { useRef } from "react";
import {
  CheckCircle,
  Leaf,
  Shield,
  Truck,
  Award,
  Sprout,
  Clock,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFadeUp } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    num: "01",
    icon: Leaf,
    title: "100% Natural",
    badge: "Pure Nature",
    description:
      "No artificial preservatives, synthetic colors, or added flavors. Pure unadulterated nature in every single bite.",
    bgImage: "/images/why/natural.png",
    featured: true,
    gridClass: "lg:col-span-2",
  },
  {
    num: "02",
    icon: Shield,
    title: "Premium Quality",
    badge: "Lab Tested",
    description:
      "Hand-selected & multi-stage quality checked before reaching your doorstep.",
    bgImage: "/images/why/quality.png",
    featured: true,
    gridClass: "lg:col-span-2",
  },
  {
    num: "03",
    icon: Sprout,
    title: "Farm Fresh",
    badge: "Direct Origin",
    description: "Sourced directly from trusted sustainable orchards worldwide.",
    bgImage: "/images/why/farm.png",
    featured: false,
    gridClass: "lg:col-span-1",
  },
  {
    num: "04",
    icon: CheckCircle,
    title: "Chemical Free",
    badge: "Zero Pesticides",
    description: "Free from harmful pesticides and artificial chemical treatments.",
    bgImage: "/images/why/chemical-free.png",
    featured: false,
    gridClass: "lg:col-span-1",
  },
  {
    num: "05",
    icon: Award,
    title: "Airtight Lock",
    badge: "Freshness Sealed",
    description:
      "Multi-layer food-grade packaging that retains crunch & aroma for months.",
    bgImage: "/images/why/packaging.png",
    featured: false,
    gridClass: "lg:col-span-1",
  },
  {
    num: "06",
    icon: Truck,
    title: "Express Delivery",
    badge: "Pan-India",
    description:
      "Fast, climate-controlled shipping in 3-5 business days across India.",
    bgImage: "/images/why/delivery.png",
    featured: false,
    gridClass: "lg:col-span-1",
  },
  {
    num: "07",
    icon: Clock,
    title: "Long Shelf Life",
    badge: "12 Months Fresh",
    description:
      "Optimal moisture control ensuring prolonged natural shelf life.",
    bgImage: "/images/why/shelf-life.png",
    featured: false,
    gridClass: "lg:col-span-2",
  },
  {
    num: "08",
    icon: HeartHandshake,
    title: "Customer First",
    badge: "100% Satisfaction",
    description:
      "Hassle-free replacement policy and dedicated customer support team.",
    bgImage: "/images/why/customer.png",
    featured: false,
    gridClass: "lg:col-span-2",
  },
];

const stats = [
  { value: "50,000+", label: "Happy Families Served", icon: HeartHandshake },
  { value: "100%", label: "Natural & Chemical-Free", icon: Leaf },
  { value: "15+", label: "Years of Culinary Trust", icon: Award },
  { value: "4.9 ★", label: "Average Customer Rating", icon: Star },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const titleRef = useFadeUp({ delay: 0.1 });
  const iconsRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(
    () => {
      // Animate feature cards with smooth stagger
      if (iconsRef.current) {
        const cards = iconsRef.current.querySelectorAll(".bento-why-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: iconsRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // Stats card entrance
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll(".bento-stat-card");
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        paddingTop: "5.5rem",
        paddingBottom: "6rem",
        background: "linear-gradient(180deg, #FFFDF8 0%, #F8F2E7 50%, #FFFDF8 100%)",
        overflow: "hidden",
      }}
    >
      {/* Ambient background glow spheres */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,169,90,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "15%",
          right: "5%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,62,38,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(70px)",
        }}
      />

      <div className="container-luxury" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Section Header ── */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          {/* Glassmorphic Capsule Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "7px 22px",
              borderRadius: "100px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(251,245,235,0.9) 100%)",
              border: "1.5px solid rgba(212,169,90,0.4)",
              boxShadow: "0 6px 24px rgba(212,169,90,0.18), inset 0 1px 2px rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
              marginBottom: "1.25rem",
            }}
          >
            <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px" }}>
              <span style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", background: "#D4A95A", opacity: 0.8, animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
              <span style={{ position: "relative", width: "8px", height: "8px", borderRadius: "50%", background: "#6B3E26" }} />
            </span>
            <ShieldCheck size={14} style={{ color: "#A97142" }} />
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
              Why Shreepad
            </span>
          </div>

          <h2
            ref={titleRef}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 800,
              color: "#3D2314",
              marginBottom: "1rem",
              lineHeight: 1.25,
            }}
          >
            The{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6B3E26 0%, #A97142 50%, #D4A95A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Shreepad
            </span>{" "}
            Difference
          </h2>

          {/* Ornamental Line Divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", margin: "0 auto 1.25rem", maxWidth: "160px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #D4A95A)" }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D4A95A" }} />
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #D4A95A)" }} />
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
              color: "#6B5B4E",
              maxWidth: "580px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            We set ourselves apart with unwavering commitment to quality,
            purity, and customer satisfaction. Here&apos;s why thousands trust us daily.
          </p>
        </div>

        {/* ── Modern Bento Grid Features ── */}
        <div
          ref={iconsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "20px",
            marginBottom: "3.5rem",
          }}
        >
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bento-why-card group relative"
                style={{
                  gridColumn: item.featured
                    ? "span 12"
                    : "span 12",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1.5px solid rgba(212, 169, 90, 0.25)",
                  boxShadow: "0 10px 30px rgba(61, 35, 20, 0.08)",
                  background: "#23140C",
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  cursor: "default",
                  minHeight: item.featured ? "240px" : "210px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "spaceBetween",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.6)";
                  e.currentTarget.style.boxShadow = "0 20px 45px rgba(61, 35, 20, 0.22)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.25)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(61, 35, 20, 0.08)";
                }}
              >
                {/* Background image with dual gradient overlay */}
                <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
                  <img
                    src={item.bgImage}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.35,
                      filter: "brightness(0.7) contrast(1.1)",
                      transition: "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease",
                    }}
                    className="group-hover:scale-110 group-hover:opacity-50"
                  />
                  {/* Rich gradient overlay for high contrast readability */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, rgba(35,20,12,0.95) 0%, rgba(20,10,5,0.85) 60%, rgba(61,35,20,0.92) 100%)",
                      transition: "opacity 0.4s ease",
                    }}
                  />
                  {/* Top glowing accent line on hover */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: "linear-gradient(90deg, #D4A95A, #F59E0B, #A97142)",
                      opacity: 0,
                      transition: "opacity 0.4s ease",
                    }}
                    className="group-hover:opacity-100"
                  />
                </div>

                {/* Card Header Content */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 10,
                    padding: "24px 26px 20px",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Icon Box with Luxury Glass Styling */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, rgba(212,169,90,0.2) 0%, rgba(107,62,38,0.3) 100%)",
                      border: "1px solid rgba(212,169,90,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                      transition: "transform 0.35s ease, border-color 0.35s ease",
                    }}
                    className="group-hover:scale-110 group-hover:border-[#D4A95A]"
                  >
                    <Icon size={22} style={{ color: "#D4A95A" }} />
                  </div>

                  {/* Watermark Number & Badge */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "20px",
                        fontWeight: 800,
                        color: "rgba(212, 169, 90, 0.35)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.num}
                    </span>
                    {item.badge && (
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: 800,
                          fontFamily: "var(--font-button)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "#D4A95A",
                          background: "rgba(212, 169, 90, 0.12)",
                          border: "1px solid rgba(212, 169, 90, 0.25)",
                          padding: "2px 8px",
                          borderRadius: "100px",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body Content */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 10,
                    padding: "0 26px 24px",
                    marginTop: "auto",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: "6px",
                      transition: "color 0.3s ease",
                    }}
                    className="group-hover:text-[#D4A95A]"
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      color: "rgba(255, 255, 255, 0.78)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Responsive Grid Breakpoint Inline Styles ── */}
        <style jsx>{`
          @media (min-width: 640px) {
            .bento-why-card {
              grid-column: span 6 !important;
            }
          }
          @media (min-width: 1024px) {
            .bento-why-card {
              grid-column: span 3 !important;
            }
            .bento-why-card.lg\\:col-span-2 {
              grid-column: span 6 !important;
            }
          }
        `}</style>

        {/* ── Modern Stats Counter Row ── */}
        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "18px",
          }}
        >
          {stats.map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bento-stat-card group"
                style={{
                  background: "linear-gradient(135deg, #3D2314 0%, #28160C 100%)",
                  padding: "24px 20px",
                  borderRadius: "20px",
                  border: "1.5px solid rgba(212, 169, 90, 0.2)",
                  boxShadow: "0 8px 24px rgba(61, 35, 20, 0.12)",
                  textAlign: "center",
                  transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.5)";
                  e.currentTarget.style.boxShadow = "0 14px 32px rgba(61, 35, 20, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.2)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(61, 35, 20, 0.12)";
                }}
              >
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                  <StatIcon size={20} style={{ color: "#D4A95A", opacity: 0.9 }} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #FFFDF8 0%, #D4A95A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "4px",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontFamily: "var(--font-button)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
