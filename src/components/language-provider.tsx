"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { dictionary, type Dictionary, type Locale } from "@/data/site";

const STORAGE_KEY = "portfolio-locale";
const LOCALE_CHANGE_EVENT = "portfolio-locale-change";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isValidLocale(value: string | null): value is Locale {
  return value === "en" || value === "id";
}

function getLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return isValidLocale(saved) ? saved : "en";
  } catch {
    return "en";
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LOCALE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LOCALE_CHANGE_EVENT, callback);
  };
}

function getServerLocale(): Locale {
  return "en";
}

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const locale = useSyncExternalStore(
    subscribe,
    getLocale,
    getServerLocale,
  );

  const setLocale = useCallback((next: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);

      window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: dictionary[locale],
    }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return ctx;
}