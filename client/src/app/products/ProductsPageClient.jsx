"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X, Leaf, Star } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import ProductCard from "@/components/ui/ProductCard";
import { useStagger } from "@/lib/gsap";
import { publicApi } from "@/lib/api";

const STATIC_PRODUCTS = [
  {
    id: 1,
    name: "Premium California Almonds",
    slug: "premium-california-almonds",
    price: 599,
    original_price: 799,
    discount_percent: 25,
    weight: "500g",
    thumbnail: "/images/categories/almonds.png",
    rating: 4.8,
    review_count: 247,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Dry Fruits & Seeds", slug: "dry-fruits-seeds" },
  },
  {
    id: 2,
    name: "Whole Cashews W240 Grade",
    slug: "whole-cashews-w240",
    price: 799,
    original_price: 999,
    discount_percent: 20,
    weight: "500g",
    thumbnail: "/images/categories/cashews.png",
    rating: 4.9,
    review_count: 189,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Dry Fruits & Seeds", slug: "dry-fruits-seeds" },
  },
  {
    id: 3,
    name: "Tata Sampann Premium Pure Cow Ghee 1L",
    slug: "tata-sampann-cow-ghee-1l",
    price: 649,
    original_price: 720,
    discount_percent: 10,
    weight: "1L",
    thumbnail: "/images/categories/oils-ghee.png",
    rating: 4.9,
    review_count: 231,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Oils & Ghee", slug: "oils-ghee" },
  },
  {
    id: 4,
    name: "Tata Tea Gold Premium Leaf Tea 1kg",
    slug: "tata-tea-gold-1kg",
    price: 449,
    original_price: 520,
    discount_percent: 13,
    weight: "1kg",
    thumbnail: "/images/categories/tea-coffee-beverages.png",
    rating: 4.8,
    review_count: 312,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Tea, Coffee & Beverages", slug: "tea-coffee-beverages" },
  },
  {
    id: 5,
    name: "Tata Sampann Premium Toor Dal (Arhar) 1kg",
    slug: "tata-sampann-toor-dal-1kg",
    price: 189,
    original_price: 220,
    discount_percent: 14,
    weight: "1kg",
    thumbnail: "/images/categories/atta-rice-dal.png",
    rating: 4.8,
    review_count: 289,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Atta, Rice & Dal", slug: "atta-rice-dal" },
  },
  {
    id: 6,
    name: "Tata Sampann Turmeric Powder (Haldi) 500g",
    slug: "tata-sampann-turmeric-500g",
    price: 129,
    original_price: 160,
    discount_percent: 19,
    weight: "500g",
    thumbnail: "/images/categories/masala-spices-salt.png",
    rating: 4.8,
    review_count: 222,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Masala, Spices & Salt", slug: "masala-spices-salt" },
  },
  {
    id: 7,
    name: "Tata Soulfull Fruit & Nut Millet Muesli 400g",
    slug: "tata-soulfull-muesli-400g",
    price: 249,
    original_price: 299,
    discount_percent: 16,
    weight: "400g",
    thumbnail: "/images/categories/breakfast-essentials.png",
    rating: 4.8,
    review_count: 134,
    is_featured: true,
    is_best_seller: true,
    category: { name: "Breakfast Essentials", slug: "breakfast-essentials" },
  },
  {
    id: 8,
    name: "Tata Sampann Yumside Paneer Butter Masala 300g",
    slug: "tata-sampann-paneer-butter-masala-300g",
    price: 129,
    original_price: 149,
    discount_percent: 13,
    weight: "300g",
    thumbnail: "/images/categories/sauces-instant-foods.png",
    rating: 4.7,
    review_count: 112,
    is_featured: true,
    is_best_seller: false,
    category: { name: "Sauces & Spreads", slug: "sauces-instant-foods" },
  },
];

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

