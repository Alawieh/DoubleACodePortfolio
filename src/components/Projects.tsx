import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
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
  hue: { from: string; via: string; to: string };
  Mockup: React.ComponentType;
};

const projects: Project[] = [
  {
    id: "01",
    name: "NovaCommerce",
    category: "E-Commerce Platform",
    tagline: "Luxury electronics, reimagined.",
    description:
      "A headless commerce platform engineered for sub-second product discovery, dynamic merchandising, and frictionless checkout across web and mobile.",
    metrics: [
      { label: "Conversion lift", value: "+38%" },
      { label: "Time to checkout", value: "12s" },
      { label: "Lighthouse", value: "99" },
    ],
    stack: ["Next.js", "Stripe", "Algolia", "Sanity"],
    hue: { from: "oklch(0.55 0.24 305 / 0.55)", via: "oklch(0.65 0.27 5 / 0.35)", to: "oklch(0.78 0.18 55 / 0.2)" },
    Mockup: CommerceMockup,
  },
  {
    id: "02",
    name: "AtlasERP",
    category: "Enterprise Suite",
    tagline: "Operations, unified.",
    description:
      "Full-stack enterprise resource planning with real-time inventory, finance, HR, and supply-chain telemetry across 14 timezones.",
    metrics: [
      { label: "Modules", value: "26" },
      { label: "Daily users", value: "12k" },
      { label: "Uptime", value: "99.99%" },
    ],
    stack: ["Angular", "Node.js", "PostgreSQL", "Redis"],
    hue: { from: "oklch(0.6 0.22 280 / 0.5)", via: "oklch(0.7 0.2 330 / 0.3)", to: "oklch(0.78 0.18 55 / 0.18)" },
    Mockup: DashboardMockup,
  },
  {
    id: "03",
    name: "SwiftPay",
    category: "Fintech",
    tagline: "Money that moves at the speed of intent.",
    description:
      "A cross-border payments platform with biometric auth, instant FX, and a developer SDK trusted by 200+ regional merchants.",
    metrics: [
      { label: "TPS", value: "8.4k" },
      { label: "Latency", value: "84ms" },
      { label: "Markets", value: "11" },
    ],
    stack: ["Flutter", "Go", "Kafka", "Postgres"],
    hue: { from: "oklch(0.55 0.24 305 / 0.55)", via: "oklch(0.6 0.25 340 / 0.4)", to: "oklch(0.7 0.2 20 / 0.25)" },
    Mockup: PayMockup,
  },
  {
    id: "04",
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
    id: "05",
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
    id: "06",
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


  return (
    <section
      id="work"
      ref={ref}
      className="relative"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Section frame */}
        <div className="pointer-events-none absolute left-6 top-8 z-40 md:left-10">
          <SectionLabel>03 / Selected Work</SectionLabel>
        </div>
        <div className="pointer-events-none absolute right-6 top-8 z-40 flex items-center gap-3 font-mono text-xs text-muted-foreground md:right-10">
          <div className="pointer-events-auto"><ViewToggle mode={mode} onChange={setView} /></div>
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
