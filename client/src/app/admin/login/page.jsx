"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAdminLoginMutation } from "@/store/api/apiSlice";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const formRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [adminLogin, { isLoading: loading }] = useAdminLoginMutation();

  useGSAP(
    () => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      );
    },
    { scope: formRef },
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin({ email, password }).unwrap();
      localStorage.setItem("shreepad_admin_token", res.token);
      localStorage.setItem("shreepad_admin", JSON.stringify(res.admin));
      toast.success(`Welcome back, ${res.admin.name}! 🌿`);
      router.push("/admin/dashboard");
    } catch (err) {
      toast.error(
        err.data?.message || "Invalid credentials. Please try again.",
      );
      const tl = gsap.timeline();
      tl.to(formRef.current, { x: -12, duration: 0.08 })
        .to(formRef.current, { x: 12, duration: 0.08 })
        .to(formRef.current, { x: -8, duration: 0.08 })
        .to(formRef.current, { x: 8, duration: 0.08 })
        .to(formRef.current, { x: 0, duration: 0.08 });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #3D1F0E 0%, #6B3E26 60%, #A97142 100%)",
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ background: "#D4A95A" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl"
          style={{ background: "#D4A95A" }}
        />
      </div>

      <div ref={formRef} className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-luxury-xl p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6B3E26, #A97142)",
              }}
            >
              <Leaf
                size={32}
                className="text-accent-DEFAULT"
                style={{ color: "#D4A95A" }}
              />
            </div>
            <h1 className="font-heading text-2xl font-bold text-primary-DEFAULT">
              Shreepad Enterprises Admin
            </h1>
            <p className="text-text-muted font-body text-sm mt-1">
              Sign in to your dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="form-floating">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
                id="admin-email"
                className="!py-4"
                suppressHydrationWarning
              />

              <label htmlFor="admin-email">Email Address</label>
              <Mail
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
            </div>

            {/* Password */}
            <div className="form-floating relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
                id="admin-password"
                className="!py-4 pr-12"
                suppressHydrationWarning
              />

              <label htmlFor="admin-password">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary-DEFAULT transition-colors"
                suppressHydrationWarning
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary-luxury w-full justify-center py-3.5 mt-2"
              suppressHydrationWarning
            >
              <span className="flex items-center gap-2">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Lock size={18} />
                )}
                {loading ? "Signing In..." : "Sign In to Dashboard"}
              </span>
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 rounded-xl bg-primary-50 border border-border-DEFAULT">
            <p className="text-xs font-button font-semibold text-primary-DEFAULT mb-1">
              Demo Credentials:
            </p>
            <p className="text-xs font-body text-text-muted">
              Email: admin@shreepadenterprises.com
            </p>
            <p className="text-xs font-body text-text-muted">
              Password: Admin@123
            </p>
          </div>

          <p className="text-center text-xs text-text-muted font-body mt-4">
            <a
              href="/"
              className="hover:text-primary-DEFAULT transition-colors"
            >
              ← Back to Website
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
