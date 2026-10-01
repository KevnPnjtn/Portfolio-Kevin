import type { SVGProps } from "react";
import { Download, Mail } from "lucide-react";

import Magnet from "@/components/ui/Magnet";
import Glare from "@/components/ui/GlareHover";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

export function Footer() {
    return (
        <>
            {/* Floating Contact Dock */}
            <div className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex justify-center px-4">
                <div className="pointer-events-auto flex h-16 items-center gap-2 rounded-2xl border border-white/10 bg-black/80 px-4 shadow-2xl backdrop-blur-xl">
                    <Magnet padding={40} magnetStrength={2}>
                        <a
                            href="https://github.com/KevnPnjtn"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="flex size-12 items-center justify-center rounded-lg bg-transparent text-white/70 transition-colors hover:bg-transparent hover:text-white"
                        >
                            <GithubIcon className="size-6" />
                        </a>
                    </Magnet>

                    <Magnet padding={40} magnetStrength={2}>
                        <a
                            href="https://www.linkedin.com/in/kevin-reynaldi-panjaitan/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="flex size-12 items-center justify-center rounded-lg bg-transparent text-white/70 transition-colors hover:bg-transparent hover:text-white"
                        >
                            <LinkedinIcon className="size-6" />
                        </a>
                    </Magnet>

                    <Magnet padding={40} magnetStrength={2}>
                        <a
                            href="https://www.instagram.com/ray_pnjtn"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="flex size-12 items-center justify-center rounded-lg bg-transparent text-white/70 transition-colors hover:bg-transparent hover:text-white"
                        >
                            <InstagramIcon className="size-6" />
                        </a>
                    </Magnet>

                    <Magnet padding={40} magnetStrength={2}>
                        <a
                            href="mailto:kevinpanjaitan09@gmail.com"
                            aria-label="Email"
                            className="flex size-12 items-center justify-center rounded-lg bg-transparent text-white/70 transition-colors hover:bg-transparent hover:text-white"
                        >
                            <Mail className="size-6" />
                        </a>
                    </Magnet>

                    <div className="mx-2 h-8 w-px bg-white/10" />

                    <Glare
                        width="auto"
                        height="auto"
                        background="transparent"
                        borderColor="transparent"
                        borderRadius="8px"
                        glareColor="#ffffff"
                        glareOpacity={0}
                    >
                        <a
                            href="/Kevin-Reynaldi-Panjaitan-CV.pdf"
                            download
                            className="flex h-12 items-center gap-2 rounded-lg bg-transparent px-4 text-base font-medium text-white/70 transition-colors hover:bg-transparent hover:text-white"
                        >
                            <Download className="size-5" />
                            <span className="hidden sm:inline">Download CV</span>
                        </a>
                    </Glare>
                </div>
            </div>

            {/* Actual Footer */}
            <footer className="border-t border-white/10 px-6 py-12">
                <div className="mx-auto max-w-6xl">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Kevin Reynaldi Panjaitan. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </>
    );
}