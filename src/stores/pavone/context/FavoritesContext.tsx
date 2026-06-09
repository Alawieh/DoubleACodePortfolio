import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Ctx = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  count: number;
};

const FavoritesContext = createContext<Ctx | null>(null);
const KEY = "pavone.favorites.v1";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setIds(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch {}
  }, [ids]);

  const value = useMemo<Ctx>(() => ({
    ids,
    has: (id) => ids.includes(id),
    toggle: (id) => setIds((cur) => cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]),
    count: ids.length,
  }), [ids]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
