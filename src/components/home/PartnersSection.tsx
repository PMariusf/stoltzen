import type { Locale } from "@/lib/i18n";

export default function PartnersSection({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section className="border-t border-black/10 bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
              {en ? "Partners" : "Samarbeidspartnere"}
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em]">
              {en ? "One clear partner section." : "Én ryddig partnerseksjon."}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-black/50">
            {en
              ? "Main partner, partners and suppliers are gathered here with consistent visual treatment. Existing partner logos will be added during migration."
              : "Hovedpartner, partnere og leverandører samles her med lik visuell behandling. Eksisterende partnerlogoer legges inn etter migrering."}
          </p>
        </div>
      </div>
    </section>
  );
}
