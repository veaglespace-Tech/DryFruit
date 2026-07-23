"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  Leaf,
  Star,
  ShieldCheck,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  Check,
  Grid,
  ChevronDown,
  Filter,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import ProductCard from "@/components/ui/ProductCard";
import { useStagger } from "@/lib/gsap";
import { useGetProductsQuery, useGetPublicCategoriesQuery } from "@/store/api/apiSlice";
import { getImageUrl } from "@/lib/getImageUrl";

const SORT_OPTIONS = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest Rated", value: "rating" },
  { label: "Most Popular", value: "popularity" },
];

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlCategory = searchParams ? searchParams.get("category") : null;

  // Filters & State
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const gridRef = useStagger(".product-card", { stagger: 0.05 });

  // API Queries
  const { data: serverCategories, isSuccess: catsSuccess } = useGetPublicCategoriesQuery();

  const categoryList = useMemo(() => {
    if (catsSuccess && Array.isArray(serverCategories?.data)) {
      return serverCategories.data;
    }
    if (Array.isArray(serverCategories)) {
      return serverCategories;
    }
    return [];
  }, [serverCategories, catsSuccess]);

  // Sync category with URL
  useEffect(() => {
    if (urlCategory) {
      if (urlCategory.toLowerCase() === "all") {
        setSelectedCategory("All");
        return;
      }
      const match = categoryList.find(
        (c) => c.slug === urlCategory || c.name.toLowerCase() === urlCategory.toLowerCase()
      );
      if (match) {
        setSelectedCategory(match.name);
      } else {
        setSelectedCategory(urlCategory);
      }
    }
  }, [urlCategory, categoryList]);

  // Handle Category Selection & Sync URL
  const handleCategorySelect = (catName, catSlug) => {
    setSelectedCategory(catName);
    if (catName === "All") {
      router.push("/products", { scroll: false });
    } else if (catSlug) {
      router.push(`/products?category=${catSlug}`, { scroll: false });
    }
  };

  // Build RTK Query params
  const productParams = useMemo(() => {
    const params = {};
    if (search) params.search = search;
    if (selectedCategory !== "All") {
      const match = categoryList.find((c) => c.name === selectedCategory);
      params.category = match ? match.slug : selectedCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }
    if (sortBy === "price_asc") params.sort = "price";
    if (sortBy === "price_desc") params.sort = "-price";
    if (sortBy === "rating") params.sort = "-rating";
    if (sortBy === "popularity") params.sort = "-popularity";
    return params;
  }, [search, selectedCategory, categoryList, sortBy]);

  const { data: serverProducts, isLoading: loading, isError: productsError } = useGetProductsQuery(productParams);

  // Format products array
  const rawProducts = useMemo(() => {
    const list = Array.isArray(serverProducts)
      ? serverProducts
      : (Array.isArray(serverProducts?.data) ? serverProducts.data : []);

    return list.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: Number(p.price),
      original_price: p.original_price ? Number(p.original_price) : undefined,
      discount_percent: p.discount_percent,
      weight: p.weight,
      thumbnail: getImageUrl(p.thumbnail, "/images/categories/almonds.png"),
      rating: Number(p.rating),
      review_count: p.review_count,
      category: p.category
        ? { name: p.category.name, slug: p.category.slug }
        : { name: "Organic", slug: "organic" },
    }));
  }, [serverProducts]);

  // Client-side Price and Rating filtering
  const filtered = useMemo(() => {
    return rawProducts.filter((p) => {
      const matchPrice = p.price >= minPrice && p.price <= maxPrice;
      const matchRating = p.rating >= minRating;
      return matchPrice && matchRating;
    });
  }, [rawProducts, minPrice, maxPrice, minRating]);

  // Reset filters
  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortBy("newest");
    setMinPrice(0);
    setMaxPrice(10000);
    setMinRating(0);
    router.push("/products", { scroll: false });
  };

  const hasActiveFilters =
    search !== "" ||
    selectedCategory !== "All" ||
    sortBy !== "newest" ||
    minPrice > 0 ||
    maxPrice < 10000 ||
    minRating > 0;

  return (
    <div className="bg-[#FFFDF9] min-h-screen text-[#3D2314] font-body selection:bg-[#D4A95A]/30">
      <AnnouncementBar />
      <Navbar />

      <main style={{ paddingTop: "110px" }}>
        {/* ── 1. LUXURY HERO BANNER & HEADER ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#2A170C] via-[#3D2314] to-[#25130A] text-white py-14 lg:py-20 shadow-2xl">
          {/* Subtle Background Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4A95A]/25 via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D4A95A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container-luxury relative z-10 text-center">
            {/* Top Quality Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4A95A]/40 backdrop-blur-md mb-4 shadow-lg">
              <Sparkles size={14} className="text-[#D4A95A]" />
              <span className="text-xs font-button font-bold text-[#E8C88A] uppercase tracking-widest">
                100% Pure & Farm-Fresh Harvest
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3 drop-shadow-md">
              Gourmet Pantry Collection
            </h1>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-[#E2D5C7] font-body leading-relaxed mb-8">
              Explore our hand-selected catalog of premium organic dry fruits, nutrient-dense nuts, cold-pressed oils, and artisanal kitchen essentials.
            </p>

            {/* Floating Luxury Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="relative flex items-center bg-white/95 rounded-2xl p-1.5 border-2 border-[#D4A95A]/50 shadow-2xl backdrop-blur-xl focus-within:border-[#D4A95A] transition-all duration-300">
                <Search size={22} className="ml-4 text-[#3D2314]/60 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search almonds, cashews, saffron, organic ghee..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm text-[#3D2314] font-body placeholder-[#6B5B4E]/60 bg-transparent outline-none"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="p-2 rounded-xl text-[#3D2314]/50 hover:bg-[#FDF9F3] hover:text-[#3D2314] transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#3D2314] text-[#D4A95A] rounded-xl text-xs font-button font-bold flex-shrink-0 shadow-sm">
                  <span>{filtered.length} Items</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. DYNAMIC STICKY CATEGORY CAPSULE BAR ── */}
        <section className="sticky top-[110px] z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#D4A95A]/20 py-4 shadow-sm">
          <div className="container-luxury">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1 px-1">
              {/* "All Products" Button */}
              <button
                onClick={() => handleCategorySelect("All", null)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-button font-bold transition-all duration-300 flex-shrink-0 border ${
                  selectedCategory === "All"
                    ? "bg-[#3D2314] text-white border-[#3D2314] shadow-md shadow-[#3D2314]/20 scale-[1.03]"
                    : "bg-white text-[#3D2314] border-[#D4A95A]/30 hover:border-[#D4A95A] hover:bg-[#FDF9F3]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    selectedCategory === "All" ? "bg-[#D4A95A] text-[#3D2314]" : "bg-[#FDF9F3] text-[#3D2314]"
                  }`}
                >
                  <Grid size={13} />
                </div>
                <span>All Products</span>
              </button>

              {/* Dynamic Categories */}
              {categoryList.map((cat) => {
                const isActive = selectedCategory === cat.name;
                const catImg = getImageUrl(cat.image, "/images/categories/dry-fruits-seeds.png");

                return (
                  <button
                    key={cat.id || cat.slug}
                    onClick={() => handleCategorySelect(cat.name, cat.slug)}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-button font-semibold transition-all duration-300 flex-shrink-0 border ${
                      isActive
                        ? "bg-[#3D2314] text-[#E8C88A] border-[#3D2314] shadow-md shadow-[#3D2314]/20 scale-[1.03]"
                        : "bg-white text-[#3D2314] border-[#D4A95A]/30 hover:border-[#D4A95A] hover:bg-[#FDF9F3]"
                    }`}
                  >
                    <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-[#D4A95A]/30 bg-[#FDF9F3] flex-shrink-0">
                      <Image
                        src={catImg}
                        alt={cat.name}
                        fill
                        className="object-cover"
                        sizes="28px"
                      />
                    </div>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. MAIN CATALOG AREA WITH FILTERS & GRID ── */}
        <section className="container-luxury py-8 lg:py-12">
          {/* Active Filter Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-white border border-[#D4A95A]/25 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-button font-bold text-[#6B5B4E] uppercase tracking-wider flex items-center gap-1.5 mr-2">
                <SlidersHorizontal size={14} className="text-[#D4A95A]" />
                Filters:
              </span>

              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#3D2314] text-white text-xs font-button font-semibold">
                  Category: {selectedCategory}
                  <button onClick={() => handleCategorySelect("All", null)}>
                    <X size={13} className="hover:text-[#D4A95A]" />
                  </button>
                </span>
              )}

              {search && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FDF9F3] border border-[#D4A95A]/40 text-[#3D2314] text-xs font-button">
                  Search: "{search}"
                  <button onClick={() => setSearch("")}>
                    <X size={13} className="hover:text-red-500" />
                  </button>
                </span>
              )}

              {minRating > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FDF9F3] border border-[#D4A95A]/40 text-[#3D2314] text-xs font-button">
                  Rating: {minRating}+ ★
                  <button onClick={() => setMinRating(0)}>
                    <X size={13} className="hover:text-red-500" />
                  </button>
                </span>
              )}

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-xs font-button text-red-600 hover:text-red-700 font-bold ml-2 underline underline-offset-2"
                >
                  <RotateCcw size={12} />
                  Reset All
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-xs font-button text-[#6B5B4E] font-medium hidden sm:inline">
                Sort By:
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-9 py-2 rounded-xl bg-[#FDF9F3] border border-[#D4A95A]/40 text-xs font-button font-bold text-[#3D2314] outline-none cursor-pointer hover:border-[#D4A95A] transition-colors"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ArrowUpDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D2314]/60 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-8 items-start">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-36">
              <div className="space-y-6">
                {/* Price Range Filter Box */}
                <div className="p-5 rounded-2xl bg-white border border-[#D4A95A]/25 shadow-sm space-y-4">
                  <h3 className="font-heading text-sm font-bold text-[#3D2314] flex items-center gap-2 border-b border-[#D4A95A]/15 pb-2.5">
                    <SlidersHorizontal size={15} className="text-[#D4A95A]" />
                    Price Range (₹)
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-xs font-body">
                    <div>
                      <span className="text-[#6B5B4E] text-[11px] block mb-1">Min Price</span>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D4A95A]/30 bg-[#FDF9F3] text-xs outline-none focus:border-[#D4A95A]"
                      />
                    </div>
                    <div>
                      <span className="text-[#6B5B4E] text-[11px] block mb-1">Max Price</span>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D4A95A]/30 bg-[#FDF9F3] text-xs outline-none focus:border-[#D4A95A]"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full accent-[#3D2314] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-body text-[#6B5B4E]">
                    <span>₹0</span>
                    <span>₹{maxPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Rating Filter Box */}
                <div className="p-5 rounded-2xl bg-white border border-[#D4A95A]/25 shadow-sm space-y-3">
                  <h3 className="font-heading text-sm font-bold text-[#3D2314] flex items-center gap-2 border-b border-[#D4A95A]/15 pb-2.5">
                    <Star size={15} className="text-[#D4A95A]" />
                    Customer Rating
                  </h3>
                  <div className="space-y-1.5">
                    {[
                      { label: "All Ratings", value: 0 },
                      { label: "4.5 ★ & Above", value: 4.5 },
                      { label: "4.0 ★ & Above", value: 4.0 },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setMinRating(opt.value)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-button font-semibold transition-all flex items-center justify-between ${
                          minRating === opt.value
                            ? "bg-[#3D2314] text-white"
                            : "bg-[#FDF9F3] text-[#3D2314] hover:bg-[#D4A95A]/15"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {minRating === opt.value && <Check size={14} className="text-[#D4A95A]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[3/4] rounded-3xl bg-white border border-[#D4A95A]/20 p-4 animate-pulse space-y-4"
                    >
                      <div className="w-full h-44 rounded-2xl bg-[#FDF9F3]" />
                      <div className="h-4 bg-[#FDF9F3] rounded-md w-3/4" />
                      <div className="h-4 bg-[#FDF9F3] rounded-md w-1/2" />
                    </div>
                  ))}
                </div>
              ) : filtered.length > 0 ? (
                <div
                  ref={gridRef}
                  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                >
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white border border-[#D4A95A]/25 rounded-3xl p-8 shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-[#FDF9F3] border border-[#D4A95A]/30 flex items-center justify-center mx-auto mb-4 text-[#D4A95A]">
                    <Search size={32} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-[#3D2314] mb-2">
                    No Gourmet Products Found
                  </h3>
                  <p className="text-[#6B5B4E] font-body text-sm max-w-md mx-auto mb-6">
                    We couldn't find any products matching your current filters or category selection. Try resetting filters to explore all items.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-3 rounded-2xl bg-[#3D2314] text-white font-button font-bold text-xs uppercase tracking-widest hover:bg-[#25130A] transition-all shadow-md"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
