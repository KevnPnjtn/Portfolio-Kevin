"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export const LOADER_DONE_EVENT = "loader-done";

const LOADER_DURATION = 1200;

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const animate = (time: number) => {
      const elapsed = time - start;
      const rawProgress = Math.min(elapsed / LOADER_DURATION, 1);

      // Ease-out cubic
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);

      setProgress(Math.round(easedProgress * 100));

      if (rawProgress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        window.dispatchEvent(new Event(LOADER_DONE_EVENT));

        setTimeout(() => {
          setVisible(false);
        }, 150);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.35,
              ease: "easeInOut",
            },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
          aria-label="Loading portfolio"
          role="status"
        >
          {/* Background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.12, 0.2, 0.12],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.3),transparent_70%)]"
            />

            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.08, 0.15, 0.08],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-[30%] top-[20%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.25),transparent_70%)]"
            />
          </div>

          <div className="relative flex w-full max-w-xs flex-col items-center px-6">
            {/* Compass */}
            <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-border/60 border-dashed"
              />

              {/* Inner rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-4 rounded-full border border-primary/20"
              />

              {/* Compass directions */}
              <span className="absolute top-0 text-[10px] font-semibold tracking-widest text-primary">
                N
              </span>

              <span className="absolute right-0 text-[10px] font-semibold tracking-widest text-muted-foreground">
                E
              </span>

              <span className="absolute bottom-0 text-[10px] font-semibold tracking-widest text-muted-foreground">
                S
              </span>

              <span className="absolute left-0 text-[10px] font-semibold tracking-widest text-muted-foreground">
                W
              </span>

              {/* Compass needle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-7"
              >
                <div className="absolute left-1/2 top-0 h-1/2 w-px origin-bottom -translate-x-1/2 bg-gradient-to-t from-primary/40 to-primary" />

                <div className="absolute bottom-0 left-1/2 h-1/2 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-accent/70 to-transparent" />
              </motion.div>

              {/* Center K */}
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background shadow-lg shadow-primary/20"
              >
                <span className="bg-gradient-to-br from-primary to-violet-400 bg-clip-text text-lg font-bold text-transparent">
                  K
                </span>
              </motion.div>

              {/* Pulse ring */}
              <motion.div
                animate={{
                  scale: [1, 1.35],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute h-12 w-12 rounded-full border border-primary/40"
              />
            </div>

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1,
              }}
              className="mb-6 text-center"
            >
              <p className="text-sm font-medium tracking-[0.25em] text-foreground">
                KEVIN
              </p>

              <p className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground">
                WEB & MOBILE DEVELOPER
              </p>
            </motion.div>

            {/* Progress */}
            <div className="w-full">
              <div className="mb-2 flex items-center justify-between text-[10px] font-medium">
                <span className="text-muted-foreground">
                  Initializing
                </span>

                <motion.span
                  key={progress}
                  className="font-mono text-primary"
                >
                  {progress}%
                </motion.span>
              </div>

              <div className="relative h-px w-full overflow-hidden bg-border">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-violet-400 to-primary"
                  style={{
                    width: `${progress}%`,
                  }}
                />

                <motion.div
                  animate={{
                    x: ["-100%", "300%"],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            </div>

            {/* Loading dots */}
            <div className="mt-5 flex gap-1.5">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  animate={{
                    opacity: [0.25, 1, 0.25],
                    scale: [1, 1.25, 1],
                  }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: dot * 0.15,
                    ease: "easeInOut",
                  }}
                  className="h-1 w-1 rounded-full bg-primary"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}