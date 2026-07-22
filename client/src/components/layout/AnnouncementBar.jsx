"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";

const DEFAULT_MESSAGES = [
  "🌿 Free delivery on orders above ₹999",
  "100% Natural & Chemical Free Organic Products",
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
          animation: continuousMarquee 28s linear infinite;
          will-change: transform;
        }
        .announcement-bar-container:hover .animate-continuous-marquee {
          animation-play-state: paused;
        }
      `}</style>

      {/* Modern Luxury Satin Obsidian & Metallic Champagne Gold Marquee Bar */}
      <div className="announcement-bar-container relative z-50 bg-[#140b05] border-b border-[#D4A95A]/40 shadow-lg overflow-hidden select-none">
        <div className="flex items-center h-10">
          
          {/* Left Action Buttons: Ultra-High Contrast Badges */}
          <div className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 h-full bg-[#0a0502] border-r border-[#D4A95A]/30 z-10">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A95A] text-[#140b05] text-[11px] font-bold hover:bg-white hover:text-black transition-all shadow-md group"
              title="Call Us Now"
            >
              <Phone size={11} className="text-[#140b05] stroke-[3] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-bold">Call</span>
            </a>
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366] text-white text-[11px] font-bold hover:bg-[#128C7E] transition-all shadow-md group"
              title="WhatsApp Us"
            >
              <MessageCircle size={11} className="text-white stroke-[3] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-bold">WhatsApp</span>
            </a>
          </div>

          {/* Smooth Continuous Marquee with High-Contrast Text (No Sparkles/Stars) */}
          <div className="flex-1 overflow-hidden relative flex items-center h-full bg-gradient-to-r from-[#140b05] via-[#1f1007] to-[#140b05]">
            <div className="animate-continuous-marquee items-center py-1">
              {repeatedMessages.map((msg, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-4 px-6 text-[11px] sm:text-xs font-semibold tracking-wide text-white whitespace-nowrap"
                >
                  <span className="text-[#FFFDF8] font-semibold">{msg}</span>
                  <span className="text-[#D4A95A] font-bold mx-2">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
