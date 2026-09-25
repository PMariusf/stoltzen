"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const en = locale === "en";

  const explore = en
    ? [
        ["The race", "/en/race"],
        ["History", "/en/history"],
        ["Photos", "/en/photos"],
        ["Preparation", "/en/preparation"],
      ]
    : [
        ["Løpet", "/lopet"],
        ["Historie", "/historie"],
        ["Bilder", "/bilder"],
        ["Forberedelser", "/forberedelser"],
      ];

  return (
    <footer className="site-footer border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.4fr_0.8fr_0.8fr] md:px-10 md:py-14">
        <div>
          <p className="text-2xl font-black uppercase tracking-[-0.04em]">
            Stoltzekleiven Opp
          </p>
          <p className="footer-muted mt-3 max-w-md text-sm leading-6">
            {en
              ? "Bergen's uphill race since 1979. Organised by Varegg."
              : "Bergens motbakkeløp siden 1979. Arrangert av Varegg."}
          </p>
        </div>

        <div>
          <p className="footer-heading text-xs font-bold uppercase tracking-[0.22em]">
            {en ? "Race weekend" : "Løpshelgen"}
          </p>
          <div className="footer-links mt-4 flex flex-col gap-2 text-sm">
            <Link href={en ? "/en/registration" : "/pamelding"}>
              {en ? "Registration" : "Påmelding"}
            </Link>
            <Link href={en ? "/en/results" : "/resultater"}>
              {en ? "Start & results" : "Start & resultater"}
            </Link>
            <Link href={en ? "/en/practical-info" : "/praktisk-info"}>
              {en ? "Practical info" : "Praktisk info"}
            </Link>
          </div>
        </div>

        <div>
          <p className="footer-heading text-xs font-bold uppercase tracking-[0.22em]">
            {en ? "Explore" : "Utforsk"}
          </p>
          <div className="footer-links mt-4 flex flex-col gap-2 text-sm">
            {explore.map(([label, href]) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom border-t px-5 py-5 text-center text-xs uppercase tracking-[0.18em] sm:px-6">
        Stoltzekleiven Opp · Bergen · Since 1979
      </div>
    </footer>
  );
}
