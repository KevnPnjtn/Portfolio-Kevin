"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Award,
    Check,
    ExternalLink,
    FolderOpen,
    X,
} from "lucide-react";
import {
    siBootstrap, siCss, siDart, siFigma, siFirebase, siFlutter, siGit, siGithub, siHtml5, siJavascript, siLaravel, siMysql, siPostgresql, siNextdotjs,
    siPhp, siSharp, siPostman, siReact, siSupabase, siTailwindcss, siTypescript,
    type SimpleIcon,
} from "simple-icons";

import { projects, type Project } from "@/data/projects";
import { certificates, type Certificate } from "@/data/certificates";
import { portfolioContent } from "@/data/portfolio-content";

const INITIAL_ITEMS = 6;
const ITEMS_PER_LOAD = 6;

type ActiveFilter = "all" | "projects" | "certificates";
type PortfolioItem =
    | { type: "project"; id: string; data: Project }
    | { type: "certificate"; id: string; data: Certificate };

const technologyIcons: Record<string, SimpleIcon> = {
    Bootstrap: siBootstrap,
    CSS: siCss,
    Dart: siDart,
    Figma: siFigma,
    Firebase: siFirebase,
    Flutter: siFlutter,
    Git: siGit,
    GitHub: siGithub,
    HTML: siHtml5,
    HTML5: siHtml5,
    JavaScript: siJavascript,
    Laravel: siLaravel,
    MySQL: siMysql,
    PostgreSQL: siPostgresql,
    "Next.js": siNextdotjs,
    PHP: siPhp,
    "C#": siSharp,
    Postman: siPostman,
    React: siReact,
    "React.js": siReact,
    Supabase: siSupabase,
    "Tailwind CSS": siTailwindcss,
    Tailwind: siTailwindcss,
    TypeScript: siTypescript,
};

function TechnologyIcon({ name }: { name: string }) {
    const icon = technologyIcons[name];

    if (!icon) return null;

    return (
        <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className="size-3.5 shrink-0"
            fill={`#${icon.hex}`}
        >
            <path d={icon.path} />
        </svg>
    );
}

/* --------------------------------------------------
   PROJECT PREVIEW
-------------------------------------------------- */

