"use client";

import { useState } from "react";
import Link from "next/link";
import LandingNavbar from '@/components/LandingNavbar';
import LandingFooter from '@/components/LandingFooter';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative w-full overflow-x-hidden min-h-screen">
      <LandingNavbar />
      <main className="relative pt-28 md:pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-8 text-center">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-center opacity-70 mb-12 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="glass-card p-8 rounded-2xl border border-[var(--border-subtle)] space-y-8 opacity-90">
            {status === "success" ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-xl text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 mb-4">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-400 mb-2">Message Sent Successfully!</h3>
                <p className="opacity-70 mb-6">We've received your message and will be in touch soon.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 text-[var(--text-primary)] rounded-lg transition-colors border border-[var(--border-subtle)]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                    <p className="text-sm text-red-400">{errorMessage}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium opacity-90 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium opacity-90 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium opacity-90 mb-2">Subject (Optional)</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium opacity-90 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={`w-full py-3 px-6 rounded-lg text-[var(--text-primary)] font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0D1B2A] transition-all ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}

            {/* <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Contact Information</h3>
                <div className="space-y-3 opacity-70">
                  <p className="flex items-center">
                    <span className="w-20 font-medium opacity-90">Company:</span>
                    [Your Legal Company Name]
                  </p>
                  <p className="flex items-center">
                    <span className="w-20 font-medium opacity-90">Email:</span>
                    [Your Support Email]
                  </p>
                  <p className="flex items-center">
                    <span className="w-20 font-medium opacity-90">Address:</span>
                    [Your Registered Address]
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Legal Policies</h3>
                <ul className="space-y-2 text-indigo-400">
                  <li><Link href="/terms" className="hover:text-indigo-300 transition-colors">Terms & Conditions</Link></li>
                  <li><Link href="/privacy" className="hover:text-indigo-300 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/refund-policy" className="hover:text-indigo-300 transition-colors">Refund Policy</Link></li>
                  <li><Link href="/shipping-policy" className="hover:text-indigo-300 transition-colors">Shipping & Delivery Policy</Link></li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
