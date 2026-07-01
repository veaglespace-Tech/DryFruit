"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Play,
  ArrowRight,
  Leaf,
  Shield,
  Award,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Floating nut data
const floatingNuts = [
  {
    src: "/images/categories/almonds.png",
    size: 100,
    x: "8%",
    y: "20%",
    delay: 0,
    duration: 6,
  },
  {
    src: "/images/categories/cashews.png",
    size: 90,
    x: "90%",
    y: "15%",
    delay: 1.5,
    duration: 7,
  },
  {
    src: "/images/categories/walnuts.png",
    size: 110,
    x: "85%",
    y: "70%",
    delay: 0.5,
    duration: 5.5,
  },
  {
    src: "/images/categories/pistachios.png",
    size: 80,
    x: "5%",
    y: "75%",
    delay: 2,
    duration: 6.5,
  },
  {
    src: "/images/categories/dates.png",
    size: 95,
    x: "50%",
    y: "85%",
    delay: 1,
    duration: 7.5,
  },
];

const stats = [
  { value: "500+", label: "Premium Products" },
  { value: "50K+", label: "Happy Customers" },
  { value: "100%", label: "Natural & Pure" },
  { value: "15+", label: "Years of Trust" },
];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const headlineRef = useRef(null);
  const subHeadlineRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const nutsRef = useRef([]);

  useGSAP(
    () => {
      // Master timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Background parallax setup
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero entrance animations
      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      )
        .fromTo(
          ".hero-headline-line",
          { opacity: 0, y: 80, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.2",
        )
        .fromTo(
          subHeadlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          statsRef.current?.children || [],
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.4)",
          },
          "-=0.2",
        );

      // Floating nuts animation
      nutsRef.current.forEach((nut, i) => {
        if (!nut) return;
        const config = floatingNuts[i];
        gsap.fromTo(
          nut,
          { opacity: 0, scale: 0, rotation: -20 },
          {
            opacity: 0.85,
            scale: 1,
            rotation: 0,
            duration: 1,
            delay: 0.8 + i * 0.15,
            ease: "back.out(1.7)",
          },
        );
        // Continuous float
        gsap.to(nut, {
          y: -20 + Math.sin(i) * 10,
          rotation: 5 - i * 2,
          duration: config.duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: config.delay,
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: "110px" }}
    >
      {/* Background Image with Parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
        <Image
          src="/images/hero/hero-bg.png"
          alt="Premium Dry Fruits Collection"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          loading="eager"
        />

        {/* Multi-layer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D1F0E]/90 via-[#6B3E26]/70 to-[#A97142]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D1209]/80 via-transparent to-transparent" />
      </div>

      {/* Floating Nut Elements */}
      {floatingNuts.map((nut, i) => (
        <div
          key={i}
          ref={(el) => {
            nutsRef.current[i] = el;
          }}
          className="absolute z-10 pointer-events-none hidden lg:block"
          style={{ left: nut.x, top: nut.y }}
        >
          <div
            className="relative"
            style={{ width: nut.size, height: nut.size }}
          >
            <Image
              src={nut.src}
              alt="Floating nut"
              fill
              className="object-contain rounded-full"
              style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))" }}
            />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="container-luxury relative z-20 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm mb-6">
            <Leaf size={14} className="text-accent-DEFAULT" />
            <span className="text-white/90 text-sm font-button font-medium">
              100% Natural & Farm Fresh
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-accent-DEFAULT animate-pulse" />
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="mb-6 overflow-hidden">
            <div className="hero-headline-line overflow-hidden">
              <h1
                className="font-heading"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                Nature&apos;s Finest
              </h1>
            </div>
            <div className="hero-headline-line overflow-hidden">
              <h1
                className="font-heading"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "#D4A95A",
                }}
              >
                Dry Fruits & Nuts
              </h1>
            </div>
            <div className="hero-headline-line overflow-hidden">
              <h1
                className="font-heading italic"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 3rem)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  color: "rgba(255, 255, 255, 0.85)",
                }}
              >
                Delivered to your door
              </h1>
            </div>
          </div>

          {/* Subheadline */}
          <p
            ref={subHeadlineRef}
            className="text-white/95 font-body text-lg leading-relaxed mb-8 max-w-2xl"
          >
            Sourced from the world&apos;s finest farms and orchards, our premium
            dry fruits are handpicked, naturally processed, and packed to
            perfection. Experience the difference quality makes.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
            <Link href="/products" className="btn-primary-luxury group">
              <span className="flex items-center gap-2">
                <ShoppingBag size={18} />
                Shop Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-3 px-6 py-3 rounded-full border-2 border-white/40 text-white hover:bg-white/10 transition-all duration-300 font-button font-semibold"
            >
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Play size={14} className="text-white ml-0.5" />
              </span>
              Explore Products
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {[
              { icon: Shield, text: "Quality Assured" },
              { icon: Leaf, text: "Chemical Free" },
              { icon: Award, text: "Award Winning" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/95">
                <Icon size={14} className="text-accent-DEFAULT" />
                <span className="text-xs font-body">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-2xl border border-white/15 bg-white/8 backdrop-blur-sm"
            >
              <div className="font-heading text-2xl md:text-3xl font-bold text-accent-DEFAULT mb-1">
                {stat.value}
              </div>
              <div className="text-white/85 text-xs font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 82.5C1200 85 1320 80 1380 77.5L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#FFFDF8"
          />
        </svg>
      </div>
    </section>
  );
}
