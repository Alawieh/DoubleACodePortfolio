import { useCart } from "@/stores/pavone/context/CartContext";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { createOrder } from "@/stores/pavone/lib/pavone-api";
import { usePavoneCatalog } from "@/stores/pavone/lib/use-pavone-data";

export function CartDrawer() {
  const { isOpen, close, items, setQty, remove, subtotal, clear } = useCart();
  const { data } = usePavoneCatalog();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const orderItems = items.flatMap((i) => {
    const p = data.products.find((x) => x.id === i.productId);
    if (!p) return [];
    return [{
      productId: p.id,
      productName: p.name,
      productSlug: p.slug,
      productImage: p.images[0],
      quantity: i.quantity,
      price: p.salePrice ?? p.price,
      size: i.size,
      color: i.color,
    }];
  });

  const handleCheckout = async () => {
    setError("");
    setConfirmation("");
    if (!name.trim() || !phone.trim() || !city.trim() || !address.trim()) {
      setError("Name, phone, city, and delivery address are required.");
      return;
    }
    if (orderItems.length === 0) {
      setError("Your bag has no valid items.");
      return;
    }
    setSubmitting(true);
    try {
      const order = await createOrder({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim(),
        city: city.trim(),
        address: address.trim(),
        notes: notes.trim(),
        total: subtotal,
        items: orderItems,
      });
      clear();
      setName("");
      setPhone("");
      setEmail("");
      setCity("");
      setAddress("");
      setNotes("");
      setConfirmation(`Order ${order.orderNumber} was placed successfully.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not place your order.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-cocoa/30 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-soft transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-display text-2xl">Your Bag</h2>
          <button onClick={close} aria-label="Close cart" className="p-2 hover:text-taupe">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-20">
              <div className="font-display text-2xl">Your bag is empty</div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Discover this season's softest silhouettes and signature scarves.
              </p>
              <Link to="/stores/pavone/shop" onClick={close} className="mt-4 inline-block bg-cocoa text-ivory px-6 py-3 rounded-full text-sm tracking-wide hover:bg-cocoa/90">
                Shop the collection
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((it) => {
                const p = data.products.find((x) => x.id === it.productId);
                if (!p) return null;
                const price = p.salePrice ?? p.price;
                return (
                  <li key={`${it.productId}-${it.size}-${it.color}`} className="py-4 flex gap-4">
                    <img src={p.images[0]} alt={p.name} className="w-20 h-24 object-cover rounded-lg bg-cream" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div className="font-display text-base leading-snug">{p.name}</div>
                        <div className="text-sm font-medium whitespace-nowrap">${(price * it.quantity).toFixed(2)}</div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {[it.size, it.color].filter(Boolean).join(" · ")}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-border rounded-full">
                          <button className="p-1.5 hover:text-taupe" onClick={() => setQty(it.productId, it.quantity - 1, it.size, it.color)} aria-label="Decrease">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-3 text-sm w-8 text-center">{it.quantity}</span>
                          <button className="p-1.5 hover:text-taupe" onClick={() => setQty(it.productId, it.quantity + 1, it.size, it.color)} aria-label="Increase">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button onClick={() => remove(it.productId, it.size, it.color)} className="text-muted-foreground hover:text-cocoa" aria-label="Remove">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-3 bg-cream/50">
            {confirmation && (
              <div className="rounded-lg border border-sage bg-mint/40 px-3 py-2 text-sm text-cocoa">
                {confirmation}
              </div>
            )}
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name *"
                className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone *"
                className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City *"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Delivery address *"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Order notes"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl">${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={submitting}
              className="w-full bg-cocoa text-ivory py-3.5 rounded-full text-sm tracking-[0.15em] uppercase hover:bg-cocoa/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              {submitting ? "Placing order..." : "Place order"}
            </button>
            <button onClick={clear} className="w-full text-xs text-muted-foreground hover:text-cocoa">
              Clear bag
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
