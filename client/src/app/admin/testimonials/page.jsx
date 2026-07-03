"use client";

import { useState } from "react";
import { MessageSquare, Plus, Trash2, Star } from "lucide-react";
import {
  useGetAdminTestimonialsQuery,
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,
} from "@/store/api/apiSlice";
import toast from "react-hot-toast";

export default function AdminTestimonialsPage() {
  const { data: testimonialsData, isLoading: loading } = useGetAdminTestimonialsQuery();
  const [createTestimonial] = useCreateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const testimonials = testimonialsData?.data || testimonialsData || [];

  // Form State for new Testimonial
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("role", role || "Happy Customer");
      formData.append("comment", comment);
      formData.append("rating", rating.toString());
      formData.append("is_active", "true");
      if (file) {
        formData.append("avatar", file);
      }

      await createTestimonial(formData).unwrap();
      toast.success("Testimonial added successfully!");
      setName("");
      setRole("");
      setComment("");
      setRating(5);
      setFile(null);
    } catch (err) {
      toast.error(err.data?.message || "Failed to create testimonial");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteTestimonial(id).unwrap();
        toast.success("Testimonial deleted");
      } catch (err) {
        toast.error("Failed to delete testimonial");
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* List Column */}
      <div className="lg:col-span-2 bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card space-y-4">
        <h2 className="font-heading text-lg font-bold text-primary-DEFAULT flex items-center gap-2">
          <MessageSquare size={18} className="text-accent-DEFAULT" />
          Testimonials List
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-accent-DEFAULT border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs text-text-muted font-body">
              Loading testimonials...
            </p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border-DEFAULT rounded-xl">
            <MessageSquare size={32} className="mx-auto text-text-muted mb-2" />
            <p className="font-heading text-primary-DEFAULT font-semibold text-sm">
              No Testimonials Found
            </p>
            <p className="text-xxs text-text-muted font-body mt-1">
              Add client reviews to display in the website slider.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-4 border border-border-light rounded-xl bg-white shadow-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-accent-DEFAULT/10 flex items-center justify-center text-primary-DEFAULT font-bold flex-shrink-0 overflow-hidden">
                  {testimonial.avatar_url ? (
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    testimonial.name[0].toUpperCase()
                  )}
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-heading text-xs font-bold text-primary-DEFAULT truncate">
                        {testimonial.name}
                      </h3>
                      <p className="text-[10px] text-text-muted">
                        {testimonial.role || "Happy Customer"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-1 hover:text-red-500 text-text-muted transition-colors"
                      title="Delete testimonial"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className="fill-accent-DEFAULT text-accent-DEFAULT"
                      />
                    ))}
                  </div>
                  <p className="text-xxs text-text-DEFAULT leading-relaxed italic">
                    "{testimonial.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Column */}
      <div className="lg:col-span-1 bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card h-fit space-y-4">
        <h2 className="font-heading text-base font-bold text-primary-DEFAULT border-b border-border-light pb-2">
          Add New Testimonial
        </h2>

        <form onSubmit={handleAddTestimonial} className="space-y-4">
          <div className="form-floating">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              required
              id="test-name"
            />
            <label htmlFor="test-name">Client Name *</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder=" "
              id="test-role"
            />
            <label htmlFor="test-role">Client Role / Profession</label>
          </div>

          <div className="form-floating">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder=" "
              required
              rows={3}
              id="test-comment"
              className="!py-3"
            />
            <label htmlFor="test-comment">Comment / Feedback *</label>
          </div>

          <div className="form-floating">
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              id="test-rating"
              className="w-full border border-border-DEFAULT rounded-xl px-3 py-3 text-xs bg-white text-text-DEFAULT outline-none focus:border-primary-DEFAULT transition-all"
            >
              <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
              <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
              <option value="3">⭐⭐⭐ (3 Stars)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xxs font-bold text-primary-DEFAULT block">
              Select Client Avatar (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-xxs file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xxs file:font-semibold file:bg-primary-50 file:text-primary-DEFAULT hover:file:bg-primary-100 cursor-pointer border border-border-DEFAULT p-2 rounded-xl"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary-luxury w-full justify-center py-2.5 text-xs font-bold flex items-center gap-1.5"
          >
            <Plus size={14} />
            {submitting ? "Submitting..." : "Add Testimonial"}
          </button>
        </form>
      </div>
    </div>
  );
}
