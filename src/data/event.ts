export const event = {
  name: "Stoltzekleiven Opp",
  location: "Bergen",
  year: 2026,
  dateLabel: "25.–26. september 2026",
  dateLabelEn: "25–26 September 2026",
  registrationOpen: "2026-05-28T07:00:00+02:00",
  eventStart: "2026-09-25T00:00:00+02:00",
  eventEnd: "2026-09-26T23:59:59+02:00",
  registrationStatus: "sold-out" as "open" | "sold-out" | "closed",
  nextEvent: {
    year: 2027,
    registrationOpen: null as string | null,
  },
  stats: {
    steps: 801,
    elevation: 315,
    distance: "0,9 km",
    since: 1979,
  },
  records: {
    men: {
      name: "Stian Øvergaard Aarvik",
      time: "7:46",
      year: 2019,
    },
    women: {
      name: "Kristin Størmer Steira",
      time: "9:35",
      year: 2013,
    },
  },
  links: {
    registration: "/pamelding",
    startAndResults: "/resultater",
    latestResults: "/resultater/2026",
    practicalInfo: "/praktisk-info",
    gallery: "/bilder",
    race: "/lopet",
    preparation: "/forberedelser",
    history: "/historie",
  },
} as const;
