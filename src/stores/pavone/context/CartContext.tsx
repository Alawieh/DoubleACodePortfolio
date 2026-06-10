import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePavoneCatalog } from "@/stores/pavone/lib/use-pavone-data";

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartCtx {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (item: CartItem) => void;
  remove: (productId: string, size?: string, color?: string) => void;
  setQty: (productId: string, qty: number, size?: string, color?: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const Ctx = createContext<CartCtx | null>(null);

const keyOf = (i: { productId: string; size?: string; color?: string }) =>
  `${i.productId}__${i.size ?? ""}__${i.color ?? ""}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const { data } = usePavoneCatalog();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pavone:cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("pavone:cart", JSON.stringify(items));
  }, [items, hydrated]);

  const add: CartCtx["add"] = (item) => {
    setItems((prev) => {
      const k = keyOf(item);
      const found = prev.find((p) => keyOf(p) === k);
      if (found) return prev.map((p) => (keyOf(p) === k ? { ...p, quantity: p.quantity + item.quantity } : p));
      return [...prev, item];
    });
    setIsOpen(true);
  };

  const remove: CartCtx["remove"] = (pid, size, color) =>
    setItems((prev) => prev.filter((p) => keyOf(p) !== keyOf({ productId: pid, size, color })));

  const setQty: CartCtx["setQty"] = (pid, qty, size, color) =>
    setItems((prev) =>
      prev
        .map((p) => (keyOf(p) === keyOf({ productId: pid, size, color }) ? { ...p, quantity: qty } : p))
        .filter((p) => p.quantity > 0),
    );

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const it of items) {
      const prod = data.products.find((p) => p.id === it.productId);
      if (!prod) continue;
      const price = prod.salePrice ?? prod.price;
      c += it.quantity;
      s += price * it.quantity;
    }
    return { count: c, subtotal: s };
  }, [items, data.products]);

  return (
    <Ctx.Provider
      value={{
        items, isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((v) => !v),
        add, remove, setQty,
        clear: () => setItems([]),
        count, subtotal,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be inside CartProvider");
  return v;
}
