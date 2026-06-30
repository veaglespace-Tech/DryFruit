'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Package, Tag, Image, MessageSquare, HelpCircle,
  Mail, Settings, LogOut, Leaf, Menu, X, ChevronRight, Bell, ShoppingBag
} from 'lucide-react';

const adminNavLinks = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: Tag },
  { label: 'Banners', href: '/admin/banners', icon: Image },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Order Leads', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Enquiry Leads', href: '/admin/contacts', icon: Mail },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<{ name: string; email: string; role: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin' || pathname === '/admin/login') return;

    const token = localStorage.getItem('nutriroots_admin_token');
    const adminData = localStorage.getItem('nutriroots_admin');

    if (!token) {
      router.push('/admin/login');
      return;
    }

    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('nutriroots_admin_token');
    localStorage.removeItem('nutriroots_admin');
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') return <>{children}</>;
  if (pathname === '/admin') {
    router.push('/admin/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#3D2314] text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        } ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 p-4 border-b border-white/10 ${sidebarOpen ? '' : 'justify-center'}`}>
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0 border border-white/10">
            <img src="/images/logo.png" alt="Shreepad Enterprises Logo" className="w-full h-full object-cover scale-110" />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <p className="font-heading text-sm font-bold text-white leading-none">Shreepad</p>
              <p className="font-body text-[9px] font-bold uppercase tracking-widest text-[#D4A95A] mt-1">Enterprises</p>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {adminNavLinks.map(({ label, href, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center rounded-xl transition-all duration-200 ${
                  sidebarOpen ? 'px-3 py-2.5 gap-3 justify-start' : 'p-2.5 justify-center'
                } ${
                  isActive ? 'bg-white/15 text-accent' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
                title={!sidebarOpen ? label : undefined}
                onClick={() => setMobileSidebarOpen(false)}
              >
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && <span className="font-body text-sm font-medium">{label}</span>}
                {sidebarOpen && isActive && <ChevronRight size={14} className="ml-auto text-accent" />}
              </Link>
            );
          })}
        </nav>

        {/* Admin Info + Logout */}
        <div className="p-3 border-t border-white/10">
          {sidebarOpen && admin && (
            <div className="px-3 py-2 mb-2">
              <p className="font-body text-sm font-semibold text-white">{admin.name}</p>
              <p className="font-body text-xs text-white/50">{admin.role}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`flex items-center w-full rounded-xl text-white/60 hover:text-red-400 hover:bg-white/10 transition-all duration-200 ${
              sidebarOpen ? 'px-3 py-2.5 gap-3 justify-start' : 'p-2.5 justify-center'
            }`}
          >
            <LogOut size={18} />
            {sidebarOpen && <span className="font-body text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-16'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-border-DEFAULT shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setSidebarOpen(!sidebarOpen); }}
              className="hidden lg:flex w-8 h-8 rounded-lg items-center justify-center text-text-muted hover:bg-background transition-colors"
            >
              <Menu size={18} />
            </button>
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:bg-background transition-colors"
            >
              {mobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div>
              <p className="font-button font-semibold text-text-DEFAULT text-sm">
                {adminNavLinks.find(l => pathname.startsWith(l.href))?.label || 'Dashboard'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:bg-background transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <Link href="/" className="text-xs font-button text-text-muted hover:text-primary-DEFAULT transition-colors">
              View Site
            </Link>
            <div className="w-9 h-9 rounded-full bg-primary-DEFAULT flex items-center justify-center text-white text-sm font-bold font-heading">
              {admin?.name?.[0] || 'A'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
