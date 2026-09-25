import { event } from "@/data/event";
import type { Locale } from "@/lib/i18n";

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

export function getPhaseContent(phase: EventPhase, locale: Locale = "no") {
  const en = locale === "en";
  const links = en
    ? {
        registration: "/en/registration",
        results: "/en/results",
        latestResults: "/en/results/2026",
        practical: "/en/practical-info",
      }
    : {
        registration: event.links.registration,
        results: event.links.startAndResults,
        latestResults: event.links.latestResults,
        practical: event.links.practicalInfo,
      };

  switch (phase) {
    case "before-registration":
      return {
        eyebrow: en ? "Next up" : "Neste steg",
        primaryLabel: en ? "Registration info" : "Se påmeldingsinfo",
        primaryHref: links.registration,
        status: en
          ? "Registration opens 28 May at 07:00"
          : "Påmeldingen åpner 28. mai kl. 07:00",
      };
    case "registration":
      return {
        eyebrow: en ? "Registration is open" : "Påmeldingen er åpen",
        primaryLabel: en ? "Register" : "Meld deg på",
        primaryHref: links.registration,
        status: en ? "Secure your place" : "Sikre deg startplass",
      };
    case "sold-out":
      return {
        eyebrow: en ? "Sold out" : "Fulltegnet",
        primaryLabel: en ? "Waiting list & places" : "Venteliste & restplasser",
        primaryHref: links.registration,
        status: en
          ? "See waiting-list information"
          : "Se informasjon om venteliste",
      };
    case "race-week":
      return {
        eyebrow: en ? "Race week" : "Løpsuke",
        primaryLabel: en ? "Start & practical info" : "Start & praktisk info",
        primaryHref: links.practical,
        status: en
          ? "Find your start number and get ready"
          : "Finn startnummer og gjør deg klar",
      };
    case "live":
      return {
        eyebrow: en ? "LIVE in Bergen" : "LIVE i Bergen",
        primaryLabel: en ? "Start & results" : "Start & resultater",
        primaryHref: links.results,
        status: en
          ? "Stoltzekleiven Opp is happening now"
          : "Stoltzekleiven Opp pågår nå",
      };
    case "finished":
      return {
        eyebrow: en ? `${event.year} completed` : `${event.year} er gjennomført`,
        primaryLabel: en ? `Results ${event.year}` : `Resultater ${event.year}`,
        primaryHref: links.latestResults,
        status: en
          ? `Next: Stoltzekleiven Opp ${event.nextEvent.year}`
          : `Neste: Stoltzekleiven Opp ${event.nextEvent.year}`,
      };
  }
}
