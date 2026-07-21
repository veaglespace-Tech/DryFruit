"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Eye, MessageCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { selectIsInWishlist } from "@/store/slices/wishlistSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import { gsap } from "gsap";
import { useRef } from "react";

export default function ProductCard({ product }) {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector(selectIsInWishlist(product.id));
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef(null);
  const heartRef = useRef(null);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        original_price: product.original_price,
        weight: product.weight,
        thumbnail: product.thumbnail,
        quantity: 1,
        category: product.category.name,
      }),
    );
    toast.success(`${product.name} added to cart! 🛒`);

    // Ripple animation
    gsap.fromTo(
      cardRef.current,
      { boxShadow: "0 0 0 4px rgba(107, 62, 38, 0.4)" },
      {
        boxShadow: "0 0 0 0 rgba(107, 62, 38, 0)",
        duration: 0.6,
        ease: "power2.out",
      },
    );
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      toggleWishlist({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category.name,
      }),
    );
    // Bounce animation
    gsap.fromTo(
      heartRef.current,
      { scale: 1 },
      { scale: 1.4, duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1 },
    );
    toast.success(
      isWishlisted ? "Removed from wishlist" : `Added to wishlist! ❤️`,
    );
  };

  const savings = product.original_price
    ? product.original_price - product.price
    : 0;

  return (
    <div ref={cardRef} className="product-card group relative">
      {/* Image Container */}
      <div
        className="relative overflow-hidden rounded-t-2xl"
        style={{ aspectRatio: "1" }}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.discount_percent > 0 && (
            <span className="badge-discount">
              {product.discount_percent}% OFF
            </span>
          )}
          {product.is_best_seller && (
            <span className="badge-bestseller">Best Seller</span>
          )}
          {product.is_featured && !product.is_best_seller && (
            <span className="badge-new">Featured</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          ref={heartRef}
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center transition-all duration-200 hover:shadow-card-hover"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          suppressHydrationWarning
        >
          <Heart
            size={16}
            className={`transition-colors duration-200 ${isWishlisted ? "fill-red-500 text-red-500" : "text-text-muted"}`}
          />
        </button>

        {/* Product Image */}
        <Link href={`/products/${product.slug}`} className="relative block w-full h-full">
          <Image
            src={product.thumbnail || "/images/categories/mixed-nuts.png"}
            alt={product.name}
            fill
            className="product-image object-cover"
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Link
            href={`/products/${product.slug}`}
            className="w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:bg-accent hover:text-white transition-colors"
            aria-label="View product details"
          >
            <Eye size={18} />
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors"
            aria-label="Add to cart"
            suppressHydrationWarning
          >
            <ShoppingBag size={18} />
          </button>
          <a
            href={`https://wa.me/917709747803?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
            aria-label="Inquire on WhatsApp"
          >
            <MessageCircle size={18} className="text-white" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Category */}
        <Link
          href={`/products?category=${product.category.slug}`}
          className="text-[10px] sm:text-xs font-button font-semibold text-accent uppercase tracking-wider hover:text-secondary transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {product.category.name}
        </Link>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading text-sm sm:text-base font-semibold text-primary mt-0.5 mb-0.5 leading-snug group-hover:text-secondary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Weight */}
        <p className="text-[11px] sm:text-xs text-text-muted font-body mb-2">
          {product.weight}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2.5 sm:mb-3">
          <div className="stars flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  i < Math.round(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-[11px] sm:text-xs text-text-muted font-body">
            ({product.review_count})
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between gap-1 pt-2.5 border-t border-border-DEFAULT">
          <div className="flex flex-wrap items-baseline gap-1 sm:gap-1.5">
            <span className="font-heading text-sm sm:text-base font-bold text-primary">₹{product.price}</span>
            {product.original_price && (
              <span className="text-[11px] sm:text-xs text-text-muted line-through font-body">
                ₹{product.original_price}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-white flex items-center justify-center transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95 shadow-sm flex-shrink-0"
            aria-label="Add to cart"
            suppressHydrationWarning
          >
            <ShoppingBag size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
