import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

const routeImage =
  "https://cdn.prod.website-files.com/68cbafa2a0c398cc2ffa1a2d/68d68dd67914ac256466185c_stoltzen5.jpg";

export default function RouteSection({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section className="bg-[#111] text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="route-panel relative min-h-[340px] overflow-hidden border border-white/10 p-6 sm:min-h-[430px] sm:p-10">
            <Image
              src={routeImage}
              alt={en ? "Stoltzekleiven during the race" : "Stoltzekleiven under løpet"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-black/85" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_60%)]" />

            <div className="relative flex h-full min-h-[290px] flex-col justify-between sm:min-h-[350px]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-white/55">
                  {en ? "Start" : "Start"}
                </p>
                <p className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">
                  Fjellveien
                </p>
              </div>

              <div className="ml-5 flex flex-1 items-center py-8">
                <div className="h-full min-h-24 w-px bg-gradient-to-b from-white/70 via-white/40 to-white/10" />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-white/55">
                  {en ? "801 steps later" : "801 trinn senere"}
                </p>
                <p className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">
                  Sandvikspilen
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="section-kicker">{en ? "The course" : "Løypen"}</p>
            <h2 className="section-title mt-4">
              {en ? "One direction. Up." : "Én retning. Opp."}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/62">
              {en
                ? "From Fjellveien the route climbs relentlessly through the stone steps toward Sandvikspilen. Short on paper. Completely different when the clock starts."
                : "Fra Fjellveien går det nesten bare én vei gjennom steintrappene mot Sandvikspilen. Kort på papiret. Noe helt annet når klokken starter."}
            </p>
            <Link href={en ? "/en/race" : "/lopet"} className="text-link mt-8 inline-flex">
              {en ? "See the course" : "Se løypen"} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
