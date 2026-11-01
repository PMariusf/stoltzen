"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

// Official Stoltzekleiven Opp course-profile checkpoints:
// https://stoltzen.no/index.php?Itemid=35&id=4&option=com_content&view=article
// Distances are horizontal metres from start; elevation is cumulative climb.
// This is a measured-checkpoint profile, NOT a GPS track or continuous survey.
const checkpoints = [
  { nameNo: "Start", nameEn: "Start", distance: 0, climb: 0, terrain: 0 },
  { nameNo: "Mellomtid 1", nameEn: "Split 1", distance: 270, climb: 50, terrain: 275 },
  { nameNo: "Mellomtid 2", nameEn: "Split 2", distance: 495, climb: 145, terrain: 516 },
  { nameNo: "Mellomtid 3", nameEn: "Split 3", distance: 745, climb: 260, terrain: 789 },
  { nameNo: "Mål", nameEn: "Finish", distance: 840, climb: 300, terrain: 900 },
] as const;

const WIDTH = 760;
const HEIGHT = 330;
const L = 65;
const R = 25;
const T = 32;
const B = 48;
const x = (distance: number) => L + distance / 840 * (WIDTH - L - R);
const y = (height: number) => HEIGHT - B - height / 300 * (HEIGHT - T - B);
const coords = checkpoints.map(point => `${x(point.distance)},${y(point.climb)}`).join(" ");

export default function MeasuredCourseProfile({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";
  const [selected, setSelected] = useState(0);
  const point = checkpoints[selected];
  const previous = selected > 0 ? checkpoints[selected - 1] : null;
  const climbSegment = previous ? point.climb - previous.climb : null;
  const horizontalSegment = previous ? point.distance - previous.distance : null;
  const gradient = climbSegment !== null && horizontalSegment ? (100 * climbSegment / horizontalSegment).toFixed(1) : null;

  return (
    <section className="bg-[#111] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-24">
        <p className="section-kicker">{en ? "Official measured checkpoints" : "Offisielle målepunkter"}</p>
        <h2 className="section-title mt-4">{en ? "The climb, in numbers." : "Stigningen, punkt for punkt."}</h2>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60">
          {en
            ? "Based on the published course profile for Stoltzekleiven Opp. Select a split to inspect the climb and horizontal distance."
            : "Basert på den publiserte løypeprofilen for Stoltzekleiven Opp. Velg en mellomtid for å se stigning og horisontal avstand."}
        </p>

        <div className="mt-9 overflow-hidden border border-white/15 bg-[#090909] p-4 sm:p-8">
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={en ? "Elevation chart with five official checkpoints, showing cumulative ascent from 0 to 300 metres" : "Høydeprofil med fem offisielle målepunkter, viser stigning fra 0 til 300 meter"} className="w-full">
            {[0, 100, 200, 300].map(height => (
              <g key={height}>
                <line x1={L} x2={WIDTH-R} y1={y(height)} y2={y(height)} stroke="#fff" strokeOpacity=".12" strokeDasharray="5 5" />
                <text x={L-12} y={y(height)+4} textAnchor="end" fill="#aaa" fontSize="12">+{height} m</text>
              </g>
            ))}
            <polygon points={`${x(0)},${y(0)} ${coords} ${x(840)},${HEIGHT-B}`} fill="#f59e0b" fillOpacity=".12" />
            <polyline points={coords} fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
            {checkpoints.map((p, i) => (
              <g key={p.distance}>
                <circle cx={x(p.distance)} cy={y(p.climb)} r={selected === i ? 9 : 5} fill={selected === i ? "#fff" : "#f59e0b"} stroke="#b45309" strokeWidth="2" />
                <text x={x(p.distance)} y={HEIGHT - 17} fill={selected === i ? "#fff" : "#999"} fontSize="12" textAnchor="middle">{p.distance}m</text>
              </g>
            ))}
          </svg>
          <p className="mt-2 text-xs leading-5 text-white/45">
            {en
              ? "Straight lines connect verified checkpoints; actual gradient between points varies. The official profile uses 300 m of cumulative ascent."
              : "Rette linjer forbinder verifiserte målepunkter; faktisk stigning varierer mellom dem. Den offisielle profilen bruker 300 høydemeter."}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5" aria-label={en ? "Select checkpoint" : "Velg målepunkt"}>
            {checkpoints.map((p, i) => (
              <button key={p.distance} type="button" aria-pressed={i===selected} onClick={() => setSelected(i)}
                className={`min-h-12 border px-3 py-3 text-left text-xs font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${selected===i ? "border-amber-500 bg-amber-500 text-black" : "border-white/20 hover:border-white/60"}`}>
                {en ? p.nameEn : p.nameNo}
              </button>
            ))}
          </div>
          <div aria-live="polite" className="mt-6 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-3">
            <div><p className="text-xs text-white/50">{en ? "Horizontal distance" : "Horisontal avstand"}</p><p className="mt-2 text-3xl font-black">{point.distance} m</p></div>
            <div><p className="text-xs text-white/50">{en ? "Ascent from start" : "Stigning fra start"}</p><p className="mt-2 text-3xl font-black">+{point.climb} m</p></div>
            <div><p className="text-xs text-white/50">{en ? "Average segment gradient" : "Gjennomsnittlig etappestigning"}</p><p className="mt-2 text-3xl font-black">{gradient === null ? "—" : `${gradient}%`}</p></div>
          </div>
        </div>
        <p className="mt-5 text-xs text-white/50">
          {en ? "Source: " : "Kilde: "}
          <a href="https://stoltzen.no/index.php?Itemid=35&id=4&option=com_content&view=article" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">
            {en ? "Stoltzen official course profile" : "Stoltzen – offisiell løypeprofil"}
          </a>.
          {en ? " This chart is not a georeferenced GPS track." : " Denne grafen er ikke et geografisk GPS-spor."}
        </p>
      </div>
    </section>
  );
}
