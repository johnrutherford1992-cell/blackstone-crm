import { getProjects } from "@/lib/dal";
import { getAccountId } from "@/lib/auth-context";
import { HomeClient } from "./home-client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const accountId = await getAccountId();
  const result = await getProjects(accountId);

  const pursuits = result.data.map((p) => ({
    id: p.id,
    name: p.name,
    company: p.companies[0]?.company?.name ?? "—",
    contractValue: p.contractValue ? Number(p.contractValue) : 0,
    stage: p.stage?.name ?? "—",
    lastActivity: p.updatedAt?.toISOString() ?? "",
    awardDate: p.awardDate ? p.awardDate.toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—",
  }));

  const pipelineValue = pursuits.reduce((sum, p) => sum + p.contractValue, 0);

  return <HomeClient pursuits={pursuits} pipelineValue={pipelineValue} />;
}
