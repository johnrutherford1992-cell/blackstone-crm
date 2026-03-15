import { getProjectById, getStages, getDivisions, getCompanies } from "@/lib/dal";
import { getAccountId } from "@/lib/auth-context";
import { notFound } from "next/navigation";
import { ProjectDetailsClient } from "./project-details-client";

export const dynamic = "force-dynamic";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = await getAccountId();
  const [project, stages, divisions, companiesResult] = await Promise.all([
    getProjectById(id, accountId),
    getStages(accountId),
    getDivisions(accountId),
    getCompanies(accountId),
  ]);

  if (!project) notFound();

  return (
    <ProjectDetailsClient
      project={project}
      stages={stages.map((s) => ({ value: s.id, label: s.name }))}
      divisions={divisions.map((d) => ({ value: d.id, label: d.name }))}
      companies={companiesResult.data.map((c) => ({ value: c.id, label: c.name }))}
    />
  );
}
