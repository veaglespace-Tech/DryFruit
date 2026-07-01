"use client";

import { useEffect, useState } from "react";
import { Mail, Calendar, MessageSquare, Trash2 } from "lucide-react";
import { adminApi } from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminContactsPage() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getContacts({ type: "enquiry" });
      if (res.data?.success) {
        setLeads(res.data.data);
      }
    } catch (e) {
      toast.error("Failed to load enquiry leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await adminApi.updateContactStatus(id, { status });
      if (res.data?.success) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status } : null));
        }
        toast.success(`Lead status updated to ${status}`);
      }
    } catch (err) {
      toast.error("Failed to update lead status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to close this lead?")) {
      try {
        await adminApi.updateContactStatus(id, { status: "closed" });
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
        if (selectedLead && selectedLead.id === id) setSelectedLead(null);
        toast.success("Lead marked as closed");
      } catch (err) {
        toast.error("Failed to close lead");
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Listing column */}
      <div className="lg:col-span-2 bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card">
        <h2 className="font-heading text-lg font-bold text-primary-DEFAULT mb-4 flex items-center gap-2">
          <Mail size={18} className="text-accent-DEFAULT" />
          Enquiry Leads
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-accent-DEFAULT border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs text-text-muted font-body">
              Loading enquiries...
            </p>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border-DEFAULT rounded-xl">
            <Mail size={32} className="mx-auto text-text-muted mb-2" />
            <p className="font-heading text-primary-DEFAULT font-semibold text-sm">
              No Enquiries Found
            </p>
            <p className="text-xxs text-text-muted font-body mt-1">
              General messages from contact us or footer forms will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`p-4 border rounded-xl cursor-pointer transition-all flex justify-between items-start gap-4 ${
                  selectedLead?.id === lead.id
                    ? "border-accent-DEFAULT bg-primary-50/30"
                    : "border-border-light hover:border-border-DEFAULT bg-white"
                }`}
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading font-semibold text-sm text-primary-DEFAULT">
                      {lead.name}
                    </span>
                    {lead.status === "new" && (
                      <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-xxs font-button font-bold animate-pulse">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-body font-medium text-text-DEFAULT truncate">
                    {lead.subject || "No Subject"}
                  </p>
                  <p className="text-xxs text-text-muted font-body flex items-center gap-1">
                    <Calendar size={10} />
                    {new Date(lead.created_at || Date.now()).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xxs font-button font-bold capitalize ${
                      lead.status === "replied"
                        ? "bg-green-50 text-green-700"
                        : lead.status === "read"
                          ? "bg-blue-50 text-blue-700"
                          : lead.status === "new"
                            ? "bg-red-50 text-red-700"
                            : "bg-stone-100 text-stone-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(lead.id);
                    }}
                    className="p-1 hover:text-red-500 text-text-muted transition-colors"
                    title="Close Lead"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details column */}
      <div className="lg:col-span-1 bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card h-fit">
        {selectedLead ? (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-base font-bold text-primary-DEFAULT border-b border-border-light pb-2 mb-3">
                Lead Details
              </h3>
              <div className="space-y-2 text-xs font-body text-text-muted">
                <p>
                  <strong className="text-primary-DEFAULT">Name:</strong>{" "}
                  {selectedLead.name}
                </p>
                {selectedLead.email && (
                  <p>
                    <strong className="text-primary-DEFAULT">Email:</strong>{" "}
                    {selectedLead.email}
                  </p>
                )}
                {selectedLead.phone && (
                  <p>
                    <strong className="text-primary-DEFAULT">Phone:</strong>{" "}
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="text-accent-DEFAULT hover:underline"
                    >
                      {selectedLead.phone}
                    </a>
                  </p>
                )}
                <p>
                  <strong className="text-primary-DEFAULT">Subject:</strong>{" "}
                  {selectedLead.subject}
                </p>
                <p>
                  <strong className="text-primary-DEFAULT">Date:</strong>{" "}
                  {new Date(
                    selectedLead.created_at || Date.now(),
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-xs font-bold text-primary-DEFAULT mb-2">
                Message Body:
              </h4>
              <p className="p-3 bg-background border border-border-light rounded-xl text-xs font-body text-text-DEFAULT leading-relaxed whitespace-pre-line font-mono">
                {selectedLead.message}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2 border-t border-border-light pt-4">
              <h4 className="font-heading text-xs font-bold text-primary-DEFAULT mb-2">
                Action / Status:
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    label: "Read",
                    val: "read",
                    bg: "hover:bg-blue-50 hover:text-blue-700",
                  },
                  {
                    label: "Replied",
                    val: "replied",
                    bg: "hover:bg-green-50 hover:text-green-700",
                  },
                  {
                    label: "Closed",
                    val: "closed",
                    bg: "hover:bg-stone-50 hover:text-stone-700",
                  },
                ].map((action) => (
                  <button
                    key={action.val}
                    onClick={() =>
                      handleUpdateStatus(selectedLead.id, action.val)
                    }
                    className={`flex-1 py-1.5 border border-border-DEFAULT rounded-lg text-xxs font-button font-bold text-text-muted transition-colors ${action.bg}`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
              {selectedLead.phone && (
                <a
                  href={`https://wa.me/91${selectedLead.phone}?text=Hi%20${encodeURIComponent(selectedLead.name)},%20this%20is%20Shreepad%20Enterprises.%20We%20received%20your%20message.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-xl flex items-center justify-center gap-1.5 text-xs font-button font-bold mt-3 transition-colors"
                >
                  <MessageSquare size={14} />
                  Reply on WhatsApp
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Mail size={32} className="mx-auto text-text-muted mb-2" />
            <p className="font-heading text-primary-DEFAULT font-semibold text-sm">
              No Lead Selected
            </p>
            <p className="text-xxs text-text-muted font-body mt-1">
              Select a lead from the list to view its contents
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
