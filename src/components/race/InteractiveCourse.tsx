"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

type Checkpoint = {
  key: string;
  horizontal: number;
  climb: number;
  x: number;
  y: number;
  labelNo: string;
  labelEn: string;
  titleNo: string;
  titleEn: string;
  descriptionNo: string;
  descriptionEn: string;
};

const checkpoints: Checkpoint[] = [
  {
    key: "start", horizontal: 0, climb: 0, x: 116, y: 390,
    labelNo: "Start", labelEn: "Start", titleNo: "Fjellveien", titleEn: "Fjellveien",
    descriptionNo: "Startstreken ligger i Fjellveien. Tidtakingen begynner når løperen passerer under Stoltzekleiven-skiltet.",
    descriptionEn: "The starting line is on Fjellveien. Timing begins when runners pass the Stoltzekleiven sign.",
  },
  {
    key: "split1", horizontal: 270, climb: 50, x: 262, y: 318,
    labelNo: "Mellomtid 1", labelEn: "Split 1", titleNo: "Mellom furuene", titleEn: "Between the pine trees",
    descriptionNo: "Den første mellomtiden registreres mellom to furutrær etter den første krevende delen av trappene.",
    descriptionEn: "The first split is recorded between two pine trees after the first demanding section of steps.",
  },
  {
    key: "split2", horizontal: 495, climb: 145, x: 395, y: 239,
    labelNo: "Mellomtid 2", labelEn: "Split 2", titleNo: "Halvveis i klatringen", titleEn: "Midway up the climb",
    descriptionNo: "Ved den andre mellomtiden har du lagt bak deg 495 horisontale meter og steget 145 meter fra start.",
    descriptionEn: "At the second split, you have covered 495 horizontal metres and climbed 145 metres from the start.",
  },
  {
    key: "split3", horizontal: 745, climb: 260, x: 545, y: 151,
    labelNo: "Mellomtid 3", labelEn: "Split 3", titleNo: "Før siste bratte parti", titleEn: "Before the final steep stretch",
    descriptionNo: "Den tredje mellomtiden kommer etter 745 horisontale meter. Her gjenstår den siste krevende stigningen.",
    descriptionEn: "The third split comes after 745 horizontal metres. The final steep ascent still lies ahead.",
  },
  {
    key: "finish", horizontal: 840, climb: 300, x: 659, y: 83,
    labelNo: "Mål", labelEn: "Finish", titleNo: "Sandvikspilen", titleEn: "Sandvikspilen",
    descriptionNo: "Målet ligger ved Sandvikspilen. Den offisielle løypeprofilen angir 300 høydemeter og rundt 900 meter i terrenget.",
    descriptionEn: "The finish is by Sandvikspilen. The official profile lists 300 metres of ascent and roughly 900 metres on the ground.",
  },
];

const routePath = "M116 390 C154 380 188 354 262 318 S343 266 395 239 S482 201 545 151 S629 107 659 83";
const routePartial = [
  "M116 390",
  "M116 390 C154 380 188 354 262 318",
  "M116 390 C154 380 188 354 262 318 S343 266 395 239",
  "M116 390 C154 380 188 354 262 318 S343 266 395 239 S482 201 545 151",
  routePath,
];

