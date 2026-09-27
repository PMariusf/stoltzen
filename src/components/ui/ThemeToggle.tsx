"use client";

import type { Locale } from "@/lib/i18n";

export default function ThemeToggle({ locale }: { locale: Locale }) {
  function toggleTheme() {
    const current =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = next;
    localStorage.setItem("stoltzen-theme", next);
  }

  const label = locale === "en" ? "Toggle color theme" : "Bytt fargetema";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="nav-control"
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true" className="theme-icon-sun text-base leading-none">
        ☀
      </span>
      <span aria-hidden="true" className="theme-icon-moon text-base leading-none">
        ☾
      </span>
    </button>
  );
}
