"use client";

import { useRef, useState } from "react";
import {
  Sprout,
  Wind,
  SlidersHorizontal,
  CheckSquare,
  Package,
  Truck,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFadeUp } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: "01",
    num: 1,
    icon: Sprout,
    title: "Farm Sourcing",
    tagline: "Direct Origin",
    description:
      "Handpicked from certified organic farms & trusted orchards globally.",
  },
  {
    step: "02",
    num: 2,
    icon: Wind,
    title: "Cleaning",
    tagline: "Pure Ozonated",
    description:
      "Multi-stage water washing removing 100% dust & natural impurities.",
  },
  {
    step: "03",
    num: 3,
    icon: SlidersHorizontal,
    title: "Optical Sorting",
    tagline: "Laser Inspection",
    description:
      "Advanced optical sorting & manual check for uniform size & grade.",
  },
  {
    step: "04",
    num: 4,
    icon: CheckSquare,
    title: "Quality Check",
    tagline: "Lab Verified",
    description:
      "12-point lab testing for moisture, purity, and nutrition levels.",
  },
  {
    step: "05",
    num: 5,
    icon: Package,
    title: "Airtight Packing",
    tagline: "Nitrogen Flush",
    description:
      "Food-grade packaging locking in crunch, aroma, and shelf life.",
  },
  {
    step: "06",
    num: 6,
    icon: Truck,
    title: "Express Delivery",
    tagline: "Doorstep Express",
    description:
      "Temperature-controlled logistics delivered fresh in 3-5 days.",
  },
];

