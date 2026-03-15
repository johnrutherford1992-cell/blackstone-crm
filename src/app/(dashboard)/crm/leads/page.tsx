import { getLeads, getCompanies, getDivisions } from "@/lib/dal";
import { getAccountId } from "@/lib/auth-context";
import { LeadsClient } from "./leads-client";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const accountId = await getAccountId();
  const [result, companiesResult, divisions] = await Promise.all([
    getLeads(accountId),
    getCompanies(accountId),
    getDivisions(accountId),
  ]);

  const leads = result.data.map((l) => ({
    id: l.id,
    name: l.name,
    company: l.company?.name ?? "—",
    value: l.value ? Number(l.value) : 0,
    lastActivity: l.lastActivity?.toISOString() ?? "",
    stage: "Discovery",
  }));

  const companyOptions = companiesResult.data.map((c) => ({ value: c.id, label: c.name }));
  const divisionOptions = divisions.map((d) => ({ value: d.id, label: d.name }));

  return (
    <LeadsClient
      leads={leads}
      totalCount={result.totalCount}
      companyOptions={companyOptions}
      divisionOptions={divisionOptions}
    />
  );
}
