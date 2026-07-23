"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Leaf,
  Phone,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCart } from "@/store/slices/cartSlice";
import {
  toggleMobileNav,
  setMobileNavOpen,
  setSearchOpen,
} from "@/store/slices/uiSlice";

import { selectCartCount } from "@/store/slices/cartSlice";

gsap.registerPlugin(useGSAP);
gsap.config({ nullTargetWarn: false });

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Products",
    href: "/products",
    submenu: [
      { label: "All Products", href: "/products" },
      {
        label: "Dry Fruits & Seeds",
        href: "/products?category=dry-fruits-seeds",
      },
      { label: "Oils & Ghee", href: "/products?category=oils-ghee" },
      {
        label: "Tea, Coffee & Beverages",
        href: "/products?category=tea-coffee-beverages",
      },
      { label: "Atta, Rice & Dal", href: "/products?category=atta-rice-dal" },
      {
        label: "Masala, Spices & Salt",
        href: "/products?category=masala-spices-salt",
      },
      {
        label: "Breakfast Essentials",
        href: "/products?category=breakfast-essentials",
      },
      {
        label: "Sauces & Spreads",
        href: "/products?category=sauces-instant-foods",
      },
    ],
  },
  { label: "Categories", href: "/categories" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const isMobileNavOpen = useAppSelector((state) => state.ui.isMobileNavOpen);

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminData = localStorage.getItem("shreepad_admin");
    if (adminData) setAdmin(JSON.parse(adminData));
  }, []);

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

  // Dynamic Scroll Handling (Hide on scroll down, show on scroll up)
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      if (currentScrollY > 200) {
        if (currentScrollY > lastScrollY.current && !isHidden.current) {
          gsap.to(navRef.current, {
            y: "-120%",
            duration: 0.3,
            ease: "power2.in",
            overwrite: true,
          });
          isHidden.current = true;
        } else if (currentScrollY < lastScrollY.current && isHidden.current) {
          gsap.to(navRef.current, {
            y: "0%",
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
          isHidden.current = false;
        }
      } else {
        if (isHidden.current) {
          gsap.to(navRef.current, { y: "0%", duration: 0.3, overwrite: true });
          isHidden.current = false;
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu drawer animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (isMobileNavOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.35, ease: "power3.out" }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.25,
        ease: "power3.in",
      });
      document.body.style.overflow = "";
    }
  }, [isMobileNavOpen]);

  const isActive = (href) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <nav
        ref={navRef}
        className="fixed left-0 right-0 z-40 transition-all duration-300"
        style={{
          top: isScrolled ? "0px" : "40px",
          background: "linear-gradient(135deg, rgba(38, 20, 11, 0.96) 0%, rgba(22, 11, 6, 0.98) 100%)",
          borderBottom: "1px solid rgba(212, 169, 90, 0.35)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-16 sm:h-18">

            {/* ── Brand Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Shreepad Enterprises Home"
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#FFFDF8",
                  padding: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #D4A95A",
                  boxShadow: "0 0 14px rgba(212, 169, 90, 0.4)",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/images/logo.png"
                  alt="Shreepad Enterprises Logo"
                  style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.1)" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "#FFFDF8",
                    lineHeight: 1.1,
                  }}
                >
                  Shreepad
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-button)",
                    fontSize: "9px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "#D4A95A",
                    marginTop: "2px",
                  }}
                >
                  Enterprises
                </span>
              </div>
            </Link>

            {/* ── Desktop Navigation Links ── */}
            <ul className="hidden lg:flex items-center gap-1 xl:gap-2" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.label} className="relative">
                    {link.submenu ? (
                      <button
                        type="button"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "6px 14px",
                          borderRadius: "100px",
                          fontSize: "13px",
                          fontWeight: 700,
                          fontFamily: "var(--font-button)",
                          cursor: "pointer",
                          transition: "all 0.25s ease",
                          background: "transparent",
                          color: active ? "#D4A95A" : "rgba(255, 255, 255, 0.92)",
                          borderBottom: active ? "2px solid #D4A95A" : "2px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          setActiveDropdown(link.label);
                          e.currentTarget.style.color = "#D4A95A";
                        }}
                        onMouseLeave={() => {
                          setActiveDropdown(null);
                          if (!active) {
                            e.currentTarget.style.color = "rgba(255, 255, 255, 0.92)";
                          }
                        }}
                        aria-expanded={activeDropdown === link.label}
                        suppressHydrationWarning
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          size={13}
                          style={{
                            transition: "transform 0.25s ease",
                            transform: activeDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)",
                            color: "#D4A95A",
                          }}
                        />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "6px 14px",
                          borderRadius: "100px",
                          fontSize: "13px",
                          fontWeight: 700,
                          fontFamily: "var(--font-button)",
                          textDecoration: "none",
                          transition: "all 0.25s ease",
                          color: active ? "#D4A95A" : "rgba(255, 255, 255, 0.92)",
                          borderBottom: active ? "2px solid #D4A95A" : "2px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#D4A95A";
                        }}
                        onMouseLeave={(e) => {
                          if (!active) {
                            e.currentTarget.style.color = "rgba(255, 255, 255, 0.92)";
                          }
                        }}
                      >
                        {link.label}
                      </Link>
                    )}

                    {/* Submenu Dropdown Panel */}
                    {link.submenu && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          marginTop: "6px",
                          width: "220px",
                          background: "linear-gradient(145deg, #2D180E 0%, #190D07 100%)",
                          borderRadius: "18px",
                          border: "1.5px solid rgba(212, 169, 90, 0.4)",
                          boxShadow: "0 18px 45px rgba(0, 0, 0, 0.45)",
                          backdropFilter: "blur(16px)",
                          overflow: "hidden",
                          transition: "all 0.25s ease",
                          opacity: activeDropdown === link.label ? 1 : 0,
                          visibility: activeDropdown === link.label ? "visible" : "hidden",
                          transform: activeDropdown === link.label ? "translateY(0)" : "translateY(8px)",
                        }}
                        onMouseEnter={() => setActiveDropdown(link.label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "11px 16px",
                              fontSize: "13px",
                              fontFamily: "var(--font-body)",
                              color: "rgba(255, 255, 255, 0.85)",
                              textDecoration: "none",
                              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(212, 169, 90, 0.15)";
                              e.currentTarget.style.color = "#D4A95A";
                              e.currentTarget.style.paddingLeft = "20px";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)";
                              e.currentTarget.style.paddingLeft = "16px";
                            }}
                          >
                            <Leaf size={12} style={{ color: "#D4A95A" }} />
                            <span>{sub.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* ── Action Buttons ── */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

              {/* Search */}
              <button
                type="button"
                onClick={() => dispatch(setSearchOpen(true))}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(212, 169, 90, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFDF8",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#D4A95A";
                  e.currentTarget.style.color = "#D4A95A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.3)";
                  e.currentTarget.style.color = "#FFFDF8";
                }}
                aria-label="Search"
                suppressHydrationWarning
              >
                <Search size={17} />
              </button>

              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/917709747803"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#10B981",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#10B981";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(16, 185, 129, 0.15)";
                  e.currentTarget.style.color = "#10B981";
                }}
                aria-label="WhatsApp Support"
              >
                <MessageCircle size={17} />
              </a>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(212, 169, 90, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFDF8",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#D4A95A";
                  e.currentTarget.style.color = "#D4A95A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.3)";
                  e.currentTarget.style.color = "#FFFDF8";
                }}
                aria-label="Wishlist"
              >
                <Heart size={17} />
              </Link>

              {/* Cart Button */}
              <button
                type="button"
                onClick={() => dispatch(toggleCart())}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #D4A95A 0%, #F59E0B 100%)",
                  color: "#3D2314",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(212, 169, 90, 0.4)",
                  transition: "transform 0.25s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                aria-label={`Cart (${cartCount} items)`}
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "#EF4444",
                      color: "#FFFFFF",
                      fontSize: "9px",
                      fontWeight: 900,
                      fontFamily: "var(--font-button)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1.5px solid #3D2314",
                    }}
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              {/* Admin Panel Link */}
              {admin && (
                <Link
                  href="/admin/dashboard"
                  className="hidden xl:inline-flex"
                  style={{
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    borderRadius: "100px",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(212, 169, 90, 0.4)",
                    color: "#FFFDF8",
                    fontSize: "11px",
                    fontWeight: 700,
                    fontFamily: "var(--font-button)",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#D4A95A";
                    e.currentTarget.style.color = "#3D2314";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.color = "#FFFDF8";
                  }}
                >
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "#D4A95A",
                      color: "#3D2314",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      fontWeight: 900,
                    }}
                  >
                    A
                  </div>
                  <span>Admin Panel</span>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => dispatch(toggleMobileNav())}
                className="lg:hidden"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(212, 169, 90, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFDF8",
                  cursor: "pointer",
                }}
                aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileNavOpen}
                suppressHydrationWarning
              >
                {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-30 bg-[#25130A] flex flex-col ${isMobileNavOpen ? "" : "pointer-events-none"}`}
        style={{
          paddingTop: "90px",
          transform: "translateX(100%)",
          borderLeft: "2px solid rgba(212, 169, 90, 0.4)",
        }}
      >
        <div className="overflow-y-auto px-6 py-6">
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 18px",
                    borderRadius: "14px",
                    fontSize: "1rem",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: isActive(link.href) ? "#D4A95A" : "#FFFDF8",
                    background: isActive(link.href) ? "rgba(212,169,90,0.15)" : "transparent",
                    border: isActive(link.href) ? "1px solid rgba(212,169,90,0.3)" : "1px solid transparent",
                    textDecoration: "none",
                  }}
                  onClick={() => dispatch(setMobileNavOpen(false))}
                >
                  <span>{link.label}</span>
                  {link.submenu && <ChevronDown size={16} style={{ color: "#D4A95A" }} />}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: "12px" }}>
            <a
              href="https://wa.me/917709747803"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 18px",
                borderRadius: "14px",
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                color: "#10B981",
                fontFamily: "var(--font-button)",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <MessageCircle size={20} />
              <span>WhatsApp Direct Support</span>
            </a>

            <a
              href="tel:+919860941171"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 18px",
                borderRadius: "14px",
                background: "rgba(212, 169, 90, 0.15)",
                border: "1px solid rgba(212, 169, 90, 0.4)",
                color: "#D4A95A",
                fontFamily: "var(--font-button)",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <Phone size={20} />
              <span>Call Us: +91 98609 41171</span>
            </a>
          </div>
        </div>
      </div>

      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => dispatch(setMobileNavOpen(false))}
        />
      )}
    </>
  );
}
