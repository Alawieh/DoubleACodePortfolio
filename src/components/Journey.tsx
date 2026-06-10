import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stages = [
  { id: "01", title: "Idea", text: "We listen first. Every great product begins with sharp understanding of intent." },
  { id: "02", title: "Strategy", text: "We define scope, architecture and KPIs. Decisions that compound for years." },
  { id: "03", title: "Design", text: "Interfaces designed with restraint — every pixel earns its place." },
  { id: "04", title: "Engineering", text: "Type-safe, performant, observable systems. Built to scale beyond launch." },
  { id: "05", title: "Launch", text: "Ship, measure, iterate. We stay until your product is alive in the market." },
];

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>01 / Journey</SectionLabel>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Watch an idea become <span className="text-gradient-accent">a product</span>.
        </h2>

        <div className="relative mt-10 grid grid-cols-1 gap-4 md:mt-24 md:grid-cols-[1fr_2px_1fr] md:gap-16">
          {/* Spine */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-border md:left-1/2 md:block">
            <motion.div
              className="absolute top-0 w-full bg-gradient-to-b from-accent via-accent-bright to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          {stages.map((s, i) => (
            <Stage key={s.id} stage={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stage({ stage, index }: { stage: (typeof stages)[number]; index: number }) {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`col-span-full grid grid-cols-1 items-center gap-8 rounded-2xl border border-border bg-surface/45 p-5 md:grid-cols-[1fr_2px_1fr] md:rounded-none md:border-0 md:bg-transparent md:p-0 ${isLeft ? "" : ""}`}
    >
      <div className={`${isLeft ? "md:text-right md:pr-12" : "md:order-3 md:pl-12"}`}>
        <div className="font-mono text-xs text-accent">{stage.id}</div>
        <h3 className="mt-2 font-display text-2xl font-semibold md:text-4xl">{stage.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground md:mt-3 md:ml-auto md:text-base">{stage.text}</p>
      </div>

      <div className="hidden items-center justify-center md:order-2 md:flex">
        <div className="relative h-4 w-4 rounded-full bg-background ring-4 ring-accent/20">
          <div className="absolute inset-1 rounded-full bg-accent" />
        </div>
      </div>

      <div className={`${isLeft ? "md:order-3" : ""}`} />
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
      <span className="h-px w-8 bg-border" />
      {children}
    </div>
  );
}
