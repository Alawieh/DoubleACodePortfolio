import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { deleteOrder, updateOrderStatus, type OrderStatus, type PavoneOrder } from "@/stores/pavone/lib/pavone-api";
import { Trash2, X, Search } from "lucide-react";
import { StatusPill } from "./pavone.admin.index";
import { usePavoneOrders } from "@/stores/pavone/lib/use-pavone-data";

export const Route = createFileRoute("/stores/pavone/admin/orders")({
  component: AdminOrders,
});

const STATUSES: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered", "canceled"];

function AdminOrders() {
  const { data: orders, loading, error, reload } = usePavoneOrders();
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<PavoneOrder | null>(null);
  const [saving, setSaving] = useState("");

  const filtered = useMemo(() => {
    return orders
      .filter((o) => filter === "all" || o.status === filter)
      .filter((o) => !q || `${o.orderNumber} ${o.customerName} ${o.customerPhone}`.toLowerCase().includes(q.toLowerCase()));
  }, [orders, filter, q]);

  async function setStatus(order: PavoneOrder, status: OrderStatus) {
    setSaving(order.id);
    try {
      const updated = await updateOrderStatus(order.id, status);
      if (open?.id === order.id) setOpen({ ...open, status: updated.status });
      await reload();
    } finally {
      setSaving("");
    }
  }

  async function removeOrder(order: PavoneOrder) {
    if (!confirm(`Delete ${order.orderNumber}?`)) return;
    await deleteOrder(order.id);
    if (open?.id === order.id) setOpen(null);
    await reload();
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-cocoa">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">{orders.length} total orders</p>
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </header>

      <div className="flex flex-wrap gap-3 items-center bg-background rounded-xl border border-border p-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search order, customer, or phone..."
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
                <td className="px-4 py-3 font-medium text-cocoa">{o.orderNumber}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div>{o.customerName}</div>
                  <div className="text-xs text-muted-foreground">{o.city} - {o.customerPhone}</div>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">${o.total}</td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    disabled={saving === o.id}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => void setStatus(o, e.target.value as OrderStatus)}
                    className="text-xs bg-transparent border border-input rounded-md px-2 py-1"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={(e) => { e.stopPropagation(); void removeOrder(o); }}
                    className="p-2 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
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
                <h2 className="font-display text-2xl text-cocoa">{open.orderNumber}</h2>
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
                <Info label="Email" value={open.customerEmail || "-"} />
                <Info label="City" value={open.city} />
                <Info label="Address" value={open.address} wide />
                <Info label="Notes" value={open.notes || "-"} wide />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">Items</div>
                <div className="divide-y divide-border rounded-lg border border-border">
                  {open.items.map((it, i) => (
                    <div key={it.id ?? i} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                      <span>{it.productName} <span className="text-muted-foreground">x {it.quantity}</span></span>
                      <span>${it.quantity * it.price}</span>
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
                      onClick={() => void setStatus(open, s)}
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

function Info({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : undefined}>
      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className="text-cocoa mt-0.5">{value}</div>
    </div>
  );
}
