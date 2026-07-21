"use client";

import { useRef, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";
import gsap from "gsap";

const messages = [
  "🌿 Free delivery on orders above ₹999",
  "✨ 100% Natural & Chemical Free",
  "🎁 Premium Gift Packaging Available",
  "📞 Call us: +91 98609 41171",
  "💚 Farm Fresh Quality Guaranteed",
  "🚚 Pan India Delivery in 3-5 Days",
  "🌟 Use code FIRST10 for 10% off your first order",
];

export default function AnnouncementBar() {
  const marqueeRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const el = marqueeRef.current;

    const initMarquee = () => {
      if (tweenRef.current) tweenRef.current.kill();
      const halfWidth = el.scrollWidth / 2;
      tweenRef.current = gsap.fromTo(
        el,
        { x: 0 },
        {
          x: -halfWidth,
          duration: 16,
          ease: "none",
          repeat: -1,
        }
      );
    };

    // Initial calculation after load
    const timeout = setTimeout(initMarquee, 100);

    // Recalculate on window resize for fluid responsiveness
    window.addEventListener("resize", initMarquee);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", initMarquee);
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  const allMessages = [...messages, ...messages];

  return (
    <div className="announcement-bar relative z-50">
      <div className="flex items-center overflow-hidden">
        {/* Left Icons */}
        <div className="flex-shrink-0 flex items-center gap-4 px-4 border-r border-white/20 py-1">
          <a
            href="tel:+919860941171"
            className="flex items-center gap-1 text-white/90 hover:text-white transition-colors"
            aria-label="Call us"
          >
            <Phone size={12} />
            <span className="hidden sm:inline text-xs">Call</span>
          </a>
          <a
            href="https://wa.me/917709747803"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white/90 hover:text-white transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle size={12} />
            <span className="hidden sm:inline text-xs">WhatsApp</span>
          </a>
        </div>

        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden relative">
          <div
            ref={marqueeRef}
            className="flex items-center whitespace-nowrap will-change-transform"
          >
            {allMessages.map((msg, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 sm:px-8 text-[11px] sm:text-xs font-body font-medium text-white/90">
                {msg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
