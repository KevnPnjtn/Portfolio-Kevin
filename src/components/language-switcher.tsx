"use client";

import { cn } from "@/lib/utils";
import type { Locale } from "@/data/site";
import { useLanguage } from "@/components/language-provider";

const OPTIONS: { value: Locale; label: string; name: string }[] = [
  { value: "id", label: "ID", name: "Bahasa Indonesia" },
  { value: "en", label: "EN", name: "English" },
];

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.ui.language}
      className="inline-flex h-9 items-center rounded-full border border-border p-0.5 text-xs font-medium"
    >
      {OPTIONS.map((opt) => {
        const active = locale === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            lang={opt.value}
            aria-label={opt.name}
            aria-pressed={active}
            onClick={() => setLocale(opt.value)}
            className={cn(
              "focus-ring h-full rounded-full px-2.5 transition-colors",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}