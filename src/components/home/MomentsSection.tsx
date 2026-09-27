import Image from "next/image";
import type { Locale } from "@/lib/i18n";

const images = [
  {
    src: "https://cdn.prod.website-files.com/68cbafa2a0c398cc2ffa1a2d/68d67887f2ed208026f4fa97_image0000021.jpeg",
    no: "På vei opp",
    en: "On the way up",
    position: "center",
  },
  {
    src: "https://cdn.prod.website-files.com/68cbafa2a0c398cc2ffa1a2d/68d6787f1468b69b93202587_image0000011.jpeg",
    no: "Stoltzen-stemning",
    en: "Stoltzen atmosphere",
    position: "center",
  },
  {
    src: "https://cdn.prod.website-files.com/68cbafa2a0c398cc2ffa1a2d/68d68ddf3548c2c6ae929b6c_stoltzen2.jpg",
    no: "Løpsdagen",
    en: "Race day",
    position: "center",
  },
];

export default function MomentsSection({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section className="always-dark-surface overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 md:px-10 md:py-6">
        <div className="grid gap-2 md:grid-cols-[1.45fr_0.8fr_0.8fr]">
          {images.map((image, index) => (
            <figure
              key={image.src}
              className={`group relative overflow-hidden border border-white/10 ${
                index === 0
                  ? "min-h-[300px] sm:min-h-[360px] md:min-h-[430px]"
                  : "min-h-[220px] md:min-h-[430px]"
              }`}
            >
              <Image
                src={image.src}
                alt={en ? image.en : image.no}
                fill
                sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
                className="object-cover grayscale-[12%] transition duration-700 group-hover:scale-[1.025] group-hover:grayscale-0"
                style={{ objectPosition: image.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <figcaption className="absolute bottom-5 left-5 text-xs font-black uppercase tracking-[0.18em] text-white/90">
                {en ? image.en : image.no}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
