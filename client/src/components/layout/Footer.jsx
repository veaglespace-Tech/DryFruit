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
                href="mailto:Info@shreepadenterprisespune.com"
                className="flex items-center gap-3 text-white/90 hover:text-accent-DEFAULT transition-colors text-sm"
              >
                <Mail size={16} className="flex-shrink-0 text-accent-DEFAULT" />
                Info@shreepadenterprisespune.com
              </a>
              <a
                href="https://maps.google.com/?q=Shop+No+4+Near+Datta+Nagar+Bus+Stop+Pune+Alandi+Rd+Dighi+PCMC+Pune+Maharashtra+411015"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/90 hover:text-accent-DEFAULT transition-colors text-sm"
              >
                <MapPin
                  size={16}
                  className="flex-shrink-0 text-accent-DEFAULT mt-0.5"
                />
                Shop No 4, Near Datta Nagar Bus Stop, Dighi, Pune 411015
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
                  href: "https://www.instagram.com/shreepadenterprisespune",
                  label: "Instagram",
                },
                {
                  icon: (
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                    </svg>
                  ),
                  href: "https://www.facebook.com/share/196WjgdkRU/?mibextid=wwXIfr",
                  label: "Facebook",
                },
                {
                  icon: (
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
                    </svg>
                  ),
                  href: "https://shreepadenterprisespune.com",
                  label: "Website",
                },
                {
                  icon: (
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  ),
                  href: "https://wa.me/917709747803",
                  label: "WhatsApp",
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
