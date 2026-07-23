"use client";

import { useRef, useState } from "react";
import { Send, CheckCircle2, Mail, Sparkles, Lock } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFadeUp } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const perks = [
  "Exclusive Discounts",
  "New Arrivals First",
  "Healthy Recipes",
  "Seasonal Offers",
];

export default function Newsletter() {
  const sectionRef = useRef(null);
  const titleRef = useFadeUp({ delay: 0.1 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const btnRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".newsletter-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    if (btnRef.current) {
      gsap.to(btnRef.current, { scale: 0.95, duration: 0.1 });
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setSubmitted(true);

    gsap.fromTo(
      ".newsletter-success",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      }
    );
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        paddingTop: "5.5rem",
        paddingBottom: "6rem",
        background: "linear-gradient(180deg, #FFFDF8 0%, #F5EDE0 100%)",
        overflow: "hidden",
      }}
    >
      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "650px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(212,169,90,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(75px)",
        }}
      />

      <div className="container-luxury" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Ultra-Modern Dark Luxury Card Showcase ── */}
        <div
          className="newsletter-card max-w-3xl mx-auto"
          style={{
            background: "linear-gradient(145deg, #3D2314 0%, #25130A 60%, #170B05 100%)",
            borderRadius: "32px",
            padding: "clamp(28px, 5vw, 56px)",
            border: "1.5px solid rgba(212, 169, 90, 0.4)",
            boxShadow: "0 25px 60px rgba(61, 35, 20, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {/* Glowing Metallic Top Accent Line */}
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

          {/* Brand Logo Sphere with Live Glow */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                background: "#FFFDF8",
                padding: "3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(212, 169, 90, 0.5)",
                border: "2.5px solid #D4A95A",
                overflow: "hidden",
              }}
            >
              <img
                src="/images/logo.png"
                alt="Shreepad Enterprises Logo"
                style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.1)" }}
              />
            </div>
          </div>

          {/* Heading */}
          <h2
            ref={titleRef}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.85rem, 3.5vw, 2.75rem)",
              fontWeight: 800,
              color: "#FFFDF8",
              marginBottom: "1rem",
              lineHeight: 1.25,
            }}
          >
            Stay in the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #F59E0B 0%, #D4A95A 50%, #FFFDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Loop
            </span>
          </h2>

          {/* Ornamental Line Divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", margin: "0 auto 1.25rem", maxWidth: "160px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #D4A95A)" }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D4A95A" }} />
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #D4A95A)" }} />
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.92rem, 1.8vw, 1.05rem)",
              color: "rgba(255, 255, 255, 0.85)",
              maxWidth: "540px",
              margin: "0 auto 1.75rem",
              lineHeight: 1.7,
            }}
          >
            Subscribe to our VIP newsletter for exclusive discount codes, seasonal harvest alerts, healthy recipes, and organic nutrition tips.
          </p>

          {/* Perks Capsules */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "2.25rem",
            }}
          >
            {perks.map((perk) => (
              <span
                key={perk}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 16px",
                  borderRadius: "100px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(212, 169, 90, 0.35)",
                  backdropFilter: "blur(8px)",
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: "var(--font-button)",
                  color: "#FFFDF8",
                  letterSpacing: "0.02em",
                }}
              >
                <CheckCircle2 size={13} style={{ color: "#D4A95A" }} />
                {perk}
              </span>
            ))}
          </div>

          {/* Integrated Modern Form */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              style={{
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(255, 255, 255, 0.12)",
                  border: "1.5px solid rgba(212, 169, 90, 0.45)",
                  borderRadius: "100px",
                  padding: "5px 6px 5px 18px",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Mail size={18} style={{ color: "#D4A95A", flexShrink: 0, marginRight: "10px" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#FFFDF8",
                    fontSize: "14px",
                    fontFamily: "var(--font-body)",
                  }}
                  aria-label="Email address for newsletter"
                  suppressHydrationWarning
                />
                <button
                  ref={btnRef}
                  type="submit"
                  disabled={loading}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 26px",
                    borderRadius: "100px",
                    background: "linear-gradient(135deg, #D4A95A 0%, #F59E0B 100%)",
                    color: "#3D2314",
                    fontSize: "13px",
                    fontWeight: 800,
                    fontFamily: "var(--font-button)",
                    border: "none",
                    cursor: "pointer",
                    flexShrink: 0,
                    boxShadow: "0 4px 16px rgba(212, 169, 90, 0.4)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  aria-label="Subscribe to newsletter"
                  suppressHydrationWarning
                >
                  {loading ? (
                    <div style={{ width: "16px", height: "16px", border: "2px solid #3D2314", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  ) : (
                    <Send size={15} />
                  )}
                  <span>{loading ? "Joining..." : "Subscribe"}</span>
                </button>
              </div>
            </form>
          ) : (
            <div
              className="newsletter-success"
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                padding: "24px 32px",
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1.5px solid rgba(16, 185, 129, 0.5)",
                backdropFilter: "blur(12px)",
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle2 size={32} style={{ color: "#10B981" }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "#FFFDF8", margin: 0 }}>
                You&apos;re in! 🎉
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255, 255, 255, 0.85)", margin: 0 }}>
                Welcome to the Shreepad Enterprises family. Check your inbox for your special welcome offer!
              </p>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "18px", opacity: 0.75 }}>
            <Lock size={12} style={{ color: "#D4A95A" }} />
            <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "11px", fontFamily: "var(--font-body)", margin: 0 }}>
              No spam, ever. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
