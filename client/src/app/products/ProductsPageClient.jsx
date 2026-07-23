"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, Leaf, Star, ShieldCheck } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import ProductCard from "@/components/ui/ProductCard";
import { useStagger } from "@/lib/gsap";
import { useGetProductsQuery, useGetPublicCategoriesQuery } from "@/store/api/apiSlice";

const STATIC_CATEGORIES = [
  "All",
  "Dry Fruits & Seeds",
  "Oils & Ghee",
  "Tea, Coffee & Beverages",
  "Atta, Rice & Dal",
  "Masala, Spices & Salt",
  "Breakfast Essentials",
  "Sauces & Spreads",
];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating" },
  { label: "Popularity", value: "popularity" },
];

const SLUG_MAP = {
  "Dry Fruits & Seeds": "dry-fruits-seeds",
  "Oils & Ghee": "oils-ghee",
  "Tea, Coffee & Beverages": "tea-coffee-beverages",
  "Atta, Rice & Dal": "atta-rice-dal",
  "Masala, Spices & Salt": "masala-spices-salt",
  "Breakfast Essentials": "breakfast-essentials",
  "Sauces & Spreads": "sauces-instant-foods",
};

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams ? searchParams.get("category") : null;

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const gridRef = useStagger(".product-card", { stagger: 0.06 });
  // Price and Rating filters
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [minRating, setMinRating] = useState(0);

  const { data: serverCategories, isSuccess: catsSuccess } = useGetPublicCategoriesQuery();

  useEffect(() => {
    if (urlCategory) {
      if (serverCategories && serverCategories.length > 0) {
        const match = serverCategories.find(
          (c) => c.slug === urlCategory || c.name.toLowerCase() === urlCategory.toLowerCase()
        );
        if (match) {
          setSelectedCategory(match.name);
          return;
        }
      }
      const entry = Object.entries(SLUG_MAP).find(([name, slug]) => slug === urlCategory);
      if (entry) {
        setSelectedCategory(entry[0]);
      } else {
        setSelectedCategory(urlCategory);
      }
    }
  }, [urlCategory, serverCategories]);

  // Build query params for RTK
  const productParams = {};
  if (search) productParams.search = search;
  if (selectedCategory !== "All") {
    productParams.category =
      SLUG_MAP[selectedCategory] || selectedCategory.toLowerCase();
  }
  if (sortBy === "price_asc") productParams.sort = "price";
  if (sortBy === "price_desc") productParams.sort = "-price";
  if (sortBy === "rating") productParams.sort = "-rating";
  if (sortBy === "popularity") productParams.sort = "-popularity";

  const { data: serverCategories, isSuccess: catsSuccess } = useGetPublicCategoriesQuery();
  const { data: serverProducts, isLoading: loading, isError: productsError } = useGetProductsQuery(productParams);

  const categories = catsSuccess && serverCategories?.length > 0
    ? ["All", ...serverCategories.map((cat) => cat.name)]
    : STATIC_CATEGORIES;

  const rawProducts = (() => {
    if (Array.isArray(serverProducts)) {
      return serverProducts.map((p) => ({
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
    }
    return [];
  })();

  // Compute final filtered results client-side for ultra-reactive updates on sliders
  const filtered = rawProducts.filter((p) => {
    const matchPrice = p.price >= minPrice && p.price <= maxPrice;
    const matchRating = p.rating >= minRating;
    return matchPrice && matchRating;
  });

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: "110px" }}>
        {/* Page Header */}
        <div className="py-10 md:py-14 bg-background border-b border-border-DEFAULT">
          <div className="container-luxury text-center">
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-accent-DEFAULT/40 shadow-sm backdrop-blur-md mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-DEFAULT opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-DEFAULT"></span>
              </span>
              <ShieldCheck size={14} className="text-accent-DEFAULT" />
              <span className="text-xs font-button font-extrabold text-primary-DEFAULT uppercase tracking-widest">
                Premium Organic Store
              </span>
            </div>

            {/* Heading & Subtitle */}
            <div className="max-w-xl mx-auto">
              <h1
                className="font-heading text-primary-DEFAULT mb-2"
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
                  fontWeight: 700,
                }}
              >
                All Products
              </h1>
              <div className="section-divider mx-auto my-3" />
              <p className="text-text-muted font-body text-sm md:text-base">
                Discover our full collection of natural, premium dry fruits & nuts ({filtered.length} items found)
              </p>
            </div>

            {/* Centered Search Bar directly below Heading */}
            <div className="relative max-w-md md:max-w-lg mx-auto mt-6 md:mt-8">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-DEFAULT"
              />
              <input
                type="search"
                placeholder="Search premium almonds, cashews, raisins, pistachios..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-border-DEFAULT bg-white font-body text-sm outline-none focus:border-accent-DEFAULT focus:ring-4 focus:ring-accent-DEFAULT/10 shadow-card transition-all duration-300"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface text-text-muted hover:text-primary-DEFAULT transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="container-luxury section-padding">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32 space-y-4">
                {/* Categories */}
                <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs">
                  <h3 className="font-heading text-sm font-bold text-primary mb-3.5 flex items-center gap-2">
                    <Leaf size={14} className="text-accent" />
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-body transition-all flex items-center justify-between group/cat ${selectedCategory === cat
                            ? "bg-primary text-white font-semibold"
                            : "text-text-DEFAULT hover:bg-background hover:text-primary"
                          }`}
                      >
                        <span className="truncate">{cat}</span>
                        {selectedCategory !== cat && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/40 opacity-0 group-hover/cat:opacity-100 transition-opacity"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs">
                  <h3 className="font-heading text-sm font-bold text-primary mb-3 flex items-center gap-2">
                    <SlidersHorizontal
                      size={14}
                      className="text-accent"
                    />
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-body">
                      <div className="flex-1">
                        <label className="text-text-muted mb-1 block">
                          Min Price
                        </label>
                        <div className="relative">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted">
                            ₹
                          </span>
                          <input
                            type="number"
                            value={minPrice}
                            onChange={(e) =>
                              setMinPrice(
                                Math.max(0, parseInt(e.target.value) || 0),
                              )
                            }
                            className="w-full pl-6 pr-1.5 py-1.5 rounded-lg border border-border bg-background outline-none text-xs focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="text-text-muted mb-1 block">
                          Max Price
                        </label>
                        <div className="relative">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted">
                            ₹
                          </span>
                          <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) =>
                              setMaxPrice(
                                Math.max(0, parseInt(e.target.value) || 0),
                              )
                            }
                            className="w-full pl-6 pr-1.5 py-1.5 rounded-lg border border-border bg-background outline-none text-xs focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Single Slider handle to control maxPrice */}
                    <div className="space-y-1">
                      <input
                        type="range"
                        min="100"
                        max="2000"
                        step="50"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        className="range range-primary range-xs w-full cursor-pointer"
                      />

                      <div className="flex justify-between text-[10px] text-text-muted font-body">
                        <span>Min: ₹{minPrice}</span>
                        <span>Max: ₹{maxPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs">
                  <h3 className="font-heading text-sm font-bold text-primary mb-3 flex items-center gap-2">
                    <Star size={14} className="text-accent" />
                    Customer Rating
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: "All Ratings", value: 0 },
                      { label: "4.5 ★ & Above", value: 4.5 },
                      { label: "4.0 ★ & Above", value: 4.0 },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setMinRating(opt.value)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-body transition-all flex items-center gap-2 ${minRating === opt.value
                            ? "bg-accent-50 text-primary font-semibold border border-accent/20"
                            : "text-text-DEFAULT hover:bg-background border border-transparent"
                          }`}
                      >
                        <span className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={10}
                              className={
                                opt.value > 0 && i < Math.floor(opt.value)
                                  ? "fill-amber-400 text-amber-400"
                                  : opt.value > 0 && i === Math.floor(opt.value)
                                    ? "fill-amber-400/50 text-amber-400"
                                    : "text-gray-300"
                              }
                            />
                          ))}
                        </span>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs">
                  <h3 className="font-heading text-sm font-bold text-primary mb-3.5">
                    Sort By
                  </h3>
                  <div className="space-y-1">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSortBy(opt.value)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-body transition-all ${sortBy === opt.value
                            ? "bg-[#3D2314] text-white font-semibold"
                            : "text-text-DEFAULT hover:bg-background"
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Premium Category Filter Scroll Bar (Both Desktop and Mobile) */}
              <div className="w-full overflow-x-auto pb-4 mb-8 flex gap-3 scrollbar-thin scroll-smooth">
                {categories.map((cat) => {
                  const categoryImages = {
                    All: "/images/icons/all.png",
                    "Dry Fruits & Seeds":
                      "/images/categories/dry-fruits-seeds.png",
                    "Oils & Ghee": "/images/categories/oils-ghee.png",
                    "Tea, Coffee & Beverages":
                      "/images/categories/tea-coffee-beverages.png",
                    "Atta, Rice & Dal": "/images/categories/atta-rice-dal.png",
                    "Masala, Spices & Salt":
                      "/images/categories/masala-spices-salt.png",
                    "Breakfast Essentials":
                      "/images/categories/breakfast-essentials.png",
                    "Sauces & Spreads":
                      "/images/categories/sauces-instant-foods.png",
                  };

                  const isActive = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border text-sm font-button font-semibold transition-all duration-300 flex-shrink-0 ${isActive
                          ? "bg-[#3D2314] text-white border-[#3D2314] shadow-md shadow-[#3D2314]/25 scale-[1.02]"
                          : "bg-white hover:bg-[#FDFBF7] hover:border-[#D4A95A]/50 text-[#3D2314] border-border"
                        }`}
                    >
                      {cat === "All" ? (
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${isActive ? "bg-white/20 text-white" : "bg-[#D4A95A]/20 text-[#3D2314]"}`}
                        >
                          <Star size={12} className="fill-current" />
                        </div>
                      ) : (
                        <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-border bg-[#FDFBF7]">
                          <Image
                            src={
                              categoryImages[cat] ||
                              "/images/categories/almonds.png"
                            }
                            alt={cat}
                            fill
                            className="object-cover"
                            sizes="24px"
                          />
                        </div>
                      )}
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>

              {filtered.length > 0 ? (
                <div
                  ref={gridRef}
                  className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                >
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mx-auto mb-4">
                    <Search size={28} className="text-text-muted" />
                  </div>
                  <h3 className="font-heading text-xl text-primary mb-2">
                    No products found
                  </h3>
                  <p className="text-text-muted font-body text-sm">
                    Try adjusting your search or category filters
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedCategory("All");
                    }}
                    className="btn-outline-luxury mt-6 text-sm"
                  >
                    <span>Clear Filters</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
