import Image from "next/image";
import Link from "next/link";
import { event } from "@/data/event";
import type { EventPhase } from "@/lib/event-phase";
import { getPhaseContent } from "@/lib/event-phase";
import type { Locale } from "@/lib/i18n";

export default function Hero({
  phase,
  locale = "no",
}: {
  phase: EventPhase;
  locale?: Locale;
}) {
  const en = locale === "en";
  const content = getPhaseContent(phase, locale);
  const latestResults = en ? "/en/results/2026" : event.links.latestResults;
  const gallery = en ? "/en/photos" : event.links.gallery;

  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="pt-20">
        <div className="relative mx-auto w-full max-w-[2172px]">
          <Image
            src="/images/hero/Stoltzen-hero.png"
            alt={
              en
                ? "Stoltzekleiven Opp with Varegg logo, runners, course records and anniversary graphics"
                : "Stoltzekleiven Opp med Varegg-logo, løpere, rekordtider og jubileumsgrafikk"
            }
            width={2172}
            height={724}
            priority
            sizes="100vw"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#070707]">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-3 border border-white/15 bg-white/[0.03] px-4 py-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    phase === "live" ? "animate-pulse bg-white" : "bg-white/45"
                  }`}
                />
                <span className="text-xs font-black uppercase tracking-[0.22em] text-white/75">
                  {content.eyebrow}
                </span>
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-white/45 sm:text-sm">
                {event.location} · {en ? event.dateLabelEn : event.dateLabel}
              </p>

              <h1 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl md:text-5xl">
                {en
                  ? "801 steps. 315 vertical metres. One way up."
                  : "801 trinn. 315 høydemeter. Én vei opp."}
              </h1>

              <p className="mt-3 text-sm font-medium text-white/50">
                {content.status}
              </p>
            </div>

            <div className="grid w-full gap-2 sm:flex sm:w-auto sm:flex-wrap sm:gap-3">
              <Link
                href={content.primaryHref}
                className="inline-flex min-h-13 w-full items-center justify-center sm:min-h-14 sm:w-auto bg-white px-7 text-sm font-black uppercase tracking-[0.08em] text-black transition hover:bg-white/80"
              >
                {content.primaryLabel}
              </Link>

              <Link
                href={latestResults}
                className="inline-flex min-h-13 w-full items-center justify-center sm:min-h-14 sm:w-auto border border-white/25 px-7 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:border-white/60 hover:bg-white hover:text-black"
              >
                {en ? "Results" : "Resultater"} {event.year}
              </Link>

              <Link
                href={gallery}
                className="inline-flex min-h-13 w-full items-center justify-center sm:min-h-14 sm:w-auto border border-white/25 px-7 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:border-white/60"
              >
                {en ? "See photos" : "Se bilder"}
              </Link>
            </div>
          </div>

          <div className="mt-7 grid gap-2 border-t border-white/10 pt-5 sm:mt-8 sm:gap-3 sm:pt-6 sm:grid-cols-2">
            {[
              {
                label: en ? "Course record · men" : "Løyperekord · menn",
                record: event.records.men,
              },
              {
                label: en ? "Course record · women" : "Løyperekord · kvinner",
                record: event.records.women,
              },
            ].map(({ label, record }) => (
              <div key={label} className="border border-white/10 bg-white/[0.025] px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/35">
                  {label}
                </p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-white/80">{record.name}</p>
                    <p className="mt-1 text-xs text-white/35">{record.year}</p>
                  </div>
                  <p className="text-3xl font-black tracking-[-0.06em]">{record.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
