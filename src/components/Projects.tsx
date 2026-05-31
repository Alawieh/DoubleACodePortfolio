import { motion } from "framer-motion";
import { SectionLabel } from "./Journey";

const projects = [
  {
    id: "01",
    name: "NovaCommerce",
    category: "E-Commerce",
    tag: "Luxury Electronics",
    accent: "from-cyan-400/30 to-blue-500/10",
    mockup: <CommerceMock />,
  },
  {
    id: "02",
    name: "AtlasERP",
    category: "Enterprise",
    tag: "Business Management",
    accent: "from-emerald-400/25 to-teal-500/10",
    mockup: <DashboardMock />,
  },
  {
    id: "03",
    name: "SwiftPay",
    category: "Fintech",
    tag: "Financial Dashboard",
    accent: "from-violet-400/25 to-fuchsia-500/10",
    mockup: <PayMock />,
  },
  {
    id: "04",
    name: "MediFlow",
    category: "Healthcare",
    tag: "Patient Platform",
    accent: "from-sky-400/25 to-indigo-500/10",
    mockup: <MediMock />,
  },
  {
    id: "05",
    name: "UrbanEstate",
    category: "Real Estate",
    tag: "Listings Platform",
    accent: "from-amber-400/25 to-orange-500/10",
    mockup: <EstateMock />,
  },
  {
    id: "06",
    name: "EduSphere",
    category: "Education",
    tag: "Learning System",
    accent: "from-rose-400/25 to-pink-500/10",
    mockup: <EduMock />,
  },
];

export function Projects() {
  return (
    <section id="work" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>03 / Selected Work</SectionLabel>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Products built with <span className="text-gradient-accent">intention</span>.
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            A glimpse of platforms shipped across commerce, fintech, healthcare, and enterprise.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-surface"
      data-cursor="hover"
    >
      <div className={`relative aspect-[16/11] overflow-hidden bg-gradient-to-br ${project.accent}`}>
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-[1.03]">
          {project.mockup}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
      </div>

      <div className="flex items-end justify-between gap-4 p-6">
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="font-mono text-accent">{project.id}</span>
            <span>{project.category}</span>
          </div>
          <h3 className="mt-2 font-display text-2xl font-semibold">{project.name}</h3>
          <p className="text-sm text-muted-foreground">{project.tag}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Mockups (pure SVG/CSS, no images) ---------- */

function Browser({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0c0c10] shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}
function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-48 w-28 rounded-[1.4rem] border border-white/10 bg-[#0c0c10] p-2 shadow-2xl">
      {children}
    </div>
  );
}

function CommerceMock() {
  return (
    <div className="flex items-end gap-4">
      <Browser>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="col-span-2 row-span-2 aspect-square rounded-md bg-gradient-to-br from-cyan-400/40 to-blue-600/20" />
          <div className="aspect-square rounded-md bg-white/5" />
          <div className="aspect-square rounded-md bg-white/5" />
          <div className="col-span-3 mt-1 h-2 w-2/3 rounded bg-white/20" />
          <div className="col-span-3 h-2 w-1/2 rounded bg-white/10" />
        </div>
      </Browser>
      <Phone>
        <div className="space-y-1.5">
          <div className="h-14 rounded-md bg-gradient-to-br from-cyan-400/40 to-blue-600/20" />
          <div className="h-1.5 w-3/4 rounded bg-white/20" />
          <div className="h-1.5 w-1/2 rounded bg-white/10" />
          <div className="mt-2 h-6 rounded bg-cyan-400/30" />
        </div>
      </Phone>
    </div>
  );
}

function DashboardMock() {
  return (
    <Browser>
      <div className="flex gap-2">
        <div className="w-1/4 space-y-1">
          <div className="h-2 rounded bg-white/15" />
          <div className="h-2 rounded bg-white/10" />
          <div className="h-2 rounded bg-white/10" />
          <div className="h-2 rounded bg-white/10" />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-10 rounded bg-emerald-400/25" />
            <div className="h-10 rounded bg-white/5" />
            <div className="h-10 rounded bg-white/5" />
          </div>
          <div className="flex h-16 items-end gap-1 rounded bg-white/5 p-1.5">
            {[40, 70, 30, 90, 55, 80, 60].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-emerald-400/40" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </Browser>
  );
}

function PayMock() {
  return (
    <div className="flex items-end gap-4">
      <Phone>
        <div className="space-y-2">
          <div className="rounded-md bg-gradient-to-br from-violet-500/50 to-fuchsia-500/30 p-2">
            <div className="text-[6px] uppercase text-white/70">Balance</div>
            <div className="mt-3 text-[10px] font-bold text-white">$28,420.50</div>
          </div>
          <div className="space-y-1">
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-3/4 rounded bg-white/10" />
            <div className="h-2 w-2/3 rounded bg-white/10" />
          </div>
        </div>
      </Phone>
      <Browser>
        <div className="flex h-20 items-end gap-0.5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex-1 rounded-sm bg-violet-400/40" style={{ height: `${20 + Math.sin(i) * 40 + i * 2}%` }} />
          ))}
        </div>
      </Browser>
    </div>
  );
}

function MediMock() {
  return (
    <Browser>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 rounded bg-sky-400/15 p-1.5">
          <div className="h-4 w-4 rounded-full bg-sky-400/50" />
          <div className="flex-1 space-y-0.5">
            <div className="h-1.5 w-1/2 rounded bg-white/30" />
            <div className="h-1 w-1/3 rounded bg-white/15" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-12 rounded bg-white/5" />
          <div className="h-12 rounded bg-sky-400/20" />
        </div>
        <div className="h-1.5 rounded bg-white/10" />
        <div className="h-1.5 w-2/3 rounded bg-white/10" />
      </div>
    </Browser>
  );
}

function EstateMock() {
  return (
    <Browser>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="aspect-[4/3] rounded bg-gradient-to-br from-amber-400/40 to-orange-600/20" />
        <div className="aspect-[4/3] rounded bg-gradient-to-br from-amber-500/30 to-orange-700/10" />
        <div className="aspect-[4/3] rounded bg-gradient-to-br from-amber-400/30 to-orange-500/10" />
        <div className="aspect-[4/3] rounded bg-gradient-to-br from-yellow-400/30 to-amber-700/10" />
      </div>
    </Browser>
  );
}

function EduMock() {
  return (
    <div className="flex items-end gap-4">
      <Browser>
        <div className="space-y-1.5">
          <div className="h-14 rounded bg-gradient-to-br from-rose-400/30 to-pink-600/15" />
          <div className="grid grid-cols-3 gap-1">
            <div className="h-8 rounded bg-white/5" />
            <div className="h-8 rounded bg-rose-400/25" />
            <div className="h-8 rounded bg-white/5" />
          </div>
        </div>
      </Browser>
      <Phone>
        <div className="space-y-1.5">
          <div className="h-2 w-2/3 rounded bg-white/20" />
          <div className="h-12 rounded bg-rose-400/25" />
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-1.5 w-3/4 rounded bg-white/10" />
        </div>
      </Phone>
    </div>
  );
}
