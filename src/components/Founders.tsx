import { SectionLabel } from "./Journey";

export function Founders() {
  return (
    <section id="studio" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>05 / Studio</SectionLabel>
        <div className="mt-4 max-w-3xl">
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Two engineers. One standard:{" "}
            <span className="text-gradient-accent">build software that lasts.</span>
          </h2>
          <p className="mt-6 max-w-lg text-muted-foreground">
            Double A is a focused engineering studio. No layers, no handoffs - you work directly
            with the people writing the code. We commit to long-term partnerships and treat every
            system as if our own business depended on it.
          </p>
        </div>
      </div>
    </section>
  );
}
