"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight, Heart, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFadeUp } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    designation: "Health & Wellness Coach",
    location: "Mumbai, Maharashtra",
    avatar: "/images/testimonials/customer-1.png",
    review:
      "Shreepad Enterprises has completely transformed my snacking habits! The quality of their almonds and cashews is simply unmatched. You can taste uncompromised freshness in every single bite.",
    rating: 5,
    product: "Premium California Almonds",
  },
  {
    id: 2,
    name: "Rajesh Mehta",
    designation: "Fitness Entrepreneur & Coach",
    location: "Pune, Maharashtra",
    avatar: "/images/testimonials/customer-1.png",
    review:
      "As a fitness professional who is extremely particular about nutrition, Shreepad Enterprises consistently delivers hospital-grade quality. The Kashmiri walnuts are extraordinarily fresh and rich in natural oils.",
    rating: 5,
    product: "Kashmiri Walnut Kernels",
  },
  {
    id: 3,
    name: "Anita Desai",
    designation: "Food Blogger & Recipe Developer",
    location: "Ahmedabad, Gujarat",
    avatar: "/images/testimonials/customer-1.png",
    review:
      "The Medjool dates are divine! Plump, naturally sweet, and perfectly soft. I've been ordering monthly for half a year and the packaging & quality have never disappointed once.",
    rating: 5,
    product: "Medjool Dates Premium",
  },
  {
    id: 4,
    name: "Dr. Vivek Patel",
    designation: "Nutritionist & Dietician",
    location: "Surat, Gujarat",
    avatar: "/images/testimonials/customer-1.png",
    review:
      "I regularly recommend Shreepad Enterprises to my patients. Their products are genuinely 100% natural, chemical-free, and nutrient-dense. Trustworthy quality every single time!",
    rating: 5,
    product: "Royal Mixed Nuts Deluxe",
  },
  {
    id: 5,
    name: "Meera Krishnan",
    designation: "Corporate Professional",
    location: "Bangalore, Karnataka",
    avatar: "/images/testimonials/customer-1.png",
    review:
      "I ordered the festival gift hamper for my clients and everyone was blown away by the packaging & quality. The roasted pistachios are the best I have tasted anywhere in India.",
    rating: 5,
    product: "Iranian Roasted Pistachios",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const titleRef = useFadeUp({ delay: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".testimonial-container",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const goTo = (index) => {
    const newIndex = (index + testimonials.length) % testimonials.length;
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveIndex(newIndex);
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
          );
        },
      });
    } else {
      setActiveIndex(newIndex);
    }
  };

  // Autoplay testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goTo(activeIndex + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const active = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        paddingTop: "5.5rem",
        paddingBottom: "6.5rem",
        background: "radial-gradient(ellipse at 50% 30%, #4A2715 0%, #2A150B 65%, #180B05 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background glowing accents */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(212, 169, 90, 0.18) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(80px)",
        }}
      />

      <div className="container-luxury" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Section Header ── */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          {/* Ultra-Modern Dark Glass Capsule Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "7px 22px",
              borderRadius: "100px",
              background: "rgba(255, 255, 255, 0.12)",
              border: "1.5px solid rgba(212, 169, 90, 0.4)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(12px)",
              marginBottom: "1.25rem",
            }}
          >
            <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px" }}>
              <span style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", background: "#D4A95A", opacity: 0.8, animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
              <span style={{ position: "relative", width: "8px", height: "8px", borderRadius: "50%", background: "#F59E0B" }} />
            </span>
            <Heart size={14} style={{ color: "#D4A95A", fill: "#D4A95A" }} />
            <span
              style={{
                fontFamily: "var(--font-button)",
                fontSize: "11px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Customer Love
            </span>
          </div>

          <h2
            ref={titleRef}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 800,
              color: "#FFFDF8",
              marginBottom: "1rem",
              lineHeight: 1.25,
            }}
          >
            What Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #F59E0B 0%, #D4A95A 50%, #FFFDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Customers Say
            </span>
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
              color: "rgba(255, 255, 255, 0.85)",
              maxWidth: "580px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Thousands of happy families trust Shreepad Enterprises for their daily organic nutrition. Here are some of their authentic stories.
          </p>
        </div>

        {/* ── Main Showcase Glass Card ── */}
        <div className="testimonial-container max-w-4xl mx-auto" style={{ position: "relative" }}>

          <div
            ref={cardRef}
            style={{
              background: "linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, rgba(212, 169, 90, 0.06) 100%)",
              borderRadius: "32px",
              padding: "clamp(24px, 5vw, 48px)",
              border: "1.5px solid rgba(212, 169, 90, 0.4)",
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(16px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Glowing Ambient Line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #D4A95A, #F59E0B, #FFFDF8)",
              }}
            />

            {/* Top Row: Quote Icon & Stars */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Quote size={40} style={{ color: "#D4A95A", filter: "drop-shadow(0 4px 10px rgba(212,169,90,0.5))" }} />
              </div>

              {/* 5 Solid Gold Stars */}
              <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "rgba(0,0,0,0.25)", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(212,169,90,0.3)" }}>
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} size={16} style={{ fill: "#F59E0B", color: "#F59E0B" }} />
                ))}
                <span style={{ color: "#FFFDF8", fontSize: "12px", fontWeight: 800, fontFamily: "var(--font-button)", marginLeft: "4px" }}>
                  5.0 / 5.0
                </span>
              </div>
            </div>

            {/* Review Quote */}
            <blockquote
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
                color: "#FFFDF8",
                lineHeight: 1.7,
                fontWeight: 500,
                fontStyle: "italic",
                marginBottom: "32px",
              }}
            >
              &ldquo;{active.review}&rdquo;
            </blockquote>

            {/* Customer Info & Product Verified Tag */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "20px",
                paddingTop: "24px",
                borderTop: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              {/* Profile Details */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    position: "relative",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2.5px solid #D4A95A",
                    boxShadow: "0 0 16px rgba(212, 169, 90, 0.5)",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={active.avatar}
                    alt={active.name}
                    fill
                    sizes="60px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "#FFFDF8",
                      marginBottom: "2px",
                    }}
                  >
                    {active.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.85)", margin: 0 }}>
                    {active.designation}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                    <MapPin size={11} style={{ color: "#D4A95A" }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#D4A95A" }}>
                      {active.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Product Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "100px",
                  background: "rgba(212, 169, 90, 0.15)",
                  border: "1px solid rgba(212, 169, 90, 0.4)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <CheckCircle2 size={15} style={{ color: "#10B981" }} />
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 800, fontFamily: "var(--font-button)", color: "#10B981", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Verified Purchase
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 600, fontFamily: "var(--font-body)", color: "#FFFDF8" }}>
                    {active.product}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Controls & Indicator Dots */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "28px",
              padding: "0 10px",
            }}
          >
            {/* Prev / Next Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "1.5px solid rgba(212, 169, 90, 0.4)",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#FFFDF8",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #D4A95A, #F59E0B)";
                  e.currentTarget.style.color = "#3D2314";
                  e.currentTarget.style.borderColor = "#D4A95A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.color = "#FFFDF8";
                  e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.4)";
                }}
                aria-label="Previous story"
                suppressHydrationWarning
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "1.5px solid rgba(212, 169, 90, 0.4)",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#FFFDF8",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #D4A95A, #F59E0B)";
                  e.currentTarget.style.color = "#3D2314";
                  e.currentTarget.style.borderColor = "#D4A95A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.color = "#FFFDF8";
                  e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.4)";
                }}
                aria-label="Next story"
                suppressHydrationWarning
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Pagination Active Bar Indicators */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => goTo(i)}
                  style={{
                    height: "8px",
                    width: i === activeIndex ? "28px" : "8px",
                    borderRadius: "100px",
                    background: i === activeIndex ? "linear-gradient(90deg, #D4A95A, #F59E0B)" : "rgba(255, 255, 255, 0.25)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  suppressHydrationWarning
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
