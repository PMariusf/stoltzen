import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function GallerySection({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";
  const cells = en ? ["Start", "The steps", "Finish", "Spectators"] : ["Start", "Trappene", "Mål", "Publikum"];

  return (
    <section className="bg-[#090909] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">{en ? "Stoltzen in photos" : "Stoltzen i bilder"}</p>
            <h2 className="section-title mt-4">{en ? "See the race. Find the moment." : "Se løpet. Finn øyeblikket."}</h2>
          </div>
          <Link href={en ? "/en/photos" : "/bilder"} className="text-link inline-flex">
            {en ? "View gallery" : "Se bildegalleri"} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-4">
          {cells.map((cell, index) => (
            <div
              key={cell}
              className={`gallery-placeholder relative overflow-hidden border border-white/10 ${index === 0 ? "col-span-2 row-span-2 min-h-[360px] md:min-h-[460px]" : "min-h-[175px] md:min-h-[225px]"}`}
            >
              <span className="absolute bottom-5 left-5 text-xs font-black uppercase tracking-[0.2em] text-white/55">{cell}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-white/35">
          {en ? "Photos will be connected when the archive is migrated." : "Bildene kobles til når fotoarkivet migreres."}
        </p>
      </div>
    </section>
  );
}
