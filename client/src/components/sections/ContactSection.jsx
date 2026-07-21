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
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFadeLeft, useFadeRight } from "@/lib/gsap";
import { useSubmitContactMutation } from "@/store/api/apiSlice";
import toast from "react-hot-toast";
import { contactFormSchema } from "@/lib/validation";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
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
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      );
    } catch (err) {
      toast.error(
        err.data?.message || "Something went wrong. Please try WhatsApp or call us directly.",
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding bg-surface overflow-hidden"
    >
      <div className="container-luxury">
        <div className="text-center mb-8 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-border-DEFAULT mb-4">
            <span className="text-primary-DEFAULT text-xs font-button font-semibold uppercase tracking-widest">
              Get in Touch
            </span>
          </div>
          <h2
            className="font-heading text-primary-DEFAULT mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            We&apos;d Love to Hear From You
          </h2>
          <div className="section-divider mx-auto" />
          <p className="body-lead max-w-2xl mx-auto mt-4">
            Have a question, want to place a bulk order, or just want to say
            hello? We&apos;re here for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Info */}
          <div ref={leftRef}>
            {/* Contact Cards */}
            <div className="space-y-4 mb-8">
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  value: "+91 98609 41171",
                  desc: "Tue-Sun, Closed Mon",
                  href: "tel:+919860941171",
                  color: "#6B3E26",
                },
                {
                  icon: MessageCircle,
                  title: "WhatsApp",
                  value: "Chat with Us",
                  desc: "Instant replies, 7 days a week",
                  href: "https://wa.me/917709747803",
                  color: "#4CAF50",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  value: "shreepadenterprises.tech@gmail.com",
                  desc: "We reply within 24 hours",
                  href: "mailto:shreepadenterprises.tech@gmail.com",
                  color: "#D4A95A",
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  value: "Pune, Maharashtra 411001",
                  desc: "Click to open live map location",
                  href: "https://maps.google.com/?q=Pune,+Maharashtra+411001",
                  color: "#A97142",
                },
              ].map(({ icon: Icon, title, value, desc, href, color }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-2xl border border-border-DEFAULT bg-background hover:shadow-luxury hover:border-accent-DEFAULT/30 transition-all duration-300 group overflow-hidden w-full"
                >
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="font-button font-semibold text-xs sm:text-sm text-text-DEFAULT">
                      {title}
                    </p>
                    <p className="font-heading font-semibold text-xs sm:text-base text-primary-DEFAULT break-all leading-snug">
                      {value}
                    </p>
                    <p className="text-[11px] sm:text-xs text-text-muted font-body truncate">{desc}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Hours */}
            <div className="p-4 sm:p-5 rounded-2xl border border-border-DEFAULT bg-primary-50">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-primary-DEFAULT flex-shrink-0" />
                <span className="font-heading font-semibold text-sm sm:text-base text-primary-DEFAULT">
                  Business Hours
                </span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm font-body">
                {[
                  { day: "Tuesday - Sunday", time: "10:30 AM - 1:30 PM | 5:30 PM - 9:30 PM" },
                  { day: "Monday", time: "Closed" },
                ].map(({ day, time }) => (
                  <div
                    key={day}
                    className="flex flex-col sm:flex-row sm:justify-between text-text-muted gap-0.5"
                  >
                    <span className="font-medium">{day}</span>
                    <span className="font-semibold text-primary-DEFAULT text-[11px] sm:text-sm">
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div
              id="map"
              className="mt-6 rounded-2xl overflow-hidden border border-border-DEFAULT shadow-card"
              style={{ height: "240px" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15131.932971842858!2d73.84742784863282!3d18.52043029999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c069eb070001%3A0x28975855f309a909!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Shreepad Enterprises Live Location Pune"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div ref={rightRef}>
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="p-5 sm:p-6 md:p-8 rounded-3xl border border-border-DEFAULT bg-white shadow-luxury"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Zap size={20} className="text-accent-DEFAULT" />
                  <h3 className="font-heading text-xl font-semibold text-primary-DEFAULT">
                    Send a Message
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
                    <label htmlFor="contact-subject">Subject</label>
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
                  suppressHydrationWarning
                >
                  <span className="flex items-center gap-2">
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    {submitting ? "Sending..." : "Send Message"}
                  </span>
                </button>

                <p className="text-xs text-text-muted font-body text-center mt-4">
                  We typically respond within 2-4 hours during business hours.
                </p>
              </form>
            ) : (
              <div className="contact-success p-8 rounded-3xl border border-border-DEFAULT bg-white shadow-luxury flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-primary-DEFAULT mb-2">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-text-muted font-body">
                    Thank you for reaching out! Our team will get back to you
                    within 24 hours.
                  </p>
                </div>
                <a
                  href="https://wa.me/917709747803"
                  className="btn-primary-luxury"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Need faster response? WhatsApp us</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
