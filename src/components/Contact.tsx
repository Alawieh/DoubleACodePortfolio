import { motion } from "framer-motion";

const channels = [
  { label: "Email", value: "hello@doublea.studio", href: "mailto:hello@doublea.studio" },
  { label: "WhatsApp", value: "+961 00 000 000", href: "https://wa.me/" },
  { label: "Instagram", value: "@doublea.studio", href: "https://instagram.com/" },
  { label: "LinkedIn", value: "/company/double-a", href: "https://linkedin.com/" },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-40 px-6">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.78 0.14 220 / 0.15), transparent 60%)" }}
      />
      <div className="absolute inset-0 -z-10 bg-grid opacity-20" />

      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for new partnerships
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
        >
          Let's build something <span className="text-gradient-accent">remarkable</span>.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="mailto:hello@doublea.studio"
            className="rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
          >
            Schedule a Call
          </a>
          <a
            href="mailto:hello@doublea.studio"
            className="rounded-full border border-border bg-surface/40 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-surface"
          >
            Send a Message
          </a>
          <a
            href="mailto:hello@doublea.studio"
            className="rounded-full border border-border bg-surface/40 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-surface"
          >
            Get a Project Estimate
          </a>
        </motion.div>

        <div className="mx-auto mt-24 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group bg-background p-5 text-left transition-colors hover:bg-surface"
            >
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</div>
              <div className="mt-2 text-sm text-foreground transition-colors group-hover:text-accent">
                {c.value}
              </div>
            </a>
          ))}
        </div>

        <footer className="mt-24 flex flex-col items-center gap-3 text-xs text-muted-foreground">
          <div className="font-display tracking-[0.4em]">DOUBLE A</div>
          <div>© 2026 Double A Studio · Engineered with care</div>
        </footer>
      </div>
    </section>
  );
}
