import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/stores/")({
  head: () => ({
    meta: [
      { title: "Stores - Double A Portfolio" },
      {
        name: "description",
        content: "Storefront websites built by Double A Code.",
      },
    ],
  }),
  component: StoresIndexPage,
});

function StoresIndexPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 text-foreground">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground transition hover:text-foreground"
        >
          Double A Portfolio
        </Link>
        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Stores
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
            Storefront websites
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Browse client commerce experiences routed from the main portfolio.
          </p>
          <Link
            to="/stores/pavone"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Open Pavone
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </main>
  );
}
