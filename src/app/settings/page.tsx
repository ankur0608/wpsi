"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

type SettingsSectionId = "profile" | "notifications" | "security" | "appearance";

type StatusState = {
  tone: "success" | "error" | "info";
  message: string;
} | null;

type ProfileFormState = {
  firstName: string;
  lastName: string;
  email: string;
  targetExam: string;
};

type NotificationState = {
  reminders: boolean;
  productUpdates: boolean;
  weeklySummary: boolean;
};

type AppearanceState = {
  compactCards: boolean;
  reducedMotion: boolean;
  accent: string;
};

const TARGET_EXAMS = [
  "Wireless PSI (WPSI)",
  "GPSC Class 1 & 2",
  "Police Constable",
];

const SETTINGS_SECTIONS: Array<{
  id: SettingsSectionId;
  label: string;
  icon: string;
}> = [
  { id: "profile", label: "General Profile", icon: "fa-user" },
  { id: "notifications", label: "Notifications", icon: "fa-bell" },
  { id: "security", label: "Security", icon: "fa-shield-halved" },
  { id: "appearance", label: "Appearance", icon: "fa-palette" },
];

const DEFAULT_NOTIFICATIONS: NotificationState = {
  reminders: true,
  productUpdates: false,
  weeklySummary: true,
};

const DEFAULT_APPEARANCE: AppearanceState = {
  compactCards: false,
  reducedMotion: false,
  accent: "Indigo",
};

const PROFILE_STORAGE_KEY = "wpsi-settings-target-exam";
const NOTIFICATION_STORAGE_KEY = "wpsi-settings-notifications";
const APPEARANCE_STORAGE_KEY = "wpsi-settings-appearance";

function splitFullName(name?: string | null) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

function ToggleRow({
  label,
  description,
  enabled,
  onToggle,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-dark-bg/70 px-4 py-4 text-left transition-colors hover:border-white/15"
      aria-pressed={enabled}
    >
      <div className="pr-4">
        <div className="text-sm font-bold text-white">{label}</div>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>
      <span
        className={`flex h-7 w-12 items-center rounded-full border p-1 transition-all ${
          enabled
            ? "justify-end border-brand-500/40 bg-brand-500/20"
            : "justify-start border-white/10 bg-white/5"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full transition-colors ${
            enabled ? "bg-brand-400" : "bg-slate-500"
          }`}
        />
      </span>
    </button>
  );
}

