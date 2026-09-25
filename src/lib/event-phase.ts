import { event } from "@/data/event";

export type EventPhase =
  | "before-registration"
  | "registration"
  | "sold-out"
  | "race-week"
  | "live"
  | "finished";

export function getEventPhase(now = new Date()): EventPhase {
  const registrationOpen = new Date(event.registrationOpen);
  const eventStart = new Date(event.eventStart);
  const eventEnd = new Date(event.eventEnd);

  if (now >= eventStart && now <= eventEnd) return "live";
  if (now > eventEnd) return "finished";

  const raceWeekStart = new Date(eventStart);
  raceWeekStart.setDate(raceWeekStart.getDate() - 7);

  if (now >= raceWeekStart) return "race-week";
  if (now < registrationOpen) return "before-registration";
  if (event.registrationStatus === "sold-out") return "sold-out";

  return "registration";
}

export function getPhaseContent(phase: EventPhase) {
  switch (phase) {
    case "before-registration":
      return {
        eyebrow: "Neste steg",
        primaryLabel: "Se påmeldingsinfo",
        primaryHref: event.links.registration,
        status: "Påmeldingen åpner 28. mai kl. 07:00",
      };
    case "registration":
      return {
        eyebrow: "Påmeldingen er åpen",
        primaryLabel: "Meld deg på",
        primaryHref: event.links.registration,
        status: "Sikre deg startplass",
      };
    case "sold-out":
      return {
        eyebrow: "Fulltegnet",
        primaryLabel: "Venteliste & restplasser",
        primaryHref: event.links.registration,
        status: "Se informasjon om venteliste",
      };
    case "race-week":
      return {
        eyebrow: "Løpsuke",
        primaryLabel: "Start & praktisk info",
        primaryHref: event.links.practicalInfo,
        status: "Finn startnummer og gjør deg klar",
      };
    case "live":
      return {
        eyebrow: "LIVE i Bergen",
        primaryLabel: "Start & resultater",
        primaryHref: event.links.startAndResults,
        status: "Stoltzekleiven Opp pågår nå",
      };
    case "finished":
      return {
        eyebrow: `${event.year} er gjennomført`,
        primaryLabel: `Resultater ${event.year}`,
        primaryHref: event.links.latestResults,
        status: `Neste: Stoltzekleiven Opp ${event.nextEvent.year}`,
      };
  }
}
