import Link from "next/link";
import { event } from "@/data/event";

export default function HistorySection() {
  return (
    <section className="overflow-hidden bg-[#141414] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="section-kicker">Historie</p>
            <p className="mt-5 text-[clamp(6rem,17vw,13rem)] font-black leading-[0.72] tracking-[-0.09em] text-white/10">
              {event.stats.since}
            </p>
          </div>
          <div>
            <h2 className="section-title">Historien skal ikke ligge gjemt i arkivet.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Gamle artikler, vinnere, rekorder og bilder kan bli en levende tidslinje gjennom tiårene
              i stedet for å dominere forsiden som nyhetsarkiv.
            </p>
            <Link href="/historie" className="text-link mt-8 inline-flex">
              Utforsk historien <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
