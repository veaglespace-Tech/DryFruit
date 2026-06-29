'use client';

import { useEffect, useState } from 'react';
import { Mail, Calendar, Eye, MessageSquare, Check, Trash2, ArrowUpRight } from 'lucide-react';
import { adminApi } from '@/lib/api';
import toast from 'react-hot-toast';

interface ContactLead {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  created_at: string;
}

const MOCK_LEADS: ContactLead[] = [
  {
    id: 1, name: 'Priya Sharma', email: 'priya@gmail.com', phone: '9876543210',
    subject: 'Pre-Order Inquiry [Total: ₹1,398]',
    message: 'Order Items: Premium California Almonds (500g) x 1, Kashmiri Walnuts (500g) x 1. Shipping Address: Flat 402, Sunshine Apts, Bandra, Mumbai.',
    status: 'new', created_at: '29 Jun 2026'
  },
  {
    id: 2, name: 'Rajesh Mehta', email: 'rajesh@yahoo.com', phone: '9823012345',
    subject: 'Bulk discount request',
    message: 'Hello, I want to order 25kg of roasted pistachios for a corporate event. Do you offer bulk discounts or custom gift boxes?',
    status: 'replied', created_at: '28 Jun 2026'
  },
  {
    id: 3, name: 'Amit Patel', email: 'amit@gmail.com', phone: '9988776655',
    subject: 'Pre-Order Inquiry [Total: ₹799]',
    message: 'Order Items: Whole Cashews W240 (500g) x 1. Shipping Address: 12, Green Heights, Kothrud, Pune.',
    status: 'read', created_at: '27 Jun 2026'
  }
];

export default function AdminContactsPage() {
  const [leads, setLeads] = useState<ContactLead[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);

  const handleUpdateStatus = (id: number, status: ContactLead['status']) => {
    setLeads(prev =>
      prev.map(lead => lead.id === id ? { ...lead, status } : lead)
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => prev ? { ...prev, status } : null);
    }
    toast.success(`Lead status updated to ${status}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(prev => prev.filter(lead => lead.id !== id));
      if (selectedLead && selectedLead.id === id) setSelectedLead(null);
      toast.success('Lead deleted');
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Listing column */}
      <div className="lg:col-span-2 bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card">
        <h2 className="font-heading text-lg font-bold text-primary-DEFAULT mb-4 flex items-center gap-2">
          <Mail size={18} className="text-accent-DEFAULT" />
          Inquiry & Pre-Order Leads
        </h2>

        <div className="space-y-3">
          {leads.map(lead => (
            <div
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className={`p-4 border rounded-xl cursor-pointer transition-all flex justify-between items-start gap-4 ${
                selectedLead?.id === lead.id
                  ? 'border-accent-DEFAULT bg-primary-50/30'
                  : 'border-border-light hover:border-border-DEFAULT bg-white'
              }`}
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-heading font-semibold text-sm text-primary-DEFAULT">{lead.name}</span>
                  {lead.status === 'new' && (
                    <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-xxs font-button font-bold">New</span>
                  )}
                </div>
                <p className="text-xs font-body font-medium text-text-DEFAULT truncate">{lead.subject}</p>
                <p className="text-xxs text-text-muted font-body flex items-center gap-1">
                  <Calendar size={10} />
                  {lead.created_at}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded-full text-xxs font-button font-bold capitalize ${
                  lead.status === 'replied' ? 'bg-green-50 text-green-700' :
                  lead.status === 'read' ? 'bg-blue-50 text-blue-700' :
                  lead.status === 'new' ? 'bg-red-50 text-red-700' : 'bg-stone-100 text-stone-700'
                }`}>
                  {lead.status}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }}
                  className="p-1 hover:text-red-500 text-text-muted transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
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
                <p><strong className="text-primary-DEFAULT">Name:</strong> {selectedLead.name}</p>
                {selectedLead.email && <p><strong className="text-primary-DEFAULT">Email:</strong> {selectedLead.email}</p>}
                {selectedLead.phone && (
                  <p>
                    <strong className="text-primary-DEFAULT">Phone:</strong>{' '}
                    <a href={`tel:${selectedLead.phone}`} className="text-accent-DEFAULT hover:underline">{selectedLead.phone}</a>
                  </p>
                )}
                <p><strong className="text-primary-DEFAULT">Subject:</strong> {selectedLead.subject}</p>
                <p><strong className="text-primary-DEFAULT">Date:</strong> {selectedLead.created_at}</p>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-xs font-bold text-primary-DEFAULT mb-2">Message Body:</h4>
              <p className="p-3 bg-background border border-border-light rounded-xl text-xs font-body text-text-DEFAULT leading-relaxed whitespace-pre-line">
                {selectedLead.message}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2 border-t border-border-light pt-4">
              <h4 className="font-heading text-xs font-bold text-primary-DEFAULT mb-2">Action / Status:</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Read', val: 'read' as const, bg: 'hover:bg-blue-50 hover:text-blue-700' },
                  { label: 'Replied', val: 'replied' as const, bg: 'hover:bg-green-50 hover:text-green-700' },
                  { label: 'Closed', val: 'closed' as const, bg: 'hover:bg-stone-50 hover:text-stone-700' },
                ].map(action => (
                  <button
                    key={action.val}
                    onClick={() => handleUpdateStatus(selectedLead.id, action.val)}
                    className={`flex-1 py-1.5 border border-border-DEFAULT rounded-lg text-xxs font-button font-bold text-text-muted transition-colors ${action.bg}`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
              {selectedLead.phone && (
                <a
                  href={`https://wa.me/91${selectedLead.phone}?text=Hi%20${encodeURIComponent(selectedLead.name)},%20this%20is%20NutriRoots.%20We%20received%20your%20inquiry.`}
                  target="_blank" rel="noopener noreferrer"
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
            <p className="font-heading text-primary-DEFAULT font-semibold text-sm">No Lead Selected</p>
            <p className="text-xxs text-text-muted font-body mt-1">Select a lead from the list to view its contents</p>
          </div>
        )}
      </div>
    </div>
  );
}
