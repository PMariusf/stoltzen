import Link from "next/link";

const cells = ["Start", "Trappene", "Mål", "Publikum"];

export default function GallerySection() {
  return (
    <section className="bg-[#090909] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Stoltzen i bilder</p>
            <h2 className="section-title mt-4">Se løpet. Finn øyeblikket.</h2>
          </div>
          <Link href="/bilder" className="text-link inline-flex">
            Se bildegalleri <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-4">
          {cells.map((cell, index) => (
            <div
              key={cell}
              className={`gallery-placeholder relative overflow-hidden border border-white/10 ${index === 0 ? "col-span-2 row-span-2 min-h-[360px] md:min-h-[460px]" : "min-h-[175px] md:min-h-[225px]"}`}
            >
              <span className="absolute bottom-5 left-5 text-xs font-black uppercase tracking-[0.2em] text-white/55">{cell}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-white/35">Bildene kobles til når fotoarkivet migreres.</p>
      </div>
    </section>
  );
}
