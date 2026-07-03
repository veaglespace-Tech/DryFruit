"use client";

import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Share2,
  Globe,
  Link as LinkIcon,
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
  { label: "Premium Almonds", href: "/products?category=almonds" },
  { label: "Cashews", href: "/products?category=cashews" },
  { label: "Pistachios", href: "/products?category=pistachios" },
  { label: "Walnuts", href: "/products?category=walnuts" },
  { label: "Medjool Dates", href: "/products?category=dates" },
  { label: "Mixed Nuts", href: "/products?category=mixed-nuts" },
  { label: "Dried Berries", href: "/products?category=dried-berries" },
];

const company = [
  { label: "Our Story", href: "/about" },
  { label: "Quality Promise", href: "/about#quality" },
  { label: "Sustainability", href: "/about#sustainability" },
  { label: "Gift Hampers", href: "/products?type=gifts" },
  { label: "Bulk Orders", href: "/contact#bulk" },
  { label: "Admin Panel", href: "/admin" },
];

export default function Footer() {
  const ref = useFadeUp({ delay: 0.1 });

  return (
    <footer className="bg-[#3D2314] text-white" ref={ref}>
      {/* Main Footer */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
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
                href="tel:+919876543210"
                className="flex items-center gap-3 text-white/90 hover:text-accent-DEFAULT transition-colors text-sm"
              >
                <Phone
                  size={16}
                  className="flex-shrink-0 text-accent-DEFAULT"
                />
                +91 98765 43210
              </a>
              <a
                href="https://wa.me/919876543210"
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
                href="mailto:hello@shreepadenterprises.com"
                className="flex items-center gap-3 text-white/90 hover:text-accent-DEFAULT transition-colors text-sm"
              >
                <Mail size={16} className="flex-shrink-0 text-accent-DEFAULT" />
                hello@shreepadenterprises.com
              </a>
              <p className="flex items-start gap-3 text-white/90 text-sm">
                <MapPin
                  size={16}
                  className="flex-shrink-0 text-accent-DEFAULT mt-0.5"
                />
                123, Green Valley Road, Pune, Maharashtra 411001
              </p>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-6">
              {[
                {
                  icon: Share2,
                  href: "https://instagram.com/shreepadenterprises",
                  label: "Instagram",
                },
                {
                  icon: Globe,
                  href: "https://facebook.com/shreepadenterprises",
                  label: "Facebook",
                },
                {
                  icon: LinkIcon,
                  href: "https://twitter.com/shreepadenterprises",
                  label: "Twitter",
                },
                {
                  icon: MessageCircle,
                  href: "https://youtube.com/shreepadenterprises",
                  label: "YouTube",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-accent-DEFAULT hover:border-accent-DEFAULT transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={16} />
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
              />

              <button className="px-4 py-2.5 bg-accent-DEFAULT hover:bg-secondary-DEFAULT text-white rounded-xl transition-colors flex-shrink-0">
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
      <div className="border-t border-white/10">
        <div className="container-luxury py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/70 text-sm font-body text-center">
              &copy; {new Date().getFullYear()} Shreepad Enterprises. All rights
              reserved.
            </p>
            <div className="flex items-center gap-1 text-white/70 text-sm font-body">
              Made with <Heart size={14} className="text-red-400 mx-1" /> for
              healthy living
            </div>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Refund Policy"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="text-white/70 hover:text-white/95 text-xs font-body transition-colors"
                  >
                    {item}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
