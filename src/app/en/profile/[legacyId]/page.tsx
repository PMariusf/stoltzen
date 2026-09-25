import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RunnerProfile from "@/components/results/RunnerProfile";
import { getRunnerProfile } from "@/lib/result-profile";

type PageProps = {
  params: Promise<{ legacyId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { legacyId } = await params;
  const id = Number(legacyId);

  if (!Number.isInteger(id) || id <= 0) {
    return { title: "Stoltzen profile" };
  }

  const profile = await getRunnerProfile(id);

  if (!profile) {
    return { title: "Stoltzen profile" };
  }

  return {
    title: `${profile.name} – Stoltzen profile`,
    description: `Result history and personal best for ${profile.name} in Stoltzekleiven Opp.`,
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { legacyId } = await params;
  const id = Number(legacyId);

  if (!Number.isInteger(id) || id <= 0) notFound();

  const profile = await getRunnerProfile(id);
  if (!profile) notFound();

  return <RunnerProfile profile={profile} locale="en" />;
}
