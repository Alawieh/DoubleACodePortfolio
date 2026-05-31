import { motion } from "framer-motion";
import { SectionLabel } from "./Journey";

const founders = [
  { name: "Saeed Al Ahmar", role: "Co-Founder · Software Engineer", initials: "SA" },
  { name: "Hussein Alawieh", role: "Co-Founder · Software Engineer", initials: "HA" },
];

export function Founders() {
  return (
    <section id="studio" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>05 / Studio</SectionLabel>
        <div className="mt-4 grid grid-cols-1 gap-16 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Two engineers. One standard: <span className="text-gradient-accent">build software that lasts.</span>
            </h2>
            <p className="mt-6 max-w-lg text-muted-foreground">
              Double A is a focused engineering studio. No layers, no handoffs — you work directly
              with the people writing the code. We commit to long-term partnerships and treat every
              system as if our own business depended on it.
            </p>
          </div>

          <div className="space-y-4">
            {founders.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group flex items-center gap-5 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent-bright/10 font-display text-lg font-bold">
                  {f.initials}
                </div>
                <div>
                  <div className="font-display text-lg font-semibold">{f.name}</div>
                  <div className="text-sm text-muted-foreground">{f.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
