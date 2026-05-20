"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "../../components/AuthModal";

export default function RegisterPage() {
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
        // Keep the register page open if the session check fails.
      }
    };

    void checkSession();
  }, [router]);

  return (
    <AuthModal
      isOpen={true}
      mode="register"
      onClose={() => router.push("/")}
      onModeChange={(mode) => router.push(mode === "login" ? "/login" : "/register")}
    />
  );
}
