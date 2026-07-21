"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OTPInput from "./OTPInput";
import { useUser } from '@/context/UserContext';

export type AuthMode = "login" | "register" | "forgot-password";

interface AuthModalProps {
  isOpen: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
}

const getDeviceInfo = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
          deviceId = crypto.randomUUID();
      } else {
          // Fallback for non-secure contexts (http)
          deviceId = 'dev_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
      }
      localStorage.setItem('deviceId', deviceId);
  }
  
  const userAgent = navigator.userAgent;
  let browser = "Unknown";
  if (userAgent.includes("Chrome")) browser = "Chrome";
  else if (userAgent.includes("Firefox")) browser = "Firefox";
  else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
  else if (userAgent.includes("Edge")) browser = "Edge";
  
  let os = "Unknown";
  if (userAgent.includes("Win")) os = "Windows";
  else if (userAgent.includes("Android")) os = "Android";
  else if (userAgent.includes("like Mac") || userAgent.includes("iPhone") || userAgent.includes("iPad")) os = "iOS";
  else if (userAgent.includes("Mac")) os = "MacOS";
  else if (userAgent.includes("Linux")) os = "Linux";
  
  const deviceType = /Mobile|Android|iP(hone|od|ad)/.test(userAgent) ? "Mobile" : "Desktop";
  const screen = `${window.screen.width}x${window.screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  
  return { deviceId, browser, os, deviceType, screen, timezone, language };
};

export default function AuthModal({ isOpen, mode, onClose, onModeChange }: AuthModalProps) {
  const router = useRouter();
  const { refreshUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [loginMethod, setLoginMethod] = useState<"email" | "mobile">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [existingDevice, setExistingDevice] = useState<{ browser?: string, os?: string, lastLogin?: string } | null>(null);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [showRegisterOtp, setShowRegisterOtp] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (resendTimer > 0) {
      timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timerId);
  }, [resendTimer]);

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setVerificationId(data.verificationId);
        setResendTimer(30);
      } else {
        setError(data.error || "Failed to resend OTP");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = useCallback(() => {
    setError("");
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setOtp("");
    setVerificationId("");
    setStep(1);
    setResendTimer(0);
    setLoginMethod("email");
    setShowPassword(false);
    setExistingDevice(null);
    setIsMobileVerified(false);
    setShowRegisterOtp(false);
    onClose();
  }, [onClose]);

  const handleModeChange = (nextMode: AuthMode) => {
    setError("");
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setOtp("");
    setVerificationId("");
    setStep(1);
    setResendTimer(0);
    setLoginMethod("email");
    setShowPassword(false);
    setExistingDevice(null);
    setIsMobileVerified(false);
    setShowRegisterOtp(false);
    setAcceptedTerms(false);
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

    if (mode === "login") {
      if (loginMethod === "email") {
        if (!email) { setError("Email Address is required"); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address"); return; }
        if (!password) { setError("Password is required"); return; }
      } else {
        if (step === 1) {
          if (!mobile) { setError("Mobile Number is required"); return; }
          if (!/^[0-9]{10}$/.test(mobile)) { setError("Please enter a valid 10-digit mobile number"); return; }
        }
        if (step === 2) {
          if (!otp) { setError("OTP is required"); return; }
        }
      }
    } else if (mode === "forgot-password") {
        if (step === 1) {
            if (!email) { setError("Email is required"); return; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address"); return; }
        }
    } else {
        if (step === 1) {
            if (!name) { setError("Full Name is required"); return; }
            if (!email) { setError("Email is required"); return; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address"); return; }
            if (!password) { setError("Password is required"); return; }
            if (!acceptedTerms) { setError("Please accept Terms & Conditions and Privacy Policy"); return; }
        }
    }

    setLoading(true);

    try {
      if (mode === "login" && loginMethod === "mobile" && step === 1) {
        const response = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile }),
        });
        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          setStep(2);
          setResendTimer(30);
          setLoading(false);
          return;
        } else {
          setError(data.error || "Failed to send OTP");
          setLoading(false);
          return;
        }
      }

      if (mode === "forgot-password" && step === 1) {
        const response = await fetch("/api/auth/forgot-password/send-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          setStep(2); // Step 2 will just be a success message for forgot password
          setLoading(false);
          return;
        } else {
          setError(data.error || "Failed to send reset link");
          setLoading(false);
          return;
        }
      }

      if (mode === "register" && step === 1) {
        if (!isMobileVerified) {
          setError("Please verify your mobile number first.");
          setLoading(false);
          return;
        }
        const registerRes = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, mobile, acceptedTerms, ...getDeviceInfo() }),
        });
        
        const registerData = await registerRes.json().catch(() => ({}));
        
        if (registerRes.ok) {
          await refreshUser();
          router.replace("/dashboard");
          router.refresh();
          return;
        } else {
          setError(registerData.error || "Registration failed");
          setLoading(false);
          return;
        }
      }

      if (mode === "login" && step === 2) {
        const response = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile, otp }),
        });
        const data = await response.json().catch(() => ({}));

        if (response.ok) {
            const loginRes = await fetch("/api/auth/login-mobile", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ mobile, ...getDeviceInfo() }),
            });
            if (loginRes.ok) {
               await refreshUser();
               router.replace("/dashboard");
               router.refresh();
               return;
            } else {
               const loginData = await loginRes.json().catch(() => ({}));
               if (loginRes.status === 409 && loginData.error === 'ACTIVE_DEVICE') {
                  setExistingDevice(loginData.activeDevice);
               } else {
                  setError(loginData.error || "Failed to login with mobile");
               }
               setLoading(false);
               return;
            }
        } else {
          setError(data.error || "Failed to verify OTP");
          setLoading(false);
          return;
        }
      }



      if (mode === "login" && loginMethod === "email") {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, ...getDeviceInfo() }),
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          await refreshUser();
          router.replace("/dashboard");
          router.refresh();
        } else if (response.status === 409 && data.error === 'ACTIVE_DEVICE') {
          setExistingDevice(data.activeDevice);
        } else {
          setError(data.error || "Login failed");
        }
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSendOtp = async () => {
    if (!mobile || !/^[0-9]{10}$/.test(mobile)) { 
      setError("Please enter a valid 10-digit mobile number"); 
      return; 
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setVerificationId(data.verificationId);
        setResendTimer(30);
        setShowRegisterOtp(true);
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterVerifyOtp = async () => {
    if (!otp) { setError("OTP is required"); return; }
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp, verificationId }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setIsMobileVerified(true);
        setShowRegisterOtp(false);
      } else {
        setError(data.error || "Failed to verify OTP");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForceLogin = async () => {
    setError("");
    setLoading(true);
    try {
        const url = loginMethod === "email" ? "/api/auth/login" : "/api/auth/login-mobile";
        const bodyData = loginMethod === "email" 
            ? { email, password, ...getDeviceInfo(), force: true }
            : { mobile, ...getDeviceInfo(), force: true };

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        });
        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          await refreshUser();
          router.replace("/dashboard");
          router.refresh();
        } else {
          setError(data.error || "Login failed");
          setExistingDevice(null);
        }
    } catch {
        setError("An error occurred. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  if (existingDevice) {
    return (
      <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
        <div className="glass-card w-full max-w-md p-8 sm:p-10 rounded-3xl border border-white/10 relative shadow-2xl text-center">
          <button type="button" onClick={handleClose} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-white transition-colors">
            <i className="fa-solid fa-xmark text-xl" />
          </button>
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-laptop-medical text-4xl text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Account in Use</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            This account is currently logged in on another device.
          </p>
          <div className="bg-dark-50/50 border border-dark-100 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold mb-2">Active Session Details</p>
            <p className="text-sm font-semibold text-[var(--text-primary)]"><i className="fa-solid fa-display w-5 text-[var(--text-secondary)]"></i> {existingDevice.browser || "Unknown Browser"} on {existingDevice.os || "Unknown OS"}</p>
            {existingDevice.lastLogin && (
                <p className="text-xs text-[var(--text-secondary)] mt-1 ml-5">Since {new Date(existingDevice.lastLogin).toLocaleString()}</p>
            )}
          </div>
          <p className="text-xs text-red-400 mb-6">
            Logging in here will securely log out the other device.
          </p>
          <div className="space-y-3">
              <button type="button" onClick={handleForceLogin} disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-colors">
                {loading ? <i className="fa-solid fa-spinner fa-spin" /> : "Log out other device & Login"}
              </button>
              <button type="button" onClick={() => setExistingDevice(null)} className="w-full bg-transparent hover:bg-white/5 text-[var(--text-secondary)] py-3 rounded-xl font-bold transition-colors border border-white/10">
                Cancel
              </button>
          </div>
        </div>
      </div>
    );
  }

  const isLogin = mode === "login";
  const isForgot = mode === "forgot-password";
  const showMobileInput = (isLogin && loginMethod === "mobile" && step === 1);
  const showOtpInput = (isLogin && loginMethod === "mobile" && step === 2);
  const showRegisterFields = mode === "register" && step === 1;
  const showLoginEmailFields = (isLogin && loginMethod === "email") || (isForgot && step === 1);

  if (isForgot && step === 2) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
        <div className="glass-card w-full max-w-md p-8 sm:p-10 rounded-3xl border border-white/10 relative shadow-2xl text-center">
          <button type="button" onClick={handleClose} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-white transition-colors">
            <i className="fa-solid fa-xmark text-xl" />
          </button>
          <i className="fa-regular fa-envelope text-5xl text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Check your email</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            We've sent a password reset link to <br/> <strong className="text-white">{email}</strong>
          </p>
          <button type="button" onClick={handleClose} className="w-full btn-primary py-3 rounded-xl font-bold">
            Got it
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
        onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={isLogin ? "Login modal" : "Register modal"}
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="glass-card w-full max-w-md p-6 sm:p-7 rounded-3xl border border-white/10 relative shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark text-xl" />
        </button>

        <div className="text-center mb-5">
          <Link href="/" className="inline-flex items-center gap-2 mb-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 overflow-hidden shrink-0 border border-dark-200">
              <img src="/logo.jpeg" alt="WPSI Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">
              Mcqprep<span className="text-blue-600 dark:text-blue-500">zone</span>
            </span>
          </Link>
          <h2 className="text-xl sm:text-xl font-bold text-[var(--text-primary)] mb-1">
            {isLogin ? "Welcome Back" : isForgot ? "Reset Password" : "Create an Account"}
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            {isLogin ? "Log in to continue your preparation." : isForgot ? "Enter your details to reset password." : "Start your WPSI preparation journey today."}
          </p>
        </div>

        {error && <div className="mb-3 text-red-500 text-xs text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-2" noValidate>
          {showRegisterFields && (
            <div>
              <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Full Name</label>
              <div className="relative">
                <i className="fa-solid fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Rahul Parmar"
                  className="w-full bg-dark-bg border border-white/10 rounded-xl pl-12 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                  required
                />
              </div>
            </div>
          )}

          {showRegisterFields && (
            <div>
              <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Mobile Number</label>
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <i className="fa-solid fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    placeholder="9999999999"
                    pattern="[0-9]{10}"
                    disabled={isMobileVerified || showRegisterOtp}
                    className="w-full bg-dark-bg border border-white/10 rounded-xl pl-12 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors disabled:opacity-50"
                    required
                  />
                </div>
                {!isMobileVerified ? (
                  <button 
                    type="button" 
                    onClick={handleRegisterSendOtp} 
                    disabled={loading || showRegisterOtp}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center"
                  >
                    {resendTimer > 0 ? `${resendTimer}s` : 'Verify'}
                  </button>
                ) : (
                  <div className="bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 font-bold px-4 rounded-xl text-sm flex items-center justify-center">
                    <i className="fa-solid fa-check mr-2"></i> Verified
                  </div>
                )}
              </div>
            </div>
          )}

          {showRegisterFields && showRegisterOtp && !isMobileVerified && (
            <div>
              <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Enter OTP</label>
              <div className="flex flex-col gap-4">
                <div className="flex justify-center pt-1 pb-1">
                  <OTPInput value={otp} onChange={setOtp} />
                </div>
                <button 
                  type="button" 
                  onClick={handleRegisterVerifyOtp}
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 rounded-xl transition-all shadow-lg shadow-emerald-500/30 disabled:opacity-50 flex items-center justify-center transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <i className="fa-solid fa-circle-check mr-2"></i>
                  Confirm OTP
                </button>
              </div>
            </div>
          )}

          {(showRegisterFields || showLoginEmailFields) && (
            <div>
              <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Email Address</label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-dark-bg border border-white/10 rounded-xl pl-12 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                  required
                />
              </div>
            </div>
          )}

          {showMobileInput && (
            <div>
              <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Mobile Number</label>
              <div className="relative">
                <i className="fa-solid fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="tel"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                  placeholder="9999999999"
                  pattern="[0-9]{10}"
                  className="w-full bg-dark-bg border border-white/10 rounded-xl pl-12 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                  required
                />
              </div>
            </div>
          )}

          {(showRegisterFields || (isLogin && loginMethod === "email")) && (
            <div>
              <div className={isLogin ? "flex justify-between items-center mb-1" : "mb-1"}>
                <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                  Password
                </label>
                {isLogin && (
                  <button type="button" onClick={() => handleModeChange("forgot-password")} className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold transition-colors">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                  className="w-full bg-dark-bg border border-white/10 rounded-xl pl-12 pr-12 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] focus:outline-none transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} />
                </button>
              </div>
            </div>
          )}

          {showRegisterFields && (
            <div className="flex items-start mt-2">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 bg-dark-bg border border-white/20 rounded focus:ring-blue-500 focus:ring-2 accent-blue-600"
                />
              </div>
              <div className="ml-2 text-xs">
                <label htmlFor="terms" className="font-medium text-[var(--text-secondary)]">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Terms & Conditions
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
          )}

          {showOtpInput && (
            <div>
              <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Enter OTP</label>
              <div className="pt-2 pb-2">
                <OTPInput value={otp} onChange={setOtp} />
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-[var(--text-secondary)]">
                  OTP sent to {mobile}. <button type="button" onClick={() => { setStep(1); setResendTimer(0); }} className="text-blue-600 dark:text-blue-400 hover:underline">Change number</button>
                </p>
                {resendTimer > 0 ? (
                  <span className="text-xs text-[var(--text-secondary)]">Resend in {resendTimer}s</span>
                ) : (
                  <button type="button" onClick={handleResendOtp} disabled={loading} className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-bold disabled:opacity-50">Resend OTP</button>
                )}
              </div>
            </div>
          )}



          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-lg shadow-blue-500/25 mt-4 transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin" />
            ) : (
              <>
                {isLogin && step === 1 && loginMethod === "mobile" ? "Send OTP" : 
                 isForgot && step === 1 ? "Send Reset Link" :
                 (isLogin && loginMethod === "mobile" && step === 2) ? "Verify OTP" : 
                 isLogin ? "Log In" : "Create Account"}
                <i className="fa-solid fa-arrow-right ml-2" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 text-center">
          {isLogin ? (
            <p className="text-xs text-[var(--text-secondary)]">
              Don't have an account?{" "}
              <button type="button" onClick={() => handleModeChange("register")} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Sign up for free
              </button>
            </p>
          ) : (
            <p className="text-xs text-[var(--text-secondary)]">
              {isForgot ? "Remember your password?" : "Already have an account?"}{" "}
              <button type="button" onClick={() => handleModeChange("login")} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
