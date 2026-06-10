import { createFileRoute, Link } from "@tanstack/react-router";
import { DollarSign, Package, ShoppingCart, TrendingUp, Clock } from "lucide-react";
import { usePavoneCatalog, usePavoneOrders } from "@/stores/pavone/lib/use-pavone-data";

export const Route = createFileRoute("/stores/pavone/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const catalog = usePavoneCatalog();
  const ordersState = usePavoneOrders();
  const products = catalog.data.products;
  const categories = catalog.data.categories;
  const orders = ordersState.data;

  const revenue = orders.filter((o) => o.status !== "canceled").reduce((sum, o) => sum + o.total, 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const recentOrders = orders.slice(0, 5);

  const unitMap = new Map<string, { name: string; units: number; revenue: number }>();
  for (const o of orders) {
    if (o.status === "canceled") continue;
    for (const it of o.items) {
      const key = it.productId ?? it.productName;
      const cur = unitMap.get(key) ?? { name: it.productName, units: 0, revenue: 0 };
      cur.units += it.quantity;
      cur.revenue += it.quantity * it.price;
      unitMap.set(key, cur);
    }
  }
  const topSellers = [...unitMap.entries()].sort((a, b) => b[1].units - a[1].units).slice(0, 5);

  const stats = [
    { label: "Revenue", value: `$${revenue.toLocaleString()}`, icon: DollarSign, accent: "from-pink/20 to-blush/20" },
    { label: "Orders", value: orders.length, icon: ShoppingCart, accent: "from-lavender/30 to-sky/30" },
    { label: "Products", value: products.length, icon: Package, accent: "from-mint/30 to-sage/30" },
    { label: "Pending", value: pendingCount, icon: Clock, accent: "from-peach/40 to-coral/20" },
  ];

  const error = catalog.error || ordersState.error;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl text-cocoa">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Live Supabase overview for Pavone.</p>
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`rounded-2xl bg-gradient-to-br ${s.accent} p-5 border border-border/50`}>
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.18em] text-cocoa/70">{s.label}</div>
                <Icon className="h-4 w-4 text-cocoa/70" />
              </div>
              <div className="mt-3 font-display text-3xl text-cocoa">{s.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-background border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-cocoa">Recent orders</h2>
            <Link to="/stores/pavone/admin/orders" className="text-xs text-pink hover:underline uppercase tracking-[0.18em]">View all</Link>
          </div>
          <div className="divide-y divide-border">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium text-cocoa">{o.orderNumber} - {o.customerName}</div>
                  <div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString()} - {o.items.length} item(s)</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-cocoa">${o.total}</div>
                  <StatusPill status={o.status} />
                </div>
              </div>
            ))}
            {recentOrders.length === 0 && <p className="text-sm text-muted-foreground py-6 text-center">No orders yet.</p>}
          </div>
        </div>

        <div className="rounded-2xl bg-background border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-cocoa">Top sellers</h2>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <ul className="space-y-3">
            {topSellers.map(([id, info], idx) => (
              <li key={id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-pink w-5">#{idx + 1}</span>
                  <span className="text-sm text-cocoa">{info.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{info.units} sold</span>
              </li>
            ))}
            {topSellers.length === 0 && <p className="text-sm text-muted-foreground">No sales yet.</p>}
          </ul>
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Categories</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <span key={c.slug} className="text-xs px-3 py-1 rounded-full bg-cream text-cocoa">{c.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-peach/40 text-cocoa",
    confirmed: "bg-sky/40 text-cocoa",
    shipped: "bg-lavender/40 text-cocoa",
    delivered: "bg-mint/50 text-cocoa",
    canceled: "bg-destructive/15 text-destructive",
  };
  return (
    <span className={`inline-block text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 rounded-full ${map[status] ?? "bg-cream"}`}>
      {status}
    </span>
  );
}
