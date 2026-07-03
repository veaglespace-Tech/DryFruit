"use client";

import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitText } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: 1,
    question: "Are your dry fruits 100% natural?",
    answer:
      "Yes! All our dry fruits are 100% natural with no artificial preservatives, colors, or flavors. We source directly from farms and orchards that follow natural farming practices. Every batch is tested in certified laboratories before dispatch.",
  },
  {
    id: 2,
    question: "How should I store dry fruits?",
    answer:
      "Most dry fruits should be stored in airtight containers at room temperature, away from direct sunlight. For longer shelf life (6+ months), refrigeration is recommended. Specific storage instructions are printed on each product package.",
  },
  {
    id: 3,
    question: "What is the shelf life of your products?",
    answer:
      "Our dry fruits typically have a shelf life of 6-12 months when stored properly. Each package is labeled with the best-before date. We recommend consuming within 3 months of opening for the best quality and freshness experience.",
  },
  {
    id: 4,
    question: "Do you offer gift packaging?",
    answer:
      "Yes! We offer beautiful premium gift packaging for all our products. Perfect for Diwali, Eid, Christmas, corporate gifting, and special occasions. Contact us on WhatsApp for custom gift hampers with personalized messages.",
  },
  {
    id: 5,
    question: "How do I place a bulk order?",
    answer:
      "For bulk orders (10kg+), please contact us via WhatsApp (+91 77097 47803) or email us at hello@shreepadenterprises.com. We offer competitive pricing for bulk purchases and corporate orders, with dedicated account management support.",
  },
  {
    id: 6,
    question: "Do you deliver across India?",
    answer:
      "Yes, we deliver pan-India through trusted logistics partners including Delhivery, BlueDart, and DTDC. Standard delivery takes 3-5 business days. Expedited 1-2 day shipping is available for major cities at an additional charge.",
  },
  {
    id: 7,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods including UPI (GPay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, and Cash on Delivery in select areas. All online transactions are 256-bit SSL encrypted.",
  },
  {
    id: 8,
    question: "What is your return and refund policy?",
    answer:
      "We have a hassle-free 7-day return policy. If you receive a damaged or incorrect product, please contact us within 24 hours with photos and we will arrange a free pickup and full refund or replacement within 5-7 business days.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef(null);
  const titleRef = useSplitText({ delay: 0.1 });
  const [openId, setOpenId] = useState(1);
  const contentRefs = useRef({});

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;
      gsap.fromTo(
        ".faq-item",
        { opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const toggle = (id) => {
    const contentEl = contentRefs.current[id];
    if (!contentEl) return;

    if (openId === id) {
      // Close
      gsap.to(contentEl, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => setOpenId(null),
      });
    } else {
      // Close previous
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
      // Open new
      const fullHeight = contentEl.scrollHeight;
      gsap.fromTo(
        contentEl,
        { height: 0, opacity: 0 },
        { height: fullHeight, opacity: 1, duration: 0.4, ease: "power3.out" },
      );
    }
  };

  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="container-luxury">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-border mb-4">
              <span className="text-primary text-xs font-button font-semibold uppercase tracking-widest">
                Got Questions?
              </span>
            </div>
            <h2
              ref={titleRef}
              className="font-heading text-primary mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
            >
              Frequently Asked Questions
            </h2>
            <div className="section-divider mx-auto" />
            <p className="body-lead mt-4">
              Find answers to the most common questions about our products,
              delivery, and policies.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="faq-item faq-accordion overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors hover:bg-background"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={openId === faq.id}
                  id={`faq-btn-${faq.id}`}
                  aria-controls={`faq-content-${faq.id}`}
                >
                  <span className="font-body font-semibold text-primary pr-4 text-sm md:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openId === faq.id
                        ? "bg-primary text-white"
                        : "bg-primary-50 text-primary"
                    }`}
                  >
                    {openId === faq.id ? (
                      <Minus size={16} />
                    ) : (
                      <Plus size={16} />
                    )}
                  </span>
                </button>

                <div
                  ref={(el) => {
                    contentRefs.current[faq.id] = el;
                  }}
                  className="overflow-hidden"
                  id={`faq-content-${faq.id}`}
                  style={{
                    height: openId === faq.id ? "auto" : 0,
                    opacity: openId === faq.id ? 1 : 0,
                  }}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <div className="h-px bg-border mb-4" />
                    <p className="text-text-muted font-body text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center p-8 rounded-2xl bg-primary-50 border border-border">
            <p className="font-heading text-lg text-primary font-semibold mb-2">
              Still have questions?
            </p>
            <p className="text-text-muted font-body text-sm mb-4">
              Our team is happy to help!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/917709747803"
                className="btn-primary-luxury text-sm px-6 py-2.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="/contact"
                className="btn-outline-luxury text-sm px-6 py-2.5"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
