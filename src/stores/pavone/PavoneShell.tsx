import type { ReactNode } from "react";
import { CartDrawer } from "@/stores/pavone/components/CartDrawer";
import { Footer } from "@/stores/pavone/components/Footer";
import { Header } from "@/stores/pavone/components/Header";
import { CartProvider } from "@/stores/pavone/context/CartContext";
import { FavoritesProvider } from "@/stores/pavone/context/FavoritesContext";

export function PavoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="pavone-store min-h-screen bg-background text-foreground">
      <FavoritesProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
        </CartProvider>
      </FavoritesProvider>
    </div>
  );
}
