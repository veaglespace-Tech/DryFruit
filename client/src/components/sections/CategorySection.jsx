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
    name: "Dry Fruits & Seeds",
    slug: "dry-fruits-seeds",
    description: "Premium Dry Fruits, Nuts & Seeds",
    image: "/images/categories/dry-fruits-seeds.png",
    count: "18 Products",
    color: "#F0DCCC",
  },
  {
    name: "Oils & Ghee",
    slug: "oils-ghee",
    description: "Cold-Pressed Oils & Cow Ghee",
    image: "/images/categories/oils-ghee.png",
    count: "3 Products",
    color: "#F4E4CE",
  },
  {
    name: "Tea, Coffee & Beverages",
    slug: "tea-coffee-beverages",
    description: "Premium Teas & Gourmet Coffees",
    image: "/images/categories/tea-coffee-beverages.png",
    count: "3 Products",
    color: "#E8F5E9",
  },
  {
    name: "Atta, Rice & Dal",
    slug: "atta-rice-dal",
    description: "Chakki Atta, Basmati Rice & Dals",
    image: "/images/categories/atta-rice-dal.png",
    count: "3 Products",
    color: "#FBF4EC",
  },
  {
    name: "Masala, Spices & Salt",
    slug: "masala-spices-salt",
    description: "Salem Haldi, Chilli Powder & Salts",
    image: "/images/categories/masala-spices-salt.png",
    count: "3 Products",
    color: "#FFF3E0",
  },
  {
    name: "Breakfast Essentials",
    slug: "breakfast-essentials",
    description: "Millet Muesli & Ragi Cereals",
    image: "/images/categories/breakfast-essentials.png",
    count: "2 Products",
    color: "#FCE4EC",
  },
  {
    name: "Sauces & Spreads",
    slug: "sauces-instant-foods",
    description: "Ready-to-Eat Gravies & Pastes",
    image: "/images/categories/sauces-instant-foods.png",
    count: "2 Products",
    color: "#F3E5F5",
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

        {/* Circular Category Grid (Decorative & Classic) */}
        <div
          ref={gridRef}
          className="flex overflow-x-auto md:grid md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 pb-6 justify-start md:justify-center scrollbar-thin scroll-smooth"
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="category-item-anim group flex flex-col items-center text-center flex-shrink-0 w-32 sm:w-36 md:w-auto"
              aria-label={`Browse ${cat.name}`}
            >
              {/* Outer circular stamp border with gold offset shadow */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-[#3D2314] bg-[#FDFBF7] flex items-center justify-center overflow-hidden transition-all duration-300 shadow-[6px_6px_0px_#D4A95A] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-[2px_2px_0px_#D4A95A]">
                {/* Inner dotted decorative ring */}
                <div className="absolute inset-2 rounded-full border border-dashed border-[#D4A95A]/60 pointer-events-none" />

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
              <h3 className="font-heading text-xs sm:text-sm md:text-base font-bold text-[#3D2314] mt-4 mb-0.5 group-hover:text-[#D4A95A] transition-colors duration-200">
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
