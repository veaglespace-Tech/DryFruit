"use client";

import { useState, useEffect } from "react";
import { Settings, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Settings state
  const [siteName, setSiteName] = useState("Shreepad Enterprises");
  const [phone, setPhone] = useState("+91 98609 41171");
  const [whatsapp, setWhatsapp] = useState("+91 77097 47803");
  const [email, setEmail] = useState("shreepadenterprises.tech@gmail.com");
  const [address, setAddress] = useState(
    "123, Green Valley Road, Pune, Maharashtra 411001",
  );
  const [announcementText, setAnnouncementText] = useState(
    "🌿 Free delivery on orders above ₹999 | Use code FIRST10 for 10% off your first order!",
  );

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("shreepad_admin_token")
      : null;

  // Load existing settings from DB
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("http://localhost:5000/api/settings");
        const data = await res.json();
        if (data.success && data.data) {
          const s = data.data;
          if (s.site_name) setSiteName(s.site_name);
          if (s.phone) setPhone(s.phone);
          if (s.whatsapp) setWhatsapp(s.whatsapp);
          if (s.email) setEmail(s.email);
          if (s.address) setAddress(s.address);
          if (s.announcement) setAnnouncementText(s.announcement);
        }
      } catch (err) {
        console.error("Failed to load settings from server:", err);
      } finally {
        setFetching(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        site_name: siteName,
        phone,
        whatsapp,
        email,
        address,
        announcement: announcementText,
      };

      const res = await fetch("http://localhost:5000/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Site settings updated successfully & saved to DB! 🌿");
      } else {
        toast.error(data.message || "Failed to update settings.");
      }
    } catch (err) {
      console.error("Failed to save settings:", err);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
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
            Manage global metadata and information (Saved directly in MySQL DB)
          </p>
        </div>
      </div>

      {fetching ? (
        <div className="text-center py-8 text-xs font-body text-text-muted">
          Loading site settings...
        </div>
      ) : (
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
              suppressHydrationWarning
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
              suppressHydrationWarning
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
                suppressHydrationWarning
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
                suppressHydrationWarning
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
              suppressHydrationWarning
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
              suppressHydrationWarning
            />
            <label htmlFor="settings-address">Default Office Address *</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary-luxury w-full justify-center py-3 text-xs"
            suppressHydrationWarning
          >
            <span className="flex items-center gap-2">
              <Save size={14} />
              {loading ? "Saving to DB..." : "Save Settings"}
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
