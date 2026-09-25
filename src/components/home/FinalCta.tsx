import Link from "next/link";
import { event } from "@/data/event";
import type { Locale } from "@/lib/i18n";

export default function FinalCta({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="section-kicker">Stoltzekleiven Opp 2026</p>
            <h2 className="mt-4 max-w-4xl text-[clamp(3.4rem,8vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.07em]">
              {en ? (<>Ready for<br />the climb?</>) : (<>Klar for<br />bakken?</>)}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/50">
              {en ? event.dateLabelEn : event.dateLabel} · Bergen
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={en ? "/en/results" : "/resultater"}
              className="inline-flex min-h-14 items-center justify-center bg-white px-7 text-sm font-black uppercase tracking-[0.08em] text-black transition hover:bg-white/80"
            >
              {en ? "Start & results" : "Start & resultater"}
            </Link>
            <Link
              href={en ? "/en/practical-info" : "/praktisk-info"}
              className="inline-flex min-h-14 items-center justify-center border border-white/20 px-7 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:border-white/60"
            >
              {en ? "Practical info" : "Praktisk info"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
