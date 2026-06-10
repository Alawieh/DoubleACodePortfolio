import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { Category, CategorySlug } from "@/stores/pavone/data/products";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import { deleteCategory, upsertCategory } from "@/stores/pavone/lib/pavone-api";
import { usePavoneCatalog } from "@/stores/pavone/lib/use-pavone-data";
import { uploadPavoneImage } from "@/stores/pavone/lib/supabase";

export const Route = createFileRoute("/stores/pavone/admin/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  const { data, error, reload } = usePavoneCatalog();
  const { categories, products } = data;
  const [editing, setEditing] = useState<Category | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  function openNew() {
    setEditing({ slug: "" as CategorySlug, name: "", description: "", image: "" });
    setIsNew(true);
  }

  async function save() {
    if (!editing || !editing.slug || !editing.name) return;
    await upsertCategory(editing);
    await reload();
    setEditing(null);
    setIsNew(false);
  }

  async function uploadImage(file: File | undefined) {
    if (!file || !editing) return;
    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadPavoneImage(file, "categories");
      setEditing({ ...editing, image: url });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Could not upload image.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-cocoa">Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">{categories.length} active collections</p>
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 rounded-lg bg-cocoa text-ivory px-4 py-2.5 text-sm hover:bg-cocoa/90">
          <Plus className="h-4 w-4" /> Add category
        </button>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.slug).length;
          return (
            <div key={c.slug} className="rounded-2xl border border-border bg-background overflow-hidden group">
              <div className="relative aspect-[4/3] bg-cream overflow-hidden">
                {c.image && <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform" />}
                <div className="absolute top-3 right-3 flex gap-1">
                  <button onClick={() => { setEditing(c); setIsNew(false); }} className="p-2 bg-background/90 rounded-md hover:bg-background">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={async () => { if (confirm(`Delete "${c.name}"?`)) { await deleteCategory(c.slug); await reload(); } }}
                    className="p-2 bg-background/90 rounded-md hover:bg-destructive/10 text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg text-cocoa">{c.name}</h3>
                  <span className="text-xs text-muted-foreground">{count} items</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
                <code className="block mt-2 text-[10px] text-pink">/{c.slug}</code>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-cocoa/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl max-w-lg w-full shadow-soft border border-border">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-display text-2xl text-cocoa">{isNew ? "New category" : "Edit category"}</h2>
              <button onClick={() => setEditing(null)} className="p-2 rounded-md hover:bg-cream"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <label className="block">
                <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1.5">Name</span>
                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background" />
              </label>
              <label className="block">
                <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1.5">Slug</span>
                <input
                  value={editing.slug}
                  onChange={(e) => setEditing({ ...editing, slug: e.target.value as CategorySlug })}
                  disabled={!isNew}
                  className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background disabled:opacity-60"
                />
              </label>
              <label className="block">
                <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1.5">Description</span>
                <textarea rows={2} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background" />
              </label>
              <label className="block">
                <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1.5">Category image</span>
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-cream/40 px-4 py-4 text-sm text-cocoa hover:bg-cream">
                  <Upload className="h-4 w-4" />
                  {uploading ? "Uploading..." : "Upload image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    disabled={uploading}
                    onChange={(e) => void uploadImage(e.target.files?.[0])}
                  />
                </label>
                {uploadError && <p className="mt-2 text-sm text-destructive">{uploadError}</p>}
                <input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="mt-2 w-full px-3 py-2 text-sm rounded-md border border-input bg-background" placeholder="https://..." />
                {editing.image && <img src={editing.image} alt="" className="mt-2 h-32 w-full rounded-lg object-cover" />}
              </label>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-cream/30">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm rounded-lg hover:bg-cream">Cancel</button>
              <button onClick={save} className="px-4 py-2 text-sm rounded-lg bg-cocoa text-ivory hover:bg-cocoa/90">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
