"use client";

import { useRef, useState } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Zap,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFadeLeft, useFadeRight, useFadeUp } from "@/lib/gsap";
import { useSubmitContactMutation } from "@/store/api/apiSlice";
import toast from "react-hot-toast";
import { contactFormSchema } from "@/lib/validation";

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  {
    icon: Phone,
    title: "Call Us Direct",
    value: "+91 98609 41171",
    desc: "Tue-Sun: 10:30 AM - 9:30 PM",
    href: "tel:+919860941171",
    color: "#6B3E26",
    badge: "Fast Phone Support",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Chat",
    value: "Chat with Us",
    desc: "Instant replies, 7 days a week",
    href: "https://wa.me/917709747803",
    color: "#10B981",
    badge: "Instant 24/7",
  },
  {
    icon: Mail,
    title: "Email Support",
    value: "Info@shreepadenterprisespune.com",
    desc: "Guaranteed reply within 24 hours",
    href: "mailto:Info@shreepadenterprisespune.com",
    color: "#D4A95A",
    badge: "Email Response",
  },
  {
    icon: MapPin,
    title: "Visit Store",
    value: "Shop No 4, Datta Nagar, Dighi, Pune 411015",
    desc: "Tap to open in Google Maps",
    href: "https://maps.google.com/?q=Shop+No+4+Near+Datta+Nagar+Bus+Stop+Pune+Alandi+Rd+Dighi+PCMC+Pune+Maharashtra+411015",
    color: "#A97142",
    badge: "Dighi Store",
  },
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const titleRef = useFadeUp({ delay: 0.1 });
  const leftRef = useFadeLeft({ delay: 0.2 });
  const rightRef = useFadeRight({ delay: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitContact, { isLoading: submitting }] = useSubmitContactMutation();
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Zod validation
    const validation = contactFormSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    try {
      await submitContact(formData).unwrap();
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you within 24 hours. 🌿");
      gsap.fromTo(
        ".contact-success",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    } catch (err) {
      toast.error(
        err.data?.message || "Something went wrong. Please try WhatsApp or call us directly."
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
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
          top: "15%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,169,90,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(65px)",
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
            <Mail size={14} style={{ color: "#A97142" }} />
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
              Get in Touch
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
            We&apos;d Love to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6B3E26 0%, #A97142 50%, #D4A95A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Hear From You
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
            Have a question, want to place a bulk order, or just want to say hello? We&apos;re always here for you.
          </p>
        </div>

        {/* ── Grid Showcase ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left Column: Glass Contact Cards, Hours & Map */}
          <div ref={leftRef}>
            {/* Quick Contact Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
              {contactItems.map(({ icon: Icon, title, value, desc, href, color, badge }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px 20px",
                    borderRadius: "20px",
                    background: "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(251,245,235,0.85) 100%)",
                    border: "1.5px solid rgba(212, 169, 90, 0.3)",
                    boxShadow: "0 8px 24px rgba(107,62,38,0.06)",
                    backdropFilter: "blur(12px)",
                    textDecoration: "none",
                    transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.65)";
                    e.currentTarget.style.boxShadow = "0 16px 36px rgba(107,62,38,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(212, 169, 90, 0.3)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(107,62,38,0.06)";
                  }}
                >
                  {/* Icon Sphere */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "16px",
                      background: `linear-gradient(135deg, ${color}20 0%, ${color}35 100%)`,
                      border: `1px solid ${color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      transition: "transform 0.3s ease",
                    }}
                    className="group-hover:scale-110"
                  >
                    <Icon size={22} style={{ color }} />
                  </div>

                  {/* Info Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                      <p style={{ fontFamily: "var(--font-button)", fontWeight: 700, fontSize: "11px", color: "#A97142", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
                        {title}
                      </p>
                      {badge && (
                        <span
                          style={{
                            fontSize: "9px",
                            fontWeight: 800,
                            fontFamily: "var(--font-button)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            color: color,
                            background: `${color}15`,
                            border: `1px solid ${color}30`,
                            padding: "2px 7px",
                            borderRadius: "100px",
                          }}
                        >
                          {badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "#3D2314", margin: "2px 0 0", wordBreak: "break-all", lineHeight: 1.3 }}>
                      {value}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#6B5B4E", margin: "2px 0 0" }}>
                      {desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Business Hours Card */}
            <div
              style={{
                padding: "20px 22px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #3D2314 0%, #25130A 100%)",
                border: "1.5px solid rgba(212, 169, 90, 0.4)",
                boxShadow: "0 10px 30px rgba(61, 35, 20, 0.15)",
                color: "#FFFDF8",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Clock size={18} style={{ color: "#D4A95A" }} />
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "#FFFDF8" }}>
                    Store Business Hours
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    fontFamily: "var(--font-button)",
                    color: "#10B981",
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.4)",
                    padding: "3px 10px",
                    borderRadius: "100px",
                  }}
                >
                  🟢 Open Today
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.82rem", fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.8)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "4px" }}>
                  <span>Tuesday - Sunday</span>
                  <span style={{ fontWeight: 700, color: "#D4A95A" }}>10:30 AM - 1:30 PM | 5:30 PM - 9:30 PM</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "2px" }}>
                  <span>Monday</span>
                  <span style={{ fontWeight: 700, color: "#EF4444" }}>Weekly Closed</span>
                </div>
              </div>
            </div>

            {/* Live Google Map Container */}
            <div
              id="map"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "1.5px solid rgba(212, 169, 90, 0.35)",
                boxShadow: "0 10px 30px rgba(61, 35, 20, 0.1)",
                height: "220px",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.178!2d73.8711!3d18.6178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e5f5b3c5d3%3A0x1!2sShop+No+4%2C+Near+Datta+Nagar+Bus+Stop%2C+Pune-Alandi+Rd%2C+Dighi%2C+PCMC%2C+Pune%2C+Maharashtra+411015!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Shreepad Enterprises Live Location - Dighi Pune"
              />
            </div>
            {/* Live Location Button */}
            <a
              href="https://maps.google.com/?q=Shop+No+4+Near+Datta+Nagar+Bus+Stop+Pune+Alandi+Rd+Dighi+PCMC+Pune+Maharashtra+411015"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "11px 20px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(251,245,235,0.9))",
                border: "1.5px solid rgba(212, 169, 90, 0.4)",
                color: "#3D2314",
                fontSize: "12px",
                fontWeight: 800,
                fontFamily: "var(--font-button)",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(107,62,38,0.08)",
                transition: "all 0.3s ease",
              }}
            >
              <MapPin size={15} style={{ color: "#A97142" }} />
              <span>Open Live Location in Google Maps</span>
              <ExternalLink size={13} style={{ color: "#A97142" }} />
            </a>
          </div>

          {/* Right Column: Ultra-Modern Glass Form */}
          <div ref={rightRef}>
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                style={{
                  padding: "clamp(24px, 4vw, 40px)",
                  borderRadius: "28px",
                  background: "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(251,245,235,0.92) 100%)",
                  border: "1.5px solid rgba(212, 169, 90, 0.4)",
                  boxShadow: "0 20px 45px rgba(61, 35, 20, 0.12)",
                  backdropFilter: "blur(16px)",
                  position: "relative",
                  overflow: "hidden",
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
                    background: "linear-gradient(90deg, #6B3E26 0%, #D4A95A 50%, #A97142 100%)",
                  }}
                />

                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                  <Zap size={22} style={{ color: "#D4A95A" }} />
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 800, color: "#3D2314", margin: 0 }}>
                    Send Us a Message
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="form-floating col-span-2 md:col-span-1">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      id="contact-name"
                      suppressHydrationWarning
                    />
                    <label htmlFor="contact-name">Full Name *</label>
                  </div>

                  <div className="form-floating col-span-2 md:col-span-1">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=" "
                      id="contact-email"
                      suppressHydrationWarning
                    />
                    <label htmlFor="contact-email">Email Address</label>
                  </div>

                  <div className="form-floating col-span-2 md:col-span-1">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=" "
                      id="contact-phone"
                      suppressHydrationWarning
                    />
                    <label htmlFor="contact-phone">Phone Number</label>
                  </div>

                  <div className="form-floating col-span-2 md:col-span-1">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder=" "
                      id="contact-subject"
                      suppressHydrationWarning
                    />
                    <label htmlFor="contact-subject">Subject / Product Inquiry</label>
                  </div>

                  <div className="form-floating col-span-2">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      rows={5}
                      id="contact-message"
                      suppressHydrationWarning
                    />
                    <label htmlFor="contact-message">Your Message *</label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary-luxury w-full justify-center"
                  style={{
                    padding: "14px 28px",
                    borderRadius: "100px",
                    fontSize: "14px",
                    fontWeight: 800,
                  }}
                  suppressHydrationWarning
                >
                  <span className="flex items-center gap-2">
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    {submitting ? "Sending Message..." : "Send Message Now"}
                  </span>
                </button>

                <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "#6B5B4E", textAlign: "center", marginTop: "14px", margin: "14px 0 0" }}>
                  We typically respond within 2-4 business hours.
                </p>
              </form>
            ) : (
              <div
                className="contact-success"
                style={{
                  padding: "40px 28px",
                  borderRadius: "28px",
                  background: "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(251,245,235,0.92) 100%)",
                  border: "1.5px solid rgba(16, 185, 129, 0.5)",
                  boxShadow: "0 20px 45px rgba(61, 35, 20, 0.12)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "16px",
                }}
              >
                <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle size={36} style={{ color: "#10B981" }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, color: "#3D2314", marginBottom: "6px" }}>
                    Message Sent! 🎉
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "#6B5B4E", margin: 0 }}>
                    Thank you for reaching out to Shreepad Enterprises! Our team will get back to you within 24 hours.
                  </p>
                </div>
                <a
                  href="https://wa.me/917709747803"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-luxury"
                  style={{ marginTop: "10px", padding: "12px 24px", borderRadius: "100px", fontSize: "13px" }}
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle size={16} />
                    Need faster response? WhatsApp Us
                  </span>
                </a>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
