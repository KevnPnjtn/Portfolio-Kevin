"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  const nextLocale = locale === "en" ? "id" : "en";

  return (
    <button
      type="button"
      lang={locale}
      aria-label={`${t.ui.language}: ${locale.toUpperCase()}. Switch to ${nextLocale.toUpperCase()}`}
      title={t.ui.language}
      onClick={() => setLocale(nextLocale)}
      className="group relative flex size-10 items-center justify-center rounded-xl text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {locale.toUpperCase()}

      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {t.ui.language}
      </span>
    </button>
  );
}
