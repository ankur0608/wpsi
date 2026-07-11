"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "../../components/AuthModal";

export default function ForgotPasswordPage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          method: "GET",
          cache: "no-store",
        });

        if (response.ok) {
          router.replace("/dashboard");
        }
      } catch {
        // Keep the page open if session check fails.
      }
    };

    void checkSession();
  }, [router]);

  return (
    <AuthModal
      isOpen={true}
      mode="forgot-password"
      onClose={() => router.push("/")}
      onModeChange={(mode) => router.push(mode === "login" ? "/login" : mode === "register" ? "/register" : "/forgot-password")}
    />
  );
}
