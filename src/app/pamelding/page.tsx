import type { Metadata } from "next";
import Link from "next/link";
import { registration } from "@/data/registration";

export const metadata: Metadata = {
  title: "Påmelding",
  description:
    "Påmelding til Stoltzekleiven Opp – individuell påmelding, grupper, seedet gruppe, viktige datoer, venteliste, endringer og ofte stilte spørsmål.",
};

function StatusBadge({ status }: { status: "closed" | "open" | "coming" }) {
  const labels = {
    closed: "Stengt",
    open: "Åpen",
    coming: "Kommer",
  };

  return (
    <span className="inline-flex border border-current/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
      {labels[status]}
    </span>
  );
}

export default function RegistrationPage() {
  return (
    <main className="bg-[#080808] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.09),transparent_24%),linear-gradient(145deg,#171717,#070707_60%)]" />
        <div className="pointer-events-none absolute -right-8 top-28 hidden select-none text-[18vw] font-black leading-none tracking-[-0.09em] text-white/[0.025] lg:block">
          {registration.nextYear}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
          <p className="section-kicker">Påmelding</p>

          <h1 className="mt-5 max-w-5xl text-[clamp(4rem,10vw,8.5rem)] font-black uppercase leading-[0.8] tracking-[-0.075em]">
            Klar for
            <br />
            neste Stoltzen?
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-white/60 md:text-2xl md:leading-9">
            Alt om individuell påmelding, grupper, seedet gruppe, priser,
            frister, endringer og venteliste samlet på ett sted.
          </p>

          <div className="mt-10 max-w-3xl border border-white/15 bg-white/[0.035] p-6 backdrop-blur-sm sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/35">
                  Status
                </p>
                <p className="mt-2 text-2xl font-black uppercase tracking-[-0.04em]">
                  {registration.status.label}
                </p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                  {registration.status.description}
                </p>
              </div>

              <div className="shrink-0 border border-white/15 px-5 py-4 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                  Neste
                </p>
                <p className="mt-1 text-3xl font-black tracking-[-0.05em]">
                  {registration.nextYear}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e8e3] text-black">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                Velg påmelding
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                Tre tydelige
                <br />
                veier inn.
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-8 text-black/58">
              Hver påmeldingstype får sine egne regler, priser og frister.
              Dermed slipper deltakerne å lete gjennom gamle artikler for å
              finne riktig informasjon.
            </p>
          </div>

          <div className="mt-14 grid gap-3 lg:grid-cols-3">
            {registration.options.map((option) => (
              <article
                key={option.id}
                className="flex min-h-[380px] flex-col justify-between border border-black/15 bg-white/35 p-7 sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-black/35">
                      {option.shortTitle}
                    </p>
                    <StatusBadge status={option.status} />
                  </div>

                  <h3 className="mt-9 text-3xl font-black uppercase leading-[0.95] tracking-[-0.05em]">
                    {option.title}
                  </h3>

                  <p className="mt-5 text-sm leading-6 text-black/55">
                    {option.description}
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-3 border-t border-black/15 pt-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/35">
                      Pris
                    </p>
                    <p className="mt-2 text-sm font-bold">
                      {option.price ?? "Publiseres senere"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/35">
                      Alder
                    </p>
                    <p className="mt-2 text-sm font-bold">
                      {option.ageLimit ?? "Publiseres senere"}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101010]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="section-kicker">Viktige datoer</p>
              <h2 className="section-title mt-4">
                Vit når
                <br />
                det skjer.
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-white/55">
                Påmeldingen til Stoltzen kan gå svært raskt. Derfor skal dato,
                klokkeslett og status være blant det første du finner på siden.
              </p>
            </div>

            <div className="border-t border-white/10">
              {registration.importantDates.map((date, index) => (
                <div
                  key={date.label}
                  className="grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[44px_1fr_auto] sm:items-center"
                >
                  <span className="text-xs font-black text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="text-lg font-black uppercase tracking-[-0.025em]">
                      {date.label}
                    </p>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                      {date.note}
                    </p>
                  </div>

                  <p className="text-sm font-black uppercase tracking-[0.08em] text-white/65">
                    {date.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e8e3] text-black">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                Fulltegnet?
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl">
                Venteliste
                <br />
                & restplasser.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-black/58">
                Når ordinær påmelding er full, skal denne delen skifte status
                automatisk og vise hva deltakeren faktisk kan gjøre videre.
              </p>
            </div>

            <div className="border border-black/15 bg-white/35 p-7 sm:p-9">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/35">
                Status for neste arrangement
              </p>

              <p className="mt-4 text-3xl font-black uppercase tracking-[-0.04em]">
                Ikke åpnet ennå
              </p>

              <p className="mt-4 text-sm leading-6 text-black/55">
                Når venteliste eller restplasser blir aktuelt, vises lenke,
                regler og tilgjengelighet her i stedet for at informasjonen
                publiseres som en separat nyhetssak.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0b0b0b]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="section-kicker">Endringer</p>
              <h2 className="section-title mt-4">
                Én plass
                <br />
                for alt.
              </h2>
            </div>

            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
              <div className="bg-[#0b0b0b] p-7">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/30">
                  Navnebytte
                </p>
                <p className="mt-4 text-lg font-black uppercase tracking-[-0.03em]">
                  Regler & frister
                </p>
                <p className="mt-3 text-sm leading-6 text-white/45">
                  Frist og fremgangsmåte publiseres her når årets regler er klare.
                </p>
              </div>

              <div className="bg-[#0b0b0b] p-7">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/30">
                  Klasse / gruppe
                </p>
                <p className="mt-4 text-lg font-black uppercase tracking-[-0.03em]">
                  Endre opplysninger
                </p>
                <p className="mt-3 text-sm leading-6 text-white/45">
                  Tillatte endringer og kontaktpunkt samles her.
                </p>
              </div>

              <div className="bg-[#0b0b0b] p-7">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/30">
                  Avmelding
                </p>
                <p className="mt-4 text-lg font-black uppercase tracking-[-0.03em]">
                  Hva gjelder?
                </p>
                <p className="mt-3 text-sm leading-6 text-white/45">
                  Eventuelle vilkår for avmelding og refusjon publiseres tydelig.
                </p>
              </div>

              <div className="bg-[#0b0b0b] p-7">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/30">
                  Trenger hjelp?
                </p>
                <p className="mt-4 text-lg font-black uppercase tracking-[-0.03em]">
                  Kontakt påmelding
                </p>
                <p className="mt-3 text-sm leading-6 text-white/45">
                  Riktig kontaktinformasjon legges inn når eksisterende innhold er migrert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#151515]">
        <div className="mx-auto max-w-5xl px-6 py-24 md:px-10 lg:py-32">
          <p className="section-kicker">FAQ</p>
          <h2 className="section-title mt-4">Ofte stilte spørsmål.</h2>

          <div className="mt-12 border-t border-white/10">
            {registration.faq.map((item) => (
              <details
                key={item.question}
                className="group border-b border-white/10"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-black uppercase tracking-[-0.03em]">
                    {item.question}
                  </span>
                  <span className="text-2xl font-light text-white/40 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="max-w-3xl pb-7 text-sm leading-7 text-white/50">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
              Allerede påmeldt?
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] sm:text-5xl">
              Finn startnummer og starttid.
            </h2>
          </div>

          <Link
            href="/resultater"
            className="inline-flex min-h-14 items-center justify-center bg-black px-7 text-sm font-black uppercase tracking-[0.08em] text-white"
          >
            Start & resultater
          </Link>
        </div>
      </section>
    </main>
  );
}
