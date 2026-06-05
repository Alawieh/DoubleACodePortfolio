import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Check, FileSpreadsheet, MessageSquareText, Route, Settings2 } from "lucide-react";

const stack = ["React", "TypeScript", "Vite", "Tailwind CSS", "REST APIs", "Electron"];

const images = {
  upload: "/images/case-studies/data-insights/upload.png",
  context: "/images/case-studies/data-insights/context.png",
  workspace: "/images/case-studies/data-insights/workspace.png",
  discover: "/images/case-studies/data-insights/discover.png",
  ask: "/images/case-studies/data-insights/ask.png",
  results: "/images/case-studies/data-insights/results.png",
};

const features = [
  {
    label: "Dataset Intake",
    title: "Upload and session start",
    text: "A clean entry flow for uploading spreadsheet datasets, trying sample data, and starting an analysis workspace.",
    img: images.upload,
  },
  {
    label: "Context Review",
    title: "Human-readable dataset setup",
    text: "Editable context screens help users verify field meanings, business purpose, entities, and constraints before analysis begins.",
    img: images.context,
  },
  {
    label: "Guided Workspace",
    title: "Decision-oriented launch view",
    text: "A command-center layout turns complex backend capabilities into clear recommended actions and decision paths.",
    img: images.workspace,
  },
  {
    label: "Discovery Flow",
    title: "Configurable analysis setup",
    text: "Focused controls let users choose target fields and analysis lenses without needing to understand backend internals.",
    img: images.discover,
  },
  {
    label: "Ask Interface",
    title: "Saved prompts and follow-ups",
    text: "A conversational workspace connects saved prompts, prior questions, and dataset-aware follow-up requests.",
    img: images.ask,
  },
  {
    label: "Results UI",
    title: "Evidence in usable form",
    text: "Backend output is presented as readable summaries, ranked groups, distributions, and expandable raw details.",
    img: images.results,
  },
];

const flow = ["Upload Dataset", "Review Context", "Choose Analysis", "Read Results"];

const contribution = [
  {
    title: "Product UI",
    text: "Designed and built the user-facing workspace that makes advanced analysis workflows approachable.",
  },
  {
    title: "Routing and Flows",
    text: "Structured the app into launch, discovery, ask, compute, and results paths for repeatable navigation.",
  },
  {
    title: "API Integration",
    text: "Connected the interface to the client-provided analytics backend through practical request and session flows.",
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
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/5 transition-shadow duration-500 group-hover:shadow-[0_40px_100px_-30px_rgba(13,148,136,0.22)]">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex-1">
            <div className="mx-auto w-fit rounded-md bg-white px-3 py-1 text-[11px] text-slate-400 ring-1 ring-slate-200">
              data workspace
            </div>
          </div>
        </div>
        <img src={src} alt={alt} className="block h-auto w-full" loading="lazy" />
      </div>
    </figure>
  );
}

export function DataInsightsCaseStudy() {
  return (
    <section
      id="data-insights-case-study"
      className="relative isolate overflow-hidden bg-[#f7faf9] py-24 text-slate-950 sm:py-32"
      style={{ colorScheme: "light" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 15% 8%, rgba(13,148,136,0.1), transparent 52%), radial-gradient(ellipse at 90% 92%, rgba(59,130,246,0.07), transparent 55%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-10 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium tracking-wide text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              Case Study - AI Analytics Interface
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Data Insights Workspace
            </h2>
            <p className="mt-3 text-lg text-slate-600 sm:text-xl">
              A user-friendly control layer for a powerful AI analytics backend.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600">
              This project focused on turning an advanced client-provided Python analytics
              engine into a practical web and desktop experience. My work covered the user
              interface, route structure, API integration, dataset flows, and result
              presentation so non-technical users could move from upload to useful evidence
              without managing backend complexity.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                At a glance
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {[
                  "Dataset upload and onboarding",
                  "Guided analysis workspaces",
                  "API-connected AI workflows",
                  "Desktop-ready product shell",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-teal-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-14"
        >
          <BrowserFrame src={images.workspace} alt="AI data workspace launch screen" label="Workspace overview" />
        </motion.div>

        <div className="mt-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h3 className="font-display text-2xl font-semibold text-slate-950 sm:text-3xl">
              Inside the product
            </h3>
            <div className="hidden h-px flex-1 bg-slate-200 sm:block" />
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="flex flex-col gap-5"
              >
                <BrowserFrame src={feature.img} alt={feature.title} label={feature.label} />
                <div>
                  <h4 className="text-lg font-semibold text-slate-950">{feature.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h3 className="font-display text-2xl font-semibold text-slate-950 sm:text-3xl">
            How the workflow feels
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            A complex analytics process is reduced to clear product steps.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((step, index) => {
              const icons = [FileSpreadsheet, Route, BrainCircuit, MessageSquareText];
              const Icon = icons[index];
              return (
                <div
                  key={step}
                  className="relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-950">{step}</div>
                  {index < flow.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-300 lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h3 className="font-display text-2xl font-semibold text-slate-950 sm:text-3xl">
              Built with
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl font-semibold text-slate-950 sm:text-3xl">
              My contribution
            </h3>
            <div className="mt-5 grid gap-3">
              {contribution.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 font-display text-lg font-semibold text-teal-700">
                    <Settings2 className="h-4 w-4" />
                    {item.title}
                  </div>
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
