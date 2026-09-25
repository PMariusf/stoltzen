import Link from "next/link";
import { event } from "@/data/event";
import type { Locale } from "@/lib/i18n";

export default function FinalCta({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 md:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="section-kicker">Stoltzekleiven Opp 2026</p>
            <h2 className="mt-4 max-w-4xl text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.07em]">
              {en ? (<>Ready for<br />the climb?</>) : (<>Klar for<br />bakken?</>)}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/50">
              {en ? event.dateLabelEn : event.dateLabel} · Bergen
            </p>
          </div>

          <div className="grid w-full gap-2 sm:flex sm:w-auto sm:flex-wrap sm:gap-3">
            <Link
              href={en ? "/en/results" : "/resultater"}
              className="inline-flex min-h-13 w-full items-center justify-center sm:min-h-14 sm:w-auto bg-white px-7 text-sm font-black uppercase tracking-[0.08em] text-black transition hover:bg-white/80"
            >
              {en ? "Start & results" : "Start & resultater"}
            </Link>
            <Link
              href={en ? "/en/practical-info" : "/praktisk-info"}
              className="inline-flex min-h-13 w-full items-center justify-center sm:min-h-14 sm:w-auto border border-white/20 px-7 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:border-white/60"
            >
              {en ? "Practical info" : "Praktisk info"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
