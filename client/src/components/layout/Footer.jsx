"use client";

import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowRight,
  Heart,
} from "lucide-react";

import { useFadeUp } from "@/lib/gsap";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "All Products", href: "/products" },
  { label: "Best Sellers", href: "/products?best_seller=true" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  { label: "Dry Fruits & Seeds", href: "/products?category=dry-fruits-seeds" },
  { label: "Oils & Ghee", href: "/products?category=oils-ghee" },
  { label: "Tea, Coffee & Beverages", href: "/products?category=tea-coffee-beverages" },
  { label: "Atta, Rice & Dal", href: "/products?category=atta-rice-dal" },
  { label: "Masala, Spices & Salt", href: "/products?category=masala-spices-salt" },
  { label: "Breakfast Essentials", href: "/products?category=breakfast-essentials" },
  { label: "Sauces & Spreads", href: "/products?category=sauces-instant-foods" },
];

const company = [
  { label: "Our Story", href: "/about" },
  { label: "Quality Promise", href: "/about#quality" },
  { label: "Sustainability", href: "/about#sustainability" },
  { label: "Gift Hampers", href: "/products?type=gifts" },
  { label: "Bulk Orders", href: "/contact#bulk" },
];

export default function Footer() {
  const ref = useFadeUp({ delay: 0.1 });

  return (
    <footer className="bg-[#3D2314] text-white" ref={ref}>
      {/* Main Footer */}
      <div className="container-luxury py-10 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand Column */}
          <div className="sm:col-span-1">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center border border-white/20 shadow-sm">
                <img
                  src="/images/logo.png"
                  alt="Shreepad Enterprises Logo"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold text-white leading-none">
                  Shreepad
                </span>
                <span className="font-body text-[10px] font-bold uppercase tracking-widest text-[#D4A95A] mt-1">
                  Enterprises
                </span>
              </div>
            </Link>

            <p className="text-white/90 font-body text-sm leading-relaxed mb-6">
              We bring you the finest quality dry fruits, nuts, and superfoods
              sourced directly from the world&apos;s best farms. 100% natural,
              no additives, pure goodness.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+919860941171"
                className="flex items-center gap-3 text-white/90 hover:text-accent-DEFAULT transition-colors text-sm"
              >
                <Phone
                  size={16}
                  className="flex-shrink-0 text-accent-DEFAULT"
                />
                +91 98609 41171
              </a>
              <a
                href="https://wa.me/917709747803"
                className="flex items-center gap-3 text-white/90 hover:text-accent-DEFAULT transition-colors text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle
                  size={16}
                  className="flex-shrink-0 text-accent-DEFAULT"
                />
                WhatsApp Us
              </a>
              <a
                href="mailto:shreepadenterprises.tech@gmail.com"
                className="flex items-center gap-3 text-white/90 hover:text-accent-DEFAULT transition-colors text-sm"
              >
                <Mail size={16} className="flex-shrink-0 text-accent-DEFAULT" />
                shreepadenterprises.tech@gmail.com
              </a>
              <a
                href="https://maps.google.com/?q=Pune,+Maharashtra+411001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/90 hover:text-accent-DEFAULT transition-colors text-sm"
              >
                <MapPin
                  size={16}
                  className="flex-shrink-0 text-accent-DEFAULT mt-0.5"
                />
                Pune, Maharashtra 411001 (Click for Live Location)
              </a>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-6">
              {[
                {
                  icon: (
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  ),
                  href: "https://instagram.com/shreepadenterprises",
                  label: "Instagram",
                },
                {
                  icon: (
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                    </svg>
                  ),
                  href: "https://facebook.com/shreepadenterprises",
                  label: "Facebook",
                },
                {
                  icon: (
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                  href: "https://twitter.com/shreepadenterprises",
                  label: "Twitter",
                },
                {
                  icon: (
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ),
                  href: "https://youtube.com/shreepadenterprises",
                  label: "YouTube",
                },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-accent-DEFAULT hover:text-[#3D2314] hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-white/80 hover:text-accent-DEFAULT transition-colors text-sm font-body group"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent-DEFAULT"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-6">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={cat.href}
                    className="flex items-center gap-2 text-white/80 hover:text-accent-DEFAULT transition-colors text-sm font-body group"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent-DEFAULT"
                    />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Company */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-6">
              Stay Connected
            </h3>
            <p className="text-white/80 text-sm font-body mb-4">
              Subscribe for exclusive offers, new arrivals, and healthy living
              tips.
            </p>
            <div className="flex gap-2 mb-8">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm font-body outline-none focus:border-accent-DEFAULT transition-colors"
                suppressHydrationWarning
              />

              <button
                className="px-4 py-2.5 bg-accent-DEFAULT hover:bg-secondary-DEFAULT text-white rounded-xl transition-colors flex-shrink-0"
                suppressHydrationWarning
              >
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Company Links */}
            <h3 className="font-heading text-sm font-semibold text-white/95 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-accent-DEFAULT transition-colors text-sm font-body"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container-luxury py-5 sm:py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 text-center lg:text-left">
            {/* Copyright */}
            <p className="text-white/70 font-body text-[clamp(11px,1.2vw,13px)] leading-tight">
              &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Shreepad Enterprises</span>. All rights reserved.
            </p>

            {/* Designed & Developed Credit */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 font-body text-white/80 text-[clamp(10px,1.1vw,12px)] whitespace-nowrap">
              <span>Designed & Developed by</span>
              <a
                href="https://veaglespace.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-1 font-semibold text-[#D4A95A] hover:text-white transition-colors duration-300 py-0.5 px-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4A95A]/50 hover:bg-[#D4A95A]/10 shadow-sm"
              >
                <span className="bg-gradient-to-r from-[#D4A95A] via-[#F3E5F5] to-[#D4A95A] bg-clip-text text-transparent group-hover:text-white transition-all">
                  VeagleSpace Technology Pvt. Ltd.
                </span>
                <span className="text-[10px] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                  ↗
                </span>
              </a>
            </div>

            {/* Links */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-[clamp(11px,1.1vw,13px)]">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-white/70 hover:text-white/95 font-body transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
