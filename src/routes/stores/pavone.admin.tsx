import { createFileRoute, Outlet, Link, useRouterState, useNavigate, redirect } from "@tanstack/react-router";
import { LayoutDashboard, Package, FolderTree, ShoppingCart, LogOut, RotateCcw, Store } from "lucide-react";
import { adminActions, useAdminStore } from "@/stores/pavone/lib/admin/mock-store";

export const Route = createFileRoute("/stores/pavone/admin")({
  component: AdminLayout,
  beforeLoad: ({ location }) => {
    if (typeof window === "undefined") return;
    const authed = localStorage.getItem("pavone_admin_authed") === "1";
    if (!authed && location.pathname !== "/stores/pavone/admin/login") {
      throw redirect({ to: "/stores/pavone/admin/login" });
    }
  },
});

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const authed = useAdminStore((s) => s.authed);

  if (pathname === "/stores/pavone/admin/login") {
    return (
      <div className="pavone-store">
        <Outlet />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="pavone-store">
        <Outlet />
      </div>
    );
  }

  const nav: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
    { to: "/stores/pavone/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/stores/pavone/admin/products", label: "Products", icon: Package },
    { to: "/stores/pavone/admin/categories", label: "Categories", icon: FolderTree },
    { to: "/stores/pavone/admin/orders", label: "Orders", icon: ShoppingCart },
  ];

  return (
    <div className="pavone-store min-h-screen bg-cream/40">
      <div className="flex">
        <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-background min-h-screen sticky top-0">
          <div className="px-6 py-6 border-b border-border">
            <div className="font-display text-2xl text-cocoa">Pavone.lb</div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mt-1">Admin Studio</div>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {nav.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to as "/stores/pavone/admin"}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    active ? "bg-pink/15 text-cocoa font-medium" : "text-muted-foreground hover:bg-cream hover:text-cocoa"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-3 border-t border-border space-y-1">
            <Link to="/stores/pavone" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-cream hover:text-cocoa">
              <Store className="h-4 w-4" /> View storefront
            </Link>
            <button
              onClick={() => { adminActions.resetDemo(); }}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-cream hover:text-cocoa"
            >
              <RotateCcw className="h-4 w-4" /> Reset demo data
            </button>
            <button
              onClick={() => { adminActions.logout(); navigate({ to: "/stores/pavone/admin/login" }); }}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-cream hover:text-cocoa"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {/* Mobile top bar */}
          <div className="md:hidden flex items-center justify-between border-b border-border bg-background px-4 py-3 sticky top-0 z-30">
            <div className="font-display text-xl text-cocoa">Pavone Admin</div>
            <div className="flex gap-1 overflow-x-auto">
              {nav.map((n) => {
                const Icon = n.icon;
                const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
                return (
                  <Link key={n.to} to={n.to as "/stores/pavone/admin"} className={`p-2 rounded-md ${active ? "bg-pink/15 text-cocoa" : "text-muted-foreground"}`}>
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
              <button onClick={() => { adminActions.logout(); navigate({ to: "/stores/pavone/admin/login" }); }} className="p-2 text-muted-foreground">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>

          <main className="p-5 md:p-8 max-w-7xl">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
