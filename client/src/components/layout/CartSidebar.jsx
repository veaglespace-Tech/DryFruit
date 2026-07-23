"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Flame,
  ChevronRight,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setCartOpen,
  updateQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  selectCartIsOpen,
} from "@/store/slices/cartSlice";
import { gsap } from "gsap";

export default function CartSidebar() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const cartCount = useAppSelector(selectCartCount);
  const isOpen = useAppSelector(selectCartIsOpen);

  const sidebarRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // GSAP slide in
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        sidebarRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.45, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      // GSAP slide out
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power3.in",
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    dispatch(setCartOpen(false));
  };

  const handleUpdateQty = (id, currentQty, change) => {
    dispatch(updateQuantity({ id, quantity: currentQty + change }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(
    (cartTotal / freeShippingThreshold) * 100,
    100
  );
  const remainingForFreeShipping = freeShippingThreshold - cartTotal;

  // Quick recommendations for empty state
  const quickCategories = [
    { label: "Jumbo Almonds", slug: "almonds" },
    { label: "Kashmiri Saffron", slug: "saffron" },
    { label: "Royal Pistachios", slug: "pistachios" },
    { label: "Organic Figs", slug: "figs" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
      />

      {/* Sidebar Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div
          ref={sidebarRef}
          className="w-screen max-w-md bg-[#FFFDF8] shadow-2xl flex flex-col border-l border-[#D4A95A]/30"
        >
          {/* ── Header ── */}
          <div className="px-6 py-5 border-b border-[#D4A95A]/20 flex items-center justify-between bg-gradient-to-r from-[#25130A] via-[#3D2314] to-[#25130A] text-white relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D4A95A]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 z-10">
              <div className="relative p-2.5 rounded-xl bg-[#D4A95A]/15 border border-[#D4A95A]/30 text-[#D4A95A]">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4A95A] text-[#25130A] rounded-full text-[10px] font-black flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold tracking-wide text-[#FFFDF8] flex items-center gap-2">
                  Shopping Bag
                </h2>
                <p className="text-xs text-[#D4A95A]/80 font-body">
                  {cartCount === 0
                    ? "Your bag is currently empty"
                    : `${cartCount} premium ${cartCount === 1 ? "item" : "items"} selected`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="z-10 p-2 rounded-full bg-white/10 hover:bg-[#D4A95A] hover:text-[#25130A] text-white/80 transition-all duration-300 transform hover:rotate-90"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>

          {/* ── Free Shipping Progress Bar ── */}
          {cartItems.length > 0 && (
            <div className="px-6 py-3.5 bg-[#FDF9F3] border-b border-[#D4A95A]/20 shadow-inner">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Truck size={15} className="text-[#D4A95A]" />
                  <p className="text-xs font-body text-[#3D2314]">
                    {remainingForFreeShipping > 0 ? (
                      <>
                        Add{" "}
                        <span className="font-bold text-[#3D2314]">
                          ₹{remainingForFreeShipping.toLocaleString()}
                        </span>{" "}
                        more for{" "}
                        <span className="font-bold text-emerald-600 uppercase tracking-wider text-[11px]">
                          FREE Express Delivery
                        </span>
                      </>
                    ) : (
                      <span className="font-bold text-emerald-600 flex items-center gap-1">
                        <Sparkles size={13} className="text-[#D4A95A]" />
                        You unlocked FREE Express Delivery!
                      </span>
                    )}
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#D4A95A]">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#25130A]/10 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#D4A95A] via-[#E8C88A] to-emerald-500 transition-all duration-500 shadow-sm"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* ── Items List / Empty State ── */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex gap-4 p-3.5 rounded-2xl bg-white border border-[#D4A95A]/20 shadow-sm hover:border-[#D4A95A]/60 hover:shadow-md transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#FDF9F3] border border-[#D4A95A]/15 flex-shrink-0">
                    <Image
                      src={
                        item.thumbnail || "/images/categories/mixed-nuts.png"
                      }
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-1 right-1 bg-[#3D2314]/80 text-[#D4A95A] text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                      100% Organic
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-heading text-sm font-bold text-[#3D2314] hover:text-[#D4A95A] transition-colors line-clamp-2 leading-snug"
                          onClick={handleClose}
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-[#6B5A4E] font-body mt-0.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A95A]" />
                        {item.weight}
                      </p>
                    </div>

                    <div className="flex justify-between items-end mt-3">
                      {/* Qty Controls */}
                      <div className="flex items-center border border-[#D4A95A]/30 rounded-full bg-[#FDF9F3] p-0.5 shadow-inner">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateQty(item.id, item.quantity, -1)
                          }
                          className="p-1 px-2 text-[#6B5A4E] hover:text-[#3D2314] hover:bg-white rounded-full transition-all"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-button font-bold text-[#3D2314] min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateQty(item.id, item.quantity, 1)
                          }
                          className="p-1 px-2 text-[#6B5A4E] hover:text-[#3D2314] hover:bg-white rounded-full transition-all"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="font-heading text-base font-bold text-[#3D2314]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        {item.original_price && (
                          <p className="text-[10px] text-gray-400 line-through font-body leading-none mt-0.5">
                            ₹
                            {(
                              item.original_price * item.quantity
                            ).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* ── Unique Luxury Empty State ── */
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-2">
                {/* Decorative Glowing Icon Badge */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4A95A] to-[#3D2314] opacity-20 blur-xl animate-pulse" />
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-b from-[#FDF9F3] to-[#FFFDF8] border-2 border-[#D4A95A]/40 flex items-center justify-center shadow-xl">
                    <ShoppingBag
                      size={36}
                      className="text-[#D4A95A] transform group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#3D2314] text-[#D4A95A] flex items-center justify-center border border-[#D4A95A]">
                      <Sparkles size={14} />
                    </div>
                  </div>
                </div>

                <h3 className="font-heading text-xl font-extrabold text-[#3D2314] mb-2 tracking-tight">
                  Your Shopping Bag is Empty
                </h3>
                <p className="text-[#6B5A4E] font-body text-xs leading-relaxed max-w-xs mb-8">
                  Discover our handpicked selection of fresh, organic royal nuts, exotic dried fruits, and gourmet gift boxes.
                </p>

                {/* Main CTA Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full max-w-xs py-3.5 px-6 rounded-xl font-button text-xs font-bold uppercase tracking-wider text-[#D4A95A] bg-gradient-to-r from-[#25130A] via-[#3D2314] to-[#25130A] border border-[#D4A95A]/40 shadow-lg hover:shadow-2xl hover:border-[#D4A95A] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer mb-8"
                >
                  <span>Explore Royal Collection</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                {/* Quick Pick Recommendations */}
                <div className="w-full pt-6 border-t border-[#D4A95A]/20">
                  <div className="flex items-center justify-center gap-1.5 text-xxs font-bold uppercase tracking-wider text-[#D4A95A] mb-3">
                    <Flame size={12} className="text-amber-500" />
                    <span>Popular Right Now</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {quickCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categories`}
                        onClick={handleClose}
                        className="px-3 py-1.5 rounded-full bg-[#FDF9F3] border border-[#D4A95A]/25 text-xs text-[#3D2314] font-medium hover:bg-[#3D2314] hover:text-[#D4A95A] hover:border-[#D4A95A] transition-all duration-200 flex items-center gap-1"
                      >
                        {cat.label}
                        <ChevronRight size={12} className="opacity-60" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Footer Billing Section ── */}
          {cartItems.length > 0 && (
            <div className="border-t border-[#D4A95A]/20 p-6 bg-[#FDF9F3] space-y-4 shadow-2xl">
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs font-body text-[#6B5A4E]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#3D2314]">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-body text-[#6B5A4E]">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-emerald-600">
                    {cartTotal >= freeShippingThreshold ? "FREE" : "₹99"}
                  </span>
                </div>
                <div className="h-px bg-[#D4A95A]/20 my-2" />
                <div className="flex justify-between text-base font-heading font-extrabold text-[#3D2314]">
                  <span>Total Amount</span>
                  <span className="text-[#3D2314] font-bold text-lg">
                    ₹
                    {(cartTotal >= freeShippingThreshold
                      ? cartTotal
                      : cartTotal + 99
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-2.5 pt-1">
                <Link
                  href="/checkout"
                  onClick={handleClose}
                  className="w-full py-4 rounded-xl font-button text-xs font-bold uppercase tracking-wider text-[#D4A95A] bg-gradient-to-r from-[#25130A] via-[#3D2314] to-[#25130A] border border-[#D4A95A]/40 shadow-lg hover:shadow-2xl hover:border-[#D4A95A] transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span className="flex items-center gap-2">
                    Proceed to Checkout
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full text-center text-xs font-button font-semibold text-[#6B5A4E] hover:text-[#3D2314] transition-colors py-1 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Secure Checkout Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6B5A4E] font-body pt-1">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>
                  Secure 256-Bit SSL Checkout • 100% Freshness Guarantee
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
