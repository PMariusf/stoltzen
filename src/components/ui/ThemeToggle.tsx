"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

type Theme = "dark" | "light";

export default function ThemeToggle({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("stoltzen-theme", next);
  }

  const label =
    locale === "en"
      ? theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode"
      : theme === "dark"
        ? "Bytt til lys modus"
        : "Bytt til mørk modus";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="nav-control"
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true" className="text-base leading-none">
        {theme === "dark" ? "☀" : "☾"}
      </span>
    </button>
  );
}
