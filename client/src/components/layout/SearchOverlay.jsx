"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Search, Leaf, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchOpen } from "@/store/slices/uiSlice";
import { gsap } from "gsap";

const POPULAR_SUGGESTIONS = [
  { label: "California Almonds", href: "/products?search=almonds", tag: "Best Seller" },
  { label: "Whole Cashews", href: "/products?search=cashews", tag: "Organic" },
  { label: "Roasted Pistachios", href: "/products?search=pistachios", tag: "Salted" },
  { label: "Kashmiri Walnuts", href: "/products?search=walnuts", tag: "Fresh Harvest" },
  { label: "Medjool Dates", href: "/products?search=dates", tag: "Premium" },
];

export default function SearchOverlay() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isOpen = useAppSelector((state) => state.ui.isSearchOpen);
  const [query, setQuery] = useState("");
  const overlayRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0, backdropFilter: "blur(0px)" },
          {
            opacity: 1,
            backdropFilter: "blur(16px)",
            duration: 0.35,
            ease: "power2.out",
          }
        );
        const searchContent = overlayRef.current.querySelector(".search-content");
        if (searchContent) {
          gsap.fromTo(
            searchContent,
            { scale: 0.94, y: -20, opacity: 0 },
            {
              scale: 1,
              y: 0,
              opacity: 1,
              duration: 0.4,
              delay: 0.08,
              ease: "back.out(1.5)",
            }
          );
        }
      }
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleClose = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          dispatch(setSearchOpen(false));
          setQuery("");
        },
      });
    } else {
      dispatch(setSearchOpen(false));
      setQuery("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleClose();
    router.push(`/products?search=${encodeURIComponent(query.trim())}`);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(25, 13, 7, 0.85)",
        backdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        width: "100%",
        height: "100%",
      }}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      {/* ── Main Search Panel Showcase ── */}
      <div
        className="search-content"
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "linear-gradient(145deg, #3D2314 0%, #25130A 60%, #170B05 100%)",
          borderRadius: "32px",
          padding: "clamp(24px, 4vw, 36px)",
          border: "1.5px solid rgba(212, 169, 90, 0.45)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glowing Top Metallic Accent Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #D4A95A 0%, #F59E0B 50%, #FFFDF8 100%)",
          }}
        />

        {/* Header Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "12px",
                background: "rgba(212, 169, 90, 0.18)",
                border: "1px solid rgba(212, 169, 90, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Search size={18} style={{ color: "#D4A95A" }} />
            </div>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.25rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #FFFDF8 0%, #D4A95A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: 0,
              }}
            >
              Search Products
            </h3>
          </div>

          <button
            type="button"
            onClick={handleClose}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(212, 169, 90, 0.35)",
              color: "#FFFDF8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #D4A95A, #F59E0B)";
              e.currentTarget.style.color = "#3D2314";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.color = "#FFFDF8";
            }}
            aria-label="Close search"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Search Input Bar ── */}
        <form onSubmit={handleSubmit} style={{ position: "relative", marginBottom: "26px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.12)",
              border: "1.5px solid rgba(212, 169, 90, 0.45)",
              borderRadius: "100px",
              padding: "5px 6px 5px 18px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Search size={18} style={{ color: "#D4A95A", flexShrink: 0, marginRight: "10px" }} />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search premium almonds, cashews, dates..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#FFFDF8",
                fontSize: "14px",
                fontFamily: "var(--font-body)",
              }}
            />
            <button
              type="submit"
              style={{
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
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(212, 169, 90, 0.4)",
                transition: "transform 0.2s ease",
              }}
              aria-label="Submit search"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </form>

        {/* ── Popular Searches Glass Pills ── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <TrendingUp size={14} style={{ color: "#D4A95A" }} />
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.88rem",
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.9)",
                margin: 0,
              }}
            >
              Popular Searches
            </h4>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {POPULAR_SUGGESTIONS.map((item) => (
              <button
                type="button"
                key={item.label}
                onClick={() => {
                  handleClose();
                  router.push(item.href);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  borderRadius: "100px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(212, 169, 90, 0.35)",
                  color: "#FFFDF8",
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #D4A95A 0%, #F59E0B 100%)";
                  e.currentTarget.style.color = "#3D2314";
                  e.currentTarget.style.borderColor = "#D4A95A";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.color = "#FFFDF8";
                  e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Leaf size={12} style={{ color: "#D4A95A" }} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
