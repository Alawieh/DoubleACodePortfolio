import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 2600;
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
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />

          <div className="relative flex flex-col items-center gap-8">
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <motion.polygon
                  points="50,5 90,27 90,73 50,95 10,73 10,27"
                  fill="none"
                  stroke="oklch(0.78 0.14 220)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                />
                <motion.polygon
                  points="50,5 90,27 90,73 50,95 10,73 10,27"
                  fill="oklch(0.78 0.14 220 / 0.06)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                />
              </svg>
              <motion.div
                className="absolute inset-0 flex items-center justify-center font-display text-3xl font-bold tracking-tight text-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                AA
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="font-display text-2xl font-semibold tracking-[0.3em] text-foreground">
                DOUBLE A
              </div>
              <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Digital Engineering Studio
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="mt-4 flex w-64 flex-col items-center gap-3"
            >
              <div className="h-px w-full overflow-hidden bg-border">
                <motion.div
                  className="h-full bg-accent"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
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
