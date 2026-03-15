import { getContactById, getCompanies } from "@/lib/dal";
import { getAccountId } from "@/lib/auth-context";
import { notFound } from "next/navigation";
import { ContactDetailClient } from "./contact-detail-client";

export const dynamic = "force-dynamic";

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = await getAccountId();
  const [contact, companiesResult] = await Promise.all([
    getContactById(id, accountId),
    getCompanies(accountId),
  ]);

  if (!contact) notFound();

  const companyOptions = companiesResult.data.map((c) => ({ value: c.id, label: c.name }));

  return <ContactDetailClient contact={contact} companies={companyOptions} />;
}
