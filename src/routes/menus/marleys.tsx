import { createFileRoute } from "@tanstack/react-router";
import { Flame, Search, Star } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/menus/marleys")({
  head: () => ({
    meta: [
      { title: "Marley's Menu" },
      {
        name: "description",
        content:
          "Marley's digital QR menu with burgers, sandwiches, fries, appetizers, extras, and drinks.",
      },
      { property: "og:title", content: "Marley's Menu" },
      {
        property: "og:description",
        content:
          "Explore Marley's burgers, sandwiches, fries, appetizers, extras, and drinks.",
      },
    ],
  }),
  component: MarleysMenuPage,
});

type Product = {
  name: string;
  description?: string;
  price?: string;
  spicy?: number;
  featured?: boolean;
  tags?: string[];
};

type Category = {
  id: string;
  name: string;
  summary: string;
  products: Product[];
};

const categories: Category[] = [
  {
    id: "burgers",
    name: "Burgers",
    summary: "Signature smashed comfort with Marley's sauces and stacked toppings.",
    products: [
      {
        name: "Marley's",
        price: "650,000 L.L",
        featured: true,
        tags: ["Beef", "Signature"],
        description:
          "120g beef patty, iceberg, caramelized onion, tomato, BBQ sauce, mayo, cheddar.",
      },
      {
        name: "Double Marley's",
        price: "1,100,000 L.L",
        featured: true,
        tags: ["Double beef"],
        description:
          "Double 120g beef patty, iceberg, caramelized onion, tomato, BBQ sauce, mayo, double cheddar.",
      },
      {
        name: "No Pepper, No Cry",
        price: "650,000 L.L",
        spicy: 2,
        tags: ["Spicy", "Beef"],
        description:
          "120g beef patty, Marley's chili sauce, jalapenos, iceberg, mayo, tomato, caramelized onion, cheddar slice.",
      },
      {
        name: "Crunchy Chicken",
        price: "650,000 L.L",
        spicy: 1,
        tags: ["Chicken", "Crunchy"],
        description:
          "Crunchy chicken breast, mayo, iceberg, tomato, pickles, melted cheddar, honey mustard.",
      },
      {
        name: "Crazy Mushroom",
        price: "750,000 L.L",
        tags: ["Swiss cheese"],
        description: "120g beef patty, fresh creamy mushroom sauce, Swiss cheese.",
      },
      {
        name: "Leb Style",
        price: "650,000 L.L",
        tags: ["Lebanese style"],
        description: "120g beef patty, iceberg, mayo, fries, ketchup.",
      },
    ],
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    summary: "Loaded wraps and subs with chicken, sauces, cheese, and fresh crunch.",
    products: [
      {
        name: "Fajitas",
        tags: ["Chicken"],
        description:
          "Marinated chicken, real avo sauce, fresh mushrooms, pepper mix, onions, mozzarella.",
      },
      {
        name: "Mexican Sub",
        spicy: 2,
        tags: ["Spicy", "Mozzarella"],
        description:
          "Chicken, special Mexican sauce, mozzarella, mayo, iceberg, jalapeno, corn.",
      },
      {
        name: "Hotdog",
        price: "450,000 L.L",
        tags: ["Cheddar"],
        description: "Mayo, BBQ, mustard, ketchup, chips mix, cheddar cheese.",
      },
      {
        name: "Tawook",
        tags: ["Toum"],
        description: "Red marinated tawouk, toum, pickles, iceberg, mayo.",
      },
      {
        name: "Tawook Basha",
        tags: ["Smoked turkey"],
        description:
          "Red marinated tawouk, toum, 2x smoked turkey, mozzarella, iceberg, mayo, pickles.",
      },
    ],
  },
  {
    id: "fries",
    name: "Fries",
    summary: "Crispy sides for sharing or adding next to your burger.",
    products: [
      { name: "Fries Box (premium)", price: "350,000 L.L", featured: true },
      { name: "Wedges" },
      { name: "Curly Fries" },
    ],
  },
  {
    id: "appetizers",
    name: "Appetizers",
    summary: "Cheesy bites, spicy bites, and a mixed box for the table.",
    products: [
      { name: "Mozzarella Sticks", tags: ["Cheese"] },
      { name: "Jalapeno Bites", spicy: 1, tags: ["Spicy"] },
      { name: "Cheese Balls", tags: ["Cheese"] },
      {
        name: "Mix",
        featured: true,
        tags: ["Share box"],
        description: "2x cheese balls, 2x mozzarella sticks, 2x jalapeno bites, wedges.",
      },
    ],
  },
  {
    id: "extras",
    name: "Extras",
    summary: "Upgrade any sandwich or burger with extra sauce, cheese, or crunch.",
    products: [
      { name: "Extra Cheese", price: "50,000 L.L" },
      { name: "Cheddar Dip", price: "100,000 L.L" },
      { name: "Bacon", price: "100,000 L.L" },
      { name: "Smoked Turkey", price: "100,000 L.L" },
      { name: "Chips", price: "50,000 L.L" },
      { name: "Mexican Sauce", price: "100,000 L.L", spicy: 1 },
      { name: "Honey Mustard", price: "100,000 L.L" },
      { name: "Mozzarella Patty", price: "200,000 L.L" },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    summary: "Cold drinks and water to finish the meal.",
    products: [
      { name: "Soft Drink", price: "100,000 L.L" },
      { name: "Iced Tea", price: "100,000 L.L" },
      { name: "Sparkling Water", price: "100,000 L.L" },
      { name: "Water", price: "30,000 L.L" },
    ],
  },
];

const featuredProducts = categories.flatMap((category) =>
  category.products
    .filter((product) => product.featured)
    .map((product) => ({ ...product, category: category.name })),
);

function MarleysMenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const visibleCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return categories
      .filter((category) => activeCategory === "all" || category.id === activeCategory)
      .map((category) => ({
        ...category,
        products: normalizedQuery
          ? category.products.filter((product) =>
              [product.name, product.description, product.tags?.join(" ")]
                .filter(Boolean)
                .join(" ")
                .toLowerCase()
                .includes(normalizedQuery),
            )
          : category.products,
      }))
      .filter((category) => category.products.length > 0);
  }, [activeCategory, query]);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative overflow-hidden border-b border-[#f9c516]/20 bg-[#050505]">
        <PatternBackdrop />
        <DiagonalStripes className="right-[-5rem] top-8 hidden h-56 w-[28rem] opacity-80 sm:block" />
        <DiagonalStripes className="bottom-[-5rem] left-[-7rem] hidden h-48 w-[25rem] rotate-180 opacity-45 sm:block" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <a href="/" className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-400 sm:text-xs sm:tracking-[0.24em]">
              Double A Menus
            </a>
            <span className="rounded-full border border-[#f9c516]/30 px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] text-[#f9c516] sm:px-3 sm:text-xs sm:tracking-[0.18em]">
              QR Menu
            </span>
          </div>

          <div className="grid gap-5 py-8 sm:gap-6 sm:py-10 md:grid-cols-[1.05fr_0.95fr] md:items-end">
            <div>
              <div className="mb-3 flex h-10 w-14 items-center text-[#f9c516] sm:h-12 sm:w-16">
                <CrownMark />
              </div>
              <p className="font-display text-[2.85rem] font-black uppercase leading-none tracking-[0.04em] sm:text-7xl sm:tracking-[0.08em]">
                Marley's
              </p>
              <h1 className="font-display text-[2.85rem] font-black italic leading-[0.85] text-[#f9c516] sm:text-7xl sm:leading-[0.75]">
                Menu
              </h1>
              <p className="mt-4 max-w-xl text-sm font-semibold leading-7 text-zinc-300 sm:mt-5 sm:text-lg sm:leading-relaxed">
                Burgers, sandwiches, fries, appetizers, extras, and drinks built
                into a fast mobile menu for table-side ordering.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-[#f9c516]/20 bg-[#111]/90 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:border-[#f9c516]/25 sm:p-4 sm:shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
              <div className="absolute right-0 top-0 hidden h-full w-24 opacity-25 [background:repeating-linear-gradient(150deg,transparent_0_14px,#f9c516_14px_22px,transparent_22px_36px)] sm:block" />
              <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#f9c516] sm:text-xs sm:tracking-[0.22em]">
                Popular Picks
              </p>
              <div className="mt-3 grid gap-2 sm:mt-4 sm:gap-3">
                {featuredProducts.slice(0, 3).map((product) => (
                  <div
                    key={`${product.category}-${product.name}`}
                    className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-white/10 pb-2.5 last:border-0 last:pb-0 sm:pb-3"
                  >
                    <div>
                      <p className="font-display text-base font-black leading-tight sm:text-lg">
                        {product.name}
                      </p>
                      <p className="mt-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-zinc-500 sm:text-xs sm:tracking-[0.14em]">
                        {product.category}
                      </p>
                    </div>
                    {product.price ? (
                      <p className="whitespace-nowrap font-display text-sm font-black text-[#f9c516] sm:text-base">
                        {product.price}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-30 border-b border-[#f9c516]/15 bg-[#050505]/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-3 py-2.5 sm:px-6 sm:py-3 lg:px-8">
          <div className="grid gap-2.5 lg:grid-cols-[1fr_18rem] lg:items-center">
            <nav className="-mx-3 flex gap-1.5 overflow-x-auto px-3 pb-1 sm:mx-0 sm:gap-2 sm:px-0" aria-label="Menu categories">
              <CategoryButton
                active={activeCategory === "all"}
                label="All"
                onClick={() => setActiveCategory("all")}
              />
              {categories.map((category) => (
                <CategoryButton
                  key={category.id}
                  active={activeCategory === category.id}
                  label={category.name}
                  onClick={() => setActiveCategory(category.id)}
                />
              ))}
            </nav>

            <label className="grid grid-cols-[auto_1fr] items-center gap-2 rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2 focus-within:border-[#f9c516]/70">
              <Search className="h-4 w-4 text-[#f9c516]" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search menu"
                className="min-w-0 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-zinc-500"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 opacity-30 [background-image:radial-gradient(#f9c516_1px,transparent_1px)] [background-size:12px_12px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="relative z-10 space-y-8">
          {visibleCategories.map((category) => (
            <MenuCategory key={category.id} category={category} />
          ))}

          {visibleCategories.length === 0 ? (
            <div className="rounded-lg border border-[#f9c516]/20 bg-[#101010] p-8 text-center">
              <p className="font-display text-2xl font-black text-[#f9c516]">
                No matching items
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-400">
                Try another category or search term.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-6 text-center sm:px-6 lg:px-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 transition hover:text-[#f9c516]"
        >
          <span>Powered by</span>
          <span className="text-zinc-400">Double A Code</span>
        </a>
      </footer>
    </main>
  );
}

function CategoryButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "shrink-0 rounded-full border px-3.5 py-2 text-xs font-black uppercase tracking-[0.12em] transition sm:px-4 sm:text-sm",
        active
          ? "border-[#f9c516] bg-[#f9c516] text-black"
          : "border-white/12 bg-white/[0.04] text-zinc-300 hover:border-[#f9c516]/70 hover:text-[#f9c516]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function MenuCategory({ category }: { category: Category }) {
  return (
    <section
      id={category.id}
      className="relative scroll-mt-28 overflow-hidden rounded-lg border border-white/10 bg-[#0d0d0d] p-3.5 sm:p-5"
    >
      <div className="pointer-events-none absolute right-0 top-0 hidden h-16 w-40 opacity-70 [background:linear-gradient(150deg,transparent_0_38%,#f9c516_38%_54%,transparent_54%)] sm:block" />
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-[#f9c516]/20 pb-3.5 sm:mb-5 sm:pb-4">
        <div>
          <h2 className="font-display text-2xl font-black uppercase leading-none text-[#f9c516] underline decoration-[#f9c516] decoration-2 underline-offset-4 sm:text-4xl">
            {category.name}
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-zinc-400 sm:mt-3">
            {category.summary}
          </p>
        </div>
        <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
          {category.products.length} items
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {category.products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group rounded-lg border border-white/10 bg-[#151515] p-3.5 transition hover:border-[#f9c516]/60 hover:bg-[#181818] sm:p-4">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-black leading-tight text-white sm:text-xl">
              {product.name}
            </h3>
            {product.featured ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#f9c516] px-2 py-0.5 text-[0.68rem] font-black uppercase tracking-[0.12em] text-black">
                <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                Popular
              </span>
            ) : null}
            {product.spicy ? <Spice count={product.spicy} /> : null}
          </div>
          {product.description ? (
            <p className="mt-2 text-sm font-semibold leading-relaxed text-zinc-300">
              {product.description}
            </p>
          ) : null}
        </div>

        {product.price ? (
          <p className="w-fit whitespace-nowrap rounded-md bg-[#f9c516] px-2.5 py-1 font-display text-sm font-black text-black sm:text-base">
            {product.price}
          </p>
        ) : (
          <p className="w-fit whitespace-nowrap rounded-md border border-white/10 px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-zinc-400">
            Ask
          </p>
        )}
      </div>

      {product.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-2.5 py-1 text-xs font-bold text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function Spice({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5 text-[#e21812]" aria-label="spicy">
      {Array.from({ length: count }).map((_, index) => (
        <Flame key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
      ))}
    </span>
  );
}

function CrownMark() {
  return (
    <svg viewBox="0 0 82 58" role="img" aria-label="Marley's crown">
      <path
        d="M11 44 18 17l18 16 15-25 10 27 18-13-8 25c-17-5-40-5-60-3Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <path
        d="M8 51c18-6 43-6 66 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  );
}

function PatternBackdrop() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(#f9c516_1px,transparent_1px)] [background-size:9px_9px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(249,197,22,0.16),transparent_24rem),linear-gradient(180deg,rgba(5,5,5,0.35),#050505_92%)]" />
      <span className="pointer-events-none absolute left-[14%] top-24 h-2 w-2 rounded-full bg-[#f9c516]" />
      <span className="pointer-events-none absolute left-[20%] top-44 h-1.5 w-1.5 rounded-full bg-[#f9c516]" />
      <span className="pointer-events-none absolute right-[30%] top-16 h-2 w-2 rounded-full bg-[#f9c516]" />
    </>
  );
}

function DiagonalStripes({ className }: { className: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <span className="absolute right-0 top-0 h-8 w-72 -skew-x-[18deg] bg-[#a88300]" />
      <span className="absolute right-8 top-20 h-9 w-80 -skew-x-[18deg] bg-[#d7ab06]" />
      <span className="absolute right-16 top-40 h-10 w-96 -skew-x-[18deg] bg-[#f9c516]" />
    </div>
  );
}
