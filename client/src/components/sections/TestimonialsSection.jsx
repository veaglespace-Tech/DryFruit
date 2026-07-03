"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitText } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    designation: "Health & Wellness Coach",
    location: "Mumbai, Maharashtra",
    avatar: "/images/testimonials/customer-1.png",
    review:
      "Shreepad Enterprises has completely transformed my snacking habits! The quality of their almonds and cashews is simply unmatched. I can taste the freshness in every single bite. I've been recommending them to all my clients and they all love it!",
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
      "As a fitness enthusiast who is very particular about nutrition quality, Shreepad Enterprises consistently delivers the absolute best. The Kashmiri walnuts are absolutely premium - you can see and taste the difference from day one. Outstanding quality!",
    rating: 5,
    product: "Kashmiri Walnut Kernels",
  },
  {
    id: 3,
    name: "Anita Desai",
    designation: "Homemaker & Food Blogger",
    location: "Ahmedabad, Gujarat",
    avatar: "/images/testimonials/customer-1.png",
    review:
      "The Medjool dates from Shreepad Enterprises are absolutely divine! So plump, naturally sweet, and incredibly fresh. I've been ordering for 6 months and the quality never ever disappoints. Perfect for my whole family, from kids to grandparents!",
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
      "As a nutritionist, I recommend Shreepad Enterprises to all my patients. Their products are genuinely natural, chemical-free, and of hospital-grade quality. The lab reports they share are transparent and trustworthy. Simply the best!",
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
      "I ordered the gift hamper for Diwali and my entire family was blown away by the packaging and quality. Shreepad Enterprises made me look like a thoughtful gift-giver! The pistachios were particularly extraordinary. Will definitely order again.",
    rating: 5,
    product: "Iranian Roasted Pistachios",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const titleRef = useSplitText({ delay: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const goTo = (index) => {
    const newIndex = (index + testimonials.length) % testimonials.length;
    gsap.to(sliderRef.current, {
      opacity: 0,
      x: index > activeIndex ? -30 : 30,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(newIndex);
        gsap.fromTo(
          sliderRef.current,
          { opacity: 0, x: index > activeIndex ? 30 : -30 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" },
        );
      },
    });
  };

  // Autoplay testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      goTo(activeIndex + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const active = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="section-padding-lg overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #6B3E26 0%, #3D1F0E 100%)",
      }}
    >
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 mb-4">
            <span className="text-accent text-xs font-button font-semibold uppercase tracking-widest">
              Customer Love
            </span>
          </div>
          <h2
            ref={titleRef}
            className="font-heading mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            What Our Customers Say
          </h2>
          <div
            className="section-divider mx-auto"
            style={{ background: "linear-gradient(90deg, #D4A95A, #A97142)" }}
          />
          <p className="text-white/90 max-w-2xl mx-auto mt-4 font-body">
            Thousands of happy customers trust Shreepad Enterprises for their daily
            nutritional needs. Here are some of their stories.
          </p>
        </div>

        {/* Main Featured Testimonial */}
        <div
          ref={sliderRef}
          className="max-w-4xl mx-auto mb-10 testimonial-card"
        >
          <div className="relative p-5 sm:p-8 md:p-12 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20">
            {/* Quote Icon */}
            <Quote size={48} className="text-accent-DEFAULT/30 mb-4" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(active.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-accent-DEFAULT text-accent-DEFAULT"
                />
              ))}
            </div>

            {/* Review Text */}
            <blockquote className="font-heading text-white text-lg md:text-xl leading-relaxed mb-8 italic">
              &ldquo;{active.review}&rdquo;
            </blockquote>

            {/* Customer Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent-DEFAULT">
                  <Image
                    src={active.avatar}
                    alt={active.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-heading text-white font-semibold text-lg">
                    {active.name}
                  </p>
                  <p className="text-white/85 text-sm font-body">
                    {active.designation}
                  </p>
                  <p className="text-accent-DEFAULT text-xs font-body">
                    {active.location}
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 rounded-full border border-accent-DEFAULT/40 bg-accent-DEFAULT/10">
                <p className="text-xs font-button font-semibold text-accent-DEFAULT">
                  Verified Purchase
                </p>
                <p className="text-xs text-white/80 font-body">
                  {active.product}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="w-11 h-11 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-accent-DEFAULT hover:border-accent-DEFAULT transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => goTo(i)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  background:
                    i === activeIndex ? "#D4A95A" : "rgba(255,255,255,0.5)",
                  transform: i === activeIndex ? "scale(1.4)" : "scale(1)",
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="w-11 h-11 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-accent-DEFAULT hover:border-accent-DEFAULT transition-all duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
