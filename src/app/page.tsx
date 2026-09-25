import AboutStoltzen from "@/components/home/AboutStoltzen";
import GallerySection from "@/components/home/GallerySection";
import Hero from "@/components/home/Hero";
import HistorySection from "@/components/home/HistorySection";
import ResultsSection from "@/components/home/ResultsSection";
import RouteSection from "@/components/home/RouteSection";
import StatsStrip from "@/components/home/StatsStrip";
import TrainingSection from "@/components/home/TrainingSection";
import FinalCta from "@/components/home/FinalCta";
import WeekendSchedule from "@/components/home/WeekendSchedule";
import { getEventPhase } from "@/lib/event-phase";

export const dynamic = "force-dynamic";

export default function Home() {
  const phase = getEventPhase(new Date());

  return (
    <main>
      <Hero phase={phase} locale="no" />
      <StatsStrip locale="no" />
      <WeekendSchedule locale="no" />
      <AboutStoltzen locale="no" />
      <RouteSection locale="no" />
      <ResultsSection locale="no" />
      <GallerySection locale="no" />
      <HistorySection locale="no" />
      <TrainingSection locale="no" />
      <FinalCta locale="no" />
    </main>
  );
}
