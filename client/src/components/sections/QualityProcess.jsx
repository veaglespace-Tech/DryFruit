"use client";

import { useRef } from "react";
import {
  Sprout,
  Wind,
  SlidersHorizontal,
  CheckSquare,
  Package,
  Truck,
  Award,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitText } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Sprout,
    step: "01",
    title: "Farm Sourcing",
    description:
      "We partner with certified organic farms and trusted orchards globally. Each source is personally vetted by our quality team.",
  },
  {
    icon: Wind,
    step: "02",
    title: "Cleaning",
    description:
      "Every batch goes through multi-stage cleaning to remove dust, debris, and impurities, using pure water systems.",
  },
  {
    icon: SlidersHorizontal,
    step: "03",
    title: "Sorting",
    description:
      "Advanced optical sorting technology combined with manual inspection ensures only the best nuts make it through.",
  },
  {
    icon: CheckSquare,
    step: "04",
    title: "Quality Check",
    description:
      "Rigorous laboratory testing for moisture, aflatoxins, microbial content, and nutritional value.",
  },
  {
    icon: Package,
    step: "05",
    title: "Premium Packing",
    description:
      "Food-safe airtight packaging with nitrogen flushing to lock in freshness and extend shelf life.",
  },
  {
    icon: Truck,
    step: "06",
    title: "Express Delivery",
    description:
      "Temperature-controlled logistics ensure your order arrives fresh and in perfect condition.",
  },
];

export default function QualityProcess() {
  const sectionRef = useRef(null);
  const titleRef = useSplitText({ delay: 0.1 });
  const lineRef = useRef(null);

  useGSAP(
    () => {
      // Animate progress line
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      // Animate steps sequentially
      gsap.fromTo(
        ".quality-step-card",
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      // Pulse animation for step icons
      gsap.to(".quality-step-icon", {
        boxShadow: "0 0 0 8px rgba(212, 169, 90, 0.2)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="section-padding-lg bg-surface overflow-hidden"
    >
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Ultra-Modern Glassmorphic Badge Chip */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "7px 22px",
              borderRadius: "100px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(245,237,224,0.88) 100%)",
              border: "1.5px solid rgba(212,169,90,0.35)",
              boxShadow: "0 4px 20px rgba(212,169,90,0.15), inset 0 1px 2px rgba(255,255,255,0.8)",
              backdropFilter: "blur(12px)",
              marginBottom: "1.25rem",
            }}
          >
            <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px" }}>
              <span style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", background: "#D4A95A", opacity: 0.75, animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
              <span style={{ position: "relative", width: "8px", height: "8px", borderRadius: "50%", background: "#6B3E26" }} />
            </span>
            <Award size={13} style={{ color: "#A97142" }} />
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
            className="font-heading text-primary mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            From Farm to Your Table
          </h2>
          <div className="section-divider mx-auto" />
          <p className="body-lead max-w-2xl mx-auto mt-4">
            Every Shreepad Enterprises product follows a meticulous 6-step process to
            ensure you receive only the finest quality.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative mb-8">
          {/* Progress Line */}
          <div className="absolute top-7 left-[8.33%] right-[8.33%] h-0.5 bg-border">
            <div
              ref={lineRef}
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-6 gap-4 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="quality-step-card flex flex-col items-center text-center"
                >
                  {/* Icon Circle */}
                  <div
                    className="quality-step-icon relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-6 border-2 border-accent"
                    style={{
                      background: "linear-gradient(135deg, #6B3E26, #A97142)",
                    }}
                  >
                    <Icon size={22} className="text-white" />
                    {/* Step Number */}
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full text-white text-xs font-button font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  {/* Content */}
                  <h3 className="font-heading text-sm font-semibold text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-muted text-xs font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="quality-step-card flex gap-4">
                {/* Left: Icon + Line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="quality-step-icon w-12 h-12 rounded-full flex items-center justify-center border-2 border-accent flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #6B3E26, #A97142)",
                    }}
                  >
                    <Icon size={18} className="text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 w-0.5 bg-gradient-to-b from-accent to-border mt-2 min-h-[2rem]" />
                  )}
                </div>
                {/* Right: Content */}
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-button font-bold text-accent">
                      {step.step}
                    </span>
                    <h3 className="font-heading text-base font-semibold text-primary">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-text-muted text-sm font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
