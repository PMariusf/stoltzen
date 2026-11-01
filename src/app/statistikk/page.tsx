import type { Metadata } from "next";
import StatisticsPageContent from "@/components/results/StatisticsPageContent";

export const metadata: Metadata = {
  title: "Statistikk og rekorder",
  description: "Løyperekorder og statistikk fra det importerte resultatarkivet for Stoltzekleiven Opp.",
};

export default function StatisticsPage() {
  return <StatisticsPageContent locale="no" />;
}
