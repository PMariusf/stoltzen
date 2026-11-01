import type { Locale } from "@/lib/i18n";

type VerifiedResult = {
  id: number;
  category: "men" | "women";
  overall_place: number;
  name: string;
  club: string | null;
  class_name: string | null;
  finish_time_text: string;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

async function getVerified2026(): Promise<VerifiedResult[]> {
  if (!url || !key) throw new Error("Supabase configuration is missing.");
  const query = new URLSearchParams({
    select: "id,category,overall_place,name,club,class_name,finish_time_text",
    order: "overall_place.asc",
    limit: "200",
  });
  const response = await fetch(`${url}/rest/v1/verified_results_2026?${query}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`2026 results request failed (${response.status})`);
  return (await response.json()) as VerifiedResult[];
}

export default async function Verified2026Results({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";
  let results: VerifiedResult[] = [];
  let error = false;
  try {
    results = await getVerified2026();
  } catch {
    error = true;
  }

  return (
    <section className="border-b border-white/10 bg-[#121212]">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <p className="section-kicker">{en ? "2026 results" : "2026-resultater"}</p>
        <h2 className="mt-4 text-3xl font-black uppercase sm:text-4xl">
          {en ? "Verified top finishers" : "Bekreftede toppresultater"}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-white/55">
          {en
            ? "A selected top-10 list for women and men. Imported into a separate table while historical athlete IDs are being checked. Not the full field."
            : "Et utvalg med topp 10 for kvinner og menn. Importert til en egen tabell mens historiske løper-ID-er kontrolleres. Ikke en komplett resultatliste."}
        </p>
        {error ? (
          <p role="alert" className="mt-7 border border-white/20 p-5 text-sm text-white/70">
            {en ? "The 2026 results could not be loaded right now." : "Kunne ikke laste 2026-resultatene akkurat nå."}
          </p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {(["men", "women"] as const).map((category) => (
              <div key={category} className="border border-white/15 p-5 sm:p-7">
                <h3 className="text-xl font-black uppercase">
                  {category === "men" ? (en ? "Men" : "Menn") : (en ? "Women" : "Kvinner")}
                </h3>
                <ol className="mt-5 divide-y divide-white/10">
                  {results.filter(item => item.category === category).map((item) => (
                    <li key={item.id} className="flex items-center gap-3 py-4">
                      <span className="w-7 text-lg font-black text-[#f5a443]">{item.overall_place}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-xs text-white/45">{[item.club, item.class_name].filter(Boolean).join(" · ")}</p>
                      </div>
                      <strong className="text-xl tabular-nums">{item.finish_time_text}</strong>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}
        <p className="mt-6 text-sm text-white/60">
          {en ? "Sources" : "Kilder"}: <a className="underline underline-offset-4 hover:text-white" href="https://www.kondis.no/resultater/resultater-stoltzekleiven-opp-2026/1592587" target="_blank" rel="noopener noreferrer">Kondis</a> · <a className="underline underline-offset-4 hover:text-white" href="https://www.sportsidioten.no/lop/stoltzekleiven-opp-2026-stoltzen/" target="_blank" rel="noopener noreferrer">Sportsidioten</a>
        </p>
      </div>
    </section>
  );
}