export default function ProductsPageClient() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const gridRef = useStagger(".product-card", { stagger: 0.06 });

  const [categories, setCategories] = useState(STATIC_CATEGORIES);
  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Price and Rating filters
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [minRating, setMinRating] = useState(0);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await publicApi.getCategories();
        if (res.data && res.data.length > 0) {
          const names = ["All", ...res.data.map((cat) => cat.name)];
          setCategories(names);
        }
      } catch (err) {
        console.error("Failed to load filter categories:", err);
      }
    };
    loadCategories();
  }, []);

  // Load products from DB
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (selectedCategory !== "All") {
          const slugMap = {
            "Dry Fruits & Seeds": "dry-fruits-seeds",
            "Oils & Ghee": "oils-ghee",
            "Tea, Coffee & Beverages": "tea-coffee-beverages",
            "Atta, Rice & Dal": "atta-rice-dal",
            "Masala, Spices & Salt": "masala-spices-salt",
            "Breakfast Essentials": "breakfast-essentials",
            "Sauces & Spreads": "sauces-instant-foods",
          };
          params.category =
            slugMap[selectedCategory] || selectedCategory.toLowerCase();
        }
        if (sortBy === "price_asc") params.sort = "price";
        if (sortBy === "price_desc") params.sort = "-price";
        if (sortBy === "rating") params.sort = "-rating";
        if (sortBy === "popularity") params.sort = "-popularity";

        const res = await publicApi.getProducts(params);
        if (res.data && res.data.length > 0) {
          const formatted = res.data.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: Number(p.price),
            original_price: p.original_price
              ? Number(p.original_price)
              : undefined,
            discount_percent: p.discount_percent,
            weight: p.weight,
            thumbnail: p.thumbnail || "/images/categories/almonds.png",
            rating: Number(p.rating),
            review_count: p.review_count,
            category: p.category
              ? { name: p.category.name, slug: p.category.slug }
              : { name: "Almonds", slug: "almonds" },
          }));
          setRawProducts(formatted);
        } else {
          setRawProducts(filterAndSortStatic());
        }
      } catch (err) {
        console.error(
          "Failed to load products from database, fallback to static:",
          err,
        );
        setRawProducts(filterAndSortStatic());
      } finally {
        setLoading(false);
      }
    };

    const filterAndSortStatic = () => {
      let filtered = STATIC_PRODUCTS.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCat =
          selectedCategory === "All" || p.category.name === selectedCategory;
        return matchSearch && matchCat;
      });
      return [...filtered].sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "popularity") return b.review_count - a.review_count;
        return b.id - a.id;
      });
    };

    const delayDebounce = setTimeout(() => {
      loadProducts();
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [search, selectedCategory, sortBy]);

  // Compute final filtered results client-side for ultra-reactive updates on sliders
  let filtered = rawProducts.filter((p) => {
    const matchPrice = p.price >= minPrice && p.price <= maxPrice;
    const matchRating = p.rating >= minRating;
    return matchPrice && matchRating;
  });

  // Fallback to statically filtered lists if offline or DB is empty
  if (rawProducts.length === 0 && !loading) {
    filtered = STATIC_PRODUCTS.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        selectedCategory === "All" || p.category.name === selectedCategory;
      const matchPrice = p.price >= minPrice && p.price <= maxPrice;
      const matchRating = p.rating >= minRating;
      return matchSearch && matchCat && matchPrice && matchRating;
    });
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: "110px" }}>
        {/* Page Header */}
        <div className="py-10 md:py-12 bg-background border-b border-border">
          <div className="container-luxury">
            <div className="flex items-center gap-2 text-sm font-body text-text-muted mb-4">
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="text-primary font-semibold">
                Products
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1
                  className="font-heading text-primary mb-2"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 700,
                  }}
                >
                  All Products
                </h1>
                <p className="text-text-muted font-body">
                  {filtered.length} products found
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border bg-surface font-body text-sm outline-none focus:border-accent transition-colors"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X size={16} className="text-text-muted" />
                  </button>
                )}
              </div>
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
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-body transition-all flex items-center justify-between group/cat ${
                          selectedCategory === cat
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
                            className="w-full pl-6 pr-1.5 py-1.5 rounded-lg border border-border bg-background outline-none text-xs"
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
                            className="w-full pl-6 pr-1.5 py-1.5 rounded-lg border border-border bg-background outline-none text-xs"
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
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-body transition-all flex items-center gap-2 ${
                          minRating === opt.value
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
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-body transition-all ${
                          sortBy === opt.value
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
                      className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border text-sm font-button font-semibold transition-all duration-300 flex-shrink-0 ${
                        isActive
                          ? "bg-[#3D2314] text-white border-[#3D2314] shadow-md shadow-[#3D2314]/25 scale-102"
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
