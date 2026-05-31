import { motion } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#studio" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-6 pt-6"
    >
      <nav className="glass flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="relative h-7 w-7">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <polygon
                points="50,5 90,27 90,73 50,95 10,73 10,27"
                fill="none"
                stroke="oklch(0.78 0.14 220)"
                strokeWidth="4"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-[11px] font-bold">
              AA
            </span>
          </div>
          <span className="font-display text-sm font-semibold tracking-[0.2em]">
            DOUBLE A
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
        >
          Start Project
        </a>
      </nav>
    </motion.header>
  );
}
