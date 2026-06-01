"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export type AuthMode = "login" | "register";

interface AuthModalProps {
  isOpen: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
}

export default function AuthModal({ isOpen, mode, onClose, onModeChange }: AuthModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    onClose();
  }, [onClose]);

  const handleModeChange = (nextMode: "login" | "register") => {
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    onModeChange(nextMode);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose, isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const payload = mode === "login" ? { email, password } : { name, email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        handleClose();
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      const data = await response.json().catch(() => ({}));
      setError(data.error || `Failed to ${mode === "login" ? "login" : "register"}`);
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const isLogin = mode === "login";

  return (
    <div
      className="fixed inset-0 z-[70] bg-dark-bg/70 backdrop-blur-sm flex items-center justify-center p-4"
        onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={isLogin ? "Login modal" : "Register modal"}
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="glass-card w-full max-w-md p-8 sm:p-10 rounded-3xl border border-white/10 relative shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark text-xl" />
        </button>

        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-secondary flex items-center justify-center shadow-lg shadow-brand-500/30">
              <i className="fa-solid fa-graduation-cap text-white text-lg" />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight">
              Mcqprep<span className="text-brand-500">zone</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">{isLogin ? "Welcome Back" : "Create an Account"}</h2>
          <p className="text-sm text-slate-400">
            {isLogin ? "Log in to continue your preparation." : "Start your WPSI preparation journey today."}
          </p>
        </div>

        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className={isLogin ? "space-y-5" : "space-y-4"}>
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <i className="fa-solid fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Rahul Parmar"
                  className="w-full bg-dark-bg border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full bg-dark-bg border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <div className={isLogin ? "flex justify-between items-center mb-2" : "mb-2"}>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
              {isLogin && (
                <a href="#" className="text-xs text-brand-400 hover:text-brand-300 font-bold transition-colors">
                  Forgot Password?
                </a>
              )}
            </div>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                className="w-full bg-dark-bg border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl btn-primary font-bold shadow-lg shadow-brand-500/20 mt-4 transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"} <i className="fa-solid fa-arrow-right ml-2" />
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          {isLogin ? (
            <p className="text-sm text-slate-400">
              {"Don't have an account? "}
                <button
                  type="button"
                  onClick={() => handleModeChange("register")}
                  className="text-brand-400 font-bold hover:text-brand-300 transition-colors"
                >
                Sign up for free
              </button>
            </p>
          ) : (
            <p className="text-sm text-slate-400">
              {"Already have an account? "}
                <button
                  type="button"
                  onClick={() => handleModeChange("login")}
                  className="text-brand-400 font-bold hover:text-brand-300 transition-colors"
                >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
