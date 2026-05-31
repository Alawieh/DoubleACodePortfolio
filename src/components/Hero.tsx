import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LogoMark, HexFrame } from "./Logo";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32">
      {/* Backgrounds — hexagonal field */}
      <div className="absolute inset-0 bg-hex opacity-60" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] animate-pulse-glow"
        style={{ background: "conic-gradient(from 120deg, oklch(0.55 0.24 305 / 0.4), oklch(0.65 0.27 5 / 0.35), oklch(0.78 0.18 55 / 0.3), oklch(0.55 0.24 305 / 0.4))" }}
      />

      {/* Giant ghost hex behind everything */}
      <motion.div
        style={{ scale: logoScale, rotate: logoRotate }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,720px)] aspect-square opacity-[0.07]"
      >
        <HexFrame strokeWidth={0.5} />
      </motion.div>

      {/* Floating UI cards */}
      <FloatingCard className="left-[6%] top-[22%] hidden lg:flex" delay={0.6}>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          deployment · active
        </div>
        <div className="mt-2 font-mono text-xs text-foreground">build #2840 · 4.2s</div>
      </FloatingCard>

      <FloatingCard className="right-[6%] top-[28%] hidden lg:flex" delay={0.9}>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Lighthouse</div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-display text-2xl font-bold text-gradient-brand">99</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </FloatingCard>

      <FloatingCard className="bottom-[14%] left-[10%] hidden lg:flex" delay={1.2}>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Stack</div>
        <div className="mt-1 font-mono text-xs">react · node · flutter</div>
      </FloatingCard>

      <FloatingCard className="bottom-[18%] right-[8%] hidden lg:flex" delay={1.5}>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Uptime</div>
        <div className="mt-1 font-display text-lg font-semibold">99.98%</div>
      </FloatingCard>

      {/* Main */}
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 flex justify-center"
        >
          <LogoMark className="h-24 w-24 md:h-28 md:w-28" glow />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "var(--gradient-brand)" }} />
          Now accepting new partnerships · 2026
        </motion.div>

        <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]">
          <Reveal delay={0.6}>We Build Software</Reveal>
          <Reveal delay={0.75}>
            <span className="text-gradient-brand">That Builds Businesses.</span>
          </Reveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          From modern websites to enterprise systems, we transform ideas into
          scalable digital products — engineered with precision, designed without compromise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#work"
            className="group relative overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium text-background brand-glow"
            style={{ background: "var(--gradient-brand)" }}
          >
            <span className="relative z-10">View Our Work →</span>
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border bg-surface/40 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-surface"
          >
            Start Your Project
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
      >
        scroll
      </motion.div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FloatingCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className={`glass animate-float absolute flex flex-col rounded-2xl px-4 py-3 ${className}`}
    >
      {children}
    </motion.div>
  );
}
