"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { publicApi } from "@/lib/api";
import toast from "react-hot-toast";

export default function UserLoginPage() {
  const router = useRouter();
  const formRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("nutriroots_user_token");
    if (token) router.push("/user/dashboard");
  }, [router]);

  useGSAP(
    () => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)" },
      );
    },
    { scope: formRef },
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await publicApi.login({ email, password });
      localStorage.setItem("nutriroots_user_token", res.data.token);
      localStorage.setItem("nutriroots_user", JSON.stringify(res.data.user));
      toast.success(`Welcome back, ${res.data.user.name}! 🌿`);
      router.push("/user/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
      // Shake animation on error
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
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #F5EDE0 0%, #FFFDF8 50%, #EFE7DD 100%)",
      }}
    >
      {/* Decorative Blur elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-accent-DEFAULT" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-25 bg-primary-DEFAULT" />

      <div ref={formRef} className="relative w-full max-w-md z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-border-DEFAULT shadow-luxury-xl p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group mb-4"
            >
              <div className="w-12 h-12 rounded-full bg-luxury-gradient flex items-center justify-center shadow-luxury">
                <Leaf size={22} className="text-white" />
              </div>
            </Link>
            <h1 className="font-heading text-2xl font-bold text-primary-DEFAULT">
              Welcome back
            </h1>
            <p className="text-text-muted font-body text-sm mt-1">
              Savor nature&apos;s premium nutrition
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
                id="user-email"
                className="!py-4"
              />

              <label htmlFor="user-email">Email Address</label>
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
                id="user-password"
                className="!py-4 pr-12"
              />

              <label htmlFor="user-password">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary-DEFAULT"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
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
                  <Lock size={16} />
                )}
                {loading ? "Signing In..." : "Sign In"}
                {!loading && (
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                )}
              </span>
            </button>
          </form>

          {/* Action links */}
          <div className="mt-8 pt-6 border-t border-border-light text-center space-y-3">
            <p className="text-xs text-text-muted font-body">
              Don&apos;t have an account?{" "}
              <Link
                href="/user/register"
                className="text-accent-DEFAULT hover:underline font-semibold"
              >
                Register here
              </Link>
            </p>
            <p className="text-xs text-text-muted font-body">
              <Link
                href="/"
                className="hover:text-primary-DEFAULT transition-colors"
              >
                ← Back to website
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
