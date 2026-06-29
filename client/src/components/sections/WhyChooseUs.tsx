'use client';

import { useRef } from 'react';
import { CheckCircle, Leaf, Shield, Truck, Award, Sprout, Clock, HeartHandshake } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSplitText } from '@/lib/gsap';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'No artificial preservatives, colors, or flavors. Pure nature in every bite.',
    color: '#4CAF50',
    bg: '#F1F8E9',
  },
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'Every batch is rigorously tested and quality-checked before reaching you.',
    color: '#6B3E26',
    bg: '#F9F0EB',
  },
  {
    icon: Sprout,
    title: 'Farm Fresh',
    description: 'Sourced directly from trusted farms and orchards worldwide.',
    color: '#2E7D32',
    bg: '#E8F5E9',
  },
  {
    icon: CheckCircle,
    title: 'Chemical Free',
    description: 'No harmful chemicals, pesticides, or artificial processing.',
    color: '#1565C0',
    bg: '#E3F2FD',
  },
  {
    icon: Award,
    title: 'Secure Packaging',
    description: 'Food-safe airtight packaging that preserves freshness for months.',
    color: '#D4A95A',
    bg: '#FDF8EE',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Speedy pan-India delivery in 3-5 business days to your doorstep.',
    color: '#7B1FA2',
    bg: '#F3E5F5',
  },
  {
    icon: Clock,
    title: 'Long Shelf Life',
    description: 'Properly processed and sealed for 6-12 months of optimal freshness.',
    color: '#E65100',
    bg: '#FFF3E0',
  },
  {
    icon: HeartHandshake,
    title: 'Customer First',
    description: 'Dedicated support team and hassle-free returns policy.',
    color: '#C62828',
    bg: '#FFEBEE',
  },
];

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '500+', label: 'Products' },
  { value: '15+', label: 'Years Experience' },
  { value: '99.8%', label: 'Satisfaction Rate' },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useSplitText({ delay: 0.1 });
  const iconsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate feature cards with stagger
    gsap.fromTo(
      '.why-card',
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: iconsRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Stats counter animation
    gsap.fromTo(
      '.stat-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Icon hover animations
    const icons = document.querySelectorAll('.why-icon');
    icons.forEach((icon) => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, { rotate: 15, scale: 1.2, duration: 0.3, ease: 'back.out(1.7)' });
      });
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, { rotate: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="section-padding-lg" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #F5EDE0 100%)' }}>
      <div className="container-luxury">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-border-DEFAULT mb-4">
            <span className="text-primary-DEFAULT text-xs font-button font-semibold uppercase tracking-widest">Why NutriRoots</span>
          </div>
          <h2
            ref={titleRef as any}
            className="font-heading text-primary-DEFAULT mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}
          >
            The NutriRoots Difference
          </h2>
          <div className="section-divider mx-auto" />
          <p className="body-lead max-w-2xl mx-auto mt-4">
            We set ourselves apart with unwavering commitment to quality, purity, and customer satisfaction. Here&apos;s why thousands trust us.
          </p>
        </div>

        {/* Features Grid */}
        <div ref={iconsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="why-card group p-6 rounded-2xl border border-border-DEFAULT bg-surface hover:shadow-luxury-lg transition-all duration-400 cursor-default"
              >
                {/* Icon */}
                <div
                  className="why-icon w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform"
                  style={{ backgroundColor: feature.bg }}
                >
                  <Icon size={28} style={{ color: feature.color }} />
                </div>
                {/* Title */}
                <h3 className="font-heading text-base font-semibold text-primary-DEFAULT mb-2">
                  {feature.title}
                </h3>
                {/* Description */}
                <p className="text-text-muted text-sm font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center p-6 rounded-2xl bg-[#3D2314] shadow-luxury">
              <div className="font-heading text-3xl md:text-4xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-white/90 text-sm font-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
