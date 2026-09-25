"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const en = locale === "en";

  return (
    <footer className="site-footer border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div>
          <p className="text-2xl font-black uppercase tracking-[-0.04em]">Stoltzekleiven Opp</p>
          <p className="footer-muted mt-3 max-w-md text-sm leading-6">
            {en
              ? "Bergen's uphill race since 1979. Organised by Varegg."
              : "Bergens motbakkeløp siden 1979. Arrangert av Varegg."}
          </p>
        </div>

        <div>
          <p className="footer-heading text-xs font-bold uppercase tracking-[0.22em]">
            {en ? "Shortcuts" : "Snarveier"}
          </p>
          <div className="footer-links mt-4 flex flex-col gap-2 text-sm">
            <Link href={en ? "/en/registration" : "/pamelding"}>{en ? "Registration" : "Påmelding"}</Link>
            <Link href={en ? "/en/results" : "/resultater"}>{en ? "Results" : "Resultater"}</Link>
            <Link href={en ? "/en/practical-info" : "/praktisk-info"}>{en ? "Practical info" : "Praktisk info"}</Link>
          </div>
        </div>

        <div>
          <p className="footer-heading text-xs font-bold uppercase tracking-[0.22em]">
            {en ? "More" : "Mer"}
          </p>
          <div className="footer-links mt-4 flex flex-col gap-2 text-sm">
            <span>{en ? "Contact" : "Kontakt"}</span>
            <span>{en ? "Press" : "Presse"}</span>
            <span>{en ? "Privacy" : "Personvern"}</span>
            <span>{en ? "Partners" : "Samarbeidspartnere"}</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom border-t px-6 py-5 text-center text-xs uppercase tracking-[0.18em]">
        Stoltzekleiven Opp · Bergen
      </div>
    </footer>
  );
}
