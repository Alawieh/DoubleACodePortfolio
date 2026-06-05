import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, type WheelEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { HexFrame } from "./Logo";
import { SectionLabel } from "./Journey";

type Project = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  href?: string;
  hue: { from: string; via: string; to: string };
  Mockup: React.ComponentType;
};

const projects: Project[] = [
  {
    id: "01",
    name: "snapGo tech",
    category: "Ecommerce Catalog",
    tagline: "Catalog browsing with WhatsApp checkout.",
    description:
      "An electronics catalog with product browsing, cart management, WhatsApp ordering, and a Supabase admin panel for products, categories, banners, stock, and pricing.",
    metrics: [
      { label: "Responsive catalog", value: "Storefront" },
      { label: "WhatsApp orders", value: "Checkout" },
      { label: "Inventory control", value: "Admin" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Supabase"],
    href: "/work/snapgo",
    hue: { from: "oklch(0.58 0.22 265 / 0.55)", via: "oklch(0.68 0.18 230 / 0.35)", to: "oklch(0.78 0.16 200 / 0.2)" },
    Mockup: SnapGoMockup,
  },
  {
    id: "02",
    name: "Data Insights Workspace",
    category: "AI Analytics Interface",
    tagline: "A clear UI for advanced AI analysis.",
    description:
      "A web and desktop interface for a client-provided Python analytics backend, covering dataset upload, context review, guided analysis routes, API-connected workflows, and readable result presentation.",
    metrics: [
      { label: "Dataset onboarding", value: "Upload" },
      { label: "Guided workspaces", value: "Analysis" },
      { label: "Backend bridge", value: "APIs" },
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "REST APIs", "Electron"],
    href: "/work/data-insights",
    hue: { from: "oklch(0.58 0.16 185 / 0.5)", via: "oklch(0.62 0.15 215 / 0.32)", to: "oklch(0.78 0.13 165 / 0.2)" },
    Mockup: DataInsightsMockup,
  },
  {
    id: "03",
    name: "Tijarati Pro",
    category: "Mobile Business Platform",
    tagline: "Inventory, invoicing, and operations in one app.",
    description:
      "A production Flutter app for business owners to manage inventory, invoices, purchases, payments, clients, agents, reports, subscriptions, and backups across iOS and Android.",
    metrics: [
      { label: "Cross-platform app", value: "Flutter" },
      { label: "Cloud backend", value: "Firebase" },
      { label: "Store release", value: "iOS + Android" },
    ],
    stack: ["Flutter", "Dart", "Firebase", "Firestore", "Cloud Functions", "In-App Purchase"],
    href: "/work/tijarati-pro",
    hue: { from: "oklch(0.66 0.18 240 / 0.52)", via: "oklch(0.72 0.16 210 / 0.34)", to: "oklch(0.82 0.16 70 / 0.2)" },
    Mockup: TijaratiMockup,
  },
  {
    id: "04",
    name: "The Detailing Lab",
    category: "Automotive Services",
    tagline: "Premium mobile detailing, packaged for conversion.",
    description:
      "A responsive website for a Sydney mobile detailing studio with a full-bleed automotive hero, service package discovery, inquiry form, phone and Instagram CTAs, and live deployment.",
    metrics: [
      { label: "Lead capture", value: "Inquiry" },
      { label: "Service browsing", value: "Packages" },
      { label: "Live site", value: "SEO" },
    ],
    stack: ["React", "TypeScript", "TanStack Start", "Tailwind CSS", "Web3Forms", "Vercel"],
    href: "/work/detailing-lab",
    hue: { from: "oklch(0.76 0.2 135 / 0.42)", via: "oklch(0.58 0.12 155 / 0.28)", to: "oklch(0.92 0.12 135 / 0.14)" },
    Mockup: DetailingLabMockup,
  },
  {
    id: "05",
    name: "MediFlow",
    category: "Healthcare",
    tagline: "Care, coordinated.",
    description:
      "An end-to-end patient platform connecting clinicians, labs, and pharmacies through a HIPAA-aligned data fabric and ambient AI scribe.",
    metrics: [
      { label: "Visits / month", value: "84k" },
      { label: "No-show drop", value: "-41%" },
      { label: "Avg NPS", value: "72" },
    ],
    stack: ["React", "FastAPI", "FHIR", "Supabase"],
    hue: { from: "oklch(0.65 0.2 240 / 0.45)", via: "oklch(0.6 0.22 280 / 0.35)", to: "oklch(0.7 0.2 330 / 0.2)" },
    Mockup: MediMockup,
  },
  {
    id: "06",
    name: "UrbanEstate",
    category: "Real Estate",
    tagline: "A new map for living.",
    description:
      "A discovery platform pairing 3D building tours with neighborhood intelligence and instant qualification for serious buyers.",
    metrics: [
      { label: "Listings", value: "24k" },
      { label: "Tour completion", value: "73%" },
      { label: "Time on site", value: "9m 12s" },
    ],
    stack: ["Next.js", "Mapbox", "Three.js", "Postgres"],
    hue: { from: "oklch(0.7 0.18 60 / 0.45)", via: "oklch(0.65 0.22 30 / 0.35)", to: "oklch(0.6 0.25 5 / 0.2)" },
    Mockup: EstateMockup,
  },
  {
    id: "07",
    name: "EduSphere",
    category: "Learning Systems",
    tagline: "Mastery, on a curve of its own.",
    description:
      "An adaptive learning OS that personalizes pacing, schedules deliberate practice, and ties every minute studied to measurable outcomes.",
    metrics: [
      { label: "Learners", value: "120k" },
      { label: "Retention", value: "+62%" },
      { label: "Courses", value: "1.8k" },
    ],
    stack: ["React", "Nest.js", "DuckDB", "OpenAI"],
    hue: { from: "oklch(0.65 0.27 5 / 0.45)", via: "oklch(0.6 0.25 340 / 0.3)", to: "oklch(0.55 0.24 305 / 0.2)" },
    Mockup: EduMockup,
  },
];

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const wheelLockRef = useRef(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const total = projects.length;

  // Derive a single active index from scroll. Only ONE slide is mounted at a time.
  const activeMV = useTransform(scrollYProgress, (v) =>
    Math.min(total - 1, Math.max(0, Math.floor(v * total * 0.999))),
  );
  const [active, setActive] = useState(0);
  useMotionValueEvent(activeMV, "change", (v) => setActive(v as number));

  const current = projects[active];

  const [mode, setMode] = useState<"animated" | "list">(() => {
    if (typeof window === "undefined") return "animated";
    return (window.sessionStorage.getItem("aa-work-view") as "animated" | "list") || "animated";
  });
  const setView = (m: "animated" | "list") => {
    setMode(m);
    try { window.sessionStorage.setItem("aa-work-view", m); } catch {}
  };

  if (mode === "list") {
    return <ProjectsCardCarousel mode={mode} setView={setView} />;
  }

  const scrollToAnimatedProject = (nextIndex: number) => {
    const section = ref.current;
    if (!section || total <= 1) return;

    const clamped = Math.min(total - 1, Math.max(0, nextIndex));
    const scrollable = section.offsetHeight - window.innerHeight;
    const targetProgress = clamped === 0 ? 0 : (clamped + 0.5) / total;
    const targetTop = section.offsetTop + scrollable * targetProgress;

    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  const handleAnimatedWheel = (event: WheelEvent<HTMLDivElement>) => {
    const direction = Math.sign(event.deltaY);
    if (direction === 0) return;

    const nextIndex = active + direction;
    const canStep = nextIndex >= 0 && nextIndex < total;
    if (!canStep) return;

    event.preventDefault();
    if (wheelLockRef.current) return;

    wheelLockRef.current = true;
    scrollToAnimatedProject(nextIndex);
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 700);
  };

  return (
    <section
      id="work"
      ref={ref}
      className="relative"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" onWheel={handleAnimatedWheel}>
        {/* Section frame */}
        <div className="pointer-events-none absolute left-6 top-8 z-40 md:left-10">
          <SectionLabel>03 / Selected Work</SectionLabel>
        </div>
        <div className="absolute right-6 top-8 z-50 flex items-center gap-3 font-mono text-xs text-muted-foreground md:right-10">
          <ViewToggle mode={mode} onChange={setView} />
          <ProgressIndicator progress={scrollYProgress} total={total} />
        </div>

        {/* Single active slide — AnimatePresence guarantees the previous
            slide fully exits before the next mounts. */}
        <AnimatePresence mode="wait" initial={false}>
          <ProjectSlide key={current.id} project={current} index={active} total={total} />
        </AnimatePresence>
      </div>
    </section>
  );
}

function ViewToggle({ mode, onChange }: { mode: "animated" | "list"; onChange: (m: "animated" | "list") => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-surface/60 p-1 text-[11px] font-mono uppercase tracking-widest backdrop-blur">
      {(["animated", "list"] as const).map((m) => (
        <button
          type="button"
          key={m}
          onClick={() => onChange(m)}
          className={`rounded-full px-3 py-1 transition-colors ${
            mode === m ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {m === "animated" ? "Animated" : "List"}
        </button>
      ))}
    </div>
  );
}

function ProjectsCardCarousel({
  mode,
  setView,
}: {
  mode: "animated" | "list";
  setView: (m: "animated" | "list") => void;
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const total = projects.length;
  const project = projects[index];

  const go = (next: number) => {
    const wrapped = (next + total) % total;
    setDir(next > index ? 1 : -1);
    setIndex(wrapped);
  };

  return (
    <section id="work" className="relative px-6 py-32 md:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hex opacity-30" />
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>03 / Selected Work</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
              Selected <span className="text-gradient-brand">work</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              Browse our case studies one by one. Use the controls below to navigate.
            </p>
          </div>
          <ViewToggle mode={mode} onChange={setView} />
        </div>

        {/* Card */}
        <div className="relative min-h-[760px] overflow-hidden rounded-3xl border border-border bg-surface/60 shadow-elevated backdrop-blur-xl md:h-[720px] md:min-h-0 lg:h-[580px]">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(ellipse at 20% 0%, ${project.hue.from}, transparent 55%), radial-gradient(ellipse at 90% 100%, ${project.hue.to}, transparent 60%)`,
            }}
          />
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.article
              key={project.id}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid min-h-[760px] grid-cols-1 gap-0 md:h-[720px] md:min-h-0 lg:h-[580px] lg:grid-cols-12"
            >
              {/* Visual */}
              <div className="relative lg:col-span-7">
                <div className="relative aspect-[5/4] w-full overflow-hidden border-b border-border lg:aspect-auto lg:h-full lg:border-b-0 lg:border-r">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at 50% 50%, ${project.hue.from}, transparent 70%)`,
                    }}
                  />
                  <div className="absolute inset-0">
                    <project.Mockup />
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="relative flex min-h-0 flex-col justify-between gap-8 p-7 md:p-10 lg:col-span-5">
                <div className="min-h-0">
                  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    <span className="text-gradient-brand">{project.id}</span>
                    <span className="h-px w-8 bg-border" />
                    <span>{project.category}</span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
                    {project.name}
                  </h3>
                  <p className="mt-2 font-display text-lg text-gradient-brand">
                    {project.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:min-h-[5.25rem]">
                    {project.description}
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border/60">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="bg-background/80 p-3 backdrop-blur">
                        <div className="font-display text-lg font-bold text-gradient-brand">
                          {m.value}
                        </div>
                        <div className="mt-1 text-[9px] uppercase tracking-widest text-muted-foreground">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex max-h-[4.75rem] flex-wrap gap-1.5 overflow-hidden">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={project.href || "#contact"}
                  target={project.href ? "_blank" : undefined}
                  rel={project.href ? "noreferrer" : undefined}
                  className="group inline-flex items-center justify-between gap-3 rounded-full px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <span>View project</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <span className="text-gradient-brand text-sm font-semibold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-10 bg-border" />
            <span>{String(total).padStart(2, "0")}</span>
          </div>

          {/* Dots */}
          <div className="order-3 flex items-center gap-2 sm:order-2">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Go to ${p.name}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-foreground" : "w-3 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>

          <div className="order-2 flex items-center gap-2 sm:order-3">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground transition-colors hover:bg-surface"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center rounded-full text-background transition-transform hover:scale-105"
              style={{ background: "var(--gradient-brand)" }}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


function ProgressIndicator({ progress, total }: { progress: MotionValue<number>; total: number }) {
  const idx = useTransform(progress, (v) => {
    const i = Math.min(total - 1, Math.max(0, Math.floor(v * total * 0.999)));
    return String(i + 1).padStart(2, "0");
  });
  return (
    <div className="flex items-center gap-3">
      <motion.span className="text-gradient-brand text-sm font-semibold">{idx}</motion.span>
      <span className="h-px w-10 bg-border" />
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );
}

function ProjectSlide({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
    >
      {/* Per-project background wash */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse at 30% 40%, ${project.hue.from}, transparent 55%), radial-gradient(ellipse at 80% 70%, ${project.hue.via}, transparent 60%), radial-gradient(ellipse at 50% 100%, ${project.hue.to}, transparent 70%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hex opacity-30" />

      {/* Decorative hex */}
      <motion.div
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 0.12, rotate: 0 }}
        exit={{ opacity: 0, rotate: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -right-40 top-1/2 hidden h-[680px] w-[680px] -translate-y-1/2 md:block"
      >
        <HexFrame strokeWidth={0.4} />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="text-gradient-brand">{project.id}</span>
            <span className="h-px w-8 bg-border" />
            <span>{project.category}</span>
          </div>
          <h3 className="mt-5 font-display text-5xl font-bold leading-[1.02] md:text-7xl">
            {project.name}
          </h3>
          <p className="mt-4 font-display text-xl text-gradient-brand">{project.tagline}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.description}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border/80">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-background/80 p-4 backdrop-blur">
                <div className="font-display text-2xl font-bold text-gradient-brand">{m.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-mono text-muted-foreground backdrop-blur"
              >
                {s}
              </span>
            ))}
          </div>

          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
              style={{ background: "var(--gradient-brand)" }}
            >
              <span>View project</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </motion.div>

        {/* Right: mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: 3 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -40, rotate: -3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="relative lg:col-span-7"
        >
          <div className="relative mx-auto aspect-[5/4] w-full max-w-2xl">
            <div className="absolute inset-0 rounded-3xl border border-border bg-surface/40 backdrop-blur-xl" />
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <project.Mockup />
            </div>
            <div
              className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] blur-3xl opacity-60"
              style={{ background: `radial-gradient(ellipse, ${project.hue.from}, transparent 65%)` }}
            />
          </div>
        </motion.div>
      </div>

      {/* Slide footer */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        {index < total - 1 ? "Scroll · Next case" : "End of selected work"}
      </div>
    </motion.div>
  );
}

/* ---------- Mockups (pure SVG/CSS, no images) ---------- */

function Browser({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a10] shadow-2xl ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-3 h-3 flex-1 rounded bg-white/5" />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[2rem] border border-white/10 bg-[#0a0a10] p-3 shadow-2xl ${className}`}>
      <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/10" />
      {children}
    </div>
  );
}
function FloatPill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass animate-float absolute rounded-xl px-3 py-2 text-[10px] ${className}`}>
      {children}
    </div>
  );
}

function SnapGoMockup() {
  return (
    <div className="relative h-full w-full p-5 md:p-8">
      <div className="absolute left-2 top-8 w-[82%] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl md:left-4">
        <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-auto rounded bg-white px-2 py-0.5 text-[7px] text-slate-400 ring-1 ring-slate-200">
            snapgo.tech
          </span>
        </div>
        <img
          src="/images/case-studies/snapgo/homepage.png"
          alt="snapGo tech storefront homepage"
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>

      <div className="absolute bottom-9 right-3 w-[48%] overflow-hidden rounded-xl border border-white/15 bg-white shadow-2xl md:right-5">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-2.5 py-1.5">
          <span className="font-mono text-[7px] uppercase tracking-widest text-slate-500">
            Admin
          </span>
          <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[7px] font-medium text-emerald-700">
            Live
          </span>
        </div>
        <img
          src="/images/case-studies/snapgo/admin.png"
          alt="snapGo tech admin categories"
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>

      <FloatPill className="left-1 bottom-8">
        <div className="text-muted-foreground">Checkout</div>
        <div className="font-display text-sm font-semibold">WhatsApp orders</div>
      </FloatPill>
    </div>
  );
}

function DataInsightsMockup() {
  return (
    <div className="relative h-full w-full p-5 md:p-8">
      <div className="absolute left-3 top-8 w-[80%] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl md:left-4">
        <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-auto rounded bg-white px-2 py-0.5 text-[7px] text-slate-400 ring-1 ring-slate-200">
            data workspace
          </span>
        </div>
        <img
          src="/images/case-studies/data-insights/workspace.png"
          alt="AI analytics workspace overview"
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>

      <div className="absolute bottom-9 right-3 w-[47%] overflow-hidden rounded-xl border border-white/15 bg-white shadow-2xl md:right-5">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-2.5 py-1.5">
          <span className="font-mono text-[7px] uppercase tracking-widest text-slate-500">
            Results
          </span>
          <span className="rounded-full bg-teal-100 px-1.5 py-0.5 text-[7px] font-medium text-teal-700">
            Guided
          </span>
        </div>
        <img
          src="/images/case-studies/data-insights/results.png"
          alt="AI analytics results view"
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>

      <FloatPill className="left-1 bottom-8">
        <div className="text-muted-foreground">Role</div>
        <div className="font-display text-sm font-semibold">UI + API layer</div>
      </FloatPill>
    </div>
  );
}

function TijaratiMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden p-5 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.22),transparent_45%)]" />

      <div className="absolute left-4 top-8 w-[34%] rotate-[-9deg] rounded-[1.7rem] border border-white/15 bg-slate-950 p-1.5 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 rounded-[1.7rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_35%,rgba(255,255,255,0.06)_70%,transparent)]" />
        <div className="absolute left-1/2 top-3 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-slate-950 ring-1 ring-slate-800" />
        <div className="relative overflow-hidden rounded-[1.35rem] bg-white">
          <img
            src="/images/case-studies/tijarati/reports.jpg"
            alt="Tijarati Pro reports"
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>

      <div className="absolute left-1/2 top-4 z-10 w-[38%] -translate-x-1/2 rounded-[1.9rem] border border-white/20 bg-slate-950 p-1.5 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_35%,rgba(255,255,255,0.06)_70%,transparent)]" />
        <div className="absolute left-1/2 top-3 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-slate-950" />
        <div className="relative overflow-hidden rounded-[1.45rem] bg-white">
          <img
            src="/images/case-studies/tijarati/home.jpg"
            alt="Tijarati Pro home dashboard"
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>

      <div className="absolute right-4 top-10 w-[34%] rotate-[9deg] rounded-[1.7rem] border border-white/15 bg-slate-950 p-1.5 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 rounded-[1.7rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_35%,rgba(255,255,255,0.06)_70%,transparent)]" />
        <div className="absolute left-1/2 top-3 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-slate-950 ring-1 ring-slate-800" />
        <div className="relative overflow-hidden rounded-[1.35rem] bg-white">
          <img
            src="/images/case-studies/tijarati/invoices.jpg"
            alt="Tijarati Pro invoices"
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>

      <FloatPill className="left-2 bottom-8">
        <div className="text-muted-foreground">Production</div>
        <div className="font-display text-sm font-semibold">iOS + Android</div>
      </FloatPill>
      <FloatPill className="right-2 bottom-16">
        <div className="text-muted-foreground">Backend</div>
        <div className="font-display text-sm font-semibold">Firebase</div>
      </FloatPill>
    </div>
  );
}

function DetailingLabMockup() {
  return (
    <div className="relative h-full w-full p-5 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_32%,rgba(132,204,22,0.22),transparent_44%)]" />
      <div className="absolute left-4 top-9 w-[82%] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-zinc-900 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-auto rounded bg-zinc-950 px-2 py-0.5 text-[7px] text-zinc-400 ring-1 ring-white/10">
            thedetailinglabs.com.au
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src="/images/case-studies/detailing-lab/site-hero.png"
            alt="The Detailing Lab homepage"
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/10" />
        </div>
      </div>

      <div className="absolute bottom-12 right-4 w-[45%] overflow-hidden rounded-xl border border-lime-300/30 bg-zinc-950 shadow-2xl shadow-lime-950/40">
        <img
          src="/images/case-studies/detailing-lab/site-ceramic.png"
          alt="The Detailing Lab ceramic packages"
          className="block aspect-[4/3] w-full object-cover object-top"
          loading="lazy"
        />
        <div className="border-t border-white/10 bg-zinc-950 p-3">
          <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-lime-300">
            Package
          </div>
          <div className="mt-1 text-xs font-semibold text-white">Ceramic coating</div>
        </div>
      </div>

      <div className="absolute bottom-4 left-16 w-[38%] overflow-hidden rounded-xl border border-white/15 bg-zinc-950 shadow-2xl">
        <img
          src="/images/case-studies/detailing-lab/site-inquiry.png"
          alt="The Detailing Lab inquiry form"
          className="block aspect-[16/9] w-full object-cover object-top"
          loading="lazy"
        />
      </div>

      <FloatPill className="left-2 bottom-8">
        <div className="text-muted-foreground">Lead flow</div>
        <div className="font-display text-sm font-semibold">Package inquiry</div>
      </FloatPill>
    </div>
  );
}

function CommerceMockup() {
  return (
    <div className="relative h-full w-full p-8">
      <Browser className="absolute left-6 top-6 w-[70%]">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 row-span-2 aspect-square rounded-lg" style={{ background: "linear-gradient(135deg, oklch(0.55 0.24 305 / 0.6), oklch(0.78 0.18 55 / 0.4))" }} />
          <div className="aspect-square rounded-lg bg-white/5" />
          <div className="aspect-square rounded-lg bg-white/5" />
          <div className="col-span-3 mt-1 h-2 w-2/3 rounded bg-white/20" />
          <div className="col-span-3 h-2 w-1/2 rounded bg-white/10" />
          <div className="col-span-3 mt-2 h-8 rounded-md" style={{ background: "var(--gradient-brand)" }} />
        </div>
      </Browser>
      <Phone className="absolute bottom-4 right-6 h-[78%] w-[28%]">
        <div className="space-y-2">
          <div className="h-20 rounded-lg" style={{ background: "linear-gradient(135deg, oklch(0.55 0.24 305 / 0.6), oklch(0.78 0.18 55 / 0.4))" }} />
          <div className="h-2 w-3/4 rounded bg-white/20" />
          <div className="h-2 w-1/2 rounded bg-white/10" />
          <div className="mt-3 h-7 rounded" style={{ background: "var(--gradient-brand)" }} />
        </div>
      </Phone>
      <FloatPill className="left-2 top-1/2 -translate-y-1/2">
        <div className="text-muted-foreground">Cart</div>
        <div className="font-display text-sm font-semibold">+38% conv.</div>
      </FloatPill>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="relative h-full w-full p-8">
      <Browser className="h-full">
        <div className="flex h-full gap-3">
          <div className="w-1/5 space-y-2 border-r border-white/5 pr-3">
            <div className="h-3 rounded bg-white/20" />
            <div className="h-2 rounded bg-white/10" />
            <div className="h-2 rounded bg-white/10" />
            <div className="h-2 rounded" style={{ background: "var(--gradient-brand)" }} />
            <div className="h-2 rounded bg-white/10" />
            <div className="h-2 rounded bg-white/10" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[0,1,2].map(i => (
                <div key={i} className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
                  <div className="h-2 w-1/2 rounded bg-white/15" />
                  <div className="mt-2 font-display text-lg font-semibold text-gradient-brand">
                    {["24.8k","98%","$2.1M"][i]}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex h-32 items-end gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] p-3">
              {[40,65,30,80,55,90,70,60,85,45,75,95].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: "var(--gradient-brand)", opacity: 0.4 + (h/200) }} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-16 rounded-lg border border-white/5 bg-white/[0.02]" />
              <div className="h-16 rounded-lg border border-white/5 bg-white/[0.02]" />
            </div>
          </div>
        </div>
      </Browser>
      <FloatPill className="-right-2 top-12">
        <div className="text-muted-foreground">Sync</div>
        <div className="font-display text-sm font-semibold">12k users</div>
      </FloatPill>
    </div>
  );
}

function PayMockup() {
  return (
    <div className="relative h-full w-full p-8">
      <Phone className="absolute left-6 top-4 h-[88%] w-[38%]">
        <div className="space-y-3">
          <div className="rounded-xl p-4" style={{ background: "var(--gradient-brand)" }}>
            <div className="text-[8px] uppercase tracking-widest text-white/70">Balance</div>
            <div className="mt-4 font-display text-lg font-bold text-white">$28,420.50</div>
            <div className="mt-1 text-[8px] text-white/70">•••• 4209</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Send","Receive","Top up"].map(l => (
              <div key={l} className="rounded-lg border border-white/10 p-2 text-center text-[8px] text-white/70">{l}</div>
            ))}
          </div>
          <div className="space-y-2">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.02] p-2">
                <div className="h-6 w-6 rounded-full" style={{ background: "var(--gradient-brand)", opacity: 0.6 }} />
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 w-3/4 rounded bg-white/20" />
                  <div className="h-1 w-1/2 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Phone>
      <Browser className="absolute right-4 top-6 w-[55%]">
        <div className="space-y-3">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">FX Volume · 24h</div>
          <div className="flex h-24 items-end gap-0.5">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${30 + Math.sin(i*0.7) * 30 + i * 1.5}%`, background: "var(--gradient-brand)", opacity: 0.7 }} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <div className="rounded bg-white/[0.03] p-2"><div className="text-muted-foreground">TPS</div><div className="font-display font-bold text-gradient-brand">8.4k</div></div>
            <div className="rounded bg-white/[0.03] p-2"><div className="text-muted-foreground">Latency</div><div className="font-display font-bold text-gradient-brand">84ms</div></div>
            <div className="rounded bg-white/[0.03] p-2"><div className="text-muted-foreground">Markets</div><div className="font-display font-bold text-gradient-brand">11</div></div>
          </div>
        </div>
      </Browser>
    </div>
  );
}

