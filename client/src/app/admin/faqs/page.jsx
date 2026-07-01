"use client";

import { useEffect, useState } from "react";
import { HelpCircle, Plus, Trash2 } from "lucide-react";
import { adminApi } from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State for new FAQ
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");
  const [submitting, setSubmitting] = useState(false);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getFAQs();
      if (res.data?.success) {
        setFaqs(res.data.data);
      }
    } catch (e) {
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleAddFAQ = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await adminApi.createFAQ({ question, answer, category });
      if (res.data?.success) {
        toast.success("FAQ added successfully!");
        setQuestion("");
        setAnswer("");
        setCategory("General");
        fetchFAQs();
      }
    } catch (err) {
      toast.error("Failed to create FAQ");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        const res = await adminApi.deleteFAQ(id);
        if (res.data?.success) {
          toast.success("FAQ deleted");
          setFaqs((prev) => prev.filter((f) => f.id !== id));
        }
      } catch (err) {
        toast.error("Failed to delete FAQ");
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* List Column */}
      <div className="lg:col-span-2 bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card space-y-4">
        <h2 className="font-heading text-lg font-bold text-primary-DEFAULT flex items-center gap-2">
          <HelpCircle size={18} className="text-accent-DEFAULT" />
          Frequently Asked Questions
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-accent-DEFAULT border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs text-text-muted font-body">Loading FAQs...</p>
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border-DEFAULT rounded-xl">
            <HelpCircle size={32} className="mx-auto text-text-muted mb-2" />
            <p className="font-heading text-primary-DEFAULT font-semibold text-sm">
              No FAQs Found
            </p>
            <p className="text-xxs text-text-muted font-body mt-1">
              Create frequently asked questions for client self-help.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="p-4 border border-border-light rounded-xl bg-white shadow-sm flex flex-col gap-2"
              >
                <div className="flex justify-between items-start gap-4">
                  <span className="px-2 py-0.5 rounded-full bg-accent-DEFAULT/10 text-primary-DEFAULT text-[9px] font-bold uppercase">
                    {faq.category || "General"}
                  </span>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="p-1 hover:text-red-500 text-text-muted transition-colors flex-shrink-0"
                    title="Delete FAQ"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div>
                  <h3 className="font-heading text-xs font-bold text-primary-DEFAULT">
                    Q: {faq.question}
                  </h3>
                  <p className="text-xxs text-text-DEFAULT leading-relaxed mt-1">
                    A: {faq.answer}
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
          Add New FAQ
        </h2>

        <form onSubmit={handleAddFAQ} className="space-y-4">
          <div className="form-floating">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder=" "
              required
              id="faq-q"
            />
            <label htmlFor="faq-q">Question *</label>
          </div>

          <div className="form-floating">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder=" "
              required
              rows={4}
              id="faq-a"
              className="!py-3"
            />
            <label htmlFor="faq-a">Answer *</label>
          </div>

          <div className="form-floating">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="faq-cat"
              className="w-full border border-border-DEFAULT rounded-xl px-3 py-3 text-xs bg-white text-text-DEFAULT outline-none focus:border-primary-DEFAULT transition-all"
            >
              <option value="General">General Inquiries</option>
              <option value="Shipping">Shipping & Delivery</option>
              <option value="Payment">Payments & Refunds</option>
              <option value="Quality">Product Quality</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary-luxury w-full justify-center py-2.5 text-xs font-bold flex items-center gap-1.5"
          >
            <Plus size={14} />
            {submitting ? "Submitting..." : "Add FAQ"}
          </button>
        </form>
      </div>
    </div>
  );
}