export default function QualityProcess() {
  const sectionRef = useRef(null);
  const titleRef = useFadeUp({ delay: 0.1 });
  const lineRef = useRef(null);
  const [activeStep, setActiveStep] = useState(null);

  useGSAP(
    () => {
      // Progress line fill animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.6,
            ease: "power2.inOut",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Step nodes pop in sequence
      gsap.fromTo(
        ".timeline-node",
        { opacity: 0, scale: 0.5, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 80%",
            once: true,
          },
        }
      );

      // Step cards fade up
      gsap.fromTo(
        ".timeline-card-wrapper",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 80%",
            once: true,
          },
        }
      );
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
        background: "linear-gradient(180deg, #FFFDF8 0%, #F5EDE0 100%)",
        overflow: "hidden",
      }}
    >
      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(212,169,90,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(70px)",
        }}
      />

      <div className="container-luxury" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Section Header ── */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
            <Award size={14} style={{ color: "#A97142" }} />
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
              Our Quality Process
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
            From{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6B3E26 0%, #A97142 50%, #D4A95A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Farm to Your Table
            </span>
          </h2>

          {/* Ornamental Divider */}
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
            Every Shreepad Enterprises product follows a meticulous 6-step quality journey to ensure you receive uncompromised freshness & taste.
          </p>
        </div>

        {/* ── DESKTOP HORIZONTAL METALLIC TIMELINE ── */}
        <div className="hidden lg:block timeline-container" style={{ position: "relative", padding: "20px 0" }}>

          {/* Timeline Background Track Line */}
          <div
            style={{
              position: "absolute",
              top: "54px",
              left: "8.33%",
              right: "8.33%",
              height: "4px",
              background: "rgba(107, 62, 38, 0.15)",
              borderRadius: "10px",
              zIndex: 1,
            }}
          >
            {/* Animated Gold Fill Line */}
            <div
              ref={lineRef}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #6B3E26 0%, #A97142 50%, #D4A95A 100%)",
                borderRadius: "10px",
                boxShadow: "0 0 12px rgba(212, 169, 90, 0.6)",
              }}
            />
          </div>

          {/* 6 Step Nodes & Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px", position: "relative", zIndex: 10 }}>
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isHovered = activeStep === index;

              return (
                <div
                  key={item.step}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* 3D Glass Node Circle */}
                  <div
                    className="timeline-node group cursor-pointer"
                    style={{
                      position: "relative",
                      width: "68px",
                      height: "68px",
                      borderRadius: "50%",
                      background: isHovered
                        ? "linear-gradient(135deg, #3D2314 0%, #6B3E26 100%)"
                        : "linear-gradient(135deg, #6B3E26 0%, #A97142 100%)",
                      border: "3px solid #FFFDF8",
                      boxShadow: isHovered
                        ? "0 0 28px rgba(212, 169, 90, 0.7), 0 8px 20px rgba(61, 35, 20, 0.35)"
                        : "0 0 18px rgba(212, 169, 90, 0.35), 0 6px 14px rgba(107, 62, 38, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "24px",
                      transform: isHovered ? "scale(1.15)" : "scale(1)",
                      transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    <Icon size={26} style={{ color: "#FFFDF8", transition: "transform 0.3s ease" }} />

                    {/* Step Number Badge */}
                    <span
                      style={{
                        position: "absolute",
                        top: "-4px",
                        right: "-4px",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #D4A95A, #F59E0B)",
                        color: "#3D2314",
                        fontSize: "11px",
                        fontWeight: 900,
                        fontFamily: "var(--font-button)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        border: "2px solid #FFFDF8",
                      }}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Glassmorphic Step Card Below */}
                  <div
                    className="timeline-card-wrapper"
                    style={{
                      width: "100%",
                      padding: "20px 16px 18px",
                      borderRadius: "20px",
                      background: isHovered
                        ? "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(251,245,235,0.95) 100%)"
                        : "linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(251,245,235,0.7) 100%)",
                      border: isHovered
                        ? "1.5px solid rgba(212, 169, 90, 0.65)"
                        : "1.5px solid rgba(212, 169, 90, 0.25)",
                      boxShadow: isHovered
                        ? "0 14px 32px rgba(107, 62, 38, 0.14)"
                        : "0 6px 20px rgba(107, 62, 38, 0.05)",
                      backdropFilter: "blur(10px)",
                      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      transition: "all 0.35s ease",
                      textAlign: "center",
                    }}
                  >
                    {/* Tag pill */}
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "9px",
                        fontWeight: 800,
                        fontFamily: "var(--font-button)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#A97142",
                        background: "rgba(212, 169, 90, 0.15)",
                        border: "1px solid rgba(212, 169, 90, 0.3)",
                        padding: "2px 8px",
                        borderRadius: "100px",
                        marginBottom: "10px",
                      }}
                    >
                      {item.tagline}
                    </span>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: isHovered ? "#A97142" : "#3D2314",
                        marginBottom: "6px",
                        lineHeight: 1.3,
                        transition: "color 0.3s ease",
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        color: "#6B5B4E",
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
        </div>

        {/* ── MOBILE VERTICAL TIMELINE FLOW ── */}
        <div className="lg:hidden" style={{ position: "relative", paddingLeft: "20px" }}>
          {/* Vertical Connecting Line */}
          <div
            style={{
              position: "absolute",
              top: "24px",
              bottom: "24px",
              left: "43px",
              width: "3px",
              background: "linear-gradient(180deg, #6B3E26 0%, #D4A95A 100%)",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(212, 169, 90, 0.4)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.step} style={{ display: "flex", alignItems: "flex-start", gap: "20px", position: "relative" }}>
                  {/* Step 3D Circle Node */}
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #6B3E26 0%, #A97142 100%)",
                      border: "3px solid #FFFDF8",
                      boxShadow: "0 0 14px rgba(212, 169, 90, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 10,
                    }}
                  >
                    <Icon size={20} style={{ color: "#FFFDF8" }} />
                    <span
                      style={{
                        position: "absolute",
                        top: "-4px",
                        right: "-4px",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "#D4A95A",
                        color: "#3D2314",
                        fontSize: "9px",
                        fontWeight: 900,
                        fontFamily: "var(--font-button)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #FFFDF8",
                      }}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div
                    style={{
                      flex: 1,
                      padding: "16px 18px",
                      borderRadius: "18px",
                      background: "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(251,245,235,0.85) 100%)",
                      border: "1.5px solid rgba(212, 169, 90, 0.3)",
                      boxShadow: "0 6px 18px rgba(107, 62, 38, 0.06)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#3D2314", margin: 0 }}>
                        {item.title}
                      </h3>
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: 800,
                          fontFamily: "var(--font-button)",
                          textTransform: "uppercase",
                          color: "#A97142",
                          background: "rgba(212, 169, 90, 0.15)",
                          padding: "2px 7px",
                          borderRadius: "100px",
                        }}
                      >
                        {item.tagline}
                      </span>
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#6B5B4E", lineHeight: 1.6, margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
