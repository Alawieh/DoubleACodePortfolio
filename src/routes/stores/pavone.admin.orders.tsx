import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { adminActions, useAdminStore, type Order } from "@/stores/pavone/lib/admin/mock-store";
import { Trash2, X, Search } from "lucide-react";
import { StatusPill } from "./pavone.admin.index";

export const Route = createFileRoute("/stores/pavone/admin/orders")({
  component: AdminOrders,
});

const STATUSES: Order["status"][] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

function AdminOrders() {
  const orders = useAdminStore((s) => s.orders);
  const [filter, setFilter] = useState<"all" | Order["status"]>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    return [...orders]
      .filter((o) => filter === "all" || o.status === filter)
      .filter((o) => !q || o.id.toLowerCase().includes(q.toLowerCase()) || o.customerName.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [orders, filter, q]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-cocoa">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">{orders.length} total orders</p>
      </header>

      <div className="flex flex-wrap gap-3 items-center bg-background rounded-xl border border-border p-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search order ID or customer..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-input bg-background"
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {(["all", ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs uppercase tracking-[0.14em] rounded-full transition-colors ${
                filter === s ? "bg-cocoa text-ivory" : "bg-cream text-muted-foreground hover:text-cocoa"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream/60 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">Order</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Customer</th>
              <th className="text-left px-4 py-3 hidden lg:table-cell">Date</th>
              <th className="text-left px-4 py-3">Total</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-cream/30 cursor-pointer" onClick={() => setOpen(o)}>
                <td className="px-4 py-3 font-medium text-cocoa">{o.id}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div>{o.customerName}</div>
                  <div className="text-xs text-muted-foreground">{o.city} · {o.channel}</div>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">${o.total}</td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => adminActions.updateOrderStatus(o.id, e.target.value as Order["status"])}
                    className="text-xs bg-transparent border border-input rounded-md px-2 py-1"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={(e) => { e.stopPropagation(); if (confirm(`Delete ${o.id}?`)) adminActions.deleteOrder(o.id); }}
                    className="p-2 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="text-center py-10 text-sm text-muted-foreground">No orders match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-cocoa/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl max-w-xl w-full shadow-soft border border-border">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h2 className="font-display text-2xl text-cocoa">{open.id}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <StatusPill status={open.status} />
                  <span className="text-xs text-muted-foreground">{new Date(open.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <button onClick={() => setOpen(null)} className="p-2 rounded-md hover:bg-cream"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <Info label="Customer" value={open.customerName} />
                <Info label="Phone" value={open.customerPhone} />
                <Info label="City" value={open.city} />
                <Info label="Channel" value={open.channel} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">Items</div>
                <div className="divide-y divide-border rounded-lg border border-border">
                  {open.items.map((it, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 text-sm">
                      <span>{it.name} <span className="text-muted-foreground">× {it.qty}</span></span>
                      <span>${it.qty * it.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-2xl text-cocoa">${open.total}</span>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">Update status</div>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => { adminActions.updateOrderStatus(open.id, s); setOpen({ ...open, status: s }); }}
                      className={`px-3 py-1.5 text-xs uppercase tracking-[0.14em] rounded-full ${
                        open.status === s ? "bg-cocoa text-ivory" : "bg-cream hover:bg-blush/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className="text-cocoa mt-0.5">{value}</div>
    </div>
  );
}