export default function InteractiveCourse({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";
  const [selected, setSelected] = useState(0);
  const point = checkpoints[selected];
  const previous = selected > 0 ? checkpoints[selected - 1] : null;
  const segmentHorizontal = previous ? point.horizontal - previous.horizontal : 0;
  const segmentClimb = previous ? point.climb - previous.climb : 0;
  const progress = Math.round(point.horizontal / 840 * 100);

  return (
    <section className="course-map-panel always-dark-surface overflow-hidden border border-white/15 bg-[#0a0f12] text-white" aria-labelledby="course-map-heading">
      <div className="border-b border-white/10 px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#fbbf78]">
              {en ? "Explore the race" : "Utforsk løypen"}
            </p>
            <h3 id="course-map-heading" className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">
              {en ? "From Fjellveien to Sandvikspilen" : "Fra Fjellveien til Sandvikspilen"}
            </h3>
          </div>
          <div className="flex gap-2 text-xs font-bold">
            <span className="border border-white/25 px-3 py-2">≈ 900 m</span>
            <span className="border border-white/25 px-3 py-2">+300 m</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,1fr)]">
        <div className="relative min-w-0 border-b border-white/10 bg-[#0c1316] p-3 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="pointer-events-none absolute inset-0 opacity-60" style={{
            backgroundImage: "radial-gradient(circle at 65% 38%, rgba(79,126,113,0.15), transparent 45%), repeating-linear-gradient(0deg, transparent 0, transparent 45px, rgba(255,255,255,0.025) 46px), repeating-linear-gradient(90deg, transparent 0, transparent 45px, rgba(255,255,255,0.025) 46px)",
          }} />
          <svg
            viewBox="0 0 760 485"
            role="img"
            aria-label={en
              ? "Schematic route diagram with five checkpoints from Fjellveien at the bottom left to Sandvikspilen at the top right. The highlighted line shows progress to the selected checkpoint, not the geographic course."
              : "Skjematisk løypeillustrasjon med fem målepunkter fra Fjellveien nederst til venstre til Sandvikspilen øverst til høyre. Den markerte linjen viser progresjon til valgt målepunkt, ikke geografisk trase."}
            className="relative h-auto w-full"
          >
            <defs>
              <linearGradient id="route-progress-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#fcd34d" />
              </linearGradient>
            </defs>
            {Array.from({ length: 9 }, (_, i) => (
              <path
                key={i}
                d={`M${-50 + i * 65} 485 C${80 + i * 65} 370 ${-30 + i * 65} 250 ${160 + i * 65} 120 S${300 + i * 65} -20 ${430 + i * 65} -30`}
                fill="none"
                stroke="#9ab5aa"
                strokeWidth="1.2"
                strokeOpacity="0.17"
              />
            ))}
            <path d={routePath} fill="none" stroke="#020608" strokeWidth="23" strokeLinecap="round" />
            <path d={routePath} fill="none" stroke="#667b7d" strokeWidth="11" strokeLinecap="round" strokeDasharray="2 18" />
            <path d={routePartial[selected]} fill="none" stroke="url(#route-progress-gradient)" strokeWidth="9" strokeLinecap="round" />
            {checkpoints.map((checkpoint, index) => {
              const active = selected === index;
              const visited = index <= selected;
              return (
                <g key={checkpoint.key} aria-hidden="true">
                  {active && <circle cx={checkpoint.x} cy={checkpoint.y} r="22" fill="#fbbf24" fillOpacity=".16" />}
                  <circle cx={checkpoint.x} cy={checkpoint.y} r={active ? "12" : "9"} fill={visited ? "#fbbf24" : "#192d32"} stroke={visited ? "#fef3c7" : "#8ba7ab"} strokeWidth="3" />
                  <text x={checkpoint.x} y={checkpoint.y + 4} textAnchor="middle" fontSize="10" fontWeight="900" fill={visited ? "#111827" : "#ffffff"}>{index + 1}</text>
                  <text x={checkpoint.x} y={checkpoint.y - (active ? 31 : 25)} textAnchor="middle" fontSize="12" fontWeight="800" fill={active ? "#fcd34d" : "#e2e8f0"}>
                    {en ? checkpoint.labelEn : checkpoint.labelNo}
                  </text>
                </g>
              );
            })}
            <text x="33" y="447" fill="#e2e8f0" fontSize="15" fontWeight="700">Fjellveien</text>
            <text x="715" y="39" fill="#e2e8f0" fontSize="15" fontWeight="700" textAnchor="end">Sandvikspilen</text>
            <text x="380" y="470" fill="#a5bbc0" fontSize="11" textAnchor="middle">
              {en ? "SCHEMATIC · NOT TO SCALE" : "SKJEMATISK · IKKE I MÅLESTOKK"}
            </text>
          </svg>
          <div className="relative mt-1 flex justify-between gap-3 text-xs text-white/75">
            <span>{en ? "START" : "START"}</span>
            <span>{en ? "Ascent" : "Stigning"} <span aria-hidden="true">↗</span></span>
            <span>{en ? "FINISH" : "MÅL"}</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 px-5 py-6 sm:px-7 sm:py-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fbbf78]">{en ? point.labelEn : point.labelNo} · {selected + 1}/5</p>
            <h4 className="mt-3 text-2xl font-black uppercase tracking-tight">{en ? point.titleEn : point.titleNo}</h4>
            <p aria-live="polite" aria-atomic="true" className="mt-4 min-h-20 text-sm leading-7 text-white/80">
              {en ? point.descriptionEn : point.descriptionNo}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="border border-white/20 bg-white/[0.04] p-4">
                <span className="text-xs text-white/75">{en ? "Horizontal distance" : "Horisontal avstand"}</span>
                <p className="mt-2 text-2xl font-black">{point.horizontal} m</p>
              </div>
              <div className="border border-white/20 bg-white/[0.04] p-4">
                <span className="text-xs text-white/75">{en ? "Climbed" : "Høydemeter"}</span>
                <p className="mt-2 text-2xl font-black">+{point.climb} m</p>
              </div>
            </div>
            {previous && (
              <p className="mt-3 text-xs leading-6 text-white/75">
                {en ? "Since previous point" : "Fra forrige punkt"}: {segmentHorizontal} m {en ? "horizontal" : "horisontalt"} · +{segmentClimb} m
              </p>
            )}
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider text-white/75">
              <span>{en ? "Course progress" : "Løypeprogresjon"}</span><span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden bg-white/20" role="progressbar" aria-label={en ? "Selected checkpoint progress" : "Progresjon til valgt målepunkt"} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
              <div className="h-full bg-[#fbbf24] transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-5 flex gap-2">
              <button type="button" disabled={selected === 0} onClick={() => setSelected((value) => Math.max(0, value - 1))}
                className="min-h-11 flex-1 border border-white/30 px-3 py-2 text-sm font-bold text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40">
                {en ? "Previous" : "Forrige"}
              </button>
              <button type="button" disabled={selected === checkpoints.length - 1} onClick={() => setSelected((value) => Math.min(checkpoints.length - 1, value + 1))}
                className="min-h-11 flex-1 bg-[#fbbf24] px-3 py-2 text-sm font-black text-[#111827] hover:bg-[#fde68a] disabled:cursor-not-allowed disabled:opacity-40">
                {en ? "Next point" : "Neste punkt"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-3 sm:grid-cols-5 sm:p-4" role="group" aria-label={en ? "Select route checkpoint" : "Velg målepunkt i løypen"}>
        {checkpoints.map((checkpoint, index) => (
          <button
            key={checkpoint.key}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            className={`min-h-16 border px-3 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${selected === index ? "border-[#fbbf24] bg-[#fbbf24] text-[#111827]" : "border-white/25 bg-white/[0.03] text-white hover:border-[#fbbf24]"}`}
          >
            <span className="block text-xs font-black">{String(index + 1).padStart(2, "0")} · {en ? checkpoint.labelEn : checkpoint.labelNo}</span>
            <span className={`mt-1 block text-xs ${selected === index ? "text-[#374151]" : "text-white/75"}`}>{checkpoint.horizontal} m</span>
          </button>
        ))}
      </div>
      <p className="border-t border-white/10 px-5 py-4 text-xs leading-6 text-white/75 sm:px-8">
        {en
          ? "The shape of the illustrated route is not based on GPS data. Checkpoint distances and ascent come from the organiser's published course profile."
          : "Kartlinjen er en illustrasjon, ikke et GPS-spor. Målepunktenes avstander og stigning er hentet fra arrangørens publiserte løypeprofil."}{" "}
        <a className="font-bold underline underline-offset-4 hover:text-white" href="https://stoltzen.no/index.php?Itemid=35&id=4&option=com_content&view=article" target="_blank" rel="noreferrer noopener">
          {en ? "Official course profile" : "Offisiell løypeprofil"}
        </a>
      </p>
    </section>
  );
}
