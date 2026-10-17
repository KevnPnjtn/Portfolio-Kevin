"use client";

import { MotionConfig, motion, type Variants } from "motion/react";
import {
    siBootstrap,
    siCss,
    siDart,
    siFigma,
    siFirebase,
    siFlutter,
    siGit,
    siGithub,
    siHtml5,
    siJavascript,
    siLaravel,
    siMysql,
    siPostgresql,
    siNextdotjs,
    siPhp,
    siSharp,
    siPostman,
    siReact,
    siSupabase,
    siTailwindcss,
    siTypescript,
    type SimpleIcon,
} from "simple-icons";
import { CodeXml, Database, Webhook, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";


type CategoryId = "languages" | "frontend" | "backend" | "database" | "tools";

type TechIcon =
    | { kind: "brand"; icon: SimpleIcon }
    | { kind: "generic"; icon: LucideIcon };

const brand = (icon: SimpleIcon): TechIcon => ({ kind: "brand", icon });
const generic = (icon: LucideIcon): TechIcon => ({ kind: "generic", icon });

type Tech = {
    name: string;
    icon?: TechIcon;
    featured?: boolean;
};

type Category = {
    id: CategoryId;
    items: readonly Tech[];
};

// Technology names are proper nouns, so they are not translated.
// Only the section copy and category titles come from the i18n dictionary.
const categories: readonly Category[] = [
    {
        id: "languages",
        items: [
            { name: "TypeScript", icon: brand(siTypescript), featured: true },
            { name: "JavaScript", icon: brand(siJavascript) },
            { name: "C#", icon: brand(siSharp) },
            { name: "PHP", icon: brand(siPhp) },
            { name: "Dart", icon: brand(siDart) },
            { name: "HTML", icon: brand(siHtml5) },
            { name: "CSS", icon: brand(siCss) },
        ],
    },
    {
        id: "frontend",
        items: [
            { name: "React.js", icon: brand(siReact), featured: true },
            { name: "Next.js", icon: brand(siNextdotjs), featured: true },
            { name: "Flutter", icon: brand(siFlutter), featured: true },
            { name: "Tailwind CSS", icon: brand(siTailwindcss) },
            { name: "Bootstrap", icon: brand(siBootstrap) },
        ],
    },
    {
        id: "backend",
        items: [
            { name: "Laravel", icon: brand(siLaravel), featured: true },
            { name: "REST APIs", icon: generic(Webhook) },
            { name: "Firebase", icon: brand(siFirebase) },
        ],
    },
    {
        id: "database",
        items: [
            { name: "MySQL", icon: brand(siMysql), featured: true },
            { name: "PostgreSQL", icon: brand(siPostgresql), featured: true },
            { name: "Supabase", icon: brand(siSupabase) },
            { name: "Cloud Firestore", icon: generic(Database) },
        ],
    },
    {
        id: "tools",
        items: [
            { name: "Git", icon: brand(siGit) },
            { name: "GitHub", icon: brand(siGithub) },
            { name: "Postman", icon: brand(siPostman) },
            { name: "Figma", icon: brand(siFigma) },
            { name: "VS Code", icon: generic(CodeXml) },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*  Logos                                                                     */
/* -------------------------------------------------------------------------- */

// Brand colors are used only when they stay readable on the near-black page
// background (WCAG non-text contrast, 3:1). Darker brands (Next.js, GitHub,
// Flutter, CSS) fall back to one neutral color so the row stays consistent.
const PAGE_BACKGROUND = "09090b";
const MIN_CONTRAST = 3;

function relativeLuminance(hex: string) {
    const value = parseInt(hex, 16);
    const channel = (shift: number) => {
        const c = ((value >> shift) & 255) / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(16) + 0.7152 * channel(8) + 0.0722 * channel(0);
}

function readableBrandColor(hex: string): string | null {
    const a = relativeLuminance(hex);
    const b = relativeLuminance(PAGE_BACKGROUND);
    const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    return ratio >= MIN_CONTRAST ? `#${hex}` : null;
}

function TechLogo({ icon }: { icon: TechIcon }) {
    if (icon.kind === "generic") {
        const Icon = icon.icon;
        return (
            <Icon
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground"
                strokeWidth={1.75}
            />
        );
    }

    const color = readableBrandColor(icon.icon.hex);

    return (
        <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className={cn("size-4 shrink-0", !color && "text-foreground/80")}
            fill={color ?? "currentColor"}
        >
            <path d={icon.icon.path} />
        </svg>
    );
}

/* -------------------------------------------------------------------------- */
/*  Motion                                                                    */
/* -------------------------------------------------------------------------- */

const reveal = (delay = 0, y = 14) => ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const listVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const rowVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export function Skills() {
    const { t } = useLanguage();

    return (
        <MotionConfig reducedMotion="user">
            <section
                id="skills"
                aria-labelledby="skills-heading"
                className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
            >
                {/* BACKGROUND */}

                <div
                    aria-hidden
                    className="pointer-events-none absolute right-[12%] top-1/3 -z-10 h-[380px] w-[380px] rounded-full bg-violet-500/[0.025] blur-[130px]"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-[6%] top-[55%] -z-10 h-[320px] w-[320px] rounded-full bg-blue-500/[0.025] blur-[120px]"
                />

                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 xl:gap-28">
                        {/* INTRO */}

                        <div className="max-w-xl lg:sticky lg:top-28 lg:self-start">
                            <motion.p
                                {...reveal(0, 10)}
                                className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50"
                            >
                                {t.skills.eyebrow}
                            </motion.p>

                            <motion.h2
                                id="skills-heading"
                                {...reveal(0.08)}
                                className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
                            >
                                {t.skills.title}{" "}
                                <span className="bg-linear-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                                    {t.skills.titleAccent}
                                </span>
                            </motion.h2>

                            <motion.p
                                {...reveal(0.16)}
                                className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
                            >
                                {t.skills.description}
                            </motion.p>

                            <motion.p
                                {...reveal(0.24, 8)}
                                className="mt-6 flex items-center gap-2.5 text-sm text-muted-foreground/70"
                            >
                                <span
                                    aria-hidden
                                    className="inline-block h-5 w-9 shrink-0 rounded-full border border-blue-500/30 bg-blue-500/[0.06]"
                                />
                                {t.skills.highlightNote}
                            </motion.p>
                        </div>

                        {/* CATEGORIES */}

                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={listVariants}
                            className="border-b border-white/[0.08]"
                        >
                            {categories.map((category) => (
                                <motion.div
                                    key={category.id}
                                    variants={rowVariants}
                                    className="grid gap-4 border-t border-white/[0.08] py-6 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-8"
                                >
                                    <h3 className="font-mono text-[11px] uppercase leading-5 tracking-[0.16em] text-muted-foreground/70 sm:pt-1.5">
                                        {t.skills.categories[category.id]}
                                    </h3>

                                    <ul className="flex flex-wrap gap-2">
                                        {category.items.map((tech) => (
                                            <li
                                                key={tech.name}
                                                className={cn(
                                                    "inline-flex cursor-default select-none items-center gap-2 rounded-full border py-1.5 pr-3.5 text-sm transition-colors duration-200",
                                                    tech.icon ? "pl-3" : "pl-3.5",
                                                    tech.featured
                                                        ? "border-blue-500/30 bg-blue-500/[0.06] font-medium text-foreground hover:border-blue-400/50 hover:bg-blue-500/10"
                                                        : "border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:border-white/[0.18] hover:text-foreground",
                                                )}
                                            >
                                                {tech.icon && <TechLogo icon={tech.icon} />}
                                                {tech.name}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </MotionConfig>
    );
}