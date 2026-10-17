"use client";

import { useEffect, useState } from "react";
import { MotionConfig, motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/data/site";
import { useLanguage } from "@/components/language-provider";

const sectionOrder = [
  "home",
  "about",
  "skills",
  "projects",
  // Add later: "experience", "education", "contact"
] as const satisfies readonly SectionId[];

// Height of one row (Tailwind h-9 = 36px). The progress line uses it too.
const ITEM_HEIGHT = 36;

export function Navbar() {
  const { t } = useLanguage();
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const sections = sectionOrder
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (!sections.length) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      const line = window.innerHeight * 0.4;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (atBottom) current = sections[sections.length - 1].id;

      setActive(current as SectionId);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const activeIndex = Math.max(0, sectionOrder.indexOf(active as never));

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
          className="group/nav rounded-3xl border border-border/80 bg-background/80 px-1 py-2 shadow-xl shadow-black/10 backdrop-blur-xl"
        >
          <div className="relative">
            {/* Rail connecting the dots */}
            <span
              aria-hidden
              className="absolute bottom-[18px] left-[18px] top-[18px] w-px -translate-x-1/2 bg-border"
            />

            {/* Blue progress from Home down to the active dot */}
            <motion.span
              aria-hidden
              initial={false}
              animate={{ height: activeIndex * ITEM_HEIGHT }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="absolute left-[18px] top-[18px] w-px -translate-x-1/2 bg-blue-500"
            />

            {sectionOrder.map((id) => {
              const isActive = active === id;

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-label={t.nav[id]}
                  aria-current={isActive ? "location" : undefined}
                  title={t.nav[id]}
                  className="group relative z-10 flex h-9 items-center rounded-full px-3 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {/* Dot */}
                  <span className="relative flex size-3 shrink-0 items-center justify-center rounded-full bg-background">
                    <span
                      className={cn(
                        "size-1.5 rounded-full transition-colors duration-200",
                        isActive
                          ? "bg-transparent"
                          : "bg-muted-foreground/50 group-hover:bg-muted-foreground",
                      )}
                    />

                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute size-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.55)]"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </span>

                  {/* Label: always visible for the active item, others appear
                      when the navigator is hovered or focused (hidden on mobile) */}
                  <span
                    className={cn(
                      "hidden grid-cols-[0fr] opacity-0 transition-[grid-template-columns,opacity] duration-300 ease-out sm:grid",
                      "group-hover/nav:grid-cols-[1fr] group-hover/nav:opacity-100",
                      "group-focus-within/nav:grid-cols-[1fr] group-focus-within/nav:opacity-100",
                      isActive && "grid-cols-[1fr] opacity-100",
                    )}
                  >
                    <span className="min-w-0 overflow-hidden">
                      <span
                        className={cn(
                          "block whitespace-nowrap pl-3 pr-1 text-[13px] font-medium transition-colors duration-200",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground",
                        )}
                      >
                        {t.nav[id]}
                      </span>
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </nav>
      </motion.aside>
    </MotionConfig>
  );
}