import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function AboutStoltzen({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section className="bg-[#0b0b0b] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:py-32">
        <div>
          <p className="section-kicker">{en ? "This is Stoltzen" : "Dette er Stoltzen"}</p>
          <h2 className="section-title mt-4">
            {en ? <>Short course.<br />Brutal climb.</> : <>Kort løype.<br />Brutal stigning.</>}
          </h2>
        </div>
        <div className="max-w-2xl lg:pt-12">
          <p className="text-lg leading-8 text-white/68 md:text-xl md:leading-9">
            {en
              ? "From Fjellveien to Sandvikspilen, the course is roughly 900 metres long and climbs about 315 vertical metres. Stoltzekleiven Opp is about finding your rhythm, handling the incline and making it all the way up."
              : "Fra Fjellveien til Sandvikspilen går løypen omtrent 900 meter og stiger rundt 315 høydemeter. Stoltzekleiven Opp handler om å finne rytmen, tåle bakken og komme seg helt opp."}
          </p>
          <Link href={en ? "/en/race" : "/lopet"} className="text-link mt-8 inline-flex">
            {en ? "About the race" : "Les om løpet"} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