export default function SettingsPage() {
  const { user, loading, updateUser } = useUser();
  const [activeSection, setActiveSection] = useState<SettingsSectionId>("profile");
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    firstName: "",
    lastName: "",
    email: "",
    targetExam: TARGET_EXAMS[0],
  });
  const [notifications, setNotifications] = useState<NotificationState>(DEFAULT_NOTIFICATIONS);
  const [appearance, setAppearance] = useState<AppearanceState>(DEFAULT_APPEARANCE);
  const [status, setStatus] = useState<StatusState>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);

  useEffect(() => {
    const { firstName, lastName } = splitFullName(user?.name);
    setProfileForm((current) => ({
      ...current,
      firstName,
      lastName,
      email: user?.email ?? "",
    }));
  }, [user?.email, user?.name]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedTargetExam = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (storedTargetExam && TARGET_EXAMS.includes(storedTargetExam)) {
      setProfileForm((current) => ({
        ...current,
        targetExam: storedTargetExam,
      }));
    }

    const storedNotifications = window.localStorage.getItem(NOTIFICATION_STORAGE_KEY);
    if (storedNotifications) {
      try {
        setNotifications({
          ...DEFAULT_NOTIFICATIONS,
          ...JSON.parse(storedNotifications),
        });
      } catch {
        window.localStorage.removeItem(NOTIFICATION_STORAGE_KEY);
      }
    }

    const storedAppearance = window.localStorage.getItem(APPEARANCE_STORAGE_KEY);
    if (storedAppearance) {
      try {
        setAppearance({
          ...DEFAULT_APPEARANCE,
          ...JSON.parse(storedAppearance),
        });
      } catch {
        window.localStorage.removeItem(APPEARANCE_STORAGE_KEY);
      }
    }
  }, []);

  const updateProfileField = (field: keyof ProfileFormState, value: string) => {
    setProfileForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleProfileSave = async () => {
    const fullName = [profileForm.firstName.trim(), profileForm.lastName.trim()]
      .filter(Boolean)
      .join(" ");
    const normalizedEmail = profileForm.email.trim().toLowerCase();

    if (!fullName) {
      setStatus({ tone: "error", message: "Please enter your first name or full name before saving." });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus({ tone: "error", message: "Please enter a valid email address." });
      return;
    }

    setIsSavingProfile(true);
    setStatus(null);

    try {
      await updateUser({
        name: fullName,
        email: normalizedEmail,
      });

      if (typeof window !== "undefined") {
        window.localStorage.setItem(PROFILE_STORAGE_KEY, profileForm.targetExam);
      }

      setStatus({ tone: "success", message: "Your profile details have been updated." });
    } catch (error) {
      setStatus({
        tone: "error",
        message: error instanceof Error ? error.message : "Unable to save your profile right now.",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePreferenceSave = async () => {
    setIsSavingPreferences(true);
    setStatus(null);

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(notifications));
        window.localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(appearance));
      }

      setStatus({ tone: "success", message: "Your local settings preferences were saved." });
    } finally {
      setIsSavingPreferences(false);
    }
  };

  const handleDeleteClick = () => {
    setStatus({
      tone: "info",
      message: "Delete account is still a placeholder in this app, so nothing has been removed.",
    });
  };

  const fullDisplayName =
    [profileForm.firstName.trim(), profileForm.lastName.trim()].filter(Boolean).join(" ") ||
    user?.name?.trim() ||
    "WPSI User";
  const avatarName = encodeURIComponent(fullDisplayName);

  return (
    <div className="relative pb-20">
      <div className="pointer-events-none absolute -left-8 -top-8 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-heading font-black text-white sm:text-3xl">Account Settings</h2>
          <p className="max-w-2xl text-sm text-slate-400">
            Same glassmorphism layout as your HTML reference, now cleaned up for the shared Next.js dashboard.
          </p>
        </div>

        {status && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${
              status.tone === "success"
                ? "border-accent/30 bg-accent/10 text-emerald-200"
                : status.tone === "error"
                  ? "border-danger/30 bg-danger/10 text-red-200"
                  : "border-brand-500/30 bg-brand-500/10 text-brand-100"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full shrink-0 md:w-64">
            <div className="glass-card sticky top-0 flex flex-col gap-1 rounded-2xl border border-white/5 p-2">
              {SETTINGS_SECTIONS.map((section) => {
                const isActive = section.id === activeSection;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-white/10 font-bold text-white"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <i
                      className={`fa-solid ${section.icon} w-4 ${
                        isActive ? "text-brand-400" : "text-slate-500"
                      }`}
                    />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 space-y-6">
            {activeSection === "profile" && (
              <>
                <div className="glass-card relative overflow-hidden rounded-2xl border border-white/5 p-6">
                  <h3 className="mb-6 border-b border-white/10 pb-4 text-lg font-bold text-white">
                    General Profile
                  </h3>

                  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                    <div className="group relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-white/10">
                      <img
                        src={`https://ui-avatars.com/api/?name=${avatarName}&background=334155&color=fff&bold=true&size=160`}
                        className="h-full w-full object-cover transition-opacity group-hover:opacity-50"
                        alt="Profile avatar"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <i className="fa-solid fa-camera text-white" />
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-1 font-bold text-white">Profile Picture</h4>
                      <p className="mb-3 text-xs text-slate-400">JPG, GIF or PNG. Max size of 2MB.</p>
                      <button
                        type="button"
                        onClick={() =>
                          setStatus({
                            tone: "info",
                            message: "Avatar upload is not wired yet, but the UI is ready for it.",
                          })
                        }
                        className="rounded-lg bg-white/10 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/20"
                      >
                        Upload New
                      </button>
                    </div>
                  </div>

                  <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-bold text-slate-400">First Name</label>
                      <input
                        type="text"
                        value={profileForm.firstName}
                        onChange={(event) => updateProfileField("firstName", event.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-dark-bg px-4 py-2.5 text-white transition-colors outline-none focus:border-brand-500"
                        placeholder="Rahul"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold text-slate-400">Last Name</label>
                      <input
                        type="text"
                        value={profileForm.lastName}
                        onChange={(event) => updateProfileField("lastName", event.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-dark-bg px-4 py-2.5 text-white transition-colors outline-none focus:border-brand-500"
                        placeholder="Parmar"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="mb-2 block text-xs font-bold text-slate-400">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(event) => updateProfileField("email", event.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-dark-bg px-4 py-2.5 text-white transition-colors outline-none focus:border-brand-500"
                      placeholder="rahul@example.com"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="mb-2 block text-xs font-bold text-slate-400">Target Exam</label>
                    <select
                      value={profileForm.targetExam}
                      onChange={(event) => updateProfileField("targetExam", event.target.value)}
                      className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-dark-bg px-4 py-2.5 text-white transition-colors outline-none focus:border-brand-500"
                    >
                      {TARGET_EXAMS.map((exam) => (
                        <option key={exam} value={exam}>
                          {exam}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                    <div className="text-xs text-slate-500">
                      {loading ? "Syncing your latest profile..." : "Your public account details are ready to update."}
                    </div>
                    <button
                      type="button"
                      onClick={handleProfileSave}
                      disabled={isSavingProfile || loading}
                      className="rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSavingProfile ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>

                <div className="glass-card relative overflow-hidden rounded-2xl border border-danger/30 p-6">
                  <h3 className="mb-2 text-lg font-bold text-danger">Danger Zone</h3>
                  <p className="mb-4 text-sm text-slate-400">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button
                    type="button"
                    onClick={handleDeleteClick}
                    className="rounded-lg border border-danger/30 bg-danger/10 px-5 py-2 text-xs font-bold text-danger transition-colors hover:bg-danger/20"
                  >
                    Delete Account
                  </button>
                </div>
              </>
            )}

            {activeSection === "notifications" && (
              <div className="glass-card rounded-2xl border border-white/5 p-6">
                <h3 className="mb-2 text-lg font-bold text-white">Notifications</h3>
                <p className="mb-6 text-sm text-slate-400">
                  Keep alerts tidy while holding on to the same visual style from the reference screen.
                </p>

                <div className="space-y-4">
                  <ToggleRow
                    label="Study reminders"
                    description="Receive gentle reminders when your revision streak is about to break."
                    enabled={notifications.reminders}
                    onToggle={() =>
                      setNotifications((current) => ({
                        ...current,
                        reminders: !current.reminders,
                      }))
                    }
                  />
                  <ToggleRow
                    label="Weekly performance summary"
                    description="Get a recap of tests, practice accuracy, and progress trends."
                    enabled={notifications.weeklySummary}
                    onToggle={() =>
                      setNotifications((current) => ({
                        ...current,
                        weeklySummary: !current.weeklySummary,
                      }))
                    }
                  />
                  <ToggleRow
                    label="Offers and product updates"
                    description="See plan offers, feature launches, and seasonal WPSI announcements."
                    enabled={notifications.productUpdates}
                    onToggle={() =>
                      setNotifications((current) => ({
                        ...current,
                        productUpdates: !current.productUpdates,
                      }))
                    }
                  />
                </div>

                <div className="mt-6 flex justify-end border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={handlePreferenceSave}
                    disabled={isSavingPreferences}
                    className="rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSavingPreferences ? "Saving..." : "Save Preferences"}
                  </button>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="glass-card rounded-2xl border border-white/5 p-6">
                <h3 className="mb-2 text-lg font-bold text-white">Security</h3>
                <p className="mb-6 text-sm text-slate-400">
                  The full password management flow is still pending, but this section now has the matching settings-page UI.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-dark-bg/70 p-5">
                    <div className="mb-2 flex items-center gap-2 text-brand-400">
                      <i className="fa-solid fa-lock" />
                      <span className="text-sm font-bold text-white">Password</span>
                    </div>
                    <p className="text-sm text-slate-400">
                      Your login remains protected by the current account password. A reset screen can be added next.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-dark-bg/70 p-5">
                    <div className="mb-2 flex items-center gap-2 text-accent">
                      <i className="fa-solid fa-shield-check" />
                      <span className="text-sm font-bold text-white">Session status</span>
                    </div>
                    <p className="text-sm text-slate-400">
                      Your dashboard is using the current authenticated session from the app API and protected layout.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "appearance" && (
              <div className="glass-card rounded-2xl border border-white/5 p-6">
                <h3 className="mb-2 text-lg font-bold text-white">Appearance</h3>
                <p className="mb-6 text-sm text-slate-400">
                  Small personal display preferences, stored locally for now.
                </p>

                <div className="space-y-4">
                  <ToggleRow
                    label="Compact cards"
                    description="Tighten card spacing for denser dashboards and quicker scanning."
                    enabled={appearance.compactCards}
                    onToggle={() =>
                      setAppearance((current) => ({
                        ...current,
                        compactCards: !current.compactCards,
                      }))
                    }
                  />
                  <ToggleRow
                    label="Reduced motion"
                    description="Tone down visual motion while keeping the current layout intact."
                    enabled={appearance.reducedMotion}
                    onToggle={() =>
                      setAppearance((current) => ({
                        ...current,
                        reducedMotion: !current.reducedMotion,
                      }))
                    }
                  />
                </div>

                <div className="mt-6">
                  <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Accent Style
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {["Indigo", "Emerald", "Amber"].map((accent) => {
                      const selected = appearance.accent === accent;
                      const swatchClass =
                        accent === "Emerald"
                          ? "from-emerald-400 to-emerald-600"
                          : accent === "Amber"
                            ? "from-amber-400 to-orange-500"
                            : "from-brand-400 to-secondary";

                      return (
                        <button
                          key={accent}
                          type="button"
                          onClick={() =>
                            setAppearance((current) => ({
                              ...current,
                              accent,
                            }))
                          }
                          className={`rounded-2xl border px-4 py-3 text-sm font-bold transition-colors ${
                            selected
                              ? "border-brand-500/40 bg-white/10 text-white"
                              : "border-white/10 bg-dark-bg/70 text-slate-300 hover:border-white/20"
                          }`}
                        >
                          <span className={`mb-2 block h-2.5 w-16 rounded-full bg-gradient-to-r ${swatchClass}`} />
                          {accent}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex justify-end border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={handlePreferenceSave}
                    disabled={isSavingPreferences}
                    className="rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSavingPreferences ? "Saving..." : "Save Preferences"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
