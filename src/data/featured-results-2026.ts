export type Featured2026Result = {
  place: number;
  name: string;
  time: string;
  club?: string;
};

export const featured2026 = {
  men: [
    { place: 1, name: "Per-Christian Grieg", time: "8:10", club: "Varegg IL" },
    { place: 2, name: "Anders Sommer", time: "8:19", club: "Varegg IL" },
    { place: 3, name: "Stian Angermund", time: "8:29", club: "Varegg IL" },
  ],
  women: [
    { place: 1, name: "Karoline Holsen Kyte", time: "10:08" },
    { place: 2, name: "Emma Julie Dyrhovden", time: "10:41" },
    { place: 3, name: "Mari Fosse Vaksdal", time: "10:58" },
  ],
} satisfies Record<"men" | "women", Featured2026Result[]>;

// These are externally verified 2026 podium results, not records imported into
// runners/results. Do not assign legacy IDs from names alone.
export const featured2026Sources = {
  official: "https://stoltzen.no/",
  report: "https://www.kondis.no/resultater/resultater-stoltzekleiven-opp-2026/1592587",
};
