import type { Locale } from "@/lib/i18n";

const partnerGroups = [
  "StoltzeLauget",
  "KlatreLauget",
  "Arenareklame",
  "ForsyningsLauget",
  "AfterStoltz",
];

export default function PartnersSection({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section className="border-t border-black/10 bg-[#ecebe6] text-black">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/65">
              {en ? "Partners" : "Samarbeidspartnere"}
            </p>
            <h2 className="mt-4 text-[2.75rem] font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl">
              {en ? (
                <>Built together.<br />Year after year.</>
              ) : (
                <>Skapt sammen.<br />År etter år.</>
              )}
            </h2>
          </div>

          <p className="max-w-xl text-lg leading-8 text-black/70">
            {en
              ? "Partners, volunteers and the local community help make Stoltzekleiven Opp possible."
              : "Samarbeidspartnere, frivillige og lokalmiljøet er med på å gjøre Stoltzekleiven Opp mulig."}
          </p>
        </div>

        <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {partnerGroups.map((partner) => (
            <div
              key={partner}
              className="flex min-h-28 items-center justify-center border border-black/15 bg-white/35 px-5 text-center"
            >
              <span className="text-sm font-black uppercase tracking-[0.08em]">
                {partner}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 border border-black/15 bg-black p-6 text-white md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/75">
              Löplabbet
            </p>
            <p className="mt-2 text-xl font-black uppercase tracking-[-0.03em]">
              {en ? "Shoes & running apparel" : "Sko & løpebekledning"}
            </p>
          </div>

          <a
            href="mailto:StoltzeSponsor@gmail.com"
            className="inline-flex min-h-13 items-center justify-center border border-white/30 px-6 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-black"
          >
            {en ? "Become a partner" : "Bli samarbeidspartner"} <span className="ml-3" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
