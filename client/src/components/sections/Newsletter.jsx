"use client";

import { useRef, useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitText } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef(null);
  const titleRef = useSplitText({ delay: 0.1 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const btnRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    gsap.to(btnRef.current, { scale: 0.95, duration: 0.1 });

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
      },
    );
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #F5EDE0 0%, #EFE7DD 100%)",
      }}
    >
      {/* Decorative Elements */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: "#D4A95A" }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-15"
        style={{ background: "#6B3E26" }}
      />

      <div className="container-luxury relative">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo decoration */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-white p-1 flex items-center justify-center shadow-luxury border-2 border-accent-DEFAULT/40 overflow-hidden">
              <img
                src="/images/logo.png"
                alt="Shreepad Enterprises Logo"
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </div>

          {/* Heading */}
          <h2
            ref={titleRef}
            className="font-heading text-primary-DEFAULT mb-4"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Stay in the Loop
          </h2>
          <div className="section-divider mx-auto" />
          <p className="body-lead mt-4 mb-8">
            Subscribe to our newsletter for exclusive offers, new arrivals,
            healthy recipes, and tips on living your best nutritious life.
          </p>

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              "Exclusive Discounts",
              "New Arrivals First",
              "Healthy Recipes",
              "Seasonal Offers",
            ].map((perk) => (
              <span
                key={perk}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border-DEFAULT text-xs font-button font-semibold text-primary-DEFAULT"
              >
                <CheckCircle size={12} className="text-green-600" />
                {perk}
              </span>
            ))}
          </div>

          {/* Form */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-border-DEFAULT bg-white font-body text-sm text-text-DEFAULT placeholder-text-muted outline-none focus:border-accent-DEFAULT transition-colors shadow-card"
                  aria-label="Email address for newsletter"
                  suppressHydrationWarning
                />
              </div>
              <button
                ref={btnRef}
                type="submit"
                disabled={loading}
                className="btn-primary-luxury px-6 flex-shrink-0"
                aria-label="Subscribe to newsletter"
                suppressHydrationWarning
              >
                <span className="flex items-center gap-2">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {loading ? "Joining..." : "Subscribe"}
                </span>
              </button>
            </form>
          ) : (
            <div className="newsletter-success flex flex-col items-center gap-4 p-8 rounded-2xl bg-white border border-border-DEFAULT shadow-luxury">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <div>
                <p className="font-heading text-lg font-semibold text-primary-DEFAULT mb-1">
                  You&apos;re in! 🎉
                </p>
                <p className="text-text-muted font-body text-sm">
                  Welcome to the Shreepad Enterprises family. Check your email for a
                  special welcome offer!
                </p>
              </div>
            </div>
          )}

          <p className="text-text-muted text-xs font-body mt-4">
            No spam, ever. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
