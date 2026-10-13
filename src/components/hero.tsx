"use client";

import { useCallback, useState } from "react";

import {
  motion,
  MotionConfig,
  type Variants,
} from "motion/react";
import { ArrowRight, Download } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import ProfileCard from "@/components/ui/ProfileCard";
import ScrollExpand from "@/components/ui/ScrollExpand";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import TextType from "@/components/ui/TextType";
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
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

export function Hero() {
  const { t } = useLanguage();

  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const firstLine = "Hello, I'm Kevin";

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="home"
        aria-labelledby="hero-heading"
        className="relative overflow-hidden"
      >
        {/* SCROLL EXPAND OPENING */}

        <ScrollExpand
          title="Building ideas into digital experiences"
          scrollHint="Scroll to explore"
          startWidth={72}
          startHeight={48}
          startRadius={28}
          endRadius={0}
          scrollDistance={0.10}
          smoothing={0.14}
          enabled={true}
          onExpand={handleExpand}
        >
          {/* FULL HERO */}

          <div className="relative flex h-full w-full items-center overflow-hidden">
            {/* BACKGROUND */}

            <div
              aria-hidden
              className="bg-dot-grid pointer-events-none absolute inset-0 -z-10 opacity-25"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute left-[68%] top-[45%] -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.035] blur-[150px]"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute left-[78%] top-[60%] -z-10 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.025] blur-[130px]"
            />

            {/* HERO CONTAINER */}

            <div className="mx-auto flex w-full max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-10">
              <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_440px] xl:grid-cols-[minmax(0,1fr)_500px] xl:gap-16">

                {/* LEFT — TEXT */}

                <motion.div
                  variants={container}
                  initial="hidden"
                  animate={isExpanded ? "show" : "hidden"}
                  className="flex min-w-0 flex-col items-start"
                >
                  {/* NAME */}

                  <motion.div variants={item}>
                    <h1
                      id="hero-heading"
                      className="text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[58px] xl:text-[64px]"
                    >
                      {/* First line */}

                      <span className="block whitespace-nowrap">
                        {firstLine}
                      </span>

                      {/* Second line */}

                      <span className="mt-2 block whitespace-nowrap">
                        {isExpanded && (
                          <TextType
                            text="Reynaldi Panjaitan"
                            as="span"
                            typingSpeed={75}
                            initialDelay={150}
                            loop={false}
                            showCursor={true}
                            cursorCharacter="_"
                            cursorBlink={true}
                            cursorBlinkDuration={0.5}
                            cursorClassName="text-type-cursor"
                            className="block whitespace-nowrap"
                          />
                        )}
                      </span>
                    </h1>
                  </motion.div>

                  {/* ROLE */}

                  <motion.p
                    variants={item}
                    className="mt-6 bg-linear-to-r from-blue-500 to-violet-500 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl"
                  >
                    Full Stack Developer
                  </motion.p>

                  {/* DESCRIPTION */}

                  <motion.p
                    variants={item}
                    className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                  >
                    {t.hero.description}
                  </motion.p>

                  {/* CTA */}

                  <motion.div
                    variants={item}
                    className="mt-8 flex flex-wrap items-center gap-3"
                  >
                    {/* View Projects */}

                    <motion.a
                      href="#projects"
                      whileHover={{
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="focus-ring group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-shadow hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)]"
                    >
                      {t.hero.viewProjects}

                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </motion.a>

                  </motion.div>

                  {/* TECHNOLOGY AREAS */}

                  <motion.div
                    variants={item}
                    className="mt-6 flex flex-wrap items-center gap-2"
                  >
                    {[
                      "Web",
                      "Mobile",
                      "API",
                      "Database",
                    ].map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{
                          y: -2,
                        }}
                        className="rounded-full border border-border/80 bg-background/40 px-3 py-1.5 font-mono text-[11px] text-muted-foreground backdrop-blur-sm transition-colors hover:border-blue-500/40 hover:text-foreground"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>

                {/* RIGHT — PROFILE CARD */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 40,
                    scale: 0.96,
                  }}
                  animate={
                    isExpanded
                      ? {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                      }
                      : {
                        opacity: 0,
                        x: 40,
                        scale: 0.96,
                      }
                  }
                  transition={{
                    duration: 0.9,
                    delay: 0.25,
                    ease: "easeOut",
                  }}
                  className="relative mx-auto flex w-full max-w-[500px] justify-center"
                >
                  {/* Blue glow */}

                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.08] blur-[110px]"
                  />

                  {/* Violet glow */}

                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-[58%] top-[55%] -z-10 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[100px]"
                  />

                  <ProfileCard
                    avatarUrl="/photo/potoaku.webp"
                    miniAvatarUrl="/photo/potoaku.webp"
                    iconUrl=""
                    grainUrl=""
                    innerGradient="linear-gradient(145deg, rgba(35, 45, 75, 0.95) 0%, rgba(15, 18, 35, 0.98) 100%)"
                    behindGlowEnabled={true}
                    behindGlowColor="rgba(80, 140, 255, 0.55)"
                    behindGlowSize="55%"
                    enableTilt={true}
                    enableMobileTilt={false}
                    mobileTiltSensitivity={5}
                    name=""
                    title=""
                    handle="kevinpnjtn"
                    status="Available to build"
                    contactText=""
                    showUserInfo={true}
                    onContactClick={() => {
                      window.location.href = `mailto:${siteConfig.email}`;
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollExpand>

        {/* SCROLL VELOCITY */}

        <div className="relative pt-2 pb-3">
          <ScrollVelocity
            texts={[
              "KEVIN REYNALDI PANJAITAN  FULL STACK DEVELOPER",
              "FULL STACK DEVELOPER  KEVIN REYNALDI PANJAITAN",
            ]}
            velocity={35}
            damping={50}
            stiffness={400}
            numCopies={6}
            className="scroll-velocity-text"
          />
        </div>
      </section>
    </MotionConfig>
  );
}