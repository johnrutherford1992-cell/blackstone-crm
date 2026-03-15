import { getCompanyById } from "@/lib/dal";
import { getAccountId } from "@/lib/auth-context";
import { notFound } from "next/navigation";
import { CompanyDetailClient } from "./company-detail-client";

export const dynamic = "force-dynamic";

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = await getAccountId();
  const company = await getCompanyById(id, accountId);

  if (!company) notFound();

  return <CompanyDetailClient company={company} />;
}
