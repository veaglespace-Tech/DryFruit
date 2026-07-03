import Link from "next/link";
import Image from "next/image";
import { Leaf, ShieldCheck, Award, ArrowRight, Star } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About Our Story | Shreepad Enterprises Premium Dry Fruits",
  description:
    "Learn about the legacy of Shreepad Enterprises. Sourced directly from global orchards, our products are 100% natural, chemical-free, and laboratory tested.",
};

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: "110px" }}>
        {/* Breadcrumb banner */}
        <div className="py-10 md:py-12 bg-[#F5EDE0] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-DEFAULT/10 rounded-full blur-2xl" />
          <div className="container-luxury relative z-10">
            <span className="text-xs font-button font-bold text-accent-DEFAULT uppercase tracking-widest">
              Our Heritage
            </span>
            <h1
              className="font-heading text-primary-DEFAULT mt-2 mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800 }}
            >
              The Shreepad Enterprises Story
            </h1>
            <div className="section-divider mx-auto" />
            <p className="body-lead max-w-xl mx-auto mt-4">
              Cultivating wellness through premium, handpicked, natural dry
              fruits and superfoods.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <section className="section-padding bg-background">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left text */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 rounded-full border border-primary-DEFAULT/10">
                  <Leaf size={14} className="text-accent-DEFAULT" />
                  <span className="text-xs text-primary-DEFAULT font-button font-bold">
                    100% Organic Sourcing
                  </span>
                </div>
                <h2 className="font-heading text-primary-DEFAULT text-2xl md:text-3xl font-bold leading-tight">
                  Sourced Sincerity, Savor Purity.
                </h2>
                <p className="text-text-muted font-body leading-relaxed text-sm md:text-base">
                  At Shreepad Enterprises, we believe premium food is a fundamental human
                  right. Guided by this simplicity, we travel to remote orchards
                  and pristine valleys globally to bring you raw, unprocessed,
                  and highly nutritious dried fruits and nuts.
                </p>
                <p className="text-text-muted font-body leading-relaxed text-sm md:text-base">
                  From sun-drenched California valleys to the rich orchards of
                  Kashmir and the dates of the Middle East, our direct farmer
                  partnership program guarantees sustainable farming methods,
                  fair-trade pricing, and the highest grade selection.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Lab Tested",
                      desc: "SGS/FSSAI certified quality parameters.",
                    },
                    {
                      icon: Award,
                      title: "Premium Grade",
                      desc: "Top-tier sizes and colors sorting.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="p-4 border border-border-light rounded-2xl bg-surface"
                    >
                      <Icon size={20} className="text-accent-DEFAULT mb-2" />
                      <p className="font-heading text-sm font-semibold text-primary-DEFAULT mb-1">
                        {title}
                      </p>
                      <p className="text-xs text-text-muted font-body leading-normal">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Image Mockup */}
              <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-border-DEFAULT shadow-luxury-xl bg-white">
                <Image
                  src="/images/hero/hero-bg.png"
                  alt="Shreepad Enterprises premium orchards"
                  fill
                  className="object-cover"
                />

                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-border-DEFAULT shadow-luxury">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-accent-DEFAULT text-accent-DEFAULT"
                      />
                    ))}
                  </div>
                  <p className="font-heading text-xs md:text-sm text-primary-DEFAULT italic mb-2">
                    &ldquo;Best quality dry fruits I have ever purchased. The
                    cashew W240 size is gigantic and sweet!&rdquo;
                  </p>
                  <p className="text-xxs text-text-muted font-body">
                    — Anita Desai, Food Blogger
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="section-padding bg-primary-DEFAULT text-white text-center relative overflow-hidden">
          <div className="container-luxury relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading text-2xl md:text-4xl font-bold leading-tight">
              Ready to Upgrade Your Snacking Habits?
            </h2>
            <p className="text-white/70 font-body text-sm md:text-base leading-relaxed">
              Explore our selection of California Almonds, Kashmiri Walnuts,
              Medjool Dates, and curated premium blends. Delivered fresh to your
              doorstep.
            </p>
            <div className="flex justify-center pt-2">
              <Link
                href="/products"
                className="btn-accent-luxury group"
              >
                <span className="flex items-center gap-2">
                  Browse Catalog
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
