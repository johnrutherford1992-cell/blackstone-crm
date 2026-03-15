import { getLeadById, getCompanies, getDivisions } from "@/lib/dal";
import { getAccountId } from "@/lib/auth-context";
import { notFound } from "next/navigation";
import { LeadDetailClient } from "./lead-detail-client";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = await getAccountId();
  const [lead, companiesResult, divisions] = await Promise.all([
    getLeadById(id, accountId),
    getCompanies(accountId),
    getDivisions(accountId),
  ]);

  if (!lead) notFound();

  const companyOptions = companiesResult.data.map((c) => ({ value: c.id, label: c.name }));
  const divisionOptions = divisions.map((d) => ({ value: d.id, label: d.name }));

  return <LeadDetailClient lead={lead} companies={companyOptions} divisions={divisionOptions} />;
}
