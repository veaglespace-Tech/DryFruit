"use client";

import { useRef } from "react";
import {
  Sprout,
  Wind,
  SlidersHorizontal,
  CheckSquare,
  Package,
  Truck,
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
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-DEFAULT/20 mb-4">
            <span className="text-accent-DEFAULT text-xs font-button font-semibold uppercase tracking-widest">
              Our Process
            </span>
          </div>
          <h2
            ref={titleRef}
            className="font-heading text-primary-DEFAULT mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            From Farm to Your Table
          </h2>
          <div className="section-divider mx-auto" />
          <p className="body-lead max-w-2xl mx-auto mt-4">
            Every NutriRoots product follows a meticulous 6-step process to
            ensure you receive only the finest quality.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative mb-8">
          {/* Progress Line */}
          <div className="absolute top-16 left-[8%] right-[8%] h-0.5 bg-border-DEFAULT">
            <div
              ref={lineRef}
              className="h-full bg-gradient-to-r from-primary-DEFAULT via-secondary-DEFAULT to-accent-DEFAULT"
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
                    className="quality-step-icon relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-6 border-2 border-accent-DEFAULT"
                    style={{
                      background: "linear-gradient(135deg, #6B3E26, #A97142)",
                    }}
                  >
                    <Icon size={22} className="text-white" />
                    {/* Step Number */}
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent-DEFAULT rounded-full text-white text-xs font-button font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  {/* Content */}
                  <h3 className="font-heading text-sm font-semibold text-primary-DEFAULT mb-2">
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
                    className="quality-step-icon w-12 h-12 rounded-full flex items-center justify-center border-2 border-accent-DEFAULT flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #6B3E26, #A97142)",
                    }}
                  >
                    <Icon size={18} className="text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 w-0.5 bg-gradient-to-b from-accent-DEFAULT to-border-DEFAULT mt-2 min-h-[2rem]" />
                  )}
                </div>
                {/* Right: Content */}
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-button font-bold text-accent-DEFAULT">
                      {step.step}
                    </span>
                    <h3 className="font-heading text-base font-semibold text-primary-DEFAULT">
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
