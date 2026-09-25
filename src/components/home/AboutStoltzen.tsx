import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function AboutStoltzen({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section className="border-b border-white/10 bg-[#0b0b0b] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:py-28">
        <div>
          <p className="section-kicker">{en ? "This is Stoltzen" : "Dette er Stoltzen"}</p>
          <h2 className="section-title mt-4">
            {en ? (
              <>Short course.<br />No shortcuts.</>
            ) : (
              <>Kort løype.<br />Ingen snarvei.</>
            )}
          </h2>
        </div>

        <div className="max-w-2xl lg:pt-10">
          <p className="text-lg leading-8 text-white/68 md:text-xl md:leading-9">
            {en
              ? "From Fjellveien to Sandvikspilen, the challenge is simple to understand and hard to master. Find the rhythm, hold the pace and keep moving up."
              : "Fra Fjellveien til Sandvikspilen er utfordringen enkel å forstå og hard å mestre. Finn rytmen, hold farten og fortsett oppover."}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link href={en ? "/en/race" : "/lopet"} className="text-link inline-flex">
              {en ? "About the race" : "Les om løpet"} <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={en ? "/en/practical-info" : "/praktisk-info"}
              className="text-xs font-black uppercase tracking-[0.14em] text-white/45 transition hover:text-white"
            >
              {en ? "Practical info" : "Praktisk info"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
