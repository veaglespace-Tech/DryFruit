"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, Sparkles } from "lucide-react";

const DEFAULT_MESSAGES = [
  "🌿 Free delivery on orders above ₹999",
  "✨ 100% Natural & Chemical Free Organic Products",
  "🎁 Premium Festive Gift Hampers Available",
  "📞 Call us directly: +91 98609 41171",
  "💚 Farm Fresh Konkan & Kashmiri Quality",
  "🚚 Pan India Fast Delivery in 3-5 Days",
  "🌟 Special Discount: Use code FIRST10 for 10% off your order",
];

export default function AnnouncementBar() {
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [phone, setPhone] = useState("+91 98609 41171");
  const [whatsapp, setWhatsapp] = useState("+91 77097 47803");

  // Fetch live announcement & contact numbers from DB settings
  useEffect(() => {
    async function fetchSettings() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          (typeof window !== "undefined"
            ? `http://${window.location.hostname}:5000/api`
            : "http://localhost:5000/api");

        const res = await fetch(`${baseUrl}/settings`);
        if (!res.ok) return;
        const data = await res.json();

        if (data.success && data.data) {
          const s = data.data;
          if (s.phone) setPhone(s.phone);
          if (s.whatsapp) setWhatsapp(s.whatsapp);

          if (s.announcement && s.announcement.trim().length > 0) {
            const customList = s.announcement
              .split("|")
              .map((item) => item.trim())
              .filter(Boolean);

            if (customList.length > 0) {
              setMessages(customList);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load announcement settings:", err);
      }
    }
    fetchSettings();
  }, []);

  // Repeat the messages to ensure an unbroken seamless infinite loop on any screen width
  const repeatedMessages = [...messages, ...messages, ...messages, ...messages];

  return (
    <>
      <style jsx global>{`
        @keyframes continuousMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-continuous-marquee {
          display: flex;
          width: max-content;
          animation: continuousMarquee 32s linear infinite;
          will-change: transform;
        }
        .announcement-bar-container:hover .animate-continuous-marquee {
          animation-play-state: paused;
        }
      `}</style>

      <div className="announcement-bar-container relative z-50 bg-gradient-to-r from-primary-DEFAULT via-[#1b3325] to-primary-DEFAULT border-b border-accent-DEFAULT/30 shadow-sm text-white overflow-hidden select-none">
        <div className="flex items-center h-9">
          {/* Quick Direct Action Badges (Left) */}
          <div className="flex-shrink-0 flex items-center gap-2.5 px-3 sm:px-4 h-full bg-primary-DEFAULT/90 border-r border-accent-DEFAULT/30 z-10 shadow-md">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-accent-light hover:text-white transition-colors group"
              title="Call Us Now"
            >
              <Phone size={11} className="text-accent-DEFAULT group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Call</span>
            </a>
            <span className="text-accent-DEFAULT/40 text-[10px]">|</span>
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group"
              title="WhatsApp Us"
            >
              <MessageCircle size={11} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>

          {/* Butter-Smooth 60FPS Continuous Infinite Ticker */}
          <div className="flex-1 overflow-hidden relative flex items-center h-full">
            <div className="animate-continuous-marquee items-center py-1">
              {repeatedMessages.map((msg, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2.5 px-6 text-[11px] sm:text-xs font-medium tracking-wide text-white/95 whitespace-nowrap"
                >
                  <Sparkles size={10} className="text-accent-DEFAULT flex-shrink-0 animate-pulse" />
                  <span>{msg}</span>
                  <span className="text-accent-DEFAULT/50 font-serif ml-3">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
