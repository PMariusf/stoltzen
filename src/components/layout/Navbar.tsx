import Link from "next/link";
import { navigation } from "@/data/navigation";
import { event } from "@/data/event";

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 text-white backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="text-xl font-black uppercase tracking-[-0.04em] sm:text-2xl">
          Stoltzen
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Hovedmeny">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/75 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={event.links.registration}
          className="hidden min-h-11 items-center bg-white px-5 text-sm font-black uppercase tracking-[0.08em] text-black transition hover:bg-white/80 xl:inline-flex"
        >
          Påmelding
        </Link>

        <details className="group relative xl:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center border border-white/25 bg-black/20 [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Åpne meny</span>
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
            </span>
          </summary>

          <div className="absolute right-0 top-14 w-[min(88vw,340px)] border border-white/10 bg-neutral-950 p-3 shadow-2xl">
            <nav className="flex flex-col" aria-label="Mobilmeny">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-white/10 px-4 py-3.5 text-sm font-semibold text-white/80 last:border-b-0 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={event.links.registration}
                className="mt-3 bg-white px-4 py-3.5 text-center text-sm font-black uppercase tracking-[0.08em] text-black"
              >
                Påmelding
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
