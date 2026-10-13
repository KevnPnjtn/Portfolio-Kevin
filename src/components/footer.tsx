"use client";

import type { SVGProps } from "react";
import { Download, Mail } from "lucide-react";

import Dock from "@/components/ui/Dock";
import { siteConfig } from "@/data/site";

function Base(props: SVGProps<SVGSVGElement>) {
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
        />
    );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Base {...props}>
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </Base>
    );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Base {...props}>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </Base>
    );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Base {...props}>
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </Base>
    );
}

const openExternal = (url: string) => () =>
    window.open(url, "_blank", "noopener,noreferrer");

const downloadFile = (path: string) => () => {
    const a = document.createElement("a");
    a.href = path;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
};

const itemClass =
    "bg-transparent! border-transparent! shadow-none! text-white/70 hover:text-white";

const cvItemClass =
     "bg-transparent! border-transparent! shadow-none! text-blue-400 hover:text-blue-300";

const dockItems = [
    {
        icon: <GithubIcon className="size-6" />,
        label: "GitHub",
        onClick: openExternal(siteConfig.github),
        className: itemClass,
    },
    {
        icon: <LinkedinIcon className="size-6" />,
        label: "LinkedIn",
        onClick: openExternal(siteConfig.linkedin),
        className: itemClass,
    },
    {
        icon: <InstagramIcon className="size-6" />,
        label: "Instagram",
        onClick: openExternal(siteConfig.instagram),
        className: itemClass,
    },
    {
        icon: <Mail className="size-6" />,
        label: "Email",
        onClick: () => {
            window.location.href = `mailto:${siteConfig.email}`;
        },
        className: itemClass,
    },
    {
        icon: <Download className="size-6" />,
        label: "Download CV",
        onClick: downloadFile(siteConfig.cvPath),
        className: cvItemClass,
    },
];

export function Footer() {
    return (
        <>
            {/* Floating Contact Dock */}
            <div className="fixed inset-x-0 bottom-20 z-50 flex justify-center">
                <Dock
                    items={dockItems}
                    className="bg-black/80! border-white/10! rounded-2xl! backdrop-blur-xl"
                    panelHeight={72}
                    baseItemSize={52}
                    magnification={72}
                    distance={140}
                    dockHeight={120}
                />
            </div>

            {/* Actual Footer */}
            <footer className="border-t border-white/10 px-6 py-12">
                <div className="mx-auto max-w-6xl">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
}