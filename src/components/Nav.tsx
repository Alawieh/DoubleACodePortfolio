import { motion } from "framer-motion";
import { LogoMark } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

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
      <nav className="glass flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2">
        <a href="#top" className="flex items-center gap-2.5 pl-1.5">
          <LogoMark className="h-8 w-8" />
          <span className="font-display text-sm font-semibold tracking-[0.25em] text-gradient-brand">
            AA CODE
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
          className="relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium text-background"
          style={{ background: "var(--gradient-brand)" }}
        >
          Start Project
        </a>
      </nav>
    </motion.header>
  );
}
