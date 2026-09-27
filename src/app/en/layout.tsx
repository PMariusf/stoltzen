import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Stoltzekleiven Opp | Bergen",
    template: "%s | Stoltzekleiven Opp",
  },
  description:
    "Stoltzekleiven Opp in Bergen – registration, start lists, results, practical information, photos and history.",
};

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div lang="en">{children}</div>;
}
