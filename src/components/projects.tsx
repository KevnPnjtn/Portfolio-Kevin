
"use client";

import Image from "next/image";
import {
    useCallback,
    useEffect,
    useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Check,
    ExternalLink,
    FolderOpen,
    X,
} from "lucide-react";

import { projects, type Project } from "@/data/projects";
import { portfolioContent } from "@/data/portfolio-content";


const INITIAL_PROJECTS = 6;


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
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/15 via-violet-500/10 to-[#101016]"
            >
                <div className="flex flex-col items-center gap-3 text-white/35">
                    <FolderOpen size={34} strokeWidth={1.25} />
                    <span className="text-[10px] uppercase tracking-[0.22em]">
                        Project Preview
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


const content = portfolioContent.projects;

function ProjectModal({
    project,
    onClose,
    onPrevious,
    onNext,
}: {
    project: Project;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
}) {
    const images = project.images.length
        ? project.images
        : [""];
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        const previouslyFocused = document.activeElement as HTMLElement | null;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
            previouslyFocused?.focus();
        };
    }, []);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
            if (event.key === "ArrowLeft") {
                setActiveImage((current) =>
                    (current - 1 + images.length) % images.length,
                );
            }
            if (event.key === "ArrowRight") {
                setActiveImage((current) =>
                    (current + 1) % images.length,
                );
            }
        },
        [images.length, onClose],
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
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
                className="relative flex max-h-[94dvh] w-full max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10] shadow-2xl shadow-black/50 sm:rounded-3xl" initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.22 }}
            >
                <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
                    <div className="flex min-w-0 items-center gap-2 text-xs text-white/45">
                        <span>PROJECTS</span>
                        <span>/</span>
                        <span className="truncate text-white/80">
                            {project.title}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close project details"
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
                                            aria-label="Previous screenshot"
                                            className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-blue-400"
                                        >
                                            <ArrowLeft size={18} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => changeImage(1)}
                                            aria-label="Next screenshot"
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
                                    aria-label="Screenshot gallery"
                                >
                                    {images.map((src, index) => (
                                        <button
                                            key={`${src}-${index}`}
                                            type="button"
                                            onClick={() => setActiveImage(index)}
                                            aria-label={`Show screenshot ${index + 1}`}
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
                                Use the arrows or keyboard arrow keys to browse screenshots.
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
                                    Role & Contribution
                                </h4>
                                <p className="mt-2 text-sm leading-6 text-white/55">
                                    {project.role}
                                </p>
                            </div>

                            {project.features.length > 0 && (
                                <div className="mt-7">
                                    <h4 className="text-sm font-medium text-white">
                                        Key Features
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
                                <div className="mt-7">
                                    <h4 className="text-sm font-medium text-white">
                                        Tech Stack
                                    </h4>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/65"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {project.links && project.links.length > 0 && (
                                <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                                    {project.links.map((link) => (
                                        <a
                                            key={`${link.label}-${link.url}`}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                                        >
                                            {link.label}
                                            <ExternalLink size={15} />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.section>
        </motion.div>
    );
}

export function Projects() {
    const [visibleCount, setVisibleCount] = useState(INITIAL_PROJECTS);
    const [selectedProject, setSelectedProject] =
        useState<Project | null>(null);

    const visibleProjects = projects.slice(0, visibleCount);
    const hasMore = visibleCount < projects.length;


    return (
        <section
            id="projects"
            aria-labelledby="projects-heading"
            className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
        >
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end"
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

                    <p className="text-sm text-white/40">
                        {content.projectCount
                            .replace("{visible}", String(visibleProjects.length))
                            .replace("{total}", String(projects.length))}
                    </p>
                </motion.div>

                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        <AnimatePresence initial={false}>
                            {visibleProjects.map((project, index) => (
                                <motion.button
                                    key={project.id}
                                    type="button"
                                    onClick={() => setSelectedProject(project)}
                                    aria-label={`Open ${project.title} project details`}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 12 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: Math.min(index % 6, 5) * 0.04,
                                    }}
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="group cursor-pointer overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] text-left transition-colors duration-300 hover:border-blue-400/30 hover:bg-white/[0.045] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 sm:rounded-3xl"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-[#111118]">
                                        <ProjectPreview
                                            src={project.images[0]}
                                            title={project.title}
                                        />

                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                                        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs text-white/80 backdrop-blur-md">
                                            {project.category}
                                        </span>

                                        <span className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition duration-300 group-hover:border-blue-400/40 group-hover:bg-blue-500/20 group-hover:text-blue-200">
                                            <ArrowUpRight size={19} />
                                        </span>
                                    </div>

                                    <div className="p-5 sm:p-6">
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                                                {project.title}
                                            </h3>
                                            <span className="shrink-0 text-xs text-white/30">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/50">
                                            {project.shortDescription}
                                        </p>

                                        {project.techStack.length > 0 && (
                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {project.techStack.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 text-[11px] text-white/55"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 3 && (
                                                    <span className="px-1 py-1 text-[11px] text-white/40">
                                                        +{project.techStack.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        <div className="mt-5 flex items-center gap-2 text-sm text-blue-300/80 transition-colors group-hover:text-blue-300">
                                            View project
                                            <ArrowUpRight size={15} />
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <p className="rounded-2xl border border-white/10 p-8 text-center text-sm text-white/50">
                        Projects will appear here soon.
                    </p>
                )}

                {hasMore && (
                    <div className="mt-10 flex justify-center sm:mt-12">
                        <button
                            type="button"
                            onClick={() =>
                                setVisibleCount((count) =>
                                    Math.min(count + INITIAL_PROJECTS, projects.length),
                                )
                            }
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-white/75 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
                        >
                            Lihat Lebih Lanjut
                            <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        key={selectedProject.id}
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                        onPrevious={() => {
                            const index = projects.findIndex(
                                (project) => project.id === selectedProject.id,
                            );
                            const previous =
                                (index - 1 + projects.length) % projects.length;
                            setSelectedProject(projects[previous]);
                        }}
                        onNext={() => {
                            const index = projects.findIndex(
                                (project) => project.id === selectedProject.id,
                            );
                            setSelectedProject(
                                projects[(index + 1) % projects.length],
                            );
                        }}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
