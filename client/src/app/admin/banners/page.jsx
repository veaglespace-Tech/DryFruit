"use client";

import { useState } from "react";
import { Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import {
  useGetAdminBannersQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
} from "@/store/api/apiSlice";
import toast from "react-hot-toast";

export default function AdminBannersPage() {
  const { data: bannersData, isLoading: loading, refetch } = useGetAdminBannersQuery();
  const [createBanner] = useCreateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  const banners = bannersData?.data || bannersData || [];

  // Form State for new Banner
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [position, setPosition] = useState("home_hero");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleAddBanner = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image file");
      return;
    }
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("link_url", linkUrl);
      formData.append("position", position);
      formData.append("is_active", "true");
      formData.append("image", file);

      await createBanner(formData).unwrap();
      toast.success("Banner added successfully!");
      setTitle("");
      setSubtitle("");
      setLinkUrl("");
      setFile(null);
    } catch (err) {
      toast.error(err.data?.message || "Failed to create banner");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await deleteBanner(id).unwrap();
        toast.success("Banner deleted");
      } catch (err) {
        toast.error("Failed to delete banner");
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* List Column */}
      <div className="lg:col-span-2 bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card space-y-4">
        <h2 className="font-heading text-lg font-bold text-primary-DEFAULT flex items-center gap-2">
          <ImageIcon size={18} className="text-accent-DEFAULT" />
          Active Banners
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-accent-DEFAULT border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs text-text-muted font-body">
              Loading banners...
            </p>
          </div>
        ) : banners.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border-DEFAULT rounded-xl">
            <ImageIcon size={32} className="mx-auto text-text-muted mb-2" />
            <p className="font-heading text-primary-DEFAULT font-semibold text-sm">
              No Banners Found
            </p>
            <p className="text-xxs text-text-muted font-body mt-1">
              Upload a hero banner to manage display sliders.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="border border-border-light rounded-xl overflow-hidden shadow-sm flex flex-col bg-white"
              >
                <div className="relative h-32 bg-background">
                  <img
                    src={banner.image_url}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary-DEFAULT text-white text-[9px] font-bold uppercase">
                    {banner.position}
                  </span>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-xs font-bold text-primary-DEFAULT truncate">
                      {banner.title}
                    </h3>
                    {banner.subtitle && (
                      <p className="text-xxs text-text-muted truncate">
                        {banner.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center border-t border-border-light pt-2">
                    <span className="text-xxs text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-bold">
                      Active
                    </span>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="p-1 hover:text-red-500 text-text-muted transition-colors"
                      title="Delete banner"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Column */}
      <div className="lg:col-span-1 bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card h-fit space-y-4">
        <h2 className="font-heading text-base font-bold text-primary-DEFAULT border-b border-border-light pb-2">
          Add New Banner
        </h2>

        <form onSubmit={handleAddBanner} className="space-y-4">
          <div className="form-floating">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=" "
              required
              id="banner-title"
            />
            <label htmlFor="banner-title">Banner Title *</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder=" "
              id="banner-sub"
            />
            <label htmlFor="banner-sub">Subtitle / Slogan</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder=" "
              id="banner-link"
            />
            <label htmlFor="banner-link">Target Link URL</label>
          </div>

          <div className="form-floating">
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              id="banner-pos"
              className="w-full border border-border-DEFAULT rounded-xl px-3 py-3 text-xs bg-white text-text-DEFAULT outline-none focus:border-primary-DEFAULT transition-all"
            >
              <option value="home_hero">Home Hero Slideshow</option>
              <option value="promo_banner">Promo Banner Section</option>
              <option value="footer_ad">Footer Banner</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xxs font-bold text-primary-DEFAULT block">
              Select Banner Image *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="w-full text-xxs file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xxs file:font-semibold file:bg-primary-50 file:text-primary-DEFAULT hover:file:bg-primary-100 cursor-pointer border border-border-DEFAULT p-2 rounded-xl"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary-luxury w-full justify-center py-2.5 text-xs font-bold flex items-center gap-1.5"
          >
            <Plus size={14} />
            {submitting ? "Uploading..." : "Upload Banner"}
          </button>
        </form>
      </div>
    </div>
  );
}
