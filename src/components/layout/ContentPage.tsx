import Link from "next/link";

type ContentPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function ContentPage({ eyebrow, title, description }: ContentPageProps) {
  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-10 md:pt-44">
        <p className="section-kicker">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-6xl font-black uppercase leading-[0.86] tracking-[-0.065em] sm:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">{description}</p>
        <Link href="/" className="text-link mt-10 inline-flex">
          Til forsiden <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
