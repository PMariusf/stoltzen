import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

const galleryImages = [
  {
    src: "https://cdn.prod.website-files.com/68cbafa2a0c398cc2ffa1a2d/68d67975a48ce6a5e6332071_IMG_7157.jpeg",
    no: "Løpsdagen",
    en: "Race day",
    position: "center 38%",
  },
  {
    src: "https://cdn.prod.website-files.com/68cbafa2a0c398cc2ffa1a2d/68d68dc1df94cf9a583d05b4_stoltzen6.jpg",
    no: "Trappene",
    en: "The steps",
    position: "center",
  },
  {
    src: "https://cdn.prod.website-files.com/68cbafa2a0c398cc2ffa1a2d/68d6796d7b0a70ed59f74bf8_IMG_7156.jpeg",
    no: "Stemningen",
    en: "The atmosphere",
    position: "center 42%",
  },
  {
    src: "https://cdn.prod.website-files.com/68cbafa2a0c398cc2ffa1a2d/68d68dcaa48ce6a5e63f41a5_stoltzen3.jpg",
    no: "Mot toppen",
    en: "To the top",
    position: "center",
  },
];

export default function GallerySection({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section className="bg-[#090909] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">{en ? "Stoltzen in photos" : "Stoltzen i bilder"}</p>
            <h2 className="section-title mt-4">
              {en ? "See the race. Feel the climb." : "Se løpet. Kjenn bakken."}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/48">
              {en
                ? "Real moments from Stoltzekleiven Opp — the steps, the effort and the atmosphere around the race."
                : "Ekte øyeblikk fra Stoltzekleiven Opp — trappene, innsatsen og stemningen rundt løpet."}
            </p>
          </div>
          <Link href={en ? "/en/photos" : "/bilder"} className="text-link inline-flex">
            {en ? "View gallery" : "Se bildegalleri"} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-4">
          {galleryImages.map((image, index) => (
            <figure
              key={image.src}
              className={`group relative overflow-hidden border border-white/10 bg-[#151515] ${
                index === 0
                  ? "col-span-2 row-span-2 min-h-[360px] md:min-h-[460px]"
                  : "min-h-[175px] md:min-h-[225px]"
              }`}
            >
              <Image
                src={image.src}
                alt={en ? image.en : image.no}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
                }
                className="object-cover grayscale-[18%] transition duration-700 group-hover:scale-[1.035] group-hover:grayscale-0"
                style={{ objectPosition: image.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <figcaption className="absolute bottom-5 left-5 text-xs font-black uppercase tracking-[0.2em] text-white/75">
                {en ? image.en : image.no}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-4 text-xs text-white/30">
          {en
            ? "Preview images from Stoltzekleiven Opp 2025. The final gallery can later be connected to the official photo archive."
            : "Visningsbilder fra Stoltzekleiven Opp 2025. Det endelige galleriet kan senere kobles mot det offisielle fotoarkivet."}
        </p>
      </div>
    </section>
  );
}
