"use client";

import { useEffect, useRef, useState } from "react";
import {
  Package,
  Tag,
  MessageSquare,
  Mail,
  Users,
  ArrowUpRight,
  Eye,
  Leaf,
} from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const stats = [
  {
    label: "Total Products",
    value: "09",
    change: "+2 this month",
    icon: Package,
    color: "#6B3E26",
    bg: "#F9F0EB",
  },
  {
    label: "Categories",
    value: "08",
    change: "All active",
    icon: Tag,
    color: "#A97142",
    bg: "#FBF4EC",
  },
  {
    label: "Customer Reviews",
    value: "1,869",
    change: "+47 this week",
    icon: Users,
    color: "#4CAF50",
    bg: "#F1F8E9",
  },
  {
    label: "Contact Leads",
    value: "24",
    change: "6 new today",
    icon: Mail,
    color: "#D4A95A",
    bg: "#FDF8EE",
  },
];

const quickLinks = [
  {
    label: "Add New Product",
    href: "/admin/products/new",
    icon: Package,
    color: "#6B3E26",
  },
  {
    label: "Manage Categories",
    href: "/admin/categories",
    icon: Tag,
    color: "#A97142",
  },
  {
    label: "View Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquare,
    color: "#D4A95A",
  },
  {
    label: "Contact Leads",
    href: "/admin/contacts",
    icon: Mail,
    color: "#4CAF50",
  },
];

export default function AdminDashboard() {
  const sectionRef = useRef(null);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const admin = localStorage.getItem("nutriroots_admin");
    if (admin) setAdminName(JSON.parse(admin).name);
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
        },
      );
      gsap.fromTo(
        ".quick-link",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.4,
          ease: "back.out(1.7)",
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef}>
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Leaf
            size={20}
            className="text-accent-DEFAULT"
            style={{ color: "#D4A95A" }}
          />
          <span className="text-text-muted font-body text-sm">
            Welcome back,
          </span>
        </div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary-DEFAULT">
          {adminName} 🌿
        </h1>
        <p className="text-text-muted font-body text-sm mt-1">
          Here&apos;s what&apos;s happening with NutriRoots today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="stat-card bg-white border border-border-DEFAULT rounded-2xl p-5 hover:shadow-luxury transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: stat.bg }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </div>
                <ArrowUpRight size={16} className="text-green-500" />
              </div>
              <p className="font-heading text-2xl font-bold text-primary-DEFAULT">
                {stat.value}
              </p>
              <p className="font-body text-sm text-text-muted mb-1">
                {stat.label}
              </p>
              <p className="text-xs font-body text-green-600 font-semibold">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-border-DEFAULT rounded-2xl p-6">
          <h2 className="font-heading text-lg font-semibold text-primary-DEFAULT mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map(({ label, href, icon: Icon, color }) => (
              <Link
                key={label}
                href={href}
                className="quick-link flex flex-col items-center gap-3 p-4 rounded-xl border border-border-DEFAULT hover:shadow-card hover:border-accent-DEFAULT/30 transition-all duration-200 text-center group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <span className="font-body text-xs font-semibold text-text-DEFAULT">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-border-DEFAULT rounded-2xl p-6">
          <h2 className="font-heading text-lg font-semibold text-primary-DEFAULT mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {[
              {
                action: "New contact inquiry from Priya Sharma",
                time: "2 hours ago",
                type: "contact",
              },
              {
                action: 'Product "Kashmiri Walnuts" stock updated',
                time: "5 hours ago",
                type: "product",
              },
              {
                action: "New testimonial submitted by Rajesh M.",
                time: "1 day ago",
                type: "testimonial",
              },
              {
                action: 'Category "Dried Berries" created',
                time: "2 days ago",
                type: "category",
              },
              {
                action: "Settings updated - Announcement bar",
                time: "3 days ago",
                type: "settings",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2 border-b border-border-light last:border-0"
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-accent-DEFAULT"
                  style={{ background: "#D4A95A" }}
                />
                <div>
                  <p className="font-body text-sm text-text-DEFAULT">
                    {activity.action}
                  </p>
                  <p className="font-body text-xs text-text-muted">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Site CTA */}
      <div
        className="p-6 rounded-2xl"
        style={{ background: "linear-gradient(135deg, #6B3E26, #A97142)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading text-xl font-bold text-white mb-1">
              Website is Live! 🚀
            </p>
            <p className="text-white/70 font-body text-sm">
              Your NutriRoots store is live and accepting inquiries.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary-DEFAULT font-button font-semibold text-sm hover:bg-background transition-colors"
            target="_blank"
          >
            <Eye size={16} />
            View Site
          </Link>
        </div>
      </div>
    </div>
  );
}
