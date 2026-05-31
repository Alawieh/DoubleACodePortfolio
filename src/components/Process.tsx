import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "./Journey";

const steps = [
  { id: "01", label: "Idea", desc: "Discovery & alignment" },
  { id: "02", label: "Wireframe", desc: "Structure & flow" },
  { id: "03", label: "Design", desc: "Visual system" },
  { id: "04", label: "Development", desc: "Engineering & QA" },
  { id: "05", label: "Testing", desc: "Hardening & polish" },
  { id: "06", label: "Launch", desc: "Ship & iterate" },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["10%", "-45%"]);

  return (
    <section id="process" ref={ref} className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>06 / Process</SectionLabel>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          From idea <span className="text-gradient-accent">to product</span>.
        </h2>
        <p className="mt-6 max-w-lg text-muted-foreground">
          A transparent six-stage process. Predictable timelines, no surprises.
        </p>
      </div>

      <div className="mt-20 overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-6">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className="relative flex h-72 w-[320px] shrink-0 flex-col justify-between rounded-3xl border border-border bg-surface p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-accent">{s.id}</span>
                <span className="h-2 w-2 rounded-full bg-accent" />
              </div>
              <div>
                <div className="font-display text-3xl font-semibold">{s.label}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute right-[-30px] top-1/2 z-10 hidden -translate-y-1/2 text-muted-foreground md:block">
                  →
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
