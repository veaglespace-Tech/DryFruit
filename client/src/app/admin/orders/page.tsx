'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, Calendar, Eye, MessageSquare, Check, Trash2, ShieldAlert } from 'lucide-react';
import { adminApi } from '@/lib/api';
import toast from 'react-hot-toast';

interface OrderLead {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  created_at: string;
}

export default function AdminOrdersPage() {
  const [leads, setLeads] = useState<OrderLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<OrderLead | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getContacts({ type: 'order' });
      if (res.data?.success) {
        setLeads(res.data.data);
      }
    } catch (e: any) {
      toast.error('Failed to load order leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id: number, status: OrderLead['status']) => {
    try {
      const res = await adminApi.updateContactStatus(id, { status });
      if (res.data?.success) {
        setLeads(prev =>
          prev.map(lead => lead.id === id ? { ...lead, status } : lead)
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(prev => prev ? { ...prev, status } : null);
        }
        toast.success(`Order status updated to ${status}`);
      }
    } catch (err: any) {
      toast.error('Failed to update order status');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to close this order lead?')) {
      try {
        await adminApi.updateContactStatus(id, { status: 'closed' });
        setLeads(prev => prev.filter(lead => lead.id !== id));
        if (selectedLead && selectedLead.id === id) setSelectedLead(null);
        toast.success('Order marked as closed');
      } catch (err) {
        toast.error('Failed to close order');
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Listing column */}
      <div className="lg:col-span-2 bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card">
        <h2 className="font-heading text-lg font-bold text-primary-DEFAULT mb-4 flex items-center gap-2">
          <ShoppingBag size={18} className="text-accent-DEFAULT" />
          Pre-Order Leads
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-accent-DEFAULT border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs text-text-muted font-body">Loading orders...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border-DEFAULT rounded-xl">
            <ShoppingBag size={32} className="mx-auto text-text-muted mb-2" />
            <p className="font-heading text-primary-DEFAULT font-semibold text-sm">No Pre-Orders Found</p>
            <p className="text-xxs text-text-muted font-body mt-1">Pre-order leads submitted from checkout page will appear here.</p>
          </div>
        ) : (
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
                      <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-xxs font-button font-bold animate-pulse">New</span>
                    )}
                  </div>
                  <p className="text-xs font-body font-semibold text-[#D4A95A] truncate">{lead.subject || 'Order Inquiry'}</p>
                  <p className="text-xxs text-text-muted font-body flex items-center gap-1">
                    <Calendar size={10} />
                    {new Date(lead.created_at || Date.now()).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    })}
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
                    title="Close Order"
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
                Order Lead Details
              </h3>
              <div className="space-y-2 text-xs font-body text-text-muted">
                <p><strong className="text-primary-DEFAULT">Customer Name:</strong> {selectedLead.name}</p>
                {selectedLead.email && <p><strong className="text-primary-DEFAULT">Email:</strong> {selectedLead.email}</p>}
                {selectedLead.phone && (
                  <p>
                    <strong className="text-primary-DEFAULT">Phone:</strong>{' '}
                    <a href={`tel:${selectedLead.phone}`} className="text-accent-DEFAULT hover:underline">{selectedLead.phone}</a>
                  </p>
                )}
                <p><strong className="text-primary-DEFAULT">Grand Total:</strong> {selectedLead.subject}</p>
                <p><strong className="text-primary-DEFAULT">Received At:</strong> {new Date(selectedLead.created_at || Date.now()).toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-xs font-bold text-primary-DEFAULT mb-2">Order Items & Shipping Details:</h4>
              <p className="p-3 bg-background border border-border-light rounded-xl text-xs font-body text-text-DEFAULT leading-relaxed whitespace-pre-line font-mono">
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
                  href={`https://wa.me/91${selectedLead.phone}?text=Hi%20${encodeURIComponent(selectedLead.name)},%20this%20is%20Shreepad%20Enterprises.%20We%20received%20your%20order%20for%20${encodeURIComponent(selectedLead.subject || '')}.`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full py-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-xl flex items-center justify-center gap-1.5 text-xs font-button font-bold mt-3 transition-colors"
                >
                  <MessageSquare size={14} />
                  Connect on WhatsApp
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag size={32} className="mx-auto text-text-muted mb-2" />
            <p className="font-heading text-primary-DEFAULT font-semibold text-sm">No Order Selected</p>
            <p className="text-xxs text-text-muted font-body mt-1">Select an order lead from the list to view items and address</p>
          </div>
        )}
      </div>
    </div>
  );
}
