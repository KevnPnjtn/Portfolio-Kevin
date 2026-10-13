"use client";

import Image from "next/image";
import {
    MotionConfig,
    motion,
    type Variants,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

import TextType from "@/components/ui/TextType";

const paragraphs = [
    "I'm an Informatics Engineering graduate with a passion for building practical digital solutions through web and mobile development. I enjoy turning ideas into functional applications, from designing user experiences to developing reliable features that solve real-world needs.",
    "Through academic projects, internships, and team-based development, I've gained experience working across different stages of the development process. I enjoy collaborating with others, taking on challenges, and continuously learning new technologies to improve how I build and solve problems.",
];

const details = [
    {
        label: "Focus",
        value: "Web & Mobile Development",
    },
    {
        label: "Education",
        value: "Informatics Engineering",
    },
    {
        label: "Based in",
        value: "Batam, Indonesia",
    },
];

const detailsContainerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
};

const detailVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 14,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export function About() {
    return (
        <MotionConfig reducedMotion="user">
            <section
                id="about"
                aria-labelledby="about-heading"
                className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
            >
                {/* Background glow */}

                <div
                    aria-hidden
                    className="pointer-events-none absolute left-[10%] top-1/2 -z-10 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-blue-500/[0.025] blur-[130px]"
                />

                <div
                    aria-hidden
                    className="pointer-events-none absolute right-[8%] top-[20%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-500/[0.02] blur-[120px]"
                />

                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
                    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20 xl:gap-28">
                        {/* LEFT — CODE IMAGE */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -40,
                                scale: 0.97,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                                scale: 1,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                            className="relative mx-auto w-full max-w-xl"
                        >
                            <div
                                aria-hidden
                                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.055] blur-[110px]"
                            />

                            <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#09090b]">
                                {/* Editor title bar */}

                                <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3">
                                    <span
                                        aria-hidden
                                        className="size-2.5 rounded-full bg-white/20"
                                    />

                                    <span
                                        aria-hidden
                                        className="size-2.5 rounded-full bg-white/20"
                                    />

                                    <span
                                        aria-hidden
                                        className="size-2.5 rounded-full bg-white/20"
                                    />

                                    <span className="ml-3 font-mono text-[11px] text-white/45">
                                        about-me.tsx
                                    </span>
                                </div>

                                {/* Image */}

                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src="/photo/code.webp"
                                        alt="Code editor showing a programming workspace"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover grayscale-[15%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                    />

                                    <div
                                        aria-hidden
                                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090b]/70 via-transparent to-transparent"
                                    />
                                </div>

                                {/* Editor status bar */}

                                <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-3">
                                    <span className="flex items-center gap-2 font-mono text-[11px] text-white/50">
                                        <span
                                            aria-hidden
                                            className="size-1.5 rounded-full bg-violet-400"
                                        />
                                        building & learning
                                    </span>

                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT — ABOUT CONTENT */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 40,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.08,
                                ease: "easeOut",
                            }}
                            className="flex max-w-2xl flex-col justify-center"
                        >
                            {/* Eyebrow */}

                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    duration: 0.5,
                                }}
                                className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60"
                            >
                                Who I am
                            </motion.p>

                            {/* Heading */}

                            <h2
                                id="about-heading"
                                className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
                            >
                                About{" "}
                                <TextType
                                    text="Me"
                                    as="span"
                                    typingSpeed={75}
                                    initialDelay={150}
                                    loop={false}
                                    showCursor={true}
                                    cursorCharacter="_"
                                    cursorBlink={true}
                                    cursorBlinkDuration={0.5}
                                    startOnVisible={true}
                                    cursorClassName="text-type-cursor"
                                    className="text-white"
                                />
                            </h2>

                            {/* Description */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 14,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.1,
                                    ease: "easeOut",
                                }}
                                className="mt-7 space-y-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
                            >
                                {paragraphs.map((paragraph) => (
                                    <p
                                        key={paragraph}
                                        className="text-justify"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </motion.div>

                            {/* Personal details */}

                            <motion.div
                                initial="hidden"
                                whileInView="show"
                                viewport={{
                                    once: true,
                                    amount: 0.25,
                                }}
                                variants={detailsContainerVariants}
                                className="mt-9 grid gap-5 border-t border-white/[0.08] pt-7 sm:grid-cols-3"
                            >
                                {details.map((detail) => (
                                    <motion.div
                                        key={detail.label}
                                        variants={detailVariants}
                                    >
                                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60">
                                            {detail.label}
                                        </p>

                                        <p className="mt-2 text-sm font-medium leading-5 text-foreground/90">
                                            {detail.value}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Experience link */}

                            <motion.a
                                href="#experience"
                                initial={{
                                    opacity: 0,
                                    y: 8,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.25,
                                }}
                                whileHover={{
                                    x: 4,
                                }}
                                className="focus-ring group mt-8 inline-flex items-center gap-2 self-start text-sm font-medium text-foreground"
                            >
                                More about my experience

                                <ArrowUpRight
                                    className="size-4 text-blue-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    aria-hidden
                                />
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </MotionConfig>
    );
}
