
"use client";

import { useEffect, useState } from "react";
import { MotionConfig, motion } from "motion/react";
import {
  House,
  UserRound,
  Layers3,
  FolderKanban,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navIds, type SectionId } from "@/data/site";
import { useLanguage } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";

const navItems = [
  { id: "home", icon: House },
  { id: "about", icon: UserRound },
  { id: "skills", icon: Layers3 },
  { id: "projects", icon: FolderKanban },
] satisfies {
  id: SectionId;
  icon: typeof House;
}[];

export function Navbar() {
  const { t } = useLanguage();
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const sections = navIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio,
          );

        if (visible[0]) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      {
        rootMargin: "-15% 0px -15% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <motion.aside
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed right-4 top-1/2 z-50 -translate-y-1/2 sm:right-6"
      >
        <nav
          aria-label={t.ui.mainNav}
          className="flex flex-col items-center rounded-2xl border border-border/80 bg-background/80 p-2 shadow-xl shadow-black/10 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center gap-1">
            {navItems.map(({ id, icon: Icon }) => {
              const isActive = active === id;

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-label={t.nav[id]}
                  aria-current={isActive ? "location" : undefined}
                  title={t.nav[id]}
                  className={cn(
                    "group relative flex size-10 items-center justify-center rounded-xl transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                    isActive
                      ? "bg-blue-500/15 text-blue-500"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-[18px]" aria-hidden="true" />

                  {isActive && (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className="absolute -left-[9px] h-5 w-0.5 rounded-full bg-blue-500"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {t.nav[id]}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="my-2 h-px w-full bg-border" />

          <LanguageSwitcher />
        </nav>
      </motion.aside>
    </MotionConfig>
  );
}
