"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Eye, MessageCircle, Zap, Flame, Award } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { selectIsInWishlist } from "@/store/slices/wishlistSlice";
import toast from "react-hot-toast";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import { getImageUrl } from "@/lib/getImageUrl";

export default function ProductCard({ product }) {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector(selectIsInWishlist(product.id));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const heartRef = useRef(null);
  const cartBtnRef = useRef(null);

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

    // Cart button pop animation
    gsap.fromTo(
      cartBtnRef.current,
      { scale: 0.85 },
      { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" },
    );
    // Card glow ripple
    gsap.fromTo(
      cardRef.current,
      { boxShadow: "0 0 0 3px rgba(212, 169, 90, 0.6)" },
      { boxShadow: "0 4px 24px rgba(107, 62, 38, 0.10)", duration: 0.7, ease: "power2.out" },
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
    gsap.fromTo(
      heartRef.current,
      { scale: 1, rotate: 0 },
      { scale: 1.5, rotate: -15, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 },
    );
    toast.success(isWishlisted ? "Removed from wishlist" : `Added to wishlist! ❤️`);
  };

  const savings = product.original_price ? product.original_price - product.price : 0;

  return (
    <div
      ref={cardRef}
      className="product-card group relative"
      style={{
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1.5px solid rgba(212,169,90,0.12)",
        boxShadow: "0 4px 24px rgba(107,62,38,0.08)",
        transition: "box-shadow 0.4s ease, transform 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        gsap.to(cardRef.current, { y: -6, boxShadow: "0 16px 40px rgba(107,62,38,0.16)", duration: 0.35, ease: "power2.out" });
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        gsap.to(cardRef.current, { y: 0, boxShadow: "0 4px 24px rgba(107,62,38,0.08)", duration: 0.4, ease: "power2.inOut" });
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "1", background: "#FBF5EB" }}>

        {/* Badges */}
        <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 10, display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start" }}>
          {product.discount_percent > 0 && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                background: "rgba(225, 29, 72, 0.92)",
                backdropFilter: "blur(8px)",
                color: "white",
                fontSize: "10px",
                fontWeight: 800,
                padding: "4px 10px",
                borderRadius: "8px",
                fontFamily: "var(--font-button)",
                letterSpacing: "0.06em",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                boxShadow: "0 4px 14px rgba(225, 29, 72, 0.35)",
                textTransform: "uppercase",
              }}
            >
              <Zap size={10} style={{ color: "#FFE4E6" }} />
              -{product.discount_percent}% OFF
            </span>
          )}
          {product.is_best_seller && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                background: "rgba(217, 119, 6, 0.92)",
                backdropFilter: "blur(8px)",
                color: "white",
                fontSize: "10px",
                fontWeight: 800,
                padding: "4px 10px",
                borderRadius: "8px",
                fontFamily: "var(--font-button)",
                letterSpacing: "0.06em",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                boxShadow: "0 4px 14px rgba(217, 119, 6, 0.35)",
                textTransform: "uppercase",
              }}
            >
              <Flame size={11} style={{ color: "#FEF3C7" }} />
              Best Seller
            </span>
          )}
          {product.is_featured && !product.is_best_seller && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                background: "rgba(61, 35, 20, 0.92)",
                backdropFilter: "blur(8px)",
                color: "white",
                fontSize: "10px",
                fontWeight: 800,
                padding: "4px 10px",
                borderRadius: "8px",
                fontFamily: "var(--font-button)",
                letterSpacing: "0.06em",
                border: "1px solid rgba(212, 169, 90, 0.45)",
                boxShadow: "0 4px 14px rgba(61, 35, 20, 0.35)",
                textTransform: "uppercase",
              }}
            >
              <Award size={11} style={{ color: "#D4A95A" }} />
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          ref={heartRef}
          onClick={handleWishlist}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 10,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            transition: "background 0.2s",
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          suppressHydrationWarning
        >
          <Heart
            size={15}
            style={{
              color: isWishlisted ? "#EF4444" : "#6B5B4E",
              fill: isWishlisted ? "#EF4444" : "none",
              transition: "color 0.2s, fill 0.2s",
            }}
          />
        </button>

        {/* Product Image */}
        <Link href={`/products/${product.slug}`} className="relative block w-full h-full">
          <Image
            src={getImageUrl(product.thumbnail, "/images/categories/mixed-nuts.png")}
            alt={product.name}
            fill
            className="object-cover"
            style={{
              transform: isHovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Hover Quick Actions Bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(to top, rgba(61,35,20,0.88) 0%, transparent 100%)",
            padding: "28px 12px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 5,
          }}
        >
          <Link
            href={`/products/${product.slug}`}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              textDecoration: "none",
              transition: "transform 0.2s",
            }}
            aria-label="View product details"
          >
            <Eye size={16} style={{ color: "#3D2314" }} />
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            style={{
              height: "40px",
              padding: "0 16px",
              borderRadius: "100px",
              background: "linear-gradient(135deg, #6B3E26, #A97142)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "white",
              fontSize: "12px",
              fontWeight: 700,
              fontFamily: "var(--font-button)",
              boxShadow: "0 4px 12px rgba(107,62,38,0.4)",
              whiteSpace: "nowrap",
            }}
            aria-label="Add to cart"
            suppressHydrationWarning
          >
            <ShoppingBag size={14} />
            Add to Cart
          </button>
          <a
            href={`https://wa.me/917709747803?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#25D366",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(37,211,102,0.4)",
              textDecoration: "none",
            }}
            aria-label="Inquire on WhatsApp"
          >
            <MessageCircle size={16} style={{ color: "white" }} />
          </a>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: "14px 16px 16px" }}>
        {/* Category + Rating row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
          <Link
            href={`/products?category=${product.category.slug}`}
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#A97142",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontFamily: "var(--font-button)",
              textDecoration: "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {product.category.name}
          </Link>
          {product.rating > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Star size={11} style={{ fill: "#F59E0B", color: "#F59E0B" }} />
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#3D2314", fontFamily: "var(--font-button)" }}>
                {Number(product.rating).toFixed(1)}
              </span>
              {product.review_count > 0 && (
                <span style={{ fontSize: "10px", color: "#8B7355", fontFamily: "var(--font-body)" }}>
                  ({product.review_count})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`} style={{ textDecoration: "none" }}>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "#3D2314",
              marginBottom: "4px",
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              transition: "color 0.2s",
            }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Weight */}
        {product.weight && (
          <p style={{ fontSize: "11px", color: "#8B7355", fontFamily: "var(--font-body)", marginBottom: "10px" }}>
            📦 {product.weight}
          </p>
        )}

        {/* Price Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "10px",
            borderTop: "1px solid rgba(212,169,90,0.15)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
              <span style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.05rem",
                fontWeight: 800,
                color: "#3D2314",
              }}>
                ₹{product.price}
              </span>
              {product.original_price && (
                <span style={{ fontSize: "12px", color: "#9CA3AF", textDecoration: "line-through", fontFamily: "var(--font-body)" }}>
                  ₹{product.original_price}
                </span>
              )}
            </div>
            {savings > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "3px", marginTop: "1px" }}>
                <Zap size={9} style={{ color: "#059669" }} />
                <span style={{ fontSize: "10px", fontWeight: 600, color: "#059669", fontFamily: "var(--font-button)" }}>
                  Save ₹{savings}
                </span>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            ref={cartBtnRef}
            onClick={handleAddToCart}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6B3E26, #A97142)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(107,62,38,0.3)",
              transition: "box-shadow 0.2s",
              flexShrink: 0,
            }}
            aria-label="Add to cart"
            suppressHydrationWarning
          >
            <ShoppingBag size={15} style={{ color: "white" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
