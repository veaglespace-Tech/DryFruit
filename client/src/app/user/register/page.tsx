'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Leaf, Eye, EyeOff, User, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { publicApi } from '@/lib/api';
import toast from 'react-hot-toast';

export default function UserRegisterPage() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('nutriroots_user_token');
    if (token) router.push('/user/dashboard');
  }, [router]);

  useGSAP(() => {
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }
    );
  }, { scope: formRef });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await publicApi.register({ name, email, password, phone, address });
      localStorage.setItem('nutriroots_user_token', res.data.token);
      localStorage.setItem('nutriroots_user', JSON.stringify(res.data.user));
      toast.success('Registration successful! Welcome to the family 🌿');
      router.push('/user/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please check fields.');
      // Shake animation
      const tl = gsap.timeline();
      tl.to(formRef.current, { x: -10, duration: 0.08 })
        .to(formRef.current, { x: 10, duration: 0.08 })
        .to(formRef.current, { x: -8, duration: 0.08 })
        .to(formRef.current, { x: 8, duration: 0.08 })
        .to(formRef.current, { x: 0, duration: 0.08 });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F5EDE0 0%, #FFFDF8 50%, #EFE7DD 100%)' }}>
      {/* Decorative Blur elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-accent-DEFAULT" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-25 bg-primary-DEFAULT" />

      <div ref={formRef} className="relative w-full max-w-lg z-10 py-10">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-border-DEFAULT shadow-luxury-xl p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="w-12 h-12 rounded-full bg-luxury-gradient flex items-center justify-center shadow-luxury">
                <Leaf size={22} className="text-white" />
              </div>
            </Link>
            <h1 className="font-heading text-2xl font-bold text-primary-DEFAULT">Create Account</h1>
            <p className="text-text-muted font-body text-sm mt-1">Start your journey to organic health Snacking</p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div className="form-floating">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder=" "
                required
                id="user-name"
              />
              <label htmlFor="user-name">Full Name *</label>
              <User size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>

            {/* Email */}
            <div className="form-floating">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder=" "
                required
                id="user-email"
              />
              <label htmlFor="user-email">Email Address *</label>
              <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>

            {/* Password */}
            <div className="form-floating relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder=" "
                required
                id="user-password"
                className="pr-12"
              />
              <label htmlFor="user-password">Password *</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary-DEFAULT"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Phone */}
            <div className="form-floating">
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder=" "
                id="user-phone"
              />
              <label htmlFor="user-phone">Phone Number</label>
              <Phone size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>

            {/* Address */}
            <div className="form-floating">
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder=" "
                rows={3}
                id="user-address"
                className="!py-3"
              />
              <label htmlFor="user-address">Delivery Address</label>
              <MapPin size={16} className="absolute right-4 top-5 text-text-muted" />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary-luxury w-full justify-center py-3.5 mt-2 group"
            >
              <span className="flex items-center gap-2 text-sm font-button font-semibold">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <User size={16} />
                )}
                {loading ? 'Registering...' : 'Register Account'}
                {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>

          {/* Action links */}
          <div className="mt-8 pt-6 border-t border-border-light text-center space-y-3">
            <p className="text-xs text-text-muted font-body">
              Already have an account?{' '}
              <Link href="/user/login" className="text-accent-DEFAULT hover:underline font-semibold">
                Sign in here
              </Link>
            </p>
            <p className="text-xs text-text-muted font-body">
              <Link href="/" className="hover:text-primary-DEFAULT transition-colors">
                ← Back to website
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
