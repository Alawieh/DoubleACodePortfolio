import logo from "@/assets/aa-logo.png";

export function LogoMark({ className = "h-9 w-9", glow = false }: { className?: string; glow?: boolean }) {
  return (
    <span className={`relative inline-block ${className}`}>
      {glow && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-70"
          style={{ background: "var(--gradient-brand)" }}
        />
      )}
      <img
        src={logo}
        alt="Double A"
        className="h-full w-full object-contain"
        style={{ objectPosition: "center 28%", clipPath: "inset(4% 4% 34% 4%)", transform: "scale(1.35)" }}
      />
    </span>
  );
}

/** Pure-SVG version of the hex frame – used for animated/decorative contexts. */
export function HexFrame({
  className = "h-full w-full",
  strokeWidth = 2,
  animated = false,
}: {
  className?: string;
  strokeWidth?: number;
  animated?: boolean;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <defs>
        <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.55 0.24 305)" />
          <stop offset="55%" stopColor="oklch(0.65 0.27 5)" />
          <stop offset="100%" stopColor="oklch(0.78 0.18 55)" />
        </linearGradient>
      </defs>
      <polygon
        points="50,4 91,26 91,74 50,96 9,74 9,26"
        stroke="url(#hexGrad)"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        className={animated ? "animate-spin-slow origin-center" : ""}
        style={animated ? { transformBox: "fill-box", transformOrigin: "center" } : undefined}
      />
    </svg>
  );
}
