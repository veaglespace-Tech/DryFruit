"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Leaf,
  User,
  ShieldCheck,
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

// Suppress "GSAP target null" warnings globally (safe — just noise in dev)
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
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("shreepad_user");
    if (userData) setUser(JSON.parse(userData));

    const adminData = localStorage.getItem("shreepad_admin");
    if (adminData) setAdmin(JSON.parse(adminData));
  }, []);

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

  // Scroll behavior — hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > 200) {
        if (currentScrollY > lastScrollY.current && !isHidden.current) {
          gsap.to(navRef.current, {
            y: "-100%",
            duration: 0.3,
            ease: "power2.in",
            overwrite: true,
          });
          isHidden.current = true;
        } else if (currentScrollY < lastScrollY.current && isHidden.current) {
          gsap.to(navRef.current, {
            y: "0%",
            duration: 0.4,
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

  // GSAP entrance
  useGSAP(
    () => {
      if (!navRef.current) return;
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    },
    { scope: navRef }
  );

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (isMobileNavOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.4, ease: "power3.out" }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
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
        className="fixed left-0 right-0 z-40 transition-all duration-500"
        style={{
          top: "0px",
          background: "linear-gradient(135deg, rgba(45, 24, 14, 0.96) 0%, rgba(25, 13, 7, 0.98) 100%)",
          borderBottom: "1.5px solid rgba(212, 169, 90, 0.35)",
          boxShadow: "0 10px 35px rgba(0, 0, 0, 0.35)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Top Metallic Gold Accent Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2.5px",
            background: "linear-gradient(90deg, #6B3E26 0%, #D4A95A 50%, #F59E0B 100%)",
          }}
        />

        <div className="container-luxury">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* ── Brand Logo ── */}
            <Link
              href="/"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
              aria-label="Shreepad Enterprises Home"
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#FFFDF8",
                  padding: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #D4A95A",
                  boxShadow: "0 0 16px rgba(212, 169, 90, 0.45)",
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
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #FFFDF8 0%, #D4A95A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
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
            <ul className="hidden lg:flex items-center gap-1.5" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.label} className="relative group">
                    {link.submenu ? (
                      <button
                        type="button"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "8px 18px",
                          borderRadius: "100px",
                          fontSize: "13px",
                          fontWeight: 700,
                          fontFamily: "var(--font-button)",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          background: active
                            ? "linear-gradient(135deg, rgba(212,169,90,0.22) 0%, rgba(107,62,38,0.3) 100%)"
                            : "transparent",
                          border: active
                            ? "1px solid rgba(212,169,90,0.45)"
                            : "1px solid transparent",
                          color: active ? "#D4A95A" : "rgba(255, 255, 255, 0.9)",
                        }}
                        onMouseEnter={(e) => {
                          setActiveDropdown(link.label);
                          if (!active) {
                            e.currentTarget.style.color = "#D4A95A";
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          setActiveDropdown(null);
                          if (!active) {
                            e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                            e.currentTarget.style.background = "transparent";
                          }
                        }}
                        aria-expanded={activeDropdown === link.label}
                        suppressHydrationWarning
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          size={14}
                          style={{
                            transition: "transform 0.3s ease",
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
                          padding: "8px 18px",
                          borderRadius: "100px",
                          fontSize: "13px",
                          fontWeight: 700,
                          fontFamily: "var(--font-button)",
                          textDecoration: "none",
                          transition: "all 0.3s ease",
                          background: active
                            ? "linear-gradient(135deg, rgba(212,169,90,0.22) 0%, rgba(107,62,38,0.3) 100%)"
                            : "transparent",
                          border: active
                            ? "1px solid rgba(212,169,90,0.45)"
                            : "1px solid transparent",
                          color: active ? "#D4A95A" : "rgba(255, 255, 255, 0.9)",
                        }}
                        onMouseEnter={(e) => {
                          if (!active) {
                            e.currentTarget.style.color = "#D4A95A";
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!active) {
                            e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                            e.currentTarget.style.background = "transparent";
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
                          marginTop: "8px",
                          width: "230px",
                          background: "linear-gradient(145deg, #2D180E 0%, #190D07 100%)",
                          borderRadius: "20px",
                          border: "1.5px solid rgba(212, 169, 90, 0.4)",
                          boxShadow: "0 18px 45px rgba(0, 0, 0, 0.45)",
                          backdropFilter: "blur(16px)",
                          overflow: "hidden",
                          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                          opacity: activeDropdown === link.label ? 1 : 0,
                          visibility: activeDropdown === link.label ? "visible" : "hidden",
                          transform: activeDropdown === link.label ? "translateY(0)" : "translateY(10px)",
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
                              padding: "12px 18px",
                              fontSize: "13px",
                              fontFamily: "var(--font-body)",
                              color: "rgba(255, 255, 255, 0.85)",
                              textDecoration: "none",
                              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                              transition: "all 0.25s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(212, 169, 90, 0.15)";
                              e.currentTarget.style.color = "#D4A95A";
                              e.currentTarget.style.paddingLeft = "22px";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)";
                              e.currentTarget.style.paddingLeft = "18px";
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
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212, 169, 90, 0.2)";
                  e.currentTarget.style.borderColor = "#D4A95A";
                  e.currentTarget.style.color = "#D4A95A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.3)";
                  e.currentTarget.style.color = "#FFFDF8";
                }}
                aria-label="Search"
                suppressHydrationWarning
              >
                <Search size={18} />
              </button>

              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/917709747803"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#10B981",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #10B981, #059669)";
                  e.currentTarget.style.color = "#FFFFFF";
                  e.currentTarget.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(16, 185, 129, 0.15)";
                  e.currentTarget.style.color = "#10B981";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                aria-label="WhatsApp Support"
              >
                <MessageCircle size={18} />
              </a>

              {/* Wishlist */}
              <Link
                href="/wishlist"
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
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212, 169, 90, 0.2)";
                  e.currentTarget.style.borderColor = "#D4A95A";
                  e.currentTarget.style.color = "#D4A95A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.3)";
                  e.currentTarget.style.color = "#FFFDF8";
                }}
                aria-label="Wishlist"
              >
                <Heart size={18} />
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
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #D4A95A 0%, #F59E0B 100%)",
                  color: "#3D2314",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(212, 169, 90, 0.4)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(212, 169, 90, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(212, 169, 90, 0.4)";
                }}
                aria-label={`Cart (${cartCount} items)`}
              >
                <ShoppingBag size={19} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "#EF4444",
                      color: "#FFFFFF",
                      fontSize: "10px",
                      fontWeight: 900,
                      fontFamily: "var(--font-button)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #3D2314",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                    }}
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              {/* Admin Panel Button */}
              {admin && (
                <Link
                  href="/admin/dashboard"
                  className="hidden lg:inline-flex"
                  style={{
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 14px",
                    borderRadius: "100px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1.5px solid rgba(212, 169, 90, 0.45)",
                    color: "#FFFDF8",
                    fontSize: "12px",
                    fontWeight: 700,
                    fontFamily: "var(--font-button)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #D4A95A, #F59E0B)";
                    e.currentTarget.style.color = "#3D2314";
                    e.currentTarget.style.borderColor = "#D4A95A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.color = "#FFFDF8";
                    e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.45)";
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "#D4A95A",
                      color: "#3D2314",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: 900,
                    }}
                  >
                    A
                  </div>
                  <span>Admin Panel</span>
                </Link>
              )}

              {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={() => dispatch(toggleMobileNav())}
                className="lg:hidden"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.1)",
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
                {isMobileNavOpen ? <X size={22} /> : <Menu size={22} />}
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
