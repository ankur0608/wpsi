"use client";

import Link from "next/link";

const overviewCards = [
  {
    label: "Active Users",
    value: "12,450",
    note: "+12% from last month",
    icon: "fa-users",
    accent: "brand",
  },
  {
    label: "Monthly Revenue",
    value: "Rs 4.2L",
    note: "+8% from last month",
    icon: "fa-indian-rupee-sign",
    accent: "emerald",
  },
  {
    label: "Tests Attempted",
    value: "52.8k",
    note: "+24% from last month",
    icon: "fa-file-signature",
    accent: "violet",
  },
  {
    label: "Question Bank",
    value: "18,204",
    note: "+140 added this week",
    icon: "fa-database",
    accent: "amber",
  },
];

const subscriptionRows = [
  { initials: "SM", name: "Suresh Makwana", plan: "Pro Scholar", amount: "Rs 299", status: "Success" },
  { initials: "PD", name: "Pooja Desai", plan: "Elite Master", amount: "Rs 999", status: "Success" },
  { initials: "KJ", name: "Kunal Joshi", plan: "Pro Scholar", amount: "Rs 299", status: "Failed" },
];

const tickets = [
  {
    title: "Payment deducted, plan not active",
    meta: "Rahul P. | 10m ago",
    detail: "Billing issue on the Pro Scholar renewal flow.",
    tone: "danger",
    action: "Resolve issue",
  },
  {
    title: "Error in Mock Test Q45",
    meta: "Wireless PSI Full Mock 1 | 1h ago",
    detail: "The user reported a mismatch between the explanation and answer key.",
    tone: "warning",
    action: "Review question",
  },
  {
    title: "Login verification mail delayed",
    meta: "Support queue | 3h ago",
    detail: "Email delivery lag detected for a small batch of new users.",
    tone: "brand",
    action: "Open queue",
  },
];

const quickActions = [
  { href: "#", label: "Add mock test", icon: "fa-file-circle-plus" },
  { href: "#", label: "Review support", icon: "fa-headset" },
  { href: "#", label: "Export revenue", icon: "fa-download" },
];

const accentStyles = {
  brand: {
    icon: "bg-brand-500/15 text-brand-300 border-brand-500/20",
    note: "text-brand-300",
  },
  emerald: {
    icon: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    note: "text-emerald-300",
  },
  violet: {
    icon: "bg-violet-500/15 text-violet-300 border-violet-500/20",
    note: "text-violet-300",
  },
  amber: {
    icon: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    note: "text-amber-300",
  },
} as const;

const ticketToneStyles = {
  danger: "border-l-danger bg-danger/5",
  warning: "border-l-warning bg-warning/5",
  brand: "border-l-brand-500 bg-brand-500/5",
} as const;

const statusStyles = {
  Success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  Failed: "border-danger/20 bg-danger/10 text-red-300",
} as const;

export default function AdminPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-5 shadow-[0_24px_80px_rgba(2,6,23,0.32)] sm:p-7">
        <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-brand-500/15 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl"></div>

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-300">
              <i className="fa-solid fa-shield-halved"></i>
              Admin command center
            </div>
            <h2 className="text-2xl font-heading font-bold text-white sm:text-3xl">Track platform health, users, and revenue from one clean view.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              The layout is now mobile-first, so core stats, actions, tickets, and subscription activity stay readable on smaller screens.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-[26rem]">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 transition-all hover:-translate-y-0.5 hover:bg-white/[0.08]"
              >
                <span className="flex items-center gap-2">
                  <i className={`fa-solid ${action.icon} text-brand-300`}></i>
                  {action.label}
                </span>
                <i className="fa-solid fa-arrow-right text-xs text-slate-500"></i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => {
          const palette = accentStyles[card.accent as keyof typeof accentStyles];

          return (
            <div key={card.label} className="glass-card rounded-[1.75rem] border border-white/10 p-5">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">{card.label}</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">{card.value}</h3>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${palette.icon}`}>
                  <i className={`fa-solid ${card.icon}`}></i>
                </div>
              </div>
              <div className={`text-sm font-medium ${palette.note}`}>{card.note}</div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
        <div className="glass-card overflow-hidden rounded-[1.75rem] border border-white/10">
          <div className="flex flex-col gap-3 border-b border-white/10 bg-slate-950/55 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Recent subscriptions</h3>
              <p className="text-sm text-slate-400">A quick snapshot of the latest purchases and payment status.</p>
            </div>
            <button className="inline-flex w-full items-center justify-center rounded-2xl border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-300 transition-colors hover:bg-brand-500/15 sm:w-auto">
              View all
            </button>
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {subscriptionRows.map((row) => (
              <div key={row.name} className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-500/15 text-sm font-bold text-brand-300">
                      {row.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-white">{row.name}</div>
                      <div className="text-xs text-slate-400">{row.plan}</div>
                    </div>
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusStyles[row.status as keyof typeof statusStyles]}`}>
                    {row.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-400">Amount</span>
                  <span className="font-semibold text-white">{row.amount}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-[11px] uppercase tracking-[0.22em] text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-5 py-3 font-medium">Plan</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-200">
                {subscriptionRows.map((row) => (
                  <tr key={row.name} className="transition-colors hover:bg-white/[0.03]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-500/15 text-xs font-bold text-brand-300">
                          {row.initials}
                        </div>
                        <span className="font-medium text-white">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-slate-200">
                        {row.plan}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-white">{row.amount}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[row.status as keyof typeof statusStyles]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-[1.75rem] border border-white/10 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-heading text-lg font-bold text-white">System pulse</h3>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Healthy
              </span>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                <div className="mb-1 text-sm font-semibold text-white">Server uptime</div>
                <div className="text-2xl font-bold text-white">99.94%</div>
                <div className="text-xs text-slate-400">No critical incidents in the last 7 days.</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Pending reviews</div>
                  <div className="mt-2 text-xl font-bold text-white">14</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">New leads</div>
                  <div className="mt-2 text-xl font-bold text-white">128</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[1.75rem] border border-white/10 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-heading text-lg font-bold text-white">Open tickets</h3>
              <span className="rounded-full bg-danger px-2.5 py-1 text-xs font-semibold text-white">5 active</span>
            </div>

            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.title}
                  className={`rounded-2xl border border-white/10 border-l-4 p-4 ${ticketToneStyles[ticket.tone as keyof typeof ticketToneStyles]}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-white">{ticket.title}</div>
                      <div className="mt-1 text-xs text-slate-400">{ticket.meta}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{ticket.detail}</p>
                  <button className="mt-3 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200">
                    {ticket.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
