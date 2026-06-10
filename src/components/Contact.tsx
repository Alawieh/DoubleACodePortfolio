import { motion } from "framer-motion";

const channels = [
  {
    label: "Email",
    value: "info@doubleacode.com",
    href: "mailto:info@doubleacode.com",
    type: "email",
  },
  {
    label: "WhatsApp",
    value: "+961 71 255 749",
    href: "https://wa.me/96171255749",
    type: "whatsapp",
  },
  {
    label: "WhatsApp",
    value: "+961 76 540 004",
    href: "https://wa.me/96176540004",
    type: "whatsapp",
  },
  {
    label: "Instagram",
    value: "@doubleacode",
    href: "https://www.instagram.com/doubleacode?igsh=YTg1M3o0bmNjZWZh&utm_source=qr",
    type: "external",
  },
];

const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";

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
          className="mx-auto mt-12 max-w-3xl rounded-3xl border border-white/15 bg-[oklch(0.13_0.018_300/0.92)] p-4 text-left shadow-[0_30px_90px_-35px_oklch(0_0_0/0.8),0_0_0_1px_oklch(1_0_0/0.04)_inset] backdrop-blur md:p-6"
        >
          <form action="https://api.web3forms.com/submit" method="POST" className="grid gap-4">
            <input type="hidden" name="access_key" value={web3FormsAccessKey} />
            <input type="hidden" name="subject" value="New Double A project inquiry" />
            <input type="hidden" name="from_name" value="Double A Portfolio" />
            <input type="hidden" name="to" value="info@doubleacode.com" />
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" autoComplete="name" required />
              <Field label="Email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Phone" name="phone" type="tel" placeholder="+961 ..." autoComplete="tel" required />
              <Field label="Company" name="company" placeholder="Company or brand" autoComplete="organization" />
            </div>

            <SelectField
              label="Inquiry Type"
              name="inquiry_type"
              options={["Website", "Mobile app", "Admin dashboard", "Brand/storefront", "Other"]}
            />

            <label className="grid gap-2 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Project Details <span className="text-accent">*</span>
              </span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Tell us what you want to build, timeline, goals, and any useful links."
                className="min-h-36 resize-y rounded-2xl border border-white/12 bg-background/95 px-4 py-3 text-sm text-foreground shadow-[0_1px_0_oklch(1_0_0/0.05)_inset] outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/70 focus:bg-surface"
              />
            </label>

            <button
              type="submit"
              className="mt-2 rounded-full px-7 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.01]"
              style={{ background: "var(--gradient-brand)" }}
            >
              Send Inquiry
            </button>
          </form>
        </motion.div>

        <div className="mx-auto mt-24 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {channels.map((c) => (
            <a
              key={`${c.label}-${c.value}`}
              href={c.href}
              title={c.value}
              target={c.type === "whatsapp" || c.type === "external" ? "_blank" : undefined}
              rel={c.type === "whatsapp" || c.type === "external" ? "noreferrer" : undefined}
              className={[
                "group min-w-0 bg-background p-5 text-left transition-colors",
                c.type === "whatsapp"
                  ? "hover:bg-[#25D366]/10"
                  : "hover:bg-surface",
              ].join(" ")}
            >
              <div
                className={[
                  "flex items-center gap-2 text-[10px] uppercase tracking-widest",
                  c.type === "whatsapp" ? "text-[#25D366]" : "text-muted-foreground",
                ].join(" ")}
              >
                {c.type === "whatsapp" ? (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_24px_rgba(37,211,102,0.28)]">
                    <WhatsAppMark />
                  </span>
                ) : null}
                <span>{c.label}</span>
              </div>
              <div
                className={[
                  "mt-2 min-w-0 text-sm transition-colors",
                  c.type === "whatsapp"
                    ? "font-semibold text-[#25D366]"
                    : c.type === "email"
                    ? "block overflow-hidden text-ellipsis whitespace-nowrap text-foreground group-hover:text-accent"
                      : "text-foreground group-hover:text-accent",
                ].join(" ")}
              >
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

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label} {required ? <span className="text-accent">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="rounded-2xl border border-white/12 bg-background/95 px-4 py-3 text-sm text-foreground shadow-[0_1px_0_oklch(1_0_0/0.05)_inset] outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/70 focus:bg-surface"
      />
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <select
        name={name}
        className="rounded-2xl border border-white/12 bg-background/95 px-4 py-3 text-sm text-foreground shadow-[0_1px_0_oklch(1_0_0/0.05)_inset] outline-none transition-colors focus:border-accent/70 focus:bg-surface"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M16.04 4.5A11.43 11.43 0 0 0 6.3 21.9L4.75 27.5l5.74-1.5a11.43 11.43 0 1 0 5.55-21.5Zm0 20.9c-1.8 0-3.55-.5-5.07-1.45l-.36-.21-3.4.89.91-3.31-.23-.38a9.43 9.43 0 1 1 8.15 4.46Zm5.17-7.06c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.17.19-.33.21-.61.07-.28-.14-1.18-.44-2.25-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.12.28-.33.42-.49.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.49.07-.75.35-.26.28-.99.96-.99 2.35 0 1.38 1.01 2.72 1.15 2.91.14.19 1.99 3.04 4.82 4.26.67.29 1.2.46 1.61.59.68.22 1.3.19 1.79.12.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.23.16-1.34-.07-.12-.26-.19-.54-.33Z" />
    </svg>
  );
}
