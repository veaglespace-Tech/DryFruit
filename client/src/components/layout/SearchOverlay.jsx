"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Search, Leaf, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchOpen } from "@/store/slices/uiSlice";
import { gsap } from "gsap";

const POPULAR_SUGGESTIONS = [
  { label: "California Almonds", href: "/products?search=almonds" },
  { label: "Whole Cashews", href: "/products?search=cashews" },
  { label: "Roasted Pistachios", href: "/products?search=pistachios" },
  { label: "Kashmiri Walnuts", href: "/products?search=walnuts" },
  { label: "Medjool Dates", href: "/products?search=dates" },
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
      // GSAP animate open
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0, backdropFilter: "blur(0px)" },
          {
            opacity: 1,
            backdropFilter: "blur(12px)",
            duration: 0.35,
            ease: "power2.out",
          },
        );
        const searchContent =
          overlayRef.current.querySelector(".search-content");
        if (searchContent) {
          gsap.fromTo(
            searchContent,
            { scale: 0.95, y: -20, opacity: 0 },
            {
              scale: 1,
              y: 0,
              opacity: 1,
              duration: 0.4,
              delay: 0.1,
              ease: "back.out(1.5)",
            },
          );
        }
      }
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        dispatch(setSearchOpen(false));
        setQuery("");
      },
    });
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
      className="fixed inset-0 z-50 bg-[#3D1F0E]/80 backdrop-blur-md flex items-center justify-center p-4 w-full h-full"
    >
      {/* Main Search Panel */}
      <div className="search-content w-full max-w-lg bg-white rounded-3xl p-5 md:p-8 shadow-luxury-xl border border-border">
        {/* Header Row with Title and Close Button */}
        <div className="flex items-center justify-between mb-5 pb-2 border-b border-border/60">
          <h3 className="font-heading text-base font-bold text-primary flex items-center gap-2">
            <Search size={18} className="text-accent" />
            Search Products
          </h3>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-background text-text-muted transition-colors border border-border"
            aria-label="Close search"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative mb-6">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
          />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search premium dry fruits, nuts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-border bg-background font-body text-sm text-text-DEFAULT outline-none focus:border-primary transition-all shadow-inner"
          />

          {query.trim() && (
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-primary text-white hover:bg-secondary transition-colors"
            >
              <ArrowRight size={16} />
            </button>
          )}
        </form>

        {/* Popular Suggestions */}
        <div>
          <h3 className="font-heading text-xs font-semibold text-primary mb-3 flex items-center gap-2">
            <Leaf size={12} className="text-accent" />
            Popular Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SUGGESTIONS.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  handleClose();
                  router.push(item.href);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-background border border-border-light text-xs font-body text-text-DEFAULT hover:border-accent hover:text-primary transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
