// Mock in-memory store for admin demo. No backend.
// Architected so a real data layer (Supabase, REST, etc.) can replace this module later
// without changing components — they only use the exported hooks and actions.

import { useSyncExternalStore } from "react";
import { products as seedProducts, categories as seedCategories, type Product, type Category, type CategorySlug } from "@/stores/pavone/data/products";

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  city: string;
  items: { productId: string; name: string; qty: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  channel: "whatsapp" | "web";
}

interface State {
  products: Product[];
  categories: Category[];
  orders: Order[];
  authed: boolean;
}

const LS_KEY = "pavone_admin_state_v1";
const LS_AUTH = "pavone_admin_authed";

function seedOrders(): Order[] {
  const now = Date.now();
  const day = 86400000;
  return [
    {
      id: "ORD-1042",
      customerName: "Layla Haddad",
      customerPhone: "+96170123456",
      city: "Beirut",
      items: [{ productId: "p2", name: "Blossom Knit Dress", qty: 1, price: 89 }],
      total: 89,
      status: "pending",
      createdAt: new Date(now - 0.2 * day).toISOString(),
      channel: "whatsapp",
    },
    {
      id: "ORD-1041",
      customerName: "Nour El-Amin",
      customerPhone: "+96176998877",
      city: "Tripoli",
      items: [
        { productId: "p7", name: "Summer Elegance Set", qty: 1, price: 60 },
        { productId: "p6", name: "Garden Print Silk Scarf", qty: 2, price: 45 },
      ],
      total: 150,
      status: "confirmed",
      createdAt: new Date(now - 1.1 * day).toISOString(),
      channel: "whatsapp",
    },
    {
      id: "ORD-1040",
      customerName: "Sara Mansour",
      customerPhone: "+96171445566",
      city: "Saida",
      items: [{ productId: "p3", name: "Cerise Belted Coat", qty: 1, price: 240 }],
      total: 240,
      status: "shipped",
      createdAt: new Date(now - 2.4 * day).toISOString(),
      channel: "web",
    },
    {
      id: "ORD-1039",
      customerName: "Rim Khalil",
      customerPhone: "+96103221100",
      city: "Jounieh",
      items: [{ productId: "p1", name: "Midnight Rose Abaya", qty: 1, price: 119 }],
      total: 119,
      status: "delivered",
      createdAt: new Date(now - 5 * day).toISOString(),
      channel: "whatsapp",
    },
    {
      id: "ORD-1038",
      customerName: "Hala Daher",
      customerPhone: "+96178001122",
      city: "Beirut",
      items: [{ productId: "p4", name: "Azure Pleated Set", qty: 2, price: 135 }],
      total: 270,
      status: "delivered",
      createdAt: new Date(now - 7 * day).toISOString(),
      channel: "web",
    },
    {
      id: "ORD-1037",
      customerName: "Yasmine Aoun",
      customerPhone: "+96176665544",
      city: "Byblos",
      items: [{ productId: "p8", name: "Ivory Occasion Gown", qty: 1, price: 199 }],
      total: 199,
      status: "cancelled",
      createdAt: new Date(now - 9 * day).toISOString(),
      channel: "whatsapp",
    },
  ];
}

let state: State = {
  products: seedProducts,
  categories: seedCategories,
  orders: seedOrders(),
  authed: false,
};

// Load persisted state in browser
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<State>;
      state = {
        products: parsed.products ?? state.products,
        categories: parsed.categories ?? state.categories,
        orders: parsed.orders ?? state.orders,
        authed: localStorage.getItem(LS_AUTH) === "1",
      };
    } else {
      state.authed = localStorage.getItem(LS_AUTH) === "1";
    }
  } catch {
    /* ignore */
  }
}

const listeners = new Set<() => void>();
function emit() {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(
        LS_KEY,
        JSON.stringify({ products: state.products, categories: state.categories, orders: state.orders }),
      );
    } catch {
      /* ignore */
    }
  }
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}
function getSnapshot() {
  return state;
}
function getServerSnapshot() {
  return state;
}

export function useAdminStore<T>(selector: (s: State) => T): T {
  const snap = useSyncExternalStore(subscribe, () => selector(getSnapshot()), () => selector(getServerSnapshot()));
  return snap;
}

// ---------------- Actions ----------------

export const adminActions = {
  login(password: string): boolean {
    // Demo-only auth — replace with real auth when backend is connected.
    if (password === "admin123") {
      state = { ...state, authed: true };
      if (typeof window !== "undefined") localStorage.setItem(LS_AUTH, "1");
      emit();
      return true;
    }
    return false;
  },
  logout() {
    state = { ...state, authed: false };
    if (typeof window !== "undefined") localStorage.removeItem(LS_AUTH);
    emit();
  },

  // Products
  upsertProduct(p: Product) {
    const exists = state.products.some((x) => x.id === p.id);
    state = {
      ...state,
      products: exists ? state.products.map((x) => (x.id === p.id ? p : x)) : [p, ...state.products],
    };
    emit();
  },
  deleteProduct(id: string) {
    state = { ...state, products: state.products.filter((p) => p.id !== id) };
    emit();
  },

  // Categories
  upsertCategory(c: Category) {
    const exists = state.categories.some((x) => x.slug === c.slug);
    state = {
      ...state,
      categories: exists ? state.categories.map((x) => (x.slug === c.slug ? c : x)) : [...state.categories, c],
    };
    emit();
  },
  deleteCategory(slug: CategorySlug) {
    state = { ...state, categories: state.categories.filter((c) => c.slug !== slug) };
    emit();
  },

  // Orders
  updateOrderStatus(id: string, status: Order["status"]) {
    state = {
      ...state,
      orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    };
    emit();
  },
  deleteOrder(id: string) {
    state = { ...state, orders: state.orders.filter((o) => o.id !== id) };
    emit();
  },

  resetDemo() {
    state = { products: seedProducts, categories: seedCategories, orders: seedOrders(), authed: state.authed };
    emit();
  },
};

export function newProductId() {
  return "p" + Math.random().toString(36).slice(2, 8);
}
