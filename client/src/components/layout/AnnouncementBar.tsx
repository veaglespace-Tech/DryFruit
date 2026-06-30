'use client';

import { useRef, useEffect } from 'react';
import { Phone, MessageCircle, Leaf } from 'lucide-react';
import gsap from 'gsap';

const messages = [
  '🌿 Free delivery on orders above ₹999',
  '✨ 100% Natural & Chemical Free',
  '🎁 Premium Gift Packaging Available',
  '📞 Call us: +91 98765 43210',
  '💚 Farm Fresh Quality Guaranteed',
  '🚚 Pan India Delivery in 3-5 Days',
  '🌟 Use code FIRST10 for 10% off your first order',
];

export default function AnnouncementBar() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const el = marqueeRef.current;
    const totalWidth = el.scrollWidth / 2;
    gsap.to(el, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  const allMessages = [...messages, ...messages];

  return (
    <div className="announcement-bar relative z-50">
      <div className="flex items-center overflow-hidden">
        {/* Left Icons */}
        <div className="flex-shrink-0 flex items-center gap-4 px-4 border-r border-white/20 py-1">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1 text-white/90 hover:text-white transition-colors"
            aria-label="Call us"
          >
            <Phone size={12} />
            <span className="hidden sm:inline text-xs">Call</span>
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white/90 hover:text-white transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle size={12} />
            <span className="hidden sm:inline text-xs">WhatsApp</span>
          </a>
        </div>

        {/* Marquee */}
        <div className="flex-1 overflow-hidden">
          <div ref={marqueeRef} className="flex items-center gap-0 whitespace-nowrap will-change-transform">
            {allMessages.map((msg, i) => (
              <span key={i} className="flex items-center gap-2 px-8">
                <Leaf size={10} className="opacity-70" />
                <span>{msg}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
