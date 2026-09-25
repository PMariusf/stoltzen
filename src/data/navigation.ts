import type { Locale } from "@/lib/i18n";

const navigation = {
  no: [
    { label: "Løpet", href: "/lopet" },
    { label: "Påmelding", href: "/pamelding" },
    { label: "Start & resultater", href: "/resultater" },
    { label: "Forberedelser", href: "/forberedelser" },
    { label: "Historie", href: "/historie" },
    { label: "Bilder", href: "/bilder" },
    { label: "Praktisk info", href: "/praktisk-info" },
  ],
  en: [
    { label: "The race", href: "/en/race" },
    { label: "Registration", href: "/en/registration" },
    { label: "Start & results", href: "/en/results" },
    { label: "Preparation", href: "/en/preparation" },
    { label: "History", href: "/en/history" },
    { label: "Photos", href: "/en/photos" },
    { label: "Practical info", href: "/en/practical-info" },
  ],
} as const;

export function getNavigation(locale: Locale) {
  return navigation[locale];
}
