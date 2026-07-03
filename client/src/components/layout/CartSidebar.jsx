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
  Leaf,
  ShieldCheck,
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
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        sidebarRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" },
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
    100,
  );
  const remainingForFreeShipping = freeShippingThreshold - cartTotal;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Sidebar Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div
          ref={sidebarRef}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-border-DEFAULT flex items-center justify-between bg-surface">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-primary-DEFAULT" />
              <h2 className="font-heading text-lg font-bold text-primary-DEFAULT">
                Your Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-background text-text-muted hover:text-primary-DEFAULT transition-all"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>

          {/* Shipping Progress */}
          {cartItems.length > 0 && (
            <div className="px-6 py-4 bg-primary-50/50 border-b border-border-light">
              <div className="flex items-center gap-2 mb-2">
                <Leaf size={14} className="text-accent-DEFAULT" />
                <p className="text-xs font-body text-text-DEFAULT">
                  {remainingForFreeShipping > 0 ? (
                    <>
                      Add{" "}
                      <span className="font-bold text-primary-DEFAULT">
                        ₹{remainingForFreeShipping.toLocaleString()}
                      </span>{" "}
                      more for{" "}
                      <span className="font-bold text-green-600">
                        FREE delivery!
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-green-600">
                      🎉 Congratulations! You qualify for FREE delivery.
                    </span>
                  )}
                </p>
              </div>
              <div className="w-full h-1.5 bg-border-DEFAULT rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-DEFAULT to-green-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-2xl border border-border-light hover:border-border-DEFAULT hover:shadow-card transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-background border border-border-light flex-shrink-0">
                    <Image
                      src={
                        item.thumbnail || "/images/categories/mixed-nuts.png"
                      }
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-heading text-sm font-bold text-primary-DEFAULT hover:text-secondary-DEFAULT line-clamp-2 leading-tight"
                          onClick={handleClose}
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          className="text-text-muted hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-text-muted font-body mt-0.5">
                        {item.weight}
                      </p>
                    </div>

                    <div className="flex justify-between items-end mt-2">
                      {/* Qty Controls */}
                      <div className="flex items-center border border-border-DEFAULT rounded-lg bg-background">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateQty(item.id, item.quantity, -1)
                          }
                          className="p-1 px-2 text-text-muted hover:text-primary-DEFAULT hover:bg-surface rounded-l-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-button font-bold text-primary-DEFAULT">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateQty(item.id, item.quantity, 1)
                          }
                          className="p-1 px-2 text-text-muted hover:text-primary-DEFAULT hover:bg-surface rounded-r-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="font-heading text-sm font-bold text-primary-DEFAULT">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        {item.original_price && (
                          <p className="text-xxs text-text-muted line-through font-body leading-none mt-0.5">
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
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <ShoppingBag size={28} className="text-text-muted" />
                </div>
                <h3 className="font-heading text-lg font-bold text-primary-DEFAULT mb-2">
                  Your bag is empty
                </h3>
                <p className="text-text-muted font-body text-sm max-w-xs mb-8">
                  Looks like you haven&apos;t added any premium dry fruits or
                  nuts to your cart yet.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-primary-luxury text-sm px-6 py-2.5"
                >
                  <span>Start Shopping</span>
                </button>
              </div>
            )}
          </div>

          {/* Footer Billing */}
          {cartItems.length > 0 && (
            <div className="border-t border-border-DEFAULT p-6 bg-surface space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-body text-text-muted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-primary-DEFAULT">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-body text-text-muted">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-green-600">
                    {cartTotal >= freeShippingThreshold ? "FREE" : "₹99"}
                  </span>
                </div>
                <div className="h-px bg-border-light my-2" />
                <div className="flex justify-between text-base font-heading font-bold text-primary-DEFAULT">
                  <span>Total Amount</span>
                  <span>
                    ₹
                    {(cartTotal >= freeShippingThreshold
                      ? cartTotal
                      : cartTotal + 99
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  onClick={handleClose}
                  className="btn-primary-luxury w-full justify-center py-3.5 group"
                >
                  <span className="flex items-center gap-2 text-sm">
                    Proceed to Checkout
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
                <button
                  onClick={handleClose}
                  className="w-full text-center text-xs font-button font-semibold text-text-muted hover:text-primary-DEFAULT transition-colors py-1"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Secure Checkout Badge */}
              <div className="flex items-center justify-center gap-1.5 text-xxs text-text-muted font-body pt-2">
                <ShieldCheck size={12} className="text-green-600" />
                <span>
                  Secure 256-bit SSL checkout. 100% satisfaction guarantee.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
