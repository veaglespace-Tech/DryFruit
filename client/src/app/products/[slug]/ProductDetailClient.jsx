"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Star,
  Heart,
  Check,
  MessageCircle,
  RefreshCw,
  Leaf,
  Truck,
  Minus,
  Plus,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import {
  toggleWishlist,
  selectIsInWishlist,
} from "@/store/slices/wishlistSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import toast from "react-hot-toast";
import { useGetProductBySlugQuery } from "@/store/api/apiSlice";
import { getImageUrl } from "@/lib/getImageUrl";

export default function ProductDetailClient({ slug }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("desc");
  const detailsRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: productData, isLoading: queryLoading, isError } = useGetProductBySlugQuery(slug);

  // Process data from RTK Query
  useEffect(() => {
    const processData = () => {
      setLoading(true);
      if (productData && productData.success !== false && !isError) {
        const raw = productData.data;
        const formatted = {
          id: raw.id,
          name: raw.name,
          slug: raw.slug,
          price: Number(raw.price),
          original_price: raw.original_price ? Number(raw.original_price) : undefined,
          discount_percent: raw.discount_percent,
          weight: raw.weight,
          thumbnail: raw.thumbnail || "/images/categories/almonds.png",
          rating: Number(raw.rating),
          review_count: raw.review_count,
          short_description: raw.short_description || "Naturally rich and wholesome organic harvest.",
          description: raw.description || "Premium hand-selected selection directly from organic valley orchards.",
          benefits: Array.isArray(raw.benefits) ? raw.benefits : ["Rich in Nutrients", "Wholesome Goodness"],
          nutrition_facts: raw.nutrition_facts || {
            calories: "500 kcal",
            protein: "15g",
            fat: "45g",
            carbs: "25g",
            fiber: "8g",
          },
          storage_instructions: raw.storage_instructions || "Store in a cool, dry place. Keep in an airtight container once opened.",
          category: raw.category
            ? { name: raw.category.name, slug: raw.category.slug }
            : { name: "Almonds", slug: "almonds" },
        };
        setProduct(formatted);

        if (productData.related && productData.related.length > 0) {
          const relFormatted = productData.related.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: Number(p.price),
            original_price: p.original_price ? Number(p.original_price) : undefined,
            discount_percent: p.discount_percent,
            weight: p.weight,
            thumbnail: p.thumbnail || "/images/categories/almonds.png",
            rating: Number(p.rating),
            review_count: p.review_count,
            category: p.category
              ? { name: p.category.name, slug: p.category.slug }
              : { name: "Almonds", slug: "almonds" },
          }));
          setRelated(relFormatted);
        } else {
          setRelated([]);
        }
      } else if (isError || (productData && productData.success === false)) {
        setProduct(null);
        setRelated([]);
      }
      setLoading(false);
    };

    if (!queryLoading) {
      processData();
    }
  }, [productData, queryLoading, isError, slug]);

  const isWishlisted = useAppSelector(selectIsInWishlist(product?.id || 0));

  useGSAP(
    () => {
      gsap.fromTo(
        ".product-gallery",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      );
      gsap.fromTo(
        ".product-info-panel",
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      );
    },
    { scope: detailsRef },
  );

  if (loading || !product) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary-DEFAULT border-t-transparent animate-spin"></div>
          <p className="font-body text-xs text-text-muted animate-pulse">
            Loading Product Details...
          </p>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        original_price: product.original_price,
        weight: product.weight,
        thumbnail: product.thumbnail,
        quantity: qty,
        category: product.category.name,
      }),
    );
    toast.success(`Added ${qty} x ${product.name} to cart! 🛒`);
  };

  const handleWishlist = () => {
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
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist! ❤️",
    );
  };

  const savings = product.original_price
    ? product.original_price - product.price
    : 0;

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main ref={detailsRef} style={{ paddingTop: "110px" }}>
        {/* Breadcrumb */}
        <div className="bg-background py-5 border-b border-border-DEFAULT">
          <div className="container-luxury">
            <div className="flex items-center gap-2 text-xs md:text-sm font-body text-text-muted">
              <Link
                href="/"
                className="hover:text-primary-DEFAULT transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/products"
                className="hover:text-primary-DEFAULT transition-colors"
              >
                Products
              </Link>
              <span>/</span>
              <Link
                href={`/products?category=${product.category.slug}`}
                className="hover:text-primary-DEFAULT transition-colors capitalize"
              >
                {product.category.name}
              </Link>
              <span>/</span>
              <span className="text-primary-DEFAULT font-semibold line-clamp-1">
                {product.name}
              </span>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Left: Product Images */}
              <div className="product-gallery space-y-4">
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-border-DEFAULT shadow-luxury bg-white">
                  <Image
                    src={getImageUrl(product.thumbnail, "/images/categories/mixed-nuts.png")}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />

                  {product.discount_percent > 0 && (
                    <span className="absolute top-4 left-4 z-10 badge-discount">
                      {product.discount_percent}% OFF
                    </span>
                  )}
                </div>
                {/* Secondary images row mockup */}
                <div className="grid grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`relative aspect-square rounded-xl overflow-hidden border cursor-pointer ${
                        i === 0
                          ? "border-accent-DEFAULT"
                          : "border-border-DEFAULT"
                      }`}
                    >
                      <Image
                        src={getImageUrl(product.thumbnail, "/images/categories/mixed-nuts.png")}
                        alt={`${product.name} view ${i}`}
                        fill
                        className="object-cover opacity-75 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Info Panel */}
              <div className="product-info-panel space-y-6">
                <div>
                  {/* Category */}
                  <span className="text-xs font-button font-bold text-accent-DEFAULT uppercase tracking-widest">
                    {product.category.name}
                  </span>
                  {/* Name */}
                  <h1
                    className="font-heading text-primary-DEFAULT mt-1 mb-3"
                    style={{
                      fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                      fontWeight: 700,
                    }}
                  >
                    {product.name}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < Math.round(product.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-200"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm font-body font-semibold text-text-DEFAULT">
                        {product.rating}
                      </span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-border-DEFAULT" />
                    <span className="text-sm text-text-muted font-body">
                      ({product.review_count} customer reviews)
                    </span>
                  </div>
                </div>

                {/* Price Box */}
                <div className="p-5 rounded-2xl bg-surface border border-border-DEFAULT">
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading text-3xl font-bold text-primary-DEFAULT">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.original_price && (
                      <span className="text-lg text-text-muted line-through font-body">
                        ₹{product.original_price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <p className="text-sm text-green-600 font-button font-semibold mt-1">
                      You save ₹{savings.toLocaleString()} (
                      {product.discount_percent}% off!)
                    </p>
                  )}
                  <p className="text-xs text-text-muted font-body mt-2">
                    Inclusive of all taxes. Free shipping on orders above ₹999.
                  </p>
                </div>

                {/* Short Description */}
                <p className="text-text-DEFAULT font-body leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>

                {/* Benefits Checkmarks */}
                <div className="grid grid-cols-2 gap-3 py-2">
                  {product.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-green-600 font-bold" />
                      </div>
                      <span className="text-xs md:text-sm text-text-DEFAULT font-body">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quantity and Actions */}
                <div className="flex flex-wrap gap-4 items-center pt-2">
                  {/* Qty Selector */}
                  <div className="flex items-center border-2 border-border-DEFAULT rounded-2xl bg-background p-1">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="p-2 text-text-muted hover:text-primary-DEFAULT transition-colors rounded-xl"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 font-button font-bold text-primary-DEFAULT text-base min-w-8 text-center">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="p-2 text-text-muted hover:text-primary-DEFAULT transition-colors rounded-xl"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary-luxury group justify-center py-4"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag size={18} />
                      Add to Cart
                    </span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={handleWishlist}
                    className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-center ${
                      isWishlisted
                        ? "border-red-200 bg-red-50 text-red-500"
                        : "border-border-DEFAULT hover:border-accent-DEFAULT text-text-muted"
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart
                      size={20}
                      className={isWishlisted ? "fill-current" : ""}
                    />
                  </button>
                </div>

                {/* WhatsApp Enquiry Button */}
                <a
                  href={`https://wa.me/917709747803?text=Hi,%20I'm%20interested%20in%20ordering%20${qty}%20x%20${encodeURIComponent(product.name)}%20(${product.weight}).%20Please%20provide%20more%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-green-50 hover:bg-green-100 text-green-700 font-button font-semibold rounded-2xl flex items-center justify-center gap-2 border border-green-200 transition-colors"
                >
                  <MessageCircle size={18} />
                  Inquire on WhatsApp
                </a>

                {/* Delivery & Trust badges */}
                <div className="grid grid-cols-3 gap-2 border-t border-border-DEFAULT pt-6">
                  {[
                    {
                      icon: Truck,
                      title: "Express Shipping",
                      desc: "Pan-India 3-5 days",
                    },
                    {
                      icon: Leaf,
                      title: "100% Organic",
                      desc: "No chemicals or additives",
                    },
                    {
                      icon: RefreshCw,
                      title: "7 Days Return",
                      desc: "Hassle-free refunds",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="text-center p-3 rounded-xl bg-background border border-border-light"
                    >
                      <Icon
                        size={20}
                        className="mx-auto text-primary-DEFAULT mb-2"
                      />
                      <p className="font-button font-bold text-xxs text-text-DEFAULT leading-tight">
                        {title}
                      </p>
                      <p className="font-body text-xxs text-text-muted leading-tight mt-0.5">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Section: Specs Tabs */}
            <div className="mt-16 border-t border-border-DEFAULT pt-12">
              <div className="flex border-b border-border-DEFAULT mb-8 overflow-x-auto">
                {[
                  { id: "desc", label: "Detailed Description" },
                  { id: "nutrition", label: "Nutrition Facts" },
                  { id: "shipping", label: "Storage & Shipping" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 px-6 font-heading text-sm md:text-base font-semibold border-b-2 transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-primary-DEFAULT text-primary-DEFAULT"
                        : "border-transparent text-text-muted hover:text-primary-DEFAULT"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="min-h-48">
                {activeTab === "desc" && (
                  <div className="prose max-w-none text-text-muted font-body text-sm md:text-base space-y-4">
                    <p>{product.description}</p>
                    <p>
                      Our packaging is vacuum-sealed and nitrogen-flushed to
                      preserve maximum shelf life, crisp texture, and raw
                      nutritional integrity. Rich in vitamins, minerals,
                      antioxidants, and trace elements, this makes a delicious
                      healthy snack or raw cooking addition.
                    </p>
                  </div>
                )}

                {activeTab === "nutrition" && (
                  <div className="max-w-md bg-white border border-border-DEFAULT rounded-2xl p-6 shadow-card">
                    <h3 className="font-heading text-base font-bold text-primary-DEFAULT mb-4 border-b border-border-DEFAULT pb-2">
                      Nutritional Value (per 100g)
                    </h3>
                    <div className="space-y-3 font-body text-sm">
                      {Object.entries(product.nutrition_facts).map(
                        ([key, val]) => (
                          <div
                            key={key}
                            className="flex justify-between py-1.5 border-b border-border-light last:border-0 text-text-muted"
                          >
                            <span className="capitalize">{key}</span>
                            <span className="font-semibold text-primary-DEFAULT">
                              {String(val)}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className="prose max-w-none text-text-muted font-body text-sm md:text-base space-y-4">
                    <p>
                      <strong className="text-primary-DEFAULT">
                        Storage Instructions:
                      </strong>{" "}
                      {product.storage_instructions}
                    </p>
                    <p>
                      <strong className="text-primary-DEFAULT">
                        Shipping Details:
                      </strong>{" "}
                      Orders are dispatched within 24 hours of placement.
                      Standard shipping takes 3-5 business days depending on
                      delivery location. Expedited options available at
                      checkout.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Related Products Section */}
            {related.length > 0 && (
              <div className="mt-20">
                <h2 className="font-heading text-primary-DEFAULT text-xl md:text-2xl font-bold mb-8">
                  Related Products
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {related.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
