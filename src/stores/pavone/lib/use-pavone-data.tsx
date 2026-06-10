import { useCallback, useEffect, useState } from "react";
import type { Category, Product } from "@/stores/pavone/data/products";
import {
  listCategories,
  getPavoneSiteSettings,
  listOutfitInspirations,
  listOrders,
  listProducts,
  type OutfitInspiration,
  type PavoneOrder,
  type PavoneSiteSettings,
} from "./pavone-api";
import { isSupabaseConfigured, SupabaseConfigError } from "./supabase";

type AsyncState<T> = {
  data: T;
  loading: boolean;
  error: string;
  reload: () => Promise<void>;
};

export function usePavoneCatalog(): AsyncState<{ products: Product[]; categories: Category[] }> {
  const [data, setData] = useState<{ products: Product[]; categories: Category[] }>({ products: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setError(new SupabaseConfigError().message);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const [products, categories] = await Promise.all([listProducts(), listCategories()]);
      setData({ products, categories });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load Pavone catalog.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, loading, error, reload };
}

export function usePavoneOrders(): AsyncState<PavoneOrder[]> {
  const [data, setData] = useState<PavoneOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setError(new SupabaseConfigError().message);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      setData(await listOrders());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, loading, error, reload };
}

export function usePavoneOutfits(includeInactive = false): AsyncState<OutfitInspiration[]> {
  const [data, setData] = useState<OutfitInspiration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setError(new SupabaseConfigError().message);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      setData(await listOutfitInspirations(includeInactive));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load outfit inspirations.");
    } finally {
      setLoading(false);
    }
  }, [includeInactive]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, loading, error, reload };
}

export function usePavoneSiteSettings(): AsyncState<PavoneSiteSettings | null> {
  const [data, setData] = useState<PavoneSiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setError(new SupabaseConfigError().message);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      setData(await getPavoneSiteSettings());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load Pavone settings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, loading, error, reload };
}

export function PavoneDataState({
  loading,
  error,
  empty,
  children,
}: {
  loading: boolean;
  error: string;
  empty?: boolean;
  children: React.ReactNode;
}) {
  if (loading) {
    return <div className="container-page py-16 text-center text-sm text-muted-foreground">Loading Pavone data...</div>;
  }
  if (error) {
    return (
      <div className="container-page py-16">
        <div className="rounded-2xl border border-border bg-background p-6 text-sm text-cocoa shadow-card">
          <div className="font-display text-2xl">Pavone needs Supabase setup</div>
          <p className="mt-2 text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }
  if (empty) {
    return <div className="container-page py-16 text-center text-sm text-muted-foreground">No Pavone data yet.</div>;
  }
  return <>{children}</>;
}
