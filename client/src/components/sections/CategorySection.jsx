"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitText, useStagger } from "@/lib/gsap";
import { useGetPublicCategoriesQuery } from "@/store/api/apiSlice";

gsap.registerPlugin(ScrollTrigger);

const STATIC_CATEGORIES = [
  {
    name: "Almonds",
    slug: "almonds",
    description: "Premium California & Irani Almonds",
    image: "/images/categories/almonds.png",
    count: "Explore Collection",
    color: "#F0DCCC",
  },
  {
    name: "Cashews",
    slug: "cashews",
    description: "Creamy Whole Konkan Cashews",
    image: "/images/categories/cashews.png",
    count: "Explore Collection",
    color: "#F4E4CE",
  },
  {
    name: "Pistachios",
    slug: "pistachios",
    description: "Roasted & Salted Iranian Pistachios",
    image: "/images/categories/pistachios.png",
    count: "Explore Collection",
    color: "#E8F5E9",
  },
  {
    name: "Walnuts",
    slug: "walnuts",
    description: "Omega-3 Rich Kashmiri Walnut Kernels",
    image: "/images/categories/walnuts.png",
    count: "Explore Collection",
    color: "#FBF4EC",
  },
  {
    name: "Dates",
    slug: "dates",
    description: "Royal Medjool & Madinah Ajwa Dates",
    image: "/images/categories/dates.png",
    count: "Explore Collection",
    color: "#FFF3E0",
  },
  {
    name: "Raisins",
    slug: "raisins",
    description: "Golden Afghan & Black Kishmish",
    image: "/images/categories/raisins.png",
    count: "Explore Collection",
    color: "#FCE4EC",
  },
  {
    name: "Mixed Nuts",
    slug: "mixed-nuts",
    description: "Luxury Roasted Nut & Seed Blends",
    image: "/images/categories/mixed-nuts.png",
    count: "Explore Collection",
    color: "#F3E5F5",
  },
  {
    name: "Dried Berries",
    slug: "dried-berries",
    description: "Antioxidant Superfood Cranberries & Blueberries",
    image: "/images/categories/dried-berries.png",
    count: "Explore Collection",
    color: "#FCE4EC",
  },
];

export default function CategorySection() {
  const sectionRef = useRef(null);
  const titleRef = useSplitText({ delay: 0.1 });
  const gridRef = useStagger(".category-item-anim", { stagger: 0.08 });
  const [categories, setCategories] = useState(STATIC_CATEGORIES);
  const { data: serverCategories, isSuccess, isError } = useGetPublicCategoriesQuery();

  useEffect(() => {
    if (isSuccess && serverCategories && serverCategories.length > 0) {
      const colors = [
        "#F0DCCC",
        "#F4E4CE",
        "#E8F5E9",
        "#FBF4EC",
        "#FFF3E0",
        "#FCE4EC",
        "#F3E5F5",
        "#FCE4EC",
      ];
      const formatted = serverCategories.map((cat, index) => ({
        name: cat.name,
        slug: cat.slug,
        description: cat.description || "Premium handpicked collection",
        image: cat.image || `/images/categories/${cat.slug}.png`,
        count:
          cat.product_count !== undefined
            ? `${cat.product_count} Products`
            : "View Products",
        color: colors[index % colors.length],
      }));
      setCategories(formatted);
    } else if (isError) {
      setCategories(STATIC_CATEGORIES);
    }
  }, [serverCategories, isSuccess, isError]);

  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-border-DEFAULT mb-4">
            <span className="text-primary-DEFAULT text-xs font-button font-semibold uppercase tracking-widest">
              Browse Categories
            </span>
          </div>
          <h2
            ref={titleRef}
            className="font-heading text-primary-DEFAULT mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            Shop By Category
          </h2>
          <div className="section-divider mx-auto" />
          <p className="body-lead max-w-2xl mx-auto mt-4">
            Explore our curated collection of premium dry fruits and nuts,
            sourced from the finest farms across the globe.
          </p>
        </div>

        {/* Circular Category Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 justify-items-center"
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="category-item-anim group flex flex-col items-center text-center w-full max-w-[160px]"
              aria-label={`Browse ${cat.name}`}
            >
              {/* Outer circular stamp border with gold offset shadow */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-4 border-[#3D2314] bg-[#FDFBF7] flex items-center justify-center overflow-hidden transition-all duration-300 shadow-[4px_4px_0px_#D4A95A] sm:shadow-[6px_6px_0px_#D4A95A] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-[2px_2px_0px_#D4A95A]">
                {/* Inner dotted decorative ring */}
                <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-dashed border-[#D4A95A]/60 pointer-events-none" />

                {/* Product Image */}
                <div className="relative w-[75%] h-[75%] rounded-full overflow-hidden bg-white/40">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="category-image object-cover transition-transform duration-500 group-hover:scale-115"
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                </div>
              </div>

              {/* Title & Count */}
              <h3 className="font-heading text-xs sm:text-sm md:text-base font-bold text-[#3D2314] mt-3 sm:mt-4 mb-0.5 group-hover:text-[#D4A95A] transition-colors duration-200">
                {cat.name}
              </h3>
              <p className="text-text-muted text-[10px] md:text-xs font-body font-medium">
                {cat.count}
              </p>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link href="/categories" className="btn-outline-luxury inline-flex">
            <span>View All Categories</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