function ProjectPreview({
    src,
    title,
    sizes = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
}: {
    src?: string;
    title: string;
    sizes?: string;
}) {
    const [imageFailed, setImageFailed] = useState(false);

    if (!src || imageFailed) {
        return (
            <div
                role="img"
                aria-label={`${title} image placeholder`}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/15 via-blue-500/10 to-[#101016]"
            >
                <div className="flex flex-col items-center gap-3 text-white/35">
                    <FolderOpen size={34} strokeWidth={1.25} />
                    <span className="text-[10px] uppercase tracking-[0.22em]">
                        Pratinjau Proyek
                    </span>
                </div>
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={`${title} screenshot`}
            fill
            sizes={sizes}
            className="object-contain"
            onError={() => setImageFailed(true)}
        />
    );
}

/* --------------------------------------------------
   CERTIFICATE PREVIEW
-------------------------------------------------- */

function SertifikatPreview({
    src,
    title,
    sizes = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
}: {
    src?: string;
    title: string;
    sizes?: string;
}) {
    const [imageFailed, setImageFailed] = useState(false);

    if (!src || imageFailed) {
        return (
            <div
                role="img"
                aria-label={`${title} certificate image placeholder`}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/15 via-blue-500/10 to-[#101016]"
            >
                <div className="flex flex-col items-center gap-3 text-white/35">
                    <Award size={34} strokeWidth={1.25} />
                    <span className="text-[10px] uppercase tracking-[0.22em]">
                        Pratinjau Sertifikat
                    </span>
                </div>
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={`Sertifikat: ${title}`}
            fill
            sizes={sizes}
            className="object-contain"
            onError={() => setImageFailed(true)}
        />
    );
}

/* --------------------------------------------------
   PROJECT MODAL
-------------------------------------------------- */

function ProjectModal({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) {
    const images = project.images.length ? project.images : [""];
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        const previousPaddingRight = document.body.style.paddingRight;

        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = "hidden";

        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.overflow = previousOverflow;
            document.body.style.paddingRight = previousPaddingRight;
        };
    }, []);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }

            if (event.key === "ArrowLeft") {
                setActiveImage(
                    (current) =>
                        (current - 1 + images.length) % images.length,
                );
            }

            if (event.key === "ArrowRight") {
                setActiveImage((current) => (current + 1) % images.length);
            }
        },
        [images.length, onClose],
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    const changeImage = (direction: -1 | 1) => {
        setActiveImage(
            (current) =>
                (current + direction + images.length) % images.length,
        );
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
            role="presentation"
        >
            <motion.section
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-dialog-title"
                className="relative flex max-h-[94dvh] w-full max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10] shadow-2xl shadow-black/50 sm:rounded-3xl"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.22 }}
            >
                <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
                    <div className="flex min-w-0 items-center gap-2 text-xs text-white/45">
                        <span>PROYEK</span>
                        <span>/</span>
                        <span className="truncate text-white/80">
                            {project.title}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup detail proyek"
                        autoFocus
                        className="ml-3 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto">
                    <div className="grid md:grid-cols-[1.2fr_0.8fr]">
                        <div className="border-b border-white/10 p-4 sm:p-6 md:border-r md:border-b-0">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#111118] sm:rounded-2xl">
                                <ProjectPreview
                                    src={images[activeImage]}
                                    title={project.title}
                                    sizes="(max-width: 767px) 100vw, (max-width: 1499px) 60vw, 900px"
                                />

                                {images.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => changeImage(-1)}
                                            aria-label="Gambar sebelumnya"
                                            className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-blue-400"
                                        >
                                            <ArrowLeft size={18} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => changeImage(1)}
                                            aria-label="Gambar berikutnya"
                                            className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-blue-400"
                                        >
                                            <ArrowRight size={18} />
                                        </button>

                                        <span className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/65 px-3 py-1.5 text-xs text-white/80 backdrop-blur-md">
                                            {activeImage + 1} / {images.length}
                                        </span>
                                    </>
                                )}
                            </div>

                            {images.length > 1 && (
                                <div
                                    className="mt-3 flex gap-2 overflow-x-auto pb-1"
                                    aria-label="Galeri gambar"
                                >
                                    {images.map((src, index) => (
                                        <button
                                            key={`${src}-${index}`}
                                            type="button"
                                            onClick={() => setActiveImage(index)}
                                            aria-label={`Tampilkan gambar ${index + 1}`}
                                            aria-pressed={activeImage === index}
                                            className={`relative size-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border bg-white/5 sm:size-20 ${activeImage === index
                                                ? "border-blue-400"
                                                : "border-white/10 opacity-60 hover:opacity-100"
                                                }`}
                                        >
                                            <ProjectPreview
                                                src={src}
                                                title={project.title}
                                                sizes="80px"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            <p className="mt-4 text-xs text-white/35">
                                Use the arrows or keyboard arrow keys to browse
                                screenshots.
                            </p>
                        </div>

                        <div className="p-5 sm:p-7 md:p-8">
                            <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs text-blue-300">
                                {project.category}
                            </span>

                            <h3
                                id="project-dialog-title"
                                className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                            >
                                {project.title}
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-white/60">
                                {project.description}
                            </p>

                            <div className="mt-7">
                                <h4 className="text-sm font-medium text-white">
                                    Peran dan Kontribusi
                                </h4>
                                <p className="mt-2 text-sm leading-6 text-white/55">
                                    {project.role}
                                </p>
                            </div>

                            {project.features.length > 0 && (
                                <div className="mt-7">
                                    <h4 className="text-sm font-medium text-white">
                                        Fitur Utama
                                    </h4>
                                    <ul className="mt-3 space-y-3">
                                        {project.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-3 text-sm leading-6 text-white/60"
                                            >
                                                <Check
                                                    size={16}
                                                    className="mt-1 shrink-0 text-blue-400"
                                                />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {project.techStack.length > 0 && (
                                <div className="mt-7 pb-5">
                                    <h4 className="text-sm font-medium text-white">
                                        Tech Stack
                                    </h4>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/65"
                                            >
                                                <TechnologyIcon name={tech} />
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {project.links && project.links.length > 0 && (
                                <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-6">

                                    {project.links.map((link) => {
                                        const isGithub =
                                            link.url.toLowerCase().includes("github.com") ||
                                            ["github", "kode", "code"].includes(
                                                link.label.trim().toLowerCase(),
                                            );

                                        return (
                                            <a
                                                key={`${link.label}-${link.url}`}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={
                                                    isGithub
                                                        ? `Lihat kode ${project.title} di GitHub`
                                                        : `Buka ${link.label} untuk ${project.title}`
                                                }
                                                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#08080a] px-3.5 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"                                            >
                                                {isGithub && (
                                                    <svg
                                                        aria-hidden="true"
                                                        viewBox="0 0 24 24"
                                                        className="size-5 shrink-0"
                                                        fill="currentColor"
                                                    >
                                                        <path d={siGithub.path} />
                                                    </svg>
                                                )}

                                                {isGithub ? "Lihat Kode" : link.label}

                                                {!isGithub && <ExternalLink size={15} />}
                                            </a>
                                        );
                                    })}

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.section>
        </motion.div >
    );
}

/* --------------------------------------------------
   CERTIFICATE MODAL
-------------------------------------------------- */

function SertifikatModal({
    certificate,
    onClose,
}: {
    certificate: Certificate;
    onClose: () => void;
}) {

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        const previousPaddingRight = document.body.style.paddingRight;

        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = "hidden";

        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.overflow = previousOverflow;
            document.body.style.paddingRight = previousPaddingRight;
        };
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <motion.section
                role="dialog"
                aria-modal="true"
                aria-labelledby="certificate-dialog-title"
                className="relative max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0b0b10] p-5 shadow-2xl sm:p-8"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Tutup detail sertifikat"
                    className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10"
                >
                    <X size={18} />
                </button>

                <div className="mb-5 flex items-center gap-2 text-xs text-white/45">
                    <span>PORTFOLIO</span>
                    <span>/</span>
                    <span className="text-white/80">CERTIFICATES</span>
                </div>

                <div className="relative mb-6 flex min-h-48 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="relative min-h-[12rem] w-full max-w-full aspect-[12/8]">
                        <SertifikatPreview
                            src={certificate.image}
                            title={certificate.title}
                            sizes="(max-width: 768px) 100vw, 700px"
                        />
                    </div>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs text-blue-300">
                    <Award size={14} />
                    Sertifikat
                </span>

                <h3
                    id="certificate-dialog-title"
                    className="mt-4 pr-8 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                >
                    {certificate.title}
                </h3>

                <p className="mt-2 text-sm text-white/55">
                    {certificate.issuer}
                </p>

                {certificate.period && (
                    <p className="mt-1 text-xs text-white/35">
                        {certificate.period}
                    </p>
                )}

                {certificate.description && (
                    <div className="mt-7">
                        <h4 className="text-sm font-medium text-white">
                            Deskripsi
                        </h4>
                        <p className="mt-2 text-sm leading-7 text-white/60">
                            {certificate.description}
                        </p>
                    </div>
                )}

                {certificate.learnings.length > 0 && (
                    <div className="mt-7">
                        <h4 className="text-sm font-medium text-white">
                            Hal yang Dipelajari
                        </h4>
                        <ul className="mt-3 space-y-3">
                            {certificate.learnings.map((learning) => (
                                <li
                                    key={learning}
                                    className="flex items-start gap-3 text-sm leading-6 text-white/60"
                                >
                                    <Check
                                        size={16}
                                        className="mt-1 shrink-0 text-blue-400"
                                    />
                                    <span>{learning}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {certificate.skills.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                        {certificate.skills.map((skill) => (
                            <span
                                key={skill}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/65"
                            >
                                <TechnologyIcon name={skill} />
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

            </motion.section>
        </motion.div>
    );
}

/* --------------------------------------------------
   PROYEK & CERTIFICATES SECTION
-------------------------------------------------- */

export function Projects() {
    const content = portfolioContent.projects;

    const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );
    const [selectedSertifikat, setSelectedSertifikat] =
        useState<Certificate | null>(null);
    const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");

    const allItems: PortfolioItem[] = [
        ...projects.map((project) => ({
            type: "project" as const,
            id: project.id,
            data: project,
        })),
        ...certificates.map((certificate) => ({
            type: "certificate" as const,
            id: certificate.id,
            data: certificate,
        })),
    ];


    const filteredItems = allItems.filter((item) => {
        if (activeFilter === "all") return true;
        return item.type === (activeFilter === "projects" ? "project" : "certificate");
    });

    const visibleItems = filteredItems.slice(0, visibleCount);
    const hasMore = visibleCount < filteredItems.length;

    const filters: {
        label: string;
        value: ActiveFilter;
        count: number;
    }[] = [
            {
                label: "All",
                value: "all",
                count: allItems.length,
            },
            {
                label: "Proyek",
                value: "projects",
                count: projects.length,
            },
            {
                label: "Sertifikat",
                value: "certificates",
                count: certificates.length,
            },
        ];

    const changeFilter = (filter: ActiveFilter) => {
        setActiveFilter(filter);
        setVisibleCount(INITIAL_ITEMS);
    };

    return (
        <section
            id="projects"
            aria-labelledby="projects-heading"
            className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
        >
            <div className="mx-auto max-w-7xl">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end"
                >
                    <div>
                        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-blue-400">
                            {content.eyebrow}
                        </p>

                        <h2
                            id="projects-heading"
                            className="text-3xl font-semibold tracking-tight text-white sm:text-5xl"
                        >
                            {content.heading}
                            <span className="text-blue-400">.</span>
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                            {content.description}
                        </p>
                    </div>

                    <p className="text-sm text-white/40" aria-live="polite">
                        Menampilkan {visibleItems.length} dari {filteredItems.length} item
                    </p>
                </motion.div>

                {/* Filter buttons */}
                <div className="mb-8 flex flex-wrap items-center gap-2 sm:mb-10">
                    {filters.map((filter) => {
                        const isActive = activeFilter === filter.value;

                        return (
                            <button
                                key={filter.value}
                                type="button"
                                onClick={() => changeFilter(filter.value)}
                                aria-pressed={isActive}
                                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${isActive
                                    ? "border-blue-400/40 bg-blue-500/15 text-blue-200"
                                    : "border-white/10 bg-white/[0.025] text-white/55 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                                    }`}
                            >
                                {filter.value === "certificates" && (
                                    <Award size={15} />
                                )}

                                {filter.label}

                                <span
                                    className={`rounded-full px-2 py-0.5 text-[11px] ${isActive
                                        ? "bg-blue-400/15 text-blue-200"
                                        : "bg-white/[0.06] text-white/45"
                                        }`}
                                >
                                    {filter.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Unified projects + certificates grid */}
                {visibleItems.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        <AnimatePresence initial={false} mode="popLayout">
                            {visibleItems.map((item, index) => {

                                if (item.type === "project") {
                                    const project = item.data;

                                    const githubLinks = (project.links ?? []).filter((link) => {
                                        const label = link.label.trim().toLowerCase();

                                        return (
                                            link.url.toLowerCase().includes("github.com") ||
                                            ["github", "kode", "code", "frontend", "backend"].includes(label)
                                        );
                                    });

                                    return (
                                        <motion.article
                                            key={`project-${project.id}`}
                                            initial={{ opacity: 0, y: 18 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 12 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: Math.min(index % ITEMS_PER_LOAD, 5) * 0.04,
                                            }}
                                            whileHover={{ y: -5 }}
                                            className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101014] transition-colors duration-300 hover:border-blue-400/30 sm:rounded-3xl"
                                        >
                                            {/* Project image */}
                                            <button
                                                type="button"
                                                onClick={() => setSelectedProject(project)}
                                                aria-label={`Lihat detail proyek ${project.title}`}
                                                className="group relative block aspect-[16/10] w-full shrink-0 cursor-pointer overflow-hidden bg-[#111118] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-blue-400"
                                            >
                                                <ProjectPreview
                                                    src={project.images[0]}
                                                    title={project.title}
                                                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                                />

                                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                                                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-blue-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                                                    {project.category}
                                                </span>

                                                {project.year && (
                                                    <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs text-white/90 backdrop-blur-md">
                                                        {project.year}
                                                    </span>
                                                )}

                                                <span className="absolute bottom-4 right-4 flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition group-hover:border-blue-400/40 group-hover:bg-blue-500/20 group-hover:text-blue-200">
                                                    <ArrowUpRight size={17} />
                                                </span>
                                            </button>

                                            {/* Project content */}
                                            <div className="flex flex-1 flex-col px-5 pt-5 sm:px-6 sm:pt-6">
                                                <div className="flex items-start justify-between gap-3">
                                                    <h3 className="line-clamp-2 min-w-0 text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
                                                        {project.title}
                                                    </h3>

                                                    <span className="shrink-0 pt-1 text-xs tabular-nums text-white/35">
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>
                                                </div>

                                                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/55">
                                                    {project.shortDescription}
                                                </p>

                                                {/* Bottom block: Tech stack + divider + footer, selalu menempel ke dasar kartu */}
                                                <div className="mt-auto pt-5">
                                                    {/* Tech stack: selalu dirender agar tinggi baris konsisten */}
                                                    <div className="flex min-h-7 flex-wrap content-start items-center gap-2">
                                                        {project.techStack.slice(0, 3).map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.035] px-2.5 text-[11px] leading-none text-white/70"
                                                            >
                                                                <TechnologyIcon name={tech} />
                                                                {tech}
                                                            </span>
                                                        ))}

                                                        {project.techStack.length > 3 && (
                                                            <span className="inline-flex h-7 items-center rounded-full border border-white/[0.08] px-2.5 text-[11px] leading-none text-white/45">
                                                                +{project.techStack.length - 3}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Divider + footer */}
                                                    <div className="mt-5 flex min-h-[64px] items-center justify-between gap-3 border-t border-white/15">
                                                        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                                                            {githubLinks.length > 0 ? (
                                                                githubLinks.map((link) => (
                                                                    <a
                                                                        key={`${link.label}-${link.url}`}
                                                                        href={link.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="inline-flex items-center gap-2 text-sm font-medium text-white/75 transition hover:text-white"
                                                                    >
                                                                        <svg
                                                                            aria-hidden="true"
                                                                            viewBox="0 0 24 24"
                                                                            className="size-5 shrink-0"
                                                                            fill="#F4F4F5"
                                                                        >
                                                                            <path d={siGithub.path} />
                                                                        </svg>
                                                                        {link.label}
                                                                    </a>
                                                                ))
                                                            ) : (
                                                                <span className="text-xs text-white/35">
                                                                    Repository belum tersedia
                                                                </span>
                                                            )}
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedProject(project)}
                                                            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-sm font-medium text-blue-300 transition hover:text-blue-200"
                                                        >
                                                            Detail
                                                            <ArrowUpRight size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.article>
                                    );
                                }


                                const certificate = item.data;

                                return (
                                    <motion.button
                                        key={`certificate-${certificate.id}`}
                                        type="button"
                                        onClick={() => setSelectedSertifikat(certificate)}
                                        aria-label={`Lihat sertifikat: ${certificate.title}`}
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 12 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: Math.min(index % ITEMS_PER_LOAD, 5) * 0.04,
                                        }}
                                        whileHover={{ y: -5 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="group cursor-pointer overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] text-left transition-colors duration-300 hover:border-blue-400/30 hover:bg-white/[0.045] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 sm:rounded-3xl"
                                    >
                                        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-white/[0.06] bg-[#111118] p-4">
                                            <SertifikatPreview
                                                src={certificate.image}
                                                title={certificate.title}
                                                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                            />

                                            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-[#0b0b10]/85 px-3 py-1.5 text-xs text-blue-200 backdrop-blur-md">
                                                <Award size={13} />
                                                Sertifikat
                                            </span>

                                            <span className="absolute bottom-4 right-4 flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition group-hover:border-blue-400/40 group-hover:bg-blue-500/20">
                                                <ArrowUpRight size={17} />
                                            </span>
                                        </div>

                                        <div className="p-5 sm:p-6">
                                            <h3 className="line-clamp-2 text-lg font-medium leading-snug tracking-tight text-white sm:text-xl">
                                                {certificate.title}
                                            </h3>

                                            <p className="mt-2 text-sm text-white/55">
                                                {certificate.issuer}
                                            </p>

                                            {certificate.period && (
                                                <p className="mt-1 text-xs text-white/35">
                                                    {certificate.period}
                                                </p>
                                            )}

                                            {certificate.skills.length > 0 && (
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {certificate.skills
                                                        .slice(0, 3)
                                                        .map((skill) => (
                                                            <span
                                                                key={skill}
                                                                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 text-[11px] text-white/65"
                                                            >
                                                                <TechnologyIcon name={skill} />
                                                                {skill}
                                                            </span>
                                                        ))}

                                                    {certificate.skills.length > 3 && (
                                                        <span className="px-1 py-1 text-[11px] text-white/40">
                                                            +{certificate.skills.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            <div className="mt-5 flex items-center gap-2 text-sm text-blue-300/80 transition-colors group-hover:text-blue-300">
                                                Lihat Sertifikat
                                                <ArrowUpRight size={15} />
                                            </div>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                ) : (
                    <p className="rounded-2xl border border-white/10 p-8 text-center text-sm text-white/50">
                        {activeFilter === "projects"
                            ? "Proyek akan ditampilkan di sini."
                            : activeFilter === "certificates"
                                ? "Sertifikat will appear here once added."
                                : "Konten portofolio akan ditampilkan di sini."}
                    </p>
                )}

                {/* One Muat Lebih Banyak button for the active filter */}
                {hasMore && (
                    <div className="mt-10 flex justify-center sm:mt-12">
                        <button
                            type="button"
                            onClick={() =>
                                setVisibleCount((count) =>
                                    Math.min(
                                        count + ITEMS_PER_LOAD,
                                        filteredItems.length,
                                    ),
                                )
                            }
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-white/75 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
                        >
                            Muat Lebih Banyak
                            <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        key={selectedProject.id}
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedSertifikat && (
                    <SertifikatModal
                        key={selectedSertifikat.id}
                        certificate={selectedSertifikat}
                        onClose={() => setSelectedSertifikat(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