function MediMockup() {
  return (
    <div className="relative h-full w-full p-8">
      <Browser className="h-full">
        <div className="grid h-full grid-cols-3 gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] p-2">
              <div className="h-8 w-8 rounded-full" style={{ background: "var(--gradient-brand)" }} />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-3/4 rounded bg-white/20" />
                <div className="h-1 w-1/2 rounded bg-white/10" />
              </div>
            </div>
            {Array.from({length:4}).map((_,i)=>(
              <div key={i} className="rounded-md border border-white/5 bg-white/[0.02] p-2">
                <div className="h-1.5 w-2/3 rounded bg-white/15" />
                <div className="mt-1 h-1 w-1/3 rounded bg-white/10" />
              </div>
            ))}
          </div>
          <div className="col-span-2 space-y-3">
            <div className="rounded-lg border border-white/5 p-3" style={{ background: "linear-gradient(135deg, oklch(0.55 0.24 305 / 0.25), transparent)" }}>
              <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Today · Vitals</div>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {[["HR","72"],["BP","118/76"],["SpO₂","98%"],["Temp","36.8"]].map(([l,v])=>(
                  <div key={l}><div className="text-[8px] text-muted-foreground">{l}</div><div className="font-display text-sm font-bold text-gradient-brand">{v}</div></div>
                ))}
              </div>
              <div className="mt-3 flex h-16 items-end gap-0.5">
                {Array.from({length:40}).map((_,i)=>(
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${40 + Math.sin(i*0.6)*40}%`, background: "var(--gradient-brand)", opacity: 0.6 }} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-16 rounded-lg border border-white/5 bg-white/[0.02]" />
              <div className="h-16 rounded-lg border border-white/5" style={{ background: "var(--gradient-brand)", opacity: 0.4 }} />
            </div>
          </div>
        </div>
      </Browser>
    </div>
  );
}

function EstateMockup() {
  return (
    <div className="relative h-full w-full p-8">
      <Browser className="h-full">
        <div className="grid h-full grid-cols-2 gap-3">
          <div className="relative overflow-hidden rounded-lg" style={{ background: "linear-gradient(135deg, oklch(0.78 0.18 55 / 0.5), oklch(0.6 0.25 5 / 0.3))" }}>
            <div className="absolute inset-0 bg-hex opacity-30" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="text-[9px] uppercase tracking-widest text-white/70">Featured</div>
              <div className="font-display text-sm font-bold text-white">The Atrium Loft</div>
              <div className="text-[10px] text-white/70">Soho · $4.2M</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[0,1,2,3].map(i=>(
              <div key={i} className="relative aspect-square overflow-hidden rounded-md" style={{ background: `linear-gradient(${135 + i*30}deg, oklch(0.7 0.18 ${20+i*20} / 0.5), oklch(0.55 0.24 305 / 0.2))` }}>
                <div className="absolute bottom-1 left-1 text-[7px] text-white/80">$1.{i+2}M</div>
              </div>
            ))}
            <div className="col-span-2 rounded-md border border-white/5 bg-white/[0.02] p-2">
              <div className="h-1.5 w-2/3 rounded bg-white/15" />
              <div className="mt-1 flex h-8 items-end gap-0.5">
                {[40,60,30,80,55,70,90,50].map((h,i)=>(
                  <div key={i} className="flex-1 rounded-sm" style={{ height:`${h}%`, background:"var(--gradient-brand)", opacity:0.6 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Browser>
      <FloatPill className="-left-2 bottom-8">
        <div className="text-muted-foreground">Tours</div>
        <div className="font-display text-sm font-semibold">73% complete</div>
      </FloatPill>
    </div>
  );
}

function EduMockup() {
  return (
    <div className="relative h-full w-full p-8">
      <Browser className="absolute left-6 top-6 w-[65%]">
        <div className="space-y-3">
          <div className="relative h-20 overflow-hidden rounded-lg" style={{ background: "linear-gradient(135deg, oklch(0.65 0.27 5 / 0.5), oklch(0.55 0.24 305 / 0.3))" }}>
            <div className="absolute inset-0 bg-hex opacity-30" />
            <div className="absolute bottom-2 left-3 text-white">
              <div className="text-[9px] uppercase tracking-widest opacity-70">Course</div>
              <div className="font-display text-sm font-bold">Systems Design · 03</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Lesson","Practice","Review"].map((l,i)=>(
              <div key={l} className="rounded-md border border-white/5 p-2" style={i===1 ? { background: "var(--gradient-brand)", opacity: 0.5 } : { background: "rgba(255,255,255,0.02)" }}>
                <div className="text-[9px] text-white/80">{l}</div>
                <div className="mt-1 font-display text-sm font-bold">{[12,4,8][i]}</div>
              </div>
            ))}
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3" style={{ background: "var(--gradient-brand)" }} />
          </div>
        </div>
      </Browser>
      <Phone className="absolute bottom-4 right-6 h-[78%] w-[28%]">
        <div className="space-y-2">
          <div className="h-2 w-2/3 rounded bg-white/20" />
          <div className="h-16 rounded-lg" style={{ background: "var(--gradient-brand)", opacity: 0.6 }} />
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-1.5 w-3/4 rounded bg-white/10" />
          <div className="grid grid-cols-3 gap-1 pt-2">
            {[0,1,2].map(i=>(<div key={i} className="aspect-square rounded bg-white/5" />))}
          </div>
        </div>
      </Phone>
      <FloatPill className="left-1/3 bottom-4">
        <div className="text-muted-foreground">Streak</div>
        <div className="font-display text-sm font-semibold text-gradient-brand">42 days</div>
      </FloatPill>
    </div>
  );
}
