"use client";

import { useRef, useState } from "react";
import { Plus, Minus, HelpCircle, MessageCircle, Mail, Sparkles, CheckCircle2, Search } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFadeUp } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { key: "all", label: "All Questions" },
  { key: "products", label: "Products & Quality" },
  { key: "shipping", label: "Delivery & Packing" },
  { key: "policy", label: "Orders & Returns" },
];

const faqs = [
  {
    id: 1,
    cat: "products",
    qNum: "Q1",
    question: "Are your dry fruits 100% natural and chemical-free?",
    answer:
      "Yes, 100%! All Shreepad Enterprises products are sourced directly from certified organic orchards without any artificial preservatives, synthetic colors, or chemical processing. Each batch undergoes 12-point laboratory testing before packaging.",
  },
  {
    id: 2,
    cat: "products",
    qNum: "Q2",
    question: "How should I store dry fruits for maximum freshness?",
    answer:
      "Store your dry fruits in airtight containers in a cool, dry place away from direct sunlight. For prolonged shelf life beyond 6 months, we recommend keeping them refrigerated in vacuum-sealed packs.",
  },
  {
    id: 3,
    cat: "products",
    qNum: "Q3",
    question: "What is the shelf life of your dry fruits & nuts?",
    answer:
      "Our products typically maintain peak crispness and nutritional value for 6 to 12 months when stored properly. Every package includes a clear best-before date and nitrogen-flushed seal.",
  },
  {
    id: 4,
    cat: "shipping",
    qNum: "Q4",
    question: "Do you offer premium gift packaging for festivals & events?",
    answer:
      "Yes! We specialize in luxury customized gift boxes for Diwali, Eid, weddings, and corporate gifting. Reach out via WhatsApp for custom hamper curation and personalized message inserts.",
  },
  {
    id: 5,
    cat: "policy",
    qNum: "Q5",
    question: "How do I place bulk or wholesale orders?",
    answer:
      "For bulk orders (10kg+), contact our team directly on WhatsApp (+91 77097 47803) or email Info@shreepadenterprisespune.com for exclusive wholesale rates and dedicated account assistance.",
  },
  {
    id: 6,
    cat: "shipping",
    qNum: "Q6",
    question: "Which areas do you deliver to and what are the timelines?",
    answer:
      "We deliver pan-India via express logistics partners (BlueDart, Delhivery, DTDC). Standard shipping takes 3-5 business days, with climate-controlled packaging ensuring farm-fresh delivery.",
  },
  {
    id: 7,
    cat: "policy",
    qNum: "Q7",
    question: "What payment methods are accepted on the website?",
    answer:
      "We support all secure payment channels including Google Pay, PhonePe, Paytm, Credit/Debit Cards, Net Banking, and Cash on Delivery in select regions. All transactions use 256-bit SSL encryption.",
  },
  {
    id: 8,
    cat: "policy",
    qNum: "Q8",
    question: "What is your replacement and return policy?",
    answer:
      "We offer a hassle-free 7-day replacement guarantee. If your package arrives damaged or deficient in any way, notify us within 24 hours for instant pickup and a full replacement or refund.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef(null);
  const titleRef = useFadeUp({ delay: 0.1 });
  const [openId, setOpenId] = useState(1);
  const [selectedCat, setSelectedCat] = useState("all");
  const contentRefs = useRef({});

  useGSAP(
    () => {
      const items = sectionRef.current?.querySelectorAll(".faq-accordion-card");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const filteredFaqs =
    selectedCat === "all"
      ? faqs
      : faqs.filter((item) => item.cat === selectedCat);

  const toggle = (id) => {
    const contentEl = contentRefs.current[id];
    if (!contentEl) return;

    if (openId === id) {
      gsap.to(contentEl, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => setOpenId(null),
      });
    } else {
      if (openId !== null && contentRefs.current[openId]) {
        const prevEl = contentRefs.current[openId];
        gsap.to(prevEl, {
          height: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
      }

      setOpenId(id);
      const fullHeight = contentEl.scrollHeight;
      gsap.fromTo(
        contentEl,
        { height: 0, opacity: 0 },
        { height: fullHeight, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
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
          top: "10%",
          left: "5%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,169,90,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(70px)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,62,38,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(70px)",
        }}
      />

      <div className="container-luxury" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Section Header ── */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          {/* Ultra-Modern Glassmorphic Capsule Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "7px 22px",
              borderRadius: "100px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(251,245,235,0.9) 100%)",
              border: "1.5px solid rgba(212,169,90,0.4)",
              boxShadow: "0 6px 24px rgba(212,169,90,0.18), inset 0 1px 2px rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
              marginBottom: "1.25rem",
            }}
          >
            <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px" }}>
              <span style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", background: "#D4A95A", opacity: 0.8, animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
              <span style={{ position: "relative", width: "8px", height: "8px", borderRadius: "50%", background: "#6B3E26" }} />
            </span>
            <HelpCircle size={14} style={{ color: "#A97142" }} />
            <span
              style={{
                fontFamily: "var(--font-button)",
                fontSize: "11px",
                fontWeight: 800,
                color: "#3D2314",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Got Questions?
            </span>
          </div>

          <h2
            ref={titleRef}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 800,
              color: "#3D2314",
              marginBottom: "1rem",
              lineHeight: 1.25,
            }}
          >
            Frequently{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6B3E26 0%, #A97142 50%, #D4A95A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Asked Questions
            </span>
          </h2>

          {/* Ornamental Divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", margin: "0 auto 1.25rem", maxWidth: "160px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #D4A95A)" }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D4A95A" }} />
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #D4A95A)" }} />
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
              color: "#6B5B4E",
              maxWidth: "580px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Find quick answers to common questions about our products, quality standards, delivery, and policies.
          </p>

          {/* ── Category Filter Pills ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "2rem",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCat(cat.key)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: "var(--font-button)",
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: selectedCat === cat.key ? "1.5px solid #D4A95A" : "1.5px solid rgba(212, 169, 90, 0.3)",
                  background: selectedCat === cat.key
                    ? "linear-gradient(135deg, #6B3E26 0%, #A97142 100%)"
                    : "rgba(255, 255, 255, 0.8)",
                  color: selectedCat === cat.key ? "#FFFFFF" : "#6B5B4E",
                  boxShadow: selectedCat === cat.key ? "0 4px 14px rgba(107,62,38,0.25)" : "none",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Ultra-Modern Accordion Stack ── */}
        <div className="max-w-3xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="faq-accordion-card group"
                style={{
                  background: isOpen
                    ? "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(251,245,235,0.95) 100%)"
                    : "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(251,245,235,0.75) 100%)",
                  borderRadius: "20px",
                  border: isOpen
                    ? "1.5px solid rgba(212, 169, 90, 0.65)"
                    : "1.5px solid rgba(212, 169, 90, 0.25)",
                  boxShadow: isOpen
                    ? "0 14px 35px rgba(107, 62, 38, 0.12)"
                    : "0 4px 16px rgba(107, 62, 38, 0.04)",
                  backdropFilter: "blur(12px)",
                  overflow: "hidden",
                  transition: "all 0.35s ease",
                }}
              >
                {/* Header Button */}
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "16px",
                  }}
                  aria-expanded={isOpen}
                  id={`faq-btn-${faq.id}`}
                  aria-controls={`faq-content-${faq.id}`}
                  suppressHydrationWarning
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    {/* Q Number Badge */}
                    <span
                      style={{
                        fontFamily: "var(--font-button)",
                        fontSize: "11px",
                        fontWeight: 900,
                        color: isOpen ? "#FFFFFF" : "#A97142",
                        background: isOpen ? "linear-gradient(135deg, #6B3E26, #A97142)" : "rgba(212,169,90,0.15)",
                        border: "1px solid rgba(212,169,90,0.3)",
                        padding: "4px 10px",
                        borderRadius: "8px",
                        flexShrink: 0,
                      }}
                    >
                      {faq.qNum}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                        fontWeight: 700,
                        color: isOpen ? "#A97142" : "#3D2314",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* 3D Circular Toggle Icon */}
                  <span
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: isOpen
                        ? "linear-gradient(135deg, #6B3E26, #A97142)"
                        : "rgba(212,169,90,0.12)",
                      border: isOpen
                        ? "1px solid #D4A95A"
                        : "1px solid rgba(212,169,90,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isOpen ? "#FFFDF8" : "#6B3E26",
                      flexShrink: 0,
                      transition: "all 0.35s ease",
                      boxShadow: isOpen ? "0 4px 14px rgba(107,62,38,0.3)" : "none",
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                {/* Animated Collapsible Answer */}
                <div
                  ref={(el) => {
                    contentRefs.current[faq.id] = el;
                  }}
                  id={`faq-content-${faq.id}`}
                  style={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "opacity 0.3s ease",
                  }}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                >
                  <div style={{ padding: "0 24px 22px 24px" }}>
                    <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(212,169,90,0.3), transparent)", marginBottom: "14px" }} />
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.92rem",
                        color: "#6B5B4E",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Ultra-Modern Dark CTA Box ── */}
        <div
          style={{
            maxWidth: "680px",
            margin: "3.5rem auto 0",
            padding: "32px 28px",
            borderRadius: "28px",
            background: "linear-gradient(135deg, #3D2314 0%, #25130A 100%)",
            border: "1.5px solid rgba(212, 169, 90, 0.4)",
            boxShadow: "0 20px 45px rgba(61, 35, 20, 0.22)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top Gold Glowing Accent Line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #D4A95A, #F59E0B, #FFFDF8)" }} />

          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.35rem",
              fontWeight: 800,
              color: "#FFFDF8",
              marginBottom: "6px",
            }}
          >
            Still Have Questions?
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.8)", marginBottom: "20px" }}>
            Our dedicated team is ready to help you on WhatsApp or email!
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "14px" }}>
            <a
              href="https://wa.me/917709747803"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                borderRadius: "100px",
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "var(--font-button)",
                boxShadow: "0 4px 16px rgba(16,185,129,0.35)",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
            >
              <MessageCircle size={16} />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="mailto:Info@shreepadenterprisespune.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                borderRadius: "100px",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1.5px solid rgba(212, 169, 90, 0.4)",
                color: "#FFFDF8",
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "var(--font-button)",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
            >
              <Mail size={16} style={{ color: "#D4A95A" }} />
              <span>Email Support</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
