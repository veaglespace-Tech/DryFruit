import Link from "next/link";
import Image from "next/image";
import {
  Leaf,
  ShieldCheck,
  Award,
  ArrowRight,
  Star,
  Sparkles,
  CheckCircle2,
  Globe,
  HeartHandshake,
  PackageCheck,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About Our Story | Shreepad Enterprises Premium Dry Fruits",
  description:
    "Learn about the legacy of Shreepad Enterprises. Sourced directly from global orchards, our products are 100% natural, chemical-free, and laboratory tested.",
};

const STATS = [
  { value: "100%", label: "Farm Direct Sourcing" },
  { value: "250+", label: "Premium Varieties" },
  { value: "10,000+", label: "Happy Customer Families" },
  { value: "0%", label: "Chemicals & Pesticides" },
];

const VALUES = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Uncompromising Purity",
    desc: "Every batch of almonds, cashews, and walnuts undergoes rigorous FSSAI & SGS certified quality testing before reaching your kitchen.",
    tag: "LAB TESTED",
  },
  {
    number: "02",
    icon: Globe,
    title: "Direct Orchard Sourcing",
    desc: "We partner directly with organic farmers in California, Kashmir, and Middle East to guarantee ethical sourcing and top-tier grading.",
    tag: "GLOBAL ORIGIN",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "Cold-Sealed Freshness",
    desc: "Packed in multi-layer oxygen-barrier nitrogen bags to preserve natural crunch, sweetness, and essential nutrients.",
    tag: "VACUUM SEALED",
  },
];

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main style={{ paddingTop: "90px", background: "#FFFDF8" }}>
        
        {/* ── 1. Hero Heritage Section ── */}
        <section
          style={{
            position: "relative",
            background: "linear-gradient(135deg, #3D2314 0%, #25130A 60%, #170B05 100%)",
            color: "#FFFDF8",
            padding: "clamp(60px, 8vw, 100px) 0 clamp(50px, 6vw, 80px)",
            borderBottom: "2px solid rgba(212, 169, 90, 0.4)",
            overflow: "hidden",
          }}
        >
          {/* Top Metallic Gold Accent Line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #6B3E26 0%, #D4A95A 50%, #F59E0B 100%)",
            }}
          />

          {/* Ambient Gold Glows */}
          <div
            style={{
              position: "absolute",
              top: "-10%",
              right: "10%",
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, rgba(212, 169, 90, 0.15) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          <div className="container-luxury relative z-10 text-center">
            {/* Header Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 18px",
                borderRadius: "100px",
                background: "rgba(212, 169, 90, 0.15)",
                border: "1px solid rgba(212, 169, 90, 0.4)",
                color: "#D4A95A",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              <Sparkles size={13} style={{ color: "#D4A95A" }} />
              <span>Our Heritage & Legacy</span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
                fontWeight: 900,
                background: "linear-gradient(135deg, #FFFDF8 0%, #D4A95A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.15,
                margin: "0 auto 18px",
                maxWidth: "900px",
              }}
            >
              The Shreepad Enterprises Story
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "rgba(255, 253, 248, 0.88)",
                maxWidth: "680px",
                margin: "0 auto 40px",
                lineHeight: 1.6,
              }}
            >
              Cultivating wellness through premium, handpicked, 100% natural dry fruits & organic superfoods direct from pristine global orchards.
            </p>

            {/* Quick Heritage Stats Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "16px",
                maxWidth: "850px",
                margin: "0 auto",
              }}
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    padding: "20px 16px",
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(212, 169, 90, 0.3)",
                    backdropFilter: "blur(10px)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      color: "#D4A95A",
                      lineHeight: 1,
                      marginBottom: "6px",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      color: "rgba(255, 255, 255, 0.75)",
                      fontWeight: 600,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. Narrative Section ("Sourced Sincerity, Savor Purity") ── */}
        <section style={{ padding: "clamp(60px, 8vw, 100px) 0", background: "#FFFDF8" }}>
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Narrative Copy */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 14px",
                    borderRadius: "100px",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    color: "#059669",
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    width: "fit-content",
                  }}
                >
                  <Leaf size={14} style={{ color: "#10B981" }} />
                  <span>100% Organic Sourcing</span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                    fontWeight: 800,
                    color: "#3D2314",
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  Sourced Sincerity, <br />
                  <span style={{ color: "#A97142" }}>Savor Absolute Purity.</span>
                </h2>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    color: "#6B5A4E",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  At <strong>Shreepad Enterprises</strong>, we believe premium nutrition is a fundamental right. Guided by this commitment, we travel directly to renowned global orchards and pristine mountain valleys to bring you raw, unprocessed, and densely nutritious dried fruits and nuts.
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    color: "#6B5A4E",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  From sun-drenched California valleys to the rich walnut groves of Kashmir and authentic Middle Eastern Medjool palm farms, our direct farmer partnerships guarantee sustainable cultivation, fair-trade pricing, and maximum size grading.
                </p>

                {/* 2 Grid Cards */}
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Lab Certified Purity",
                      desc: "FSSAI & SGS tested for zero chemical residues.",
                    },
                    {
                      icon: Award,
                      title: "Laser Sorted Grading",
                      desc: "Super-jumbo uniform sizes with zero broken nuts.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      style={{
                        padding: "18px",
                        borderRadius: "20px",
                        background: "#FDF9F3",
                        border: "1.5px solid rgba(212, 169, 90, 0.35)",
                        boxShadow: "0 4px 15px rgba(61, 35, 20, 0.05)",
                      }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "12px",
                          background: "rgba(212, 169, 90, 0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <Icon size={20} style={{ color: "#A97142" }} />
                      </div>
                      <h4
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "#3D2314",
                          marginBottom: "4px",
                        }}
                      >
                        {title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "12px",
                          color: "#7E6E62",
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: 3D Image Showcase Frame */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "relative",
                    borderRadius: "32px",
                    overflow: "hidden",
                    border: "2px solid #D4A95A",
                    boxShadow: "0 20px 50px rgba(61, 35, 20, 0.25)",
                    aspectRatio: "4 / 3",
                    background: "#25130A",
                  }}
                >
                  <Image
                    src="/images/hero/hero-bg.png"
                    alt="Shreepad Enterprises premium orchards"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Floating Testimonial Overlay Pill */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "20px",
                      right: "20px",
                      padding: "18px 22px",
                      borderRadius: "24px",
                      background: "rgba(37, 19, 10, 0.88)",
                      border: "1.5px solid rgba(212, 169, 90, 0.45)",
                      backdropFilter: "blur(14px)",
                      color: "#FFFDF8",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div style={{ display: "flex", gap: "3px", marginBottom: "6px" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                      ))}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "13px",
                        fontStyle: "italic",
                        color: "rgba(255, 253, 248, 0.95)",
                        marginBottom: "6px",
                        lineHeight: 1.4,
                      }}
                    >
                      &ldquo;Best quality dry fruits I have ever purchased! The cashew W240 size is gigantic and sweet.&rdquo;
                    </p>
                    <span
                      style={{
                        fontFamily: "var(--font-button)",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#D4A95A",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      — Anita Desai, Food Blogger & Verified Customer
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 3. Core Brand Values Bento Cards ── */}
        <section
          style={{
            padding: "clamp(60px, 8vw, 90px) 0",
            background: "linear-gradient(180deg, #FDF9F3 0%, #F5EDE0 100%)",
            borderTop: "1px solid rgba(212, 169, 90, 0.25)",
            borderBottom: "1px solid rgba(212, 169, 90, 0.25)",
          }}
        >
          <div className="container-luxury">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#A97142",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                }}
              >
                Why We Stand Out
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontWeight: 800,
                  color: "#3D2314",
                  marginTop: "6px",
                }}
              >
                Our Core Pillars of Excellence
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {VALUES.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    style={{
                      padding: "32px 26px",
                      borderRadius: "28px",
                      background: "#FFFDF8",
                      border: "1.5px solid rgba(212, 169, 90, 0.35)",
                      boxShadow: "0 10px 30px rgba(61, 35, 20, 0.08)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "20px",
                        fontFamily: "var(--font-heading)",
                        fontSize: "2.5rem",
                        fontWeight: 900,
                        color: "rgba(212, 169, 90, 0.18)",
                        lineHeight: 1,
                      }}
                    >
                      {val.number}
                    </span>

                    <div>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "16px",
                          background: "linear-gradient(135deg, #3D2314, #25130A)",
                          color: "#D4A95A",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "20px",
                          border: "1px solid rgba(212, 169, 90, 0.4)",
                        }}
                      >
                        <Icon size={24} />
                      </div>

                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          color: "#A97142",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          marginBottom: "6px",
                          display: "block",
                        }}
                      >
                        {val.tag}
                      </span>

                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "1.2rem",
                          fontWeight: 800,
                          color: "#3D2314",
                          marginBottom: "10px",
                        }}
                      >
                        {val.title}
                      </h3>

                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          color: "#7E6E62",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {val.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. Call to Action Showcase Banner ── */}
        <section
          style={{
            padding: "clamp(60px, 8vw, 90px) 0",
            background: "#FFFDF8",
          }}
        >
          <div className="container-luxury">
            <div
              style={{
                borderRadius: "36px",
                background: "linear-gradient(135deg, #3D2314 0%, #25130A 60%, #170B05 100%)",
                padding: "clamp(36px, 6vw, 64px) clamp(24px, 5vw, 48px)",
                border: "2px solid rgba(212, 169, 90, 0.45)",
                boxShadow: "0 25px 60px rgba(61, 35, 20, 0.3)",
                color: "#FFFDF8",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top Metallic Gold Accent Line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "linear-gradient(90deg, #D4A95A 0%, #F59E0B 50%, #FFFDF8 100%)",
                }}
              />

              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #FFFDF8 0%, #D4A95A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.2,
                  marginBottom: "16px",
                }}
              >
                Ready to Upgrade Your Snacking Habits?
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
                  color: "rgba(255, 253, 248, 0.85)",
                  maxWidth: "600px",
                  margin: "0 auto 30px",
                  lineHeight: 1.6,
                }}
              >
                Explore our selection of California Almonds, Kashmiri Walnuts, Medjool Dates, and handpicked premium blends. Delivered fresh to your doorstep.
              </p>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link
                  href="/products"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 34px",
                    borderRadius: "100px",
                    background: "linear-gradient(135deg, #D4A95A 0%, #F59E0B 100%)",
                    color: "#3D2314",
                    fontFamily: "var(--font-button)",
                    fontSize: "14px",
                    fontWeight: 800,
                    textDecoration: "none",
                    boxShadow: "0 8px 25px rgba(212, 169, 90, 0.4)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <span>Browse Full Collection</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
