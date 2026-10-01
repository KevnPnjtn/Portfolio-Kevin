"use client";

import Image from "next/image";
import { useState } from "react";
import { MotionConfig, motion, type Variants } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { siteConfig } from "@/data/site";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function Hero() {
  const { t } = useLanguage();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="home"
        aria-labelledby="hero-heading"
        className="relative isolate flex min-h-svh flex-col overflow-hidden"
      >
        <div
          aria-hidden
          className="bg-dot-grid pointer-events-none absolute inset-0 -z-10"
        />

        <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 pb-6 pt-28 sm:px-6 lg:pt-24">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            {/* Left: copy */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-col items-start"
            >
              <motion.p
                variants={item}
                className="flex items-center gap-3 text-base text-muted-foreground"
              >
                <span
                  aria-hidden
                  className="h-px w-8 bg-linear-to-r from-blue-500 to-violet-500"
                />
                {t.hero.greeting}
              </motion.p>

              <motion.h1
                id="hero-heading"
                variants={item}
                className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                <span className="block">Kevin Reynaldi</span>

                <span className="block bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text pb-[0.12em] text-transparent dark:from-blue-400 dark:to-violet-400">
                  Panjaitan
                </span>
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-4 text-lg font-medium text-foreground/90 sm:text-xl"
              >
                {t.hero.role}
              </motion.p>

              <motion.p
                variants={item}
                className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {t.hero.description}
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={item}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="focus-ring group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background"
                >
                  {t.hero.viewProjects}

                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </motion.a>

                <motion.a
                  href={siteConfig.cvPath}
                  download
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-violet-500/50"
                >
                  <Download className="size-4" aria-hidden />
                  {t.hero.downloadCv}
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right: profile visual */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: "easeOut",
              }}
              className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
            >
              <div
                aria-hidden
                className="absolute -inset-8 -z-10 rounded-[3rem] bg-linear-to-br from-blue-500/15 via-transparent to-violet-500/15 blur-3xl"
              />

              <div
                aria-hidden
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border border-blue-500/30 dark:border-violet-400/30"
              />

              <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-border bg-card">
                {imageFailed ? (
                  <div
                    aria-hidden
                    className="flex size-full items-center justify-center text-6xl font-semibold tracking-tight text-muted-foreground/40"
                  >
                    KRP
                  </div>
                ) : (
                  <Image
                    src={siteConfig.profileImage}
                    alt={t.hero.profileAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 448px, (min-width: 640px) 384px, 320px"
                    className="object-cover"
                    onError={() => setImageFailed(true)}
                  />
                )}

                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-5 left-3 sm:-left-6"
              >
                <div className="flex items-center gap-2.5 rounded-full border border-border bg-background/90 px-4 py-2.5 text-sm font-medium shadow-lg backdrop-blur">
                  <span
                    aria-hidden
                    className="size-2 rounded-full bg-linear-to-r from-blue-500 to-violet-500"
                  />

                  {t.hero.badge}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-8 pt-10">
          <a
            href="#about"
            className="focus-ring flex flex-col items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.hero.scrollDown}

            <span
              aria-hidden
              className="flex h-8 w-5 justify-center rounded-full border border-current pt-1.5"
            >
              <motion.span
                className="block h-1.5 w-0.5 rounded-full bg-current"
                animate={{
                  y: [0, 10, 0],
                  opacity: [1, 0.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </a>
        </div>
      </section>
    </MotionConfig>
  );
}