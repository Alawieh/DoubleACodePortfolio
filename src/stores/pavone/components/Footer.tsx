import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import { usePavoneCatalog } from "@/stores/pavone/lib/use-pavone-data";

const BRAND_NAME = "Pavone.lb";

export function Footer() {
  const { data } = usePavoneCatalog();

  return (
    <footer className="mt-24 bg-gradient-to-br from-cream via-mint/30 to-lavender/30 border-t border-border/60">
      <div className="container-page py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-sm">
          <div className="font-display text-3xl text-cocoa">{BRAND_NAME}</div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Fresh, feminine, modern modest fashion. Soft fabrics, joyful colors, and
            considered silhouettes for the woman who dresses for herself.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
              className="p-2.5 rounded-full bg-background hover:bg-blush transition-colors shadow-card" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="mailto:hello@pavone.lb"
              className="p-2.5 rounded-full bg-background hover:bg-blush transition-colors shadow-card" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Shop</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/stores/pavone/shop" className="hover:text-taupe">All Products</Link></li>
            {data.categories.map((c) => (
              <li key={c.slug}>
                <Link to="/stores/pavone/category/$slug" params={{ slug: c.slug }} className="hover:text-taupe">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Email: hello@pavone.lb</li>
            <li>Lebanon - Worldwide shipping</li>
            <li>Mon-Sat - 10:00-19:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        Copyright {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
