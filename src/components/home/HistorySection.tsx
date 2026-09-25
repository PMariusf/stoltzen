import Link from "next/link";
import { event } from "@/data/event";
import type { Locale } from "@/lib/i18n";

export default function HistorySection({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  const milestones = [
    {
      year: String(event.stats.since),
      title: en ? "The beginning" : "Starten",
      text: en ? "The first chapter of Stoltzekleiven Opp." : "Første kapittel i Stoltzekleiven Opp.",
    },
    {
      year: String(event.records.women.year),
      title: en ? "Women's record" : "Kvinnerekord",
      text: `${event.records.women.name} · ${event.records.women.time}`,
    },
    {
      year: String(event.records.men.year),
      title: en ? "Men's record" : "Herrerekord",
      text: `${event.records.men.name} · ${event.records.men.time}`,
    },
    {
      year: String(event.year),
      title: en ? "Next chapter" : "Neste kapittel",
      text: en ? event.dateLabelEn : event.dateLabel,
    },
  ];

  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#141414] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="section-kicker">{en ? "History" : "Historie"}</p>
            <p className="mt-6 text-[clamp(6rem,17vw,13rem)] font-black leading-[0.72] tracking-[-0.09em] text-white/10">
              {event.stats.since}
            </p>
          </div>

          <div>
            <h2 className="section-title">
              {en ? (
                <>Decades of<br />one climb.</>
              ) : (
                <>Tiår med<br />samme bakke.</>
              )}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/58">
              {en
                ? "Records, runners, photos and stories form a timeline from 1979 to today's race."
                : "Rekorder, løpere, bilder og historier danner en tidslinje fra 1979 og frem til dagens løp."}
            </p>
            <Link href={en ? "/en/history" : "/historie"} className="text-link mt-8 inline-flex">
              {en ? "Explore the history" : "Utforsk historien"} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((item) => (
            <article key={item.year} className="min-h-44 bg-[#141414] p-6">
              <p className="text-4xl font-black tracking-[-0.06em] text-white/90">{item.year}</p>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.16em] text-white/70">
                {item.title}
              </p>
              <p className="mt-2 text-xs leading-5 text-white/38">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
