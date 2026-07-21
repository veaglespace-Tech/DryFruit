"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const FALLBACK_POSTS = [
  {
    id: 1,
    title: "Top 5 Health Benefits of Kashmiri Walnuts",
    excerpt: "Discover why Kashmir walnuts are regarded as brain superfoods, packed with rich Omega-3 fatty acids and heart-protective anti-oxidants.",
    created_at: "2026-06-28T00:00:00.000Z",
    read_time: "4 min read",
    category: "Nutrition",
    image: "/images/categories/walnuts.png",
  },
  {
    id: 2,
    title: "How to Store Your Dry Fruits to Maintain Crunch",
    excerpt: "Crunchiness matters. Learn the best moisture-proofing storage secrets to preserve raw nuts quality for more than 12 months.",
    created_at: "2026-06-15T00:00:00.000Z",
    read_time: "3 min read",
    category: "Storage",
    image: "/images/categories/cashews.png",
  },
  {
    id: 3,
    title: "Dates: The Perfect Natural Alternative to Sugar",
    excerpt: "Break your sweet tooth addiction. Find out how Medjool dates satisfy dessert cravings naturally while providing high potassium and iron.",
    created_at: "2026-06-02T00:00:00.000Z",
    read_time: "5 min read",
    category: "Recipes",
    image: "/images/categories/dates.png",
  },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState(FALLBACK_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setBlogs(data.data);
        }
      } catch (err) {
        console.error("Failed to load real blogs from server:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: "110px" }}>
        {/* Header */}
        <div className="py-10 md:py-12 bg-background border-b border-border-DEFAULT">
          <div className="container-luxury">
            <div className="max-w-2xl">
              <span className="text-xs font-button font-bold text-accent-DEFAULT uppercase tracking-widest">
                Learn & Grow
              </span>
              <h1
                className="font-heading text-primary-DEFAULT mt-2 mb-4"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700 }}
              >
                Wellness & Nutrition Blog
              </h1>
              <div className="section-divider mt-3 ml-0" />
              <p className="text-text-muted font-body leading-relaxed text-sm md:text-base">
                Tips, guides, and nutrition insights to help you build healthier
                daily eating habits.
              </p>
            </div>
          </div>
        </div>

        {/* Blog grid */}
        <section className="section-padding bg-surface">
          <div className="container-luxury">
            {loading ? (
              <div className="text-center py-12 text-text-muted font-body text-sm">
                Loading articles...
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {blogs.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white rounded-3xl border border-border-DEFAULT hover:shadow-luxury-lg overflow-hidden flex flex-col transition-all duration-400"
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.image || "/images/categories/walnuts.png"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={post.id === 1}
                      />

                      <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-white/95 text-xxs font-button font-bold text-primary-DEFAULT shadow-sm flex items-center gap-1">
                        <BookOpen size={10} className="text-accent-DEFAULT" />
                        {post.category || "Nutrition"}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xxs font-body text-text-muted">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(post.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.read_time || "4 min read"}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-heading text-lg md:text-xl font-bold text-primary-DEFAULT leading-snug group-hover:text-secondary-DEFAULT transition-colors">
                          {post.title}
                        </h2>

                        {/* Description */}
                        <p className="text-text-muted font-body text-xs md:text-sm leading-relaxed line-clamp-3">
                          {post.excerpt || post.content}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-border-light flex items-center justify-between">
                        <button className="flex items-center gap-1 text-accent-DEFAULT text-xs md:text-sm font-button font-bold group-hover:text-primary-DEFAULT transition-colors">
                          Read Full Article
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
