import { Link } from "@tanstack/react-router";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/stores/pavone/data/products";
import { useFavorites } from "@/stores/pavone/context/FavoritesContext";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const price = product.salePrice ?? product.price;
  const { has, toggle } = useFavorites();
  const fav = has(product.id);

  return (
    <div className="group">
      <Link
        to="/stores/pavone/product/$slug"
        params={{ slug: product.slug }}
        className="block"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-cream shadow-card">
          <img
            src={product.images[0]}
            alt={product.name}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}

          {/* Soft gradient at bottom on hover */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cocoa/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {product.badge && (
            <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium ${
              product.badge === "Sale" ? "bg-coral text-ivory"
              : product.badge === "New" ? "bg-sage text-cocoa"
              : product.badge === "Bestseller" ? "bg-lavender text-cocoa"
              : "bg-peach text-cocoa"
            }`}>
              {product.badge}
            </span>
          )}

          {/* Favorite button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product.id); }}
            aria-label={fav ? "Remove from favorites" : "Save to favorites"}
            className={`absolute top-3 right-3 h-9 w-9 rounded-full grid place-items-center backdrop-blur transition-all ${
              fav ? "bg-coral text-ivory" : "bg-background/85 text-cocoa hover:bg-background"
            }`}
          >
            <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
          </button>

          {/* Quick view */}
          <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="bg-background/95 backdrop-blur rounded-full px-4 py-2.5 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em]">
              <Eye className="h-3.5 w-3.5" /> Quick view
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <Link to="/stores/pavone/product/$slug" params={{ slug: product.slug }} className="min-w-0">
          <h3 className="font-display text-lg leading-tight truncate">{product.name}</h3>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-taupe">
            {product.category.replace("-", " ")}
          </p>
        </Link>
        <div className="text-right shrink-0">
          {product.salePrice ? (
            <>
              <div className="text-base font-display text-coral">${product.salePrice}</div>
              <div className="text-xs line-through text-muted-foreground">${product.price}</div>
            </>
          ) : (
            <div className="text-base font-display text-cocoa">${price}</div>
          )}
        </div>
      </div>
    </div>
  );
}
