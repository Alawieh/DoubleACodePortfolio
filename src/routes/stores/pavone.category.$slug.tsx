import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/stores/pavone/components/ProductCard";
import { categories, getByCategory } from "@/stores/pavone/data/products";
import { PavoneShell } from "@/stores/pavone/PavoneShell";

export const Route = createFileRoute("/stores/pavone/category/$slug")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { category: cat, products: getByCategory(cat.slug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.name} — Pavone.lb` },
          { name: "description", content: loaderData.category.description },
          { property: "og:title", content: `${loaderData.category.name} — Pavone.lb` },
          { property: "og:description", content: loaderData.category.description },
          { property: "og:image", content: loaderData.category.image },
          { property: "og:url", content: `/stores/pavone/category/${loaderData.category.slug}` },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: `/stores/pavone/category/${loaderData.category.slug}` }]
      : [],
  }),
  component: PavoneCategoryRoute,
  errorComponent: ({ error }) => <div className="container-page py-20">Error: {error.message}</div>,
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-4xl">Category not found</h1>
      <Link to="/stores/pavone/shop" className="mt-6 inline-block underline">Browse all pieces</Link>
    </div>
  ),
});

function PavoneCategoryRoute() {
  return (
    <PavoneShell>
      <CategoryPage />
    </PavoneShell>
  );
}

function CategoryPage() {
  const { category, products } = Route.useLoaderData();
  return (
    <div>
      <div className="relative h-[40vh] min-h-[280px] overflow-hidden bg-sand">
        <img src={category.image} alt={category.name} className="h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa/60 to-cocoa/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-page pb-10 text-ivory">
            <div className="text-xs uppercase tracking-[0.25em] text-blush">Collection</div>
            <h1 className="font-display text-5xl md:text-7xl mt-2">{category.name}</h1>
            <p className="mt-2 max-w-xl text-ivory/85">{category.description}</p>
          </div>
        </div>
      </div>
      <div className="container-page py-12 md:py-16">
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No pieces yet in this collection.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
            {products.map((p: typeof products[number]) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
