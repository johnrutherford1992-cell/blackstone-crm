import { getProjects, getStages, getDivisions } from "@/lib/dal";
import { getAccountId } from "@/lib/auth-context";
import { ProjectsClient } from "./projects-client";

export default async function ProjectsPage() {
  const accountId = await getAccountId();
  const [result, stages, divisions] = await Promise.all([
    getProjects(accountId),
    getStages(accountId),
    getDivisions(accountId),
  ]);

  const projects = result.data.map((p) => ({
    id: p.id,
    name: p.name,
    stage: p.stage?.name ?? "—",
    stageColor: p.stage?.color ?? "#6B7280",
    contractValue: p.contractValue ? Number(p.contractValue) : 0,
    company: p.companies[0]?.company?.name ?? "—",
    division: p.division?.name ?? "—",
  }));

  const stageOptions = stages.map((s) => ({ value: s.id, label: s.name }));
  const divisionOptions = divisions.map((d) => ({ value: d.id, label: d.name }));

  return (
    <ProjectsClient
      projects={projects}
      totalCount={result.totalCount}
      stageOptions={stageOptions}
      divisionOptions={divisionOptions}
    />
  );
}
