'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User, Mail, Phone, MapPin, LogOut, ArrowLeft,
  Settings, ShoppingBag, Eye, Lock, Edit2, CheckCircle2, Leaf
} from 'lucide-react';
import { publicApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Mock user inquiry/order history logs for listing
const MOCK_INQUIRIES = [
  { id: 'INQ-4819', date: '28 Jun 2026', total: 1398, items: 'Premium California Almonds (500g) x 1, Kashmiri Walnuts (500g) x 1', status: 'delivered' },
  { id: 'INQ-3920', date: '15 May 2026', total: 799, items: 'Whole Cashews W240 (500g) x 1', status: 'shipped' },
  { id: 'INQ-1829', date: '04 Apr 2026', total: 1848, items: 'Iranian Roasted Pistachios (500g) x 1, Medjool Dates (500g) x 1', status: 'replied' },
];

export default function UserDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<{ name: string; email: string; phone?: string; address?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Edit fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('nutriroots_user_token');
    const userData = localStorage.getItem('nutriroots_user');

    if (!token) {
      router.push('/user/login');
      return;
    }

    if (userData) {
      const parsed = JSON.parse(userData);
      setProfile(parsed);
      setName(parsed.name || '');
      setPhone(parsed.phone || '');
      setAddress(parsed.address || '');
    }
  }, [router]);

  useGSAP(() => {
    gsap.fromTo('.dashboard-card', { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
    });
  }, { scope: dashboardRef });

  const handleLogout = () => {
    localStorage.removeItem('nutriroots_user_token');
    localStorage.removeItem('nutriroots_user');
    toast.success('Logged out successfully');
    router.push('/user/login');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: Record<string, string> = { name, phone, address };
      if (password) payload.password = password;

      const res = await publicApi.updateProfile(payload);
      setProfile(res.data.user);
      localStorage.setItem('nutriroots_user', JSON.stringify(res.data.user));
      setIsEditing(false);
      setPassword('');
      toast.success('Profile details updated successfully! 🌿');
    } catch (err: any) {
      toast.error('Failed to update profile. Please try again.');
    }
    setLoading(false);
  };

  if (!profile) return null;

  return (
    <div ref={dashboardRef} className="min-h-screen bg-background" style={{ background: '#FFFDF8' }}>
      {/* Navbar Mock header */}
      <header className="bg-primary-DEFAULT text-white py-4 shadow-luxury relative z-10">
        <div className="container-luxury flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <Leaf size={18} className="text-accent-DEFAULT" />
            </div>
            <span className="font-heading text-lg font-bold">NutriRoots</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-button text-white/80 hover:text-white transition-colors">
              Back to Store
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-red-500/20 text-xs font-button font-medium border border-white/10 transition-colors"
            >
              <LogOut size={12} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid content */}
      <div className="container-luxury py-10">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left panel: Summary */}
          <div className="dashboard-card lg:col-span-1 bg-white border border-border-DEFAULT rounded-3xl p-6 shadow-luxury">
            <div className="flex flex-col items-center text-center pb-6 border-b border-border-light mb-6">
              <div className="w-20 h-20 rounded-full bg-primary-50 border border-primary-DEFAULT/25 flex items-center justify-center mb-4 text-primary-DEFAULT font-bold text-3xl font-heading">
                {profile.name[0].toUpperCase()}
              </div>
              <h2 className="font-heading text-xl font-bold text-primary-DEFAULT">{profile.name}</h2>
              <p className="text-xs text-text-muted font-body mt-1">Customer Account</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-text-muted font-body">
                <Mail size={16} className="text-accent-DEFAULT" />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-muted font-body">
                <Phone size={16} className="text-accent-DEFAULT" />
                <span>{profile.phone || 'No phone set'}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-text-muted font-body">
                <MapPin size={16} className="text-accent-DEFAULT mt-0.5" />
                <span className="leading-snug">{profile.address || 'No shipping address set'}</span>
              </div>
            </div>

            <button
              onClick={() => { setActiveTab('profile'); setIsEditing(true); }}
              className="w-full mt-6 py-2.5 rounded-xl border border-primary-DEFAULT/20 text-primary-DEFAULT hover:bg-primary-DEFAULT hover:text-white transition-all duration-300 font-button font-semibold text-xs flex items-center justify-center gap-1.5"
            >
              <Edit2 size={12} />
              Edit Profile
            </button>
          </div>

          {/* Right Panel: Content tabs */}
          <div className="dashboard-card lg:col-span-2 space-y-6">
            {/* Tabs toggle */}
            <div className="flex border-b border-border-DEFAULT">
              {[
                { id: 'orders', label: 'Order Inquiries', icon: ShoppingBag },
                { id: 'profile', label: 'Account Details', icon: User },
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as any); if (tab.id !== 'profile') setIsEditing(false); }}
                    className={`flex items-center gap-2 pb-4 px-6 font-heading font-semibold text-sm md:text-base border-b-2 transition-all ${
                      activeTab === tab.id
                        ? 'border-primary-DEFAULT text-primary-DEFAULT'
                        : 'border-transparent text-text-muted hover:text-primary-DEFAULT'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab content conditional rendering */}
            <div className="bg-white border border-border-DEFAULT rounded-3xl p-6 shadow-luxury min-h-[300px]">
              {activeTab === 'orders' && (
                <div>
                  <h3 className="font-heading text-lg font-bold text-primary-DEFAULT mb-4">Inquiry History</h3>
                  <div className="space-y-4">
                    {MOCK_INQUIRIES.map(inq => (
                      <div key={inq.id} className="p-4 border border-border-light hover:border-border-DEFAULT rounded-2xl flex flex-col md:flex-row justify-between gap-4 transition-all">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-button font-bold text-sm text-primary-DEFAULT">{inq.id}</span>
                            <span className="text-xxs font-body text-text-muted">{inq.date}</span>
                          </div>
                          <p className="text-xs font-body text-text-muted line-clamp-1">{inq.items}</p>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-6">
                          <span className="font-heading text-base font-bold text-primary-DEFAULT">₹{inq.total}</span>
                          <span className={`px-2.5 py-1 rounded-full text-xxs font-button font-bold capitalize ${
                            inq.status === 'delivered' ? 'bg-green-50 text-green-700' :
                            inq.status === 'shipped' ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h3 className="font-heading text-lg font-bold text-primary-DEFAULT mb-4">Account Information</h3>
                  {!isEditing ? (
                    <div className="space-y-4 font-body text-sm">
                      <div className="flex justify-between py-2 border-b border-border-light text-text-muted">
                        <span>Full Name</span>
                        <span className="font-semibold text-primary-DEFAULT">{profile.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border-light text-text-muted">
                        <span>Email Address</span>
                        <span className="font-semibold text-primary-DEFAULT">{profile.email}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border-light text-text-muted">
                        <span>Phone Number</span>
                        <span className="font-semibold text-primary-DEFAULT">{profile.phone || 'Not provided'}</span>
                      </div>
                      <div className="py-2 text-text-muted flex flex-col gap-1">
                        <span>Default Shipping Address</span>
                        <span className="font-semibold text-primary-DEFAULT mt-1 p-3 bg-background rounded-xl border border-border-light">{profile.address || 'Not provided'}</span>
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn-primary-luxury text-xs px-5 py-2.5 mt-2"
                      >
                        Edit Details
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      {/* Name */}
                      <div className="form-floating">
                        <input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder=" "
                          required
                          id="edit-name"
                        />
                        <label htmlFor="edit-name">Full Name *</label>
                      </div>

                      {/* Phone */}
                      <div className="form-floating">
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder=" "
                          id="edit-phone"
                        />
                        <label htmlFor="edit-phone">Phone Number</label>
                      </div>

                      {/* Address */}
                      <div className="form-floating">
                        <textarea
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                          placeholder=" "
                          rows={3}
                          id="edit-address"
                          className="!py-3"
                        />
                        <label htmlFor="edit-address">Shipping Address</label>
                      </div>

                      {/* Password */}
                      <div className="form-floating">
                        <input
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder=" "
                          id="edit-password"
                        />
                        <label htmlFor="edit-password">New Password (leave blank to keep current)</label>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn-primary-luxury text-xs px-5 py-2.5"
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-5 py-2.5 border border-border-DEFAULT text-text-muted hover:bg-background rounded-xl font-button text-xs transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
