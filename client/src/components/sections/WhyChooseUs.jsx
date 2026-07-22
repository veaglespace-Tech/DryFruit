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
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitText } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "No artificial preservatives, colors, or flavors. Pure nature in every bite.",
    bgImage: "/images/why/natural.png",
  },
  {
    icon: Shield,
    title: "Premium Quality",
    description:
      "Every batch is rigorously tested and quality-checked before reaching you.",
    bgImage: "/images/why/quality.png",
  },
  {
    icon: Sprout,
    title: "Farm Fresh",
    description: "Sourced directly from trusted farms and orchards worldwide.",
    bgImage: "/images/why/farm.png",
  },
  {
    icon: CheckCircle,
    title: "Chemical Free",
    description: "No harmful chemicals, pesticides, or artificial processing.",
    bgImage: "/images/why/chemical-free.png",
  },
  {
    icon: Award,
    title: "Secure Packaging",
    description:
      "Food-safe airtight packaging that preserves freshness for months.",
    bgImage: "/images/why/packaging.png",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Speedy pan-India delivery in 3-5 business days to your doorstep.",
    bgImage: "/images/why/delivery.png",
  },
  {
    icon: Clock,
    title: "Long Shelf Life",
    description:
      "Properly processed and sealed for 6-12 months of optimal freshness.",
    bgImage: "/images/why/shelf-life.png",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description: "Dedicated support team and hassle-free returns policy.",
    bgImage: "/images/why/customer.png",
  },
];

const stats = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "15+", label: "Years Experience" },
  { value: "99.8%", label: "Satisfaction Rate" },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const titleRef = useSplitText({ delay: 0.1 });
  const iconsRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(
    () => {
      // Animate feature cards with stagger
      gsap.fromTo(
        ".why-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: iconsRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      // Stats counter animation
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      // Icon hover animations
      const icons = document.querySelectorAll(".why-icon");
      icons.forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            rotate: 15,
            scale: 1.2,
            duration: 0.3,
            ease: "back.out(1.7)",
          });
        });
        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            rotate: 0,
            scale: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.3)",
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="section-padding-lg"
      style={{
        background: "linear-gradient(180deg, #FFFDF8 0%, #F5EDE0 100%)",
      }}
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
            <ShieldCheck size={13} style={{ color: "#A97142" }} />
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
            className="font-heading text-primary mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            The Shreepad Difference
          </h2>
          <div className="section-divider mx-auto" />
          <p className="body-lead max-w-2xl mx-auto mt-4">
            We set ourselves apart with unwavering commitment to quality,
            purity, and customer satisfaction. Here&apos;s why thousands trust
            us.
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={iconsRef}
          className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 pb-6 mb-10 scrollbar-thin scroll-smooth"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="why-card group relative p-5 sm:p-6 rounded-2xl border border-[#3D2314]/10 overflow-hidden hover:shadow-luxury-lg hover:border-accent/40 transition-all duration-400 cursor-default flex-shrink-0 w-[220px] sm:w-[260px] md:w-auto"
                style={{ minHeight: "200px" }}
              >
                {/* Background Image with overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={feature.bgImage}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#1e1008]/88 group-hover:bg-[#1e1008]/82 transition-colors duration-400" />
                </div>

                {/* Content Container (relative z-10) */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Icon */}
                    <div
                      className="why-icon w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform border border-white/10"
                      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                    >
                      <Icon size={24} className="text-accent" />
                    </div>
                    {/* Title */}
                    <h3 className="font-heading text-base font-bold !text-white mb-2 group-hover:!text-accent transition-colors">
                      {feature.title}
                    </h3>
                    {/* Description */}
                    <p className="text-white/80 text-xs font-body leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item text-center p-6 rounded-2xl bg-[#3D2314] shadow-luxury"
            >
              <div className="font-heading text-3xl md:text-4xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-white/90 text-sm font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
