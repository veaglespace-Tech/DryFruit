'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search, ShoppingBag, Heart, Phone, MessageCircle,
  Menu, X, ChevronDown, Leaf, User
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCart } from '@/store/slices/cartSlice';
import { toggleMobileNav, setMobileNavOpen, setSearchOpen } from '@/store/slices/uiSlice';

import { selectCartCount } from '@/store/slices/cartSlice';

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Products', href: '/products',
    submenu: [
      { label: 'All Products', href: '/products' },
      { label: 'Dry Fruits & Seeds', href: '/products?category=dry-fruits-seeds' },
      { label: 'Oils & Ghee', href: '/products?category=oils-ghee' },
      { label: 'Tea, Coffee & Beverages', href: '/products?category=tea-coffee-beverages' },
      { label: 'Atta, Rice & Dal', href: '/products?category=atta-rice-dal' },
      { label: 'Masala, Spices & Salt', href: '/products?category=masala-spices-salt' },
      { label: 'Breakfast Essentials', href: '/products?category=breakfast-essentials' },
      { label: 'Sauces & Spreads', href: '/products?category=sauces-instant-foods' },
    ],
  },
  { label: 'Categories', href: '/categories' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const isMobileNavOpen = useAppSelector((state) => state.ui.isMobileNavOpen);

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [admin, setAdmin] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('nutriroots_user');
    if (userData) setUser(JSON.parse(userData));

    const adminData = localStorage.getItem('nutriroots_admin');
    if (adminData) setAdmin(JSON.parse(adminData));
  }, []);

  const isDarkHeader = pathname === '/' && !isScrolled;


  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > 200) {
        if (currentScrollY > lastScrollY.current && !isHidden.current) {
          gsap.to(navRef.current, { y: '-100%', duration: 0.3, ease: 'power2.in' });
          isHidden.current = true;
        } else if (currentScrollY < lastScrollY.current && isHidden.current) {
          gsap.to(navRef.current, { y: '0%', duration: 0.4, ease: 'power2.out' });
          isHidden.current = false;
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP entrance
  useGSAP(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2
    });
  }, { scope: navRef });


  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (isMobileNavOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(mobileMenuRef.current, { x: '100%', opacity: 0, duration: 0.3, ease: 'power3.in' });
      document.body.style.overflow = '';
    }
  }, [isMobileNavOpen]);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'navbar-glass shadow-luxury'
            : 'bg-transparent'
        }`}
        style={{ top: '36px' }}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="Shreepad Enterprises Home">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-luxury group-hover:shadow-luxury-lg transition-all duration-300 border border-border-DEFAULT/30">
                <img src="/images/logo.png" alt="Shreepad Enterprises Logo" className="w-full h-full object-cover scale-110" />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-heading text-xl font-bold leading-none tracking-tight"
                  style={{ color: !isDarkHeader ? '#3D2314' : '#fff' }}
                >
                  Shreepad
                </span>
                <span
                  className="font-body text-[10px] font-bold uppercase tracking-widest mt-0.5"
                  style={{ color: !isDarkHeader ? '#A97142' : 'rgba(255,255,255,0.85)' }}
                >
                  Enterprises
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.label} className="relative group">
                  {link.submenu ? (
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-button font-medium transition-all duration-200"
                      style={{
                        color: isActive(link.href)
                          ? '#D4A95A'
                          : !isDarkHeader
                          ? '#3D2314'
                          : 'rgba(255, 255, 255, 0.95)'
                      }}
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      aria-expanded={activeDropdown === link.label}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="flex items-center px-4 py-2 rounded-full text-sm font-button font-medium transition-all duration-200 animated-underline"
                      style={{
                        color: isActive(link.href)
                          ? '#D4A95A'
                          : !isDarkHeader
                          ? '#3D2314'
                          : 'rgba(255, 255, 255, 0.95)'
                      }}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {link.submenu && (
                    <div
                      className={`absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-luxury-lg border border-border-DEFAULT overflow-hidden transition-all duration-200 ${
                        activeDropdown === link.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                      }`}
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="flex items-center gap-2 px-4 py-3 text-sm font-body text-text-DEFAULT hover:bg-background hover:text-primary-DEFAULT transition-colors border-b border-border-light last:border-b-0"
                        >
                          <Leaf size={12} className="text-accent-DEFAULT" />
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => dispatch(setSearchOpen(true))}
                className={`p-2 rounded-full transition-all duration-200 ${
                  !isDarkHeader ? 'text-text-DEFAULT hover:text-primary-DEFAULT hover:bg-background' : 'text-white/80 hover:text-white'
                }`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1 p-2 rounded-full transition-all duration-200 text-green-600 hover:bg-green-50"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className={`p-2 rounded-full transition-all duration-200 ${
                  !isDarkHeader ? 'text-text-DEFAULT hover:text-primary-DEFAULT hover:bg-background' : 'text-white/80 hover:text-white'
                }`}
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>

              <button
                onClick={() => dispatch(toggleCart())}
                className="relative p-2 rounded-full transition-all duration-200 bg-[#3D2314] text-white hover:bg-accent-DEFAULT shadow-luxury overflow-visible"
                aria-label={`Cart (${cartCount} items)`}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 z-10 w-5 h-5 bg-[#D4A95A] text-[#3D2314] text-[10px] font-bold rounded-full flex items-center justify-center font-button border border-white">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {/* User / Admin Account */}
              {admin ? (
                <Link
                  href="/admin/dashboard"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-button font-semibold border transition-all duration-200"
                  style={{
                    color: !isDarkHeader ? '#3D2314' : 'rgba(255,255,255,0.9)',
                    borderColor: !isDarkHeader ? '#3D2314' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  <div className="w-5 h-5 rounded-full bg-[#3D2314] text-white flex items-center justify-center text-[10px] font-bold">
                    A
                  </div>
                  <span>Admin Panel</span>
                </Link>
              ) : user ? (
                <Link
                  href="/user/dashboard"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-button font-semibold border transition-all duration-200"
                  style={{
                    color: !isDarkHeader ? '#3D2314' : 'rgba(255,255,255,0.9)',
                    borderColor: !isDarkHeader ? '#3D2314' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  <div className="w-5 h-5 rounded-full bg-accent-DEFAULT text-white flex items-center justify-center text-[10px] font-bold">
                    {user.name[0].toUpperCase()}
                  </div>
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link
                  href="/user/login"
                  className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-button font-semibold border transition-all duration-200"
                  style={{
                    color: !isDarkHeader ? '#3D2314' : 'rgba(255,255,255,0.9)',
                    borderColor: !isDarkHeader ? '#3D2314' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  <User size={14} />
                  <span>Sign In</span>
                </Link>
              )}


              {/* Mobile Hamburger */}
              <button
                onClick={() => dispatch(toggleMobileNav())}
                className={`lg:hidden p-2 rounded-full transition-all duration-200 ${
                  !isDarkHeader ? 'text-text-DEFAULT hover:bg-background' : 'text-white hover:bg-white/10'
                }`}
                aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileNavOpen}
              >
                {isMobileNavOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-30 bg-white flex flex-col ${isMobileNavOpen ? '' : 'pointer-events-none'}`}
        style={{ paddingTop: '110px', transform: 'translateX(100%)' }}
      >
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border-DEFAULT">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center border border-border-DEFAULT/30 shadow-sm">
              <img src="/images/logo.png" alt="Shreepad Enterprises Logo" className="w-full h-full object-cover scale-110" />
            </div>
            <div className="flex flex-col">
              <p className="font-heading text-lg font-bold text-primary-DEFAULT leading-none">Shreepad</p>
              <p className="font-body text-[10px] font-bold uppercase tracking-widest text-[#A97142] mt-1">Enterprises</p>
            </div>
          </div>

          {/* Nav Links */}
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-body transition-all ${
                    isActive(link.href)
                      ? 'bg-orange-50 text-[#3D2314] font-semibold'
                      : 'text-text-DEFAULT hover:bg-background hover:text-[#3D2314]'
                  }`}
                  onClick={() => dispatch(setMobileNavOpen(false))}
                >
                  {link.label}
                  {link.submenu && <ChevronDown size={16} />}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact Actions */}
          <div className="mt-8 pt-6 border-t border-border-DEFAULT space-y-3">
            <a
              href="https://wa.me/919876543210"
              className="flex items-center gap-3 px-4 py-3 bg-green-50 text-green-700 rounded-xl font-body font-medium"
              target="_blank" rel="noopener noreferrer"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-DEFAULT rounded-xl font-body font-medium"
            >
              <Phone size={20} />
              +91 98765 43210
            </a>
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 border border-border-DEFAULT text-text-muted rounded-xl font-body text-sm"
              onClick={() => dispatch(setMobileNavOpen(false))}
            >
              <User size={18} />
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile overlay backdrop */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => dispatch(setMobileNavOpen(false))}
        />
      )}
    </>
  );
}


