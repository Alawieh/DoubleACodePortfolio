import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  defaultPavoneSiteSettings,
  getPavoneSiteSettings,
  updatePavoneSiteSettings,
  type PavoneSiteSettings,
} from "@/stores/pavone/lib/pavone-api";
import { adminEmailToUsername, getStoredSession, updateAdminAccount, uploadPavoneImage } from "@/stores/pavone/lib/supabase";

export const Route = createFileRoute("/stores/pavone/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const session = getStoredSession();
  const [displayName, setDisplayName] = useState(String(session?.user?.user_metadata?.display_name ?? ""));
  const [username, setUsername] = useState(adminEmailToUsername(session?.user?.email));
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [siteSettings, setSiteSettings] = useState<PavoneSiteSettings>(defaultPavoneSiteSettings);
  const [siteMessage, setSiteMessage] = useState("");
  const [siteError, setSiteError] = useState("");
  const [savingSite, setSavingSite] = useState(false);
  const [uploading, setUploading] = useState("");

  useEffect(() => {
    let mounted = true;
    getPavoneSiteSettings()
      .then((settings) => {
        if (mounted) setSiteSettings(settings);
      })
      .catch((err) => {
        if (mounted) setSiteError(err instanceof Error ? err.message : "Could not load storefront settings.");
      });
    return () => {
      mounted = false;
    };
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);
    try {
      await updateAdminAccount({
        displayName: displayName.trim(),
        username: username.trim(),
        password: password.trim() || undefined,
      });
      setPassword("");
      setMessage("Admin account updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update admin account.");
    } finally {
      setSaving(false);
    }
  }

  async function saveSiteSettings(e: React.FormEvent) {
    e.preventDefault();
    setSiteMessage("");
    setSiteError("");
    setSavingSite(true);
    try {
      const saved = await updatePavoneSiteSettings(siteSettings);
      setSiteSettings(saved);
      setSiteMessage("Storefront settings updated.");
    } catch (err) {
      setSiteError(err instanceof Error ? err.message : "Could not update storefront settings.");
    } finally {
      setSavingSite(false);
    }
  }

  async function uploadHeroImage(file: File | undefined, field: "heroMainImage" | "heroMobileImage" | `heroGalleryImages.${number}`) {
    if (!file) return;
    setSiteMessage("");
    setSiteError("");
    setUploading(field);
    try {
      const url = await uploadPavoneImage(file, "hero");
      if (field === "heroMainImage" || field === "heroMobileImage") {
        setSiteSettings((current) => ({ ...current, [field]: url }));
      } else {
        const index = Number(field.split(".")[1]);
        setSiteSettings((current) => {
          const next = [...current.heroGalleryImages];
          next[index] = url;
          return { ...current, heroGalleryImages: next };
        });
      }
    } catch (err) {
      setSiteError(err instanceof Error ? err.message : "Could not upload image.");
    } finally {
      setUploading("");
    }
  }

  function updateGalleryImage(index: number, value: string) {
    setSiteSettings((current) => {
      const next = [...current.heroGalleryImages];
      next[index] = value;
      return { ...current, heroGalleryImages: next };
    });
  }

  return (
    <div className="max-w-4xl space-y-6">
      <header>
        <h1 className="font-display text-3xl text-cocoa">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Update Pavone login details and storefront hero content.</p>
      </header>

      <form onSubmit={save} className="rounded-2xl border border-border bg-background p-6 space-y-4">
        <div>
          <h2 className="font-display text-2xl text-cocoa">Admin account</h2>
          <p className="text-sm text-muted-foreground mt-1">Change the username, display name, or password used for this dashboard.</p>
        </div>
        <Field label="Display name">
          <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Username">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={inputCls} required autoComplete="username" />
        </Field>
        <Field label="New password">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
            placeholder="Leave empty to keep current password"
          />
        </Field>

        {message && <p className="text-sm text-emerald-700">{message}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-cocoa text-ivory px-4 py-2.5 text-sm hover:bg-cocoa/90 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save settings"}
        </button>
      </form>

      <form onSubmit={saveSiteSettings} className="rounded-2xl border border-border bg-background p-6 space-y-5">
        <div>
          <h2 className="font-display text-2xl text-cocoa">Homepage hero</h2>
          <p className="text-sm text-muted-foreground mt-1">Change the images and text shown at the top of the Pavone storefront.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Hero title">
            <textarea
              value={siteSettings.heroTitle}
              onChange={(e) => setSiteSettings({ ...siteSettings, heroTitle: e.target.value })}
              className={`${inputCls} min-h-24`}
            />
          </Field>
          <Field label="Hero subtitle">
            <textarea
              value={siteSettings.heroSubtitle}
              onChange={(e) => setSiteSettings({ ...siteSettings, heroSubtitle: e.target.value })}
              className={`${inputCls} min-h-24`}
            />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Hero badge">
            <input value={siteSettings.heroBadge} onChange={(e) => setSiteSettings({ ...siteSettings, heroBadge: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Featured label">
            <input value={siteSettings.featuredLookLabel} onChange={(e) => setSiteSettings({ ...siteSettings, featuredLookLabel: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Featured product slug">
            <input value={siteSettings.featuredProductSlug} onChange={(e) => setSiteSettings({ ...siteSettings, featuredProductSlug: e.target.value })} className={inputCls} />
          </Field>
        </div>

        <ImageField
          label="Main desktop hero image"
          value={siteSettings.heroMainImage}
          uploading={uploading === "heroMainImage"}
          onChange={(value) => setSiteSettings({ ...siteSettings, heroMainImage: value })}
          onUpload={(file) => uploadHeroImage(file, "heroMainImage")}
        />
        <ImageField
          label="Mobile hero image"
          value={siteSettings.heroMobileImage}
          uploading={uploading === "heroMobileImage"}
          onChange={(value) => setSiteSettings({ ...siteSettings, heroMobileImage: value })}
          onUpload={(file) => uploadHeroImage(file, "heroMobileImage")}
        />

        <div>
          <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">Small desktop gallery images</span>
          <div className="grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <ImageField
                key={index}
                label={`Gallery image ${index + 1}`}
                value={siteSettings.heroGalleryImages[index] ?? ""}
                uploading={uploading === `heroGalleryImages.${index}`}
                onChange={(value) => updateGalleryImage(index, value)}
                onUpload={(file) => uploadHeroImage(file, `heroGalleryImages.${index}`)}
                compact
              />
            ))}
          </div>
        </div>

        {siteMessage && <p className="text-sm text-emerald-700">{siteMessage}</p>}
        {siteError && <p className="text-sm text-destructive">{siteError}</p>}

        <button
          type="submit"
          disabled={savingSite}
          className="rounded-lg bg-pink text-primary-foreground px-4 py-2.5 text-sm hover:opacity-90 disabled:opacity-60"
        >
          {savingSite ? "Saving..." : "Save storefront"}
        </button>
      </form>
    </div>
  );
}

const inputCls = "w-full px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-pink/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function ImageField({
  label,
  value,
  uploading,
  onChange,
  onUpload,
  compact = false,
}: {
  label: string;
  value: string;
  uploading: boolean;
  onChange: (value: string) => void;
  onUpload: (file: File | undefined) => void;
  compact?: boolean;
}) {
  return (
    <div>
      <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1.5">{label}</span>
      <label className="inline-flex cursor-pointer items-center rounded-lg bg-cocoa px-3 py-2 text-xs text-ivory hover:bg-cocoa/90">
        {uploading ? "Uploading..." : "Upload image"}
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={uploading}
          onChange={(e) => onUpload(e.target.files?.[0])}
        />
      </label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} mt-2`} placeholder="https://..." />
      {value && <img src={value} alt="" className={`mt-2 w-full rounded-lg object-cover ${compact ? "h-28" : "h-48"}`} />}
    </div>
  );
}
