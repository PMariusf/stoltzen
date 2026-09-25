import AboutStoltzen from "@/components/home/AboutStoltzen";
import GallerySection from "@/components/home/GallerySection";
import Hero from "@/components/home/Hero";
import HistorySection from "@/components/home/HistorySection";
import NewsSection from "@/components/home/NewsSection";
import PartnersSection from "@/components/home/PartnersSection";
import ResultsSection from "@/components/home/ResultsSection";
import RouteSection from "@/components/home/RouteSection";
import StatsStrip from "@/components/home/StatsStrip";
import TrainingSection from "@/components/home/TrainingSection";
import { getEventPhase } from "@/lib/event-phase";

export const dynamic = "force-dynamic";

export default function EnglishHome() {
  const phase = getEventPhase(new Date());

  return (
    <main>
      <Hero phase={phase} locale="en" />
      <StatsStrip locale="en" />
      <AboutStoltzen locale="en" />
      <RouteSection locale="en" />
      <ResultsSection locale="en" />
      <GallerySection locale="en" />
      <HistorySection locale="en" />
      <TrainingSection locale="en" />
      <NewsSection locale="en" />
      <PartnersSection locale="en" />
    </main>
  );
}
