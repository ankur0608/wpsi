"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to reset password. The link might be expired.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card w-full max-w-md p-8 sm:p-10 rounded-3xl border border-white/10 relative shadow-2xl text-center">
        <i className="fa-solid fa-circle-check text-5xl text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Password Reset!</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Your password has been changed successfully.
        </p>
        <Link href="/login" className="w-full btn-primary py-3 rounded-xl font-bold inline-block">
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-card w-full max-w-md p-8 sm:p-10 rounded-3xl border border-white/10 relative shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">New Password</h2>
        <p className="text-sm text-[var(--text-secondary)]">Create a new password for your account.</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 animate-shake">
          <i className="fa-solid fa-circle-exclamation text-red-500 mt-0.5" />
          <p className="text-sm text-red-500/90 leading-tight">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">New Password</label>
          <div className="relative">
            <i className="fa-solid fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full bg-dark-bg border border-white/10 rounded-xl pl-12 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Confirm Password</label>
          <div className="relative">
            <i className="fa-solid fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full bg-dark-bg border border-white/10 rounded-xl pl-12 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !token}
          className="w-full btn-primary py-3 rounded-xl font-bold flex justify-center items-center gap-2 group shadow-lg shadow-blue-500/20 disabled:opacity-70 mt-6"
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin" />
          ) : (
            <>
              Reset Password
              <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <i className="fa-solid fa-graduation-cap text-white text-xl" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Mcqprep<span className="text-blue-600 dark:text-blue-500">zone</span>
            </span>
          </Link>
        </div>

        <Suspense fallback={<div className="text-center text-white"><i className="fa-solid fa-spinner fa-spin" /></div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
