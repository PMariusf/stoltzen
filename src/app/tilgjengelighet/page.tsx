import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tilgjengelighet",
  description: "Informasjon om universell utforming og tilgjengelighetsarbeidet på Stoltzen-nettsiden.",
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-36 md:px-10 md:pt-44">
        <p className="section-kicker">Universell utforming</p>
        <h1 className="mt-5 break-words text-[clamp(2.75rem,7vw,5.5rem)] font-black uppercase leading-[0.95] tracking-[-0.055em]">Tilgjengelighet</h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-white/80">
          Vi ønsker at Stoltzen-nettsiden skal kunne brukes av flest mulig, uavhengig av
          funksjonsevne, hjelpemidler eller skjermstørrelse.
        </p>
        <p className="mt-5 text-sm leading-7 text-white/75">
          Sist gjennomgått: 1. november 2026. Dette er en foreløpig tilgjengelighetsstatus,
          ikke en formelt godkjent tilgjengelighetserklæring.
        </p>

        <div className="mt-12 space-y-10">
          <section aria-labelledby="status-heading">
            <h2 id="status-heading" className="text-2xl font-black uppercase">Status for arbeidet</h2>
            <p className="mt-4 leading-8 text-white/80">
              Nettsiden er under utvikling. Vi har gjennomgått deler av kildekoden og forbedret
              tastaturnavigasjon, fokusmarkering og informasjon om aktivt menypunkt. En fullstendig
              kontroll opp mot WCAG-kravene er ennå ikke gjennomført. Vi kan derfor ikke
              bekrefte full samsvar med kravene til universell utforming.
            </p>
          </section>
          <section aria-labelledby="known-heading">
            <h2 id="known-heading" className="text-2xl font-black uppercase">Det vi undersøker videre</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-white/80">
              <li>Kontrast i mindre tekster og etiketter, i både lys og mørk visning.</li>
              <li>Bruk med skjermleser og tastatur på alle sidene.</li>
              <li>Lesbarhet og navigasjon ved høy zoom og på små skjermer.</li>
              <li>Tilgjengelighet i resultatsøk, filtre, tabeller og interaktive løypegrafer.</li>
            </ul>
          </section>
          <section aria-labelledby="feedback-heading">
            <h2 id="feedback-heading" className="text-2xl font-black uppercase">Gi oss tilbakemelding</h2>
            <p className="mt-4 leading-8 text-white/80">
              Opplever du at noe på nettstedet er vanskelig å bruke, setter vi pris på at du
              kontakter arrangøren via de offisielle kontaktkanalene for Stoltzekleiven Opp.
              Fortell gjerne hvilken side det gjelder, og hva som ikke fungerer.
            </p>
            <Link href="/" className="mt-6 inline-flex min-h-11 items-center border border-white/45 px-5 py-3 font-bold underline underline-offset-4 hover:bg-white hover:text-black">
              Til forsiden
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}
