"use client";

import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowRight,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useFadeUp } from "@/lib/gsap";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "All Products", href: "/products" },
  { label: "Best Sellers", href: "/products?best_seller=true" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
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
  { label: "Bulk & Wholesale", href: "/contact#bulk" },
];

export default function Footer() {
  const ref = useFadeUp({ delay: 0.1 });

  return (
    <footer
      ref={ref}
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #25130A 0%, #1A0D07 50%, #100603 100%)",
        color: "#FFFDF8",
        overflow: "hidden",
      }}
    >
      {/* Top Glowing Metallic Gold Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #6B3E26 0%, #D4A95A 35%, #F59E0B 70%, #6B3E26 100%)",
        }}
      />

      {/* Ambient background gold glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(212,169,90,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(80px)",
        }}
      />

      {/* Main Footer Content */}
      <div className="container-luxury" style={{ position: "relative", zIndex: 1, paddingTop: "4.5rem", paddingBottom: "4rem" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* ── Brand Column (Col 1-4) ── */}
          <div className="lg:col-span-4">
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "12px", textDecoration: "none", marginBottom: "20px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "#FFFDF8",
                  padding: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #D4A95A",
                  boxShadow: "0 0 20px rgba(212, 169, 90, 0.4)",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/images/logo.png"
                  alt="Shreepad Enterprises Logo"
                  style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.1)" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 800, color: "#FFFDF8", lineHeight: 1.1 }}>
                  Shreepad
                </span>
                <span style={{ fontFamily: "var(--font-button)", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", color: "#D4A95A", marginTop: "2px" }}>
                  Enterprises
                </span>
              </div>
            </Link>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.7, marginBottom: "24px", maxWidth: "340px" }}>
              We bring you the finest quality dry fruits, nuts, and superfoods sourced directly from certified organic farms. 100% natural, chemical-free goodness.
            </p>

            {/* Quick Contact Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              <a
                href="tel:+919860941171"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "rgba(255, 255, 255, 0.85)", fontSize: "0.85rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4A95A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)")}
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(212,169,90,0.15)", border: "1px solid rgba(212,169,90,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Phone size={14} style={{ color: "#D4A95A" }} />
                </div>
                <span>+91 98609 41171</span>
              </a>

              <a
                href="https://wa.me/917709747803"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "rgba(255, 255, 255, 0.85)", fontSize: "0.85rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#10B981")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)")}
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MessageCircle size={14} style={{ color: "#10B981" }} />
                </div>
                <span>WhatsApp Us (Direct Support)</span>
              </a>

              <a
                href="mailto:Info@shreepadenterprisespune.com"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "rgba(255, 255, 255, 0.85)", fontSize: "0.85rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4A95A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)")}
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(212,169,90,0.15)", border: "1px solid rgba(212,169,90,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Mail size={14} style={{ color: "#D4A95A" }} />
                </div>
                <span style={{ wordBreak: "break-all" }}>Info@shreepadenterprisespune.com</span>
              </a>

              <a
                href="https://maps.google.com/?q=Shop+No+4+Near+Datta+Nagar+Bus+Stop+Pune+Alandi+Rd+Dighi+PCMC+Pune+Maharashtra+411015"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "flex-start", gap: "10px", color: "rgba(255, 255, 255, 0.85)", fontSize: "0.85rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4A95A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)")}
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(212,169,90,0.15)", border: "1px solid rgba(212,169,90,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                  <MapPin size={14} style={{ color: "#D4A95A" }} />
                </div>
                <span>Shop No 4, Near Datta Nagar Bus Stop, Dighi, Pune 411015</span>
              </a>
            </div>

            {/* Social Media Glass Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {[
                {
                  icon: (
                    <svg style={{ width: "16px", height: "16px", fill: "currentColor" }} viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  ),
                  href: "https://www.instagram.com/shreepadenterprisespune",
                  label: "Instagram",
                },
                {
                  icon: (
                    <svg style={{ width: "16px", height: "16px", fill: "currentColor" }} viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                    </svg>
                  ),
                  href: "https://www.facebook.com/share/196WjgdkRU/?mibextid=wwXIfr",
                  label: "Facebook",
                },
                {
                  icon: (
                    <svg style={{ width: "16px", height: "16px", fill: "currentColor" }} viewBox="0 0 24 24">
                      <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
                    </svg>
                  ),
                  href: "https://shreepadenterprisespune.com",
                  label: "Website",
                },
                {
                  icon: (
                    <svg style={{ width: "16px", height: "16px", fill: "currentColor" }} viewBox="0 0 24 24">
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
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(212, 169, 90, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFDF8",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #D4A95A, #F59E0B)";
                    e.currentTarget.style.color = "#3D2314";
                    e.currentTarget.style.borderColor = "#D4A95A";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.color = "#FFFDF8";
                    e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links (Col 5-7) ── */}
          <div className="lg:col-span-2">
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "#FFFDF8", marginBottom: "20px", position: "relative" }}>
              Quick Links
              <span style={{ display: "block", width: "24px", height: "2px", background: "#D4A95A", marginTop: "6px", borderRadius: "100px" }} />
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255, 255, 255, 0.75)", fontSize: "0.88rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#D4A95A";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <ArrowRight size={13} style={{ color: "#D4A95A", opacity: 0.8 }} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Categories (Col 8-10) ── */}
          <div className="lg:col-span-3">
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "#FFFDF8", marginBottom: "20px", position: "relative" }}>
              Our Categories
              <span style={{ display: "block", width: "24px", height: "2px", background: "#D4A95A", marginTop: "6px", borderRadius: "100px" }} />
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={cat.href}
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255, 255, 255, 0.75)", fontSize: "0.88rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#D4A95A";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <ArrowRight size={13} style={{ color: "#D4A95A", opacity: 0.8 }} />
                    <span>{cat.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Stay Connected & Company (Col 11-12) ── */}
          <div className="lg:col-span-3">
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "#FFFDF8", marginBottom: "20px", position: "relative" }}>
              Stay Connected
              <span style={{ display: "block", width: "24px", height: "2px", background: "#D4A95A", marginTop: "6px", borderRadius: "100px" }} />
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.6, marginBottom: "16px" }}>
              Subscribe to receiving direct harvest updates & VIP discounts.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(212, 169, 90, 0.35)",
                borderRadius: "100px",
                padding: "4px 4px 4px 14px",
                marginBottom: "28px",
              }}
            >
              <input
                type="email"
                placeholder="Enter email address..."
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#FFFDF8",
                  fontSize: "12px",
                  fontFamily: "var(--font-body)",
                }}
                suppressHydrationWarning
              />
              <button
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #D4A95A, #F59E0B)",
                  border: "none",
                  color: "#3D2314",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(212,169,90,0.3)",
                }}
                aria-label="Subscribe"
                suppressHydrationWarning
              >
                <ArrowRight size={16} />
              </button>
            </div>

            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 700, color: "#FFFDF8", marginBottom: "12px" }}>
              Company
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.82rem", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.3s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#D4A95A")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          background: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="container-luxury" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left">
            {/* Copyright */}
            <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(255, 255, 255, 0.75)", margin: 0 }}>
              &copy; {new Date().getFullYear()}{" "}
              <span style={{ fontWeight: 700, color: "#FFFDF8" }}>Shreepad Enterprises</span>. All rights reserved.
            </p>

            {/* Designed & Developed Credit */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(255, 255, 255, 0.8)" }}>
              <span>Designed & Developed by</span>
              <a
                href="https://veaglespace.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "3px 10px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(212, 169, 90, 0.35)",
                  color: "#D4A95A",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
              >
                <span style={{ background: "linear-gradient(90deg, #D4A95A, #FFFDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  VeagleSpace Technology Pvt. Ltd.
                </span>
                <span style={{ fontSize: "10px" }}>↗</span>
              </a>
            </div>

            {/* Legal Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "12px", fontFamily: "var(--font-body)", textDecoration: "none", transition: "color 0.3s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFDF8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")}
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
