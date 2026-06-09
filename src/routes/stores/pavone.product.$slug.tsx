import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products } from "@/stores/pavone/data/products";
import { useState } from "react";
import { useCart } from "@/stores/pavone/context/CartContext";
import { ProductCard } from "@/stores/pavone/components/ProductCard";
import { MessageCircle, ShoppingBag, Check, Truck, Sparkles } from "lucide-react";
import { buildOrderMessage, buildWhatsAppUrl } from "@/stores/pavone/lib/whatsapp";
import { PavoneShell } from "@/stores/pavone/PavoneShell";

export const Route = createFileRoute("/stores/pavone/product/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Pavone.lb` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.images[0] },
          { property: "og:type", content: "product" },
          { property: "og:url", content: `/stores/pavone/product/${loaderData.product.slug}` },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: `/stores/pavone/product/${loaderData.product.slug}` }]
      : [],
  }),
  component: PavoneProductRoute,
  errorComponent: ({ error }) => <div className="container-page py-20">Error: {error.message}</div>,
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-4xl">Piece not found</h1>
      <Link to="/stores/pavone/shop" className="mt-6 inline-block underline">Back to shop</Link>
    </div>
  ),
});

function PavoneProductRoute() {
  return (
    <PavoneShell>
      <ProductPage />
    </PavoneShell>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  const price = product.salePrice ?? product.price;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const orderNow = () => {
    const msg = buildOrderMessage(
      [{ name: product.name, quantity: qty, price, size, color }],
      price * qty,
    );
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  return (
    <div className="container-page py-8 md:py-12">
      <nav className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
        <Link to="/stores/pavone" className="hover:text-cocoa">Home</Link> /{" "}
        <Link to="/stores/pavone/category/$slug" params={{ slug: product.category }} className="hover:text-cocoa">
          {product.category.replace("-", " ")}
        </Link>{" "}
        / <span className="text-cocoa">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Gallery */}
        <div className="grid grid-cols-[80px_1fr] gap-3 md:gap-4">
          <div className="flex flex-col gap-2 md:gap-3">
            {product.images.map((src: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-[3/4] rounded-lg overflow-hidden bg-cream border-2 transition ${activeImg === i ? "border-cocoa" : "border-transparent"}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-cream shadow-card group">
            <img src={product.images[activeImg]} alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em]">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-taupe">{product.category.replace("-", " ")}</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl text-cocoa">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl">${price}</span>
            {product.salePrice && <span className="text-base line-through text-muted-foreground">${product.price}</span>}
            <span className="ml-auto text-xs inline-flex items-center gap-1.5 text-emerald-700">
              <Check className="h-3.5 w-3.5" /> {product.inStock ? "In stock" : "Sold out"}
            </span>
          </div>
          <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>

          {/* SET PIECES */}
          {product.pieces && (
            <div className="mt-6 rounded-2xl bg-cream p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The Set Includes</div>
              <ul className="mt-3 space-y-2">
                {product.pieces.map((piece: { name: string; price: number }) => (
                  <li key={piece.name} className="flex justify-between text-sm">
                    <span>{piece.name}</span>
                    <span className="text-muted-foreground">${piece.price}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm font-medium">
                <span>Complete Set Price</span>
                <span>${price}</span>
              </div>
            </div>
          )}

          {/* Colors */}
          <div className="mt-7">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Color: {color}</div>
            <div className="flex gap-2">
              {product.colors.map((c: { name: string; hex: string }) => (
                <button key={c.name} onClick={() => setColor(c.name)} aria-label={c.name}
                  className={`h-9 w-9 rounded-full border-2 transition ${color === c.name ? "border-cocoa scale-110" : "border-border"}`}
                  style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Size</div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s: string) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`min-w-12 px-4 py-2 rounded-full text-sm border transition ${size === s ? "bg-cocoa text-ivory border-cocoa" : "border-border hover:border-taupe"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="mt-6 flex items-center gap-4">
            <div className="inline-flex items-center border border-border rounded-full">
              <button className="px-3 py-2" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="px-4 text-sm w-10 text-center">{qty}</span>
              <button className="px-3 py-2" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <button
              onClick={() => add({ productId: product.id, quantity: qty, size, color })}
              className="inline-flex items-center justify-center gap-2 bg-cocoa text-ivory px-6 py-4 rounded-full text-sm tracking-[0.15em] uppercase hover:bg-cocoa/90"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Bag
            </button>
            <button
              onClick={orderNow}
              className="inline-flex items-center justify-center gap-2 border border-cocoa px-6 py-4 rounded-full text-sm tracking-[0.15em] uppercase hover:bg-cocoa hover:text-ivory transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp
            </button>
          </div>

          {/* Perks */}
          <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground"><Truck className="h-4 w-4 text-taupe" /> Free shipping over $150</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Sparkles className="h-4 w-4 text-taupe" /> Crafted with love in Lebanon</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 md:mt-28">
          <h2 className="font-display text-3xl md:text-4xl mb-8">You may also love</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
