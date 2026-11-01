import type { Metadata } from "next";
import StatisticsPageContent from "@/components/results/StatisticsPageContent";

export const metadata: Metadata = {
  title: "Statistics and records",
  description: "Course records and statistics from the imported Stoltzekleiven Opp results archive.",
};

export default function StatisticsPage() {
  return <StatisticsPageContent locale="en" />;
}
