import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { RunnerProfileData, RunnerProfileResult } from "@/lib/result-profile";

type RunnerProfileProps = {
  profile: RunnerProfileData;
  locale?: Locale;
};

function resultTime(result: RunnerProfileResult) {
  return result.finishTimeText ?? result.timeText ?? "—";
}

function getLatestResult(profile: RunnerProfileData) {
  return profile.results[0] ?? null;
}

function getFirstYear(profile: RunnerProfileData) {
  if (!profile.results.length) return null;
  return profile.results[profile.results.length - 1].year;
}

function isPersonalBest(
  result: RunnerProfileResult,
  profile: RunnerProfileData,
) {
  if (
    profile.personalBestYear &&
    profile.personalBestYear === result.year
  ) {
    return true;
  }

  return (
    profile.personalBestSeconds !== null &&
    result.finishTimeSeconds !== null &&
    profile.personalBestSeconds === result.finishTimeSeconds
  );
}

export default function RunnerProfile({
  profile,
  locale = "no",
}: RunnerProfileProps) {
  const en = locale === "en";
  const latest = getLatestResult(profile);
  const firstYear = getFirstYear(profile);
  const lastYear = latest?.year ?? null;
  const resultCount = profile.results.length;

  const stats = [
    {
      label: en ? "Personal best" : "Personbeste",
      value: profile.personalBestText ?? "—",
      note: profile.personalBestYear
        ? String(profile.personalBestYear)
        : en
          ? "Year not registered"
          : "År ikke registrert",
    },
    {
      label: en ? "Latest result" : "Siste resultat",
      value: latest ? resultTime(latest) : profile.latestTimeText ?? "—",
      note: lastYear
        ? String(lastYear)
        : profile.latestTimeYear
          ? String(profile.latestTimeYear)
          : "—",
    },
    {
      label: en ? "Participations" : "Deltakelser",
      value: String(profile.participationCount ?? resultCount),
      note:
        profile.participationCount && profile.participationCount !== resultCount
          ? en
            ? `${resultCount} result years currently imported`
            : `${resultCount} resultatår er foreløpig importert`
          : en
            ? "Registered results"
            : "Registrerte resultater",
    },
    {
      label: en ? "History" : "Historikk",
      value:
        firstYear && lastYear
          ? firstYear === lastYear
            ? String(firstYear)
            : `${firstYear}–${lastYear}`
          : "—",
      note: profile.genderClass ?? profile.clubCurrent ?? "Stoltzekleiven Opp",
    },
  ];

  return (
    <main className="bg-[#080808] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_22%,rgba(255,255,255,0.1),transparent_22%),linear-gradient(145deg,#181818,#070707_62%)]" />
        <div className="pointer-events-none absolute -right-6 top-20 hidden select-none text-[24vw] font-black leading-none tracking-[-0.09em] text-white/[0.025] lg:block">
          {profile.personalBestText ?? "801"}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
          <Link
            href={en ? "/en/results" : "/resultater"}
            className="text-xs font-black uppercase tracking-[0.16em] text-white/45 transition hover:text-white"
          >
            {en ? "← Back to results" : "← Tilbake til resultater"}
          </Link>

          <p className="section-kicker mt-10">
            {en ? "Stoltzen profile" : "StoltzeProfil"}
          </p>

          <h1 className="mt-5 max-w-5xl text-[clamp(3.7rem,9vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
            {profile.name}
          </h1>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/45">
            {profile.genderClass && <span>{profile.genderClass}</span>}
            {profile.clubCurrent && <span>{profile.clubCurrent}</span>}
            <span>
              {en ? "Profile ID" : "Profil-ID"} {profile.legacyId}
            </span>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b0b0b]">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/10 px-6 py-12 md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:py-16">
          {stats.map((stat) => (
            <article key={stat.label} className="bg-[#0b0b0b] p-6 lg:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                {stat.label}
              </p>
              <p className="mt-5 text-4xl font-black tracking-[-0.06em] sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-xs leading-5 text-white/35">
                {stat.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#e9e8e3] text-black">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                {en ? "Progression" : "Utvikling"}
              </p>
              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl">
                {en ? (
                  <>
                    Year by
                    <br />
                    year.
                  </>
                ) : (
                  <>
                    År for
                    <br />
                    år.
                  </>
                )}
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-black/55">
                {en
                  ? "A compact view of the result history currently migrated from the legacy Stoltzen statistics."
                  : "En kompakt oversikt over resultathistorikken som foreløpig er migrert fra gamle StoltzeStatistikken."}
              </p>
            </div>

            <div className="border-t border-black/15">
              {profile.results.map((result) => (
                <div
                  key={result.resultId}
                  className="grid grid-cols-[72px_1fr_auto] items-center gap-4 border-b border-black/15 py-5 sm:grid-cols-[90px_1fr_auto]"
                >
                  <span className="text-sm font-black">{result.year}</span>
                  <div>
                    <span className="text-sm text-black/45">
                      {result.className ?? profile.genderClass ?? "Stoltzekleiven Opp"}
                    </span>
                    {result.club && (
                      <span className="mt-1 block text-xs text-black/35">
                        {result.club}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {isPersonalBest(result, profile) && (
                      <span className="border border-black/15 px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em]">
                        PB
                      </span>
                    )}
                    <span className="text-2xl font-black tracking-[-0.04em]">
                      {resultTime(result)}
                    </span>
                  </div>
                </div>
              ))}

              {!profile.results.length && (
                <div className="py-10 text-sm text-black/45">
                  {en
                    ? "No yearly results have been imported for this profile yet."
                    : "Ingen årsresultater er importert for denne profilen ennå."}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="section-kicker">
                {en ? "Result history" : "Resultathistorikk"}
              </p>
              <h2 className="section-title mt-4">
                {en ? "Times & splits" : "Tider & mellomtider"}
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-white/40">
              {en
                ? "Bib numbers and placings will appear when the yearly result lists are added to the migration."
                : "Startnummer og plasseringer kommer inn når årsresultatlistene kobles på migreringen."}
            </p>
          </div>

          <div className="mt-10 overflow-x-auto border-t border-white/10">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
                  <th className="px-3 py-4">{en ? "Year" : "År"}</th>
                  <th className="px-3 py-4">{en ? "Finish" : "Sluttid"}</th>
                  <th className="px-3 py-4">{en ? "Split 1" : "Mellomtid 1"}</th>
                  <th className="px-3 py-4">{en ? "Split 2" : "Mellomtid 2"}</th>
                  <th className="px-3 py-4">{en ? "Split 3" : "Mellomtid 3"}</th>
                  <th className="px-3 py-4">{en ? "Place" : "Plass"}</th>
                  <th className="px-3 py-4">{en ? "Bib" : "Startnr."}</th>
                  <th className="px-3 py-4">{en ? "Club" : "Klubb"}</th>
                </tr>
              </thead>
              <tbody>
                {profile.results.map((result) => (
                  <tr
                    key={result.resultId}
                    className="border-b border-white/10 text-white/65"
                  >
                    <td className="px-3 py-5 font-black text-white">
                      {result.year}
                    </td>
                    <td className="px-3 py-5 text-lg font-black text-white">
                      {resultTime(result)}
                    </td>
                    <td className="px-3 py-5">{result.split1Text ?? "—"}</td>
                    <td className="px-3 py-5">{result.split2Text ?? "—"}</td>
                    <td className="px-3 py-5">{result.split3Text ?? "—"}</td>
                    <td className="px-3 py-5">{result.placeRank ?? "—"}</td>
                    <td className="px-3 py-5">{result.bib ?? "—"}</td>
                    <td className="px-3 py-5">{result.club ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-black/40">
              {en ? "Archive migration" : "Arkivmigrering"}
            </p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-black/55">
              {en
                ? "This profile is built from the historical Stoltzen statistics. More fields and older results can be added as the full archive is migrated."
                : "Denne profilen bygges fra den historiske StoltzeStatistikken. Flere felt og eldre resultater kan komme inn etter hvert som hele arkivet migreres."}
            </p>
          </div>

          <Link
            href={en ? "/en/results" : "/resultater"}
            className="inline-flex min-h-13 items-center justify-center bg-black px-6 text-xs font-black uppercase tracking-[0.12em] text-white"
          >
            {en ? "Search another runner" : "Søk etter en annen løper"}
          </Link>
        </div>
      </section>
    </main>
  );
}
