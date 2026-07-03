"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLandingRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("shreepad_admin_token");
    if (token) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-primary-DEFAULT border-t-transparent animate-spin"></div>
      <p className="font-body text-xs text-text-muted animate-pulse">
        Routing to Admin Dashboard...
      </p>
    </div>
  );
}
