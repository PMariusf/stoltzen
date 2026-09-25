"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { getNavigation } from "@/data/navigation";
import { getLocaleFromPathname, getLocalePath } from "@/lib/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const navigation = getNavigation(locale);
  const homeHref = locale === "en" ? "/en" : "/";
  const registrationHref =
    locale === "en" ? "/en/registration" : "/pamelding";

  return (
    <header className="site-nav absolute inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          href={homeHref}
          className="shrink-0 text-xl font-black uppercase tracking-[-0.04em] sm:text-2xl"
        >
          Stoltzen
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label={locale === "en" ? "Main menu" : "Hovedmeny"}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link text-sm font-semibold transition">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <div className="language-switch" aria-label={locale === "en" ? "Language" : "Språk"}>
            <Link
              href={getLocalePath(pathname, "no")}
              className={locale === "no" ? "is-active" : undefined}
              lang="no"
            >
              NO
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={getLocalePath(pathname, "en")}
              className={locale === "en" ? "is-active" : undefined}
              lang="en"
            >
              EN
            </Link>
          </div>

          <ThemeToggle locale={locale} />

          <Link href={registrationHref} className="nav-cta inline-flex min-h-11 items-center px-5 text-sm font-black uppercase tracking-[0.08em] transition">
            {locale === "en" ? "Registration" : "Påmelding"}
          </Link>
        </div>

        <details className="group relative xl:hidden">
          <summary className="nav-menu-button flex h-11 w-11 cursor-pointer list-none items-center justify-center border [&::-webkit-details-marker]:hidden">
            <span className="sr-only">{locale === "en" ? "Open menu" : "Åpne meny"}</span>
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </summary>

          <div className="site-menu absolute right-0 top-14 w-[min(88vw,360px)] border p-3 shadow-2xl">
            <nav className="flex flex-col" aria-label={locale === "en" ? "Mobile menu" : "Mobilmeny"}>
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="mobile-nav-link border-b px-4 py-3.5 text-sm font-semibold last:border-b-0">
                  {item.label}
                </Link>
              ))}

              <div className="mt-3 flex items-center justify-between gap-3 border-t pt-3">
                <div className="language-switch">
                  <Link href={getLocalePath(pathname, "no")} className={locale === "no" ? "is-active" : undefined} lang="no">
                    NO
                  </Link>
                  <span aria-hidden="true">/</span>
                  <Link href={getLocalePath(pathname, "en")} className={locale === "en" ? "is-active" : undefined} lang="en">
                    EN
                  </Link>
                </div>
                <ThemeToggle locale={locale} />
              </div>

              <Link href={registrationHref} className="nav-cta mt-3 px-4 py-3.5 text-center text-sm font-black uppercase tracking-[0.08em]">
                {locale === "en" ? "Registration" : "Påmelding"}
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
