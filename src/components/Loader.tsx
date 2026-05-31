import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 2400;
    const id = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / duration);
      setProgress(Math.floor(t * 100));
      if (t >= 1) {
        clearInterval(id);
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 700);
        }, 250);
      }
    }, 30);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <div className="absolute inset-0 bg-hex opacity-40" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />

          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <LogoMark className="h-32 w-32" glow />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="font-display text-2xl font-semibold tracking-[0.35em] text-gradient-brand">
                AA CODE
              </div>
              <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Digital Engineering Studio
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-4 flex w-72 flex-col items-center gap-3"
            >
              <div className="h-px w-full overflow-hidden bg-border">
                <div
                  className="h-full bg-brand transition-[width] duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex w-full justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>Initializing Experience</span>
                <span>{progress.toString().padStart(3, "0")}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
