import { getProjectById } from "@/lib/dal";
import { getAccountId } from "@/lib/auth-context";
import { notFound } from "next/navigation";
import { ProjectOverviewClient } from "./project-overview-client";

export const dynamic = "force-dynamic";

export default async function ProjectOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = await getAccountId();
  const project = await getProjectById(id, accountId);

  if (!project) notFound();

  return <ProjectOverviewClient project={project} />;
}
