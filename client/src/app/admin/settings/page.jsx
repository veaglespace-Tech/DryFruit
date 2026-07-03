"use client";

import { useState } from "react";
import { Settings, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);

  // Settings state
  const [siteName, setSiteName] = useState("Shreepad Enterprises");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [whatsapp, setWhatsapp] = useState("+91 98765 43210");
  const [email, setEmail] = useState("hello@shreepadenterprises.com");
  const [address, setAddress] = useState(
    "123, Green Valley Road, Pune, Maharashtra 411001",
  );
  const [announcementText, setAnnouncementText] = useState(
    "🌿 Free delivery on orders above ₹999 | ✨ 100% Natural & Chemical Free",
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API submit or hit real backend API if running
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Site settings updated successfully! 🌿");
    } catch (err) {
      toast.error("Failed to update settings.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-border-DEFAULT rounded-2xl p-6 md:p-8 shadow-card space-y-6">
      <div className="flex items-center gap-3 border-b border-border-light pb-4">
        <Settings size={22} className="text-accent-DEFAULT" />
        <div>
          <h1 className="font-heading text-xl font-bold text-primary-DEFAULT">
            Site Settings
          </h1>
          <p className="text-xs text-text-muted font-body">
            Manage global metadata and information
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 font-body">
        {/* Site Name */}
        <div className="form-floating">
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder=" "
            required
            id="settings-name"
          />

          <label htmlFor="settings-name">Store Name *</label>
        </div>

        {/* Announcement Bar text */}
        <div className="form-floating">
          <textarea
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            placeholder=" "
            rows={2}
            id="settings-announcement"
            className="!py-3 text-sm"
          />

          <label htmlFor="settings-announcement">Announcement Bar Text *</label>
        </div>

        {/* Contact info grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-floating">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder=" "
              required
              id="settings-phone"
            />

            <label htmlFor="settings-phone">Phone Number *</label>
          </div>
          <div className="form-floating">
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder=" "
              required
              id="settings-whatsapp"
            />

            <label htmlFor="settings-whatsapp">WhatsApp Number *</label>
          </div>
        </div>

        <div className="form-floating">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            required
            id="settings-email"
          />

          <label htmlFor="settings-email">Customer Support Email *</label>
        </div>

        <div className="form-floating">
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder=" "
            rows={3}
            required
            id="settings-address"
            className="!py-3 text-sm"
          />

          <label htmlFor="settings-address">Default Office Address *</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary-luxury w-full justify-center py-3 text-xs"
        >
          <Save size={14} />
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
