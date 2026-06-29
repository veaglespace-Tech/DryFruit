'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search, Leaf, ArrowRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchOpen } from '@/store/slices/uiSlice';
import { gsap } from 'gsap';

const POPULAR_SUGGESTIONS = [
  { label: 'California Almonds', href: '/products?search=almonds' },
  { label: 'Whole Cashews', href: '/products?search=cashews' },
  { label: 'Roasted Pistachios', href: '/products?search=pistachios' },
  { label: 'Kashmiri Walnuts', href: '/products?search=walnuts' },
  { label: 'Medjool Dates', href: '/products?search=dates' },
];

export default function SearchOverlay() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isOpen = useAppSelector((state) => state.ui.isSearchOpen);
  const [query, setQuery] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // GSAP animate open
      gsap.fromTo(overlayRef.current,
        { opacity: 0, backdropFilter: 'blur(0px)' },
        { opacity: 1, backdropFilter: 'blur(12px)', duration: 0.35, ease: 'power2.out' }
      );
      gsap.fromTo('.search-content',
        { scale: 0.95, y: -20, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'back.out(1.5)' }
      );
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        dispatch(setSearchOpen(false));
        setQuery('');
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleClose();
    router.push(`/products?search=${encodeURIComponent(query.trim())}`);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-[#3D1F0E]/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
        aria-label="Close search"
      >
        <X size={20} />
      </button>

      {/* Main Search Panel */}
      <div className="search-content w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-luxury-xl border border-border-DEFAULT">
        <form onSubmit={handleSubmit} className="relative mb-6">
          <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-DEFAULT" />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search premium dry fruits, nuts, superfoods..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border-DEFAULT bg-background font-body text-base text-text-DEFAULT outline-none focus:border-primary-DEFAULT transition-all shadow-inner"
          />
          {query.trim() && (
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary-DEFAULT text-white hover:bg-secondary-DEFAULT transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          )}
        </form>

        {/* Popular Suggestions */}
        <div>
          <h3 className="font-heading text-sm font-semibold text-primary-DEFAULT mb-3 flex items-center gap-2">
            <Leaf size={14} className="text-accent-DEFAULT" />
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
                className="px-4 py-2 rounded-xl bg-background border border-border-light text-sm font-body text-text-DEFAULT hover:border-accent-DEFAULT hover:text-primary-DEFAULT transition-all"
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
