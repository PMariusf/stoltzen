import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div>
          <p className="text-2xl font-black uppercase tracking-[-0.04em]">Stoltzekleiven Opp</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/55">
            Bergens motbakkeløp siden 1979. Arrangert av Varegg.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">Snarveier</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <Link href="/pamelding" className="hover:text-white">Påmelding</Link>
            <Link href="/resultater" className="hover:text-white">Resultater</Link>
            <Link href="/praktisk-info" className="hover:text-white">Praktisk info</Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">Mer</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <span>Kontakt</span>
            <span>Presse</span>
            <span>Personvern</span>
            <span>Samarbeidspartnere</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs uppercase tracking-[0.18em] text-white/35">
        Stoltzekleiven Opp · Bergen
      </div>
    </footer>
  );
}
