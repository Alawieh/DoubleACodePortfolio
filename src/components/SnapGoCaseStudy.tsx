import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, LayoutDashboard, Package, ArrowRight, Check } from "lucide-react";

const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Supabase"];

const images = {
  homepage: "/images/case-studies/snapgo/homepage.png",
  product: "/images/case-studies/snapgo/product.png",
  admin: "/images/case-studies/snapgo/admin.png",
  banner: "/images/case-studies/snapgo/banner.png",
};

const features = [
  {
    label: "Storefront Homepage",
    title: "Catalog homepage",
    text: "Clean catalog homepage with search, categories, banners, offers, and WhatsApp contact access.",
    img: images.homepage,
  },
  {
    label: "Product Details",
    title: "Product page",
    text: "Dedicated product page with image gallery, stock status, price, quantity selector, and purchase action.",
    img: images.product,
  },
  {
    label: "Admin Dashboard",
    title: "Catalog management",
    text: "Admin panel for managing products, categories, publishing status, images, sort order, and content.",
    img: images.admin,
  },
  {
    label: "Banner Designer",
    title: "Visual banner editor",
    text: "Visual homepage banner editor - choose linked products, edit promotion text, upload images, and preview before saving.",
    img: images.banner,
  },
];

const flow = ["Browse Products", "Add to Cart", "Send Order by WhatsApp", "Admin Manages Catalog"];

const productScope = [
  {
    title: "Storefront",
    text: "Responsive catalog, search, product pages, and category browsing.",
  },
  {
    title: "Checkout",
    text: "Cart flow that packages customer orders for direct WhatsApp handoff.",
  },
  {
    title: "Admin System",
    text: "Catalog, category, image, stock, price, and homepage banner controls.",
  },
];

function BrowserFrame({ src, alt, label }: { src: string; alt: string; label?: string }) {
  return (
    <figure className="group">
      {label && (
        <figcaption className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          {label}
        </figcaption>
      )}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/5 transition-shadow duration-500 group-hover:shadow-[0_40px_100px_-30px_rgba(79,70,229,0.35)]">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex-1">
            <div className="mx-auto w-fit rounded-md bg-white px-3 py-1 text-[11px] text-slate-400 ring-1 ring-slate-200">
              snapgo.tech
            </div>
          </div>
        </div>
        <img src={src} alt={alt} className="block w-full h-auto" loading="lazy" />
      </div>
    </figure>
  );
}

export function SnapGoCaseStudy() {
  return (
    <section
      id="snapgo-case-study"
      className="relative isolate overflow-hidden bg-[#f7f8fb] py-24 text-slate-900 sm:py-32"
      style={{ colorScheme: "light" }}
    >
      {/* soft gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 15% 10%, rgba(79,70,229,0.08), transparent 55%), radial-gradient(ellipse at 90% 90%, rgba(37,99,235,0.07), transparent 55%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-10 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium tracking-wide text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Case Study - Ecommerce
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              snapGo tech
            </h2>
            <p className="mt-3 text-lg text-slate-600 sm:text-xl">
              Electronics catalog with WhatsApp ordering and admin management.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600">
              A lightweight commerce catalog built for electronics stores. Customers browse
              products, filter by category, add items to cart, and send the full order through
              WhatsApp. The store owner manages products, categories, banners, prices, stock,
              and homepage promotions from a dedicated admin panel.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                At a glance
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {[
                  "Full-stack catalog + admin",
                  "WhatsApp-native checkout",
                  "Visual banner designer",
                  "Supabase-backed content",
                ].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-indigo-600" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Hero screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-14"
        >
          <BrowserFrame src={images.homepage} alt="snapGo tech homepage" label="Live homepage" />
        </motion.div>

        {/* Feature grid */}
        <div className="mt-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h3 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
              Inside the product
            </h3>
            <div className="hidden h-px flex-1 bg-slate-200 sm:block" />
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {features.map((f, i) => (
              <motion.article
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="flex flex-col gap-5"
              >
                <BrowserFrame src={f.img} alt={f.title} label={f.label} />
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{f.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Flow */}
        <div className="mt-24">
          <h3 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
            How it works
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            From discovery to order, in four steps.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((step, i) => {
              const Icons = [Package, ShoppingCart, MessageCircle, LayoutDashboard];
              const Icon = Icons[i];
              return (
                <div
                  key={step}
                  className="relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">0{i + 1}</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900">{step}</div>
                  {i < flow.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-300 lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stack + Stats */}
        <div className="mt-24 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h3 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
              Built with
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
              Product scope
            </h3>
            <div className="mt-5 grid gap-3">
              {productScope.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="font-display text-lg font-semibold text-indigo-600">{item.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
