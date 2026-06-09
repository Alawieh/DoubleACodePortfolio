import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useCart } from "@/stores/pavone/context/CartContext";
import { useFavorites } from "@/stores/pavone/context/FavoritesContext";
import { BRAND_NAME } from "@/stores/pavone/lib/whatsapp";
import { categories } from "@/stores/pavone/data/products";
import logo from "@/stores/pavone/public/assets/logo-image.jpg";

export function Header() {
  const { count, open } = useCart();
  const { count: favCount } = useFavorites();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="bg-gradient-to-r from-sage via-lavender to-peach text-cocoa text-center text-[11px] py-2 tracking-[0.22em] uppercase font-medium">
        ✿ Spring/Summer Edit — Complimentary shipping over $150 · WhatsApp ordering
      </div>
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <button
          className="md:hidden p-2 -ml-2 text-cocoa"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/stores/pavone" className="flex items-center gap-2.5 text-cocoa">
          <img src={logo} alt="Pavone.lb" className="h-10 w-10 md:h-11 md:w-11 rounded-full object-cover ring-1 ring-blush/60" />
          <span className="font-display text-2xl md:text-3xl tracking-wide">{BRAND_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link to="/stores/pavone" className="hover:text-taupe transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-taupe" }}>
            Home
          </Link>
          <Link to="/stores/pavone/shop" className="hover:text-taupe transition-colors" activeProps={{ className: "text-taupe" }}>
            Shop All
          </Link>
          {categories.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              to="/stores/pavone/category/$slug"
              params={{ slug: c.slug }}
              className="hover:text-taupe transition-colors"
              activeProps={{ className: "text-taupe" }}
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/stores/pavone/shop" className="hidden md:inline-flex p-2 text-cocoa hover:text-taupe" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/stores/pavone/wishlist" className="relative p-2 text-cocoa hover:text-pink transition-colors" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {favCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-pink text-primary-foreground text-[10px] font-medium rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                {favCount}
              </span>
            )}
          </Link>
          <button
            onClick={open}
            className="relative p-2 text-cocoa hover:text-taupe transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-cocoa text-ivory text-[10px] font-medium rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[100] bg-background md:hidden animate-fade-up overflow-y-auto">
          <div className="container-page py-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logo} alt="" className="h-9 w-9 rounded-full object-cover" />
              <span className="font-display text-2xl">{BRAND_NAME}</span>
            </div>
            <button onClick={() => setMobileOpen(false)} aria-label="Close" className="p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="container-page flex flex-col gap-4 py-6 text-lg font-display">
            <Link to="/stores/pavone" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/stores/pavone/shop" onClick={() => setMobileOpen(false)}>Shop All</Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/stores/pavone/category/$slug"
                params={{ slug: c.slug }}
                onClick={() => setMobileOpen(false)}
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </div>,
        document.body
      )}
    </header>
  );
}
