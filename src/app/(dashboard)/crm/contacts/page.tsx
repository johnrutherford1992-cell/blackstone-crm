import { getContacts, getCompanies } from "@/lib/dal";
import { getAccountId } from "@/lib/auth-context";
import { ContactsClient } from "./contacts-client";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const accountId = await getAccountId();
  const [result, companiesResult] = await Promise.all([
    getContacts(accountId),
    getCompanies(accountId),
  ]);

  const contacts = result.data.map((c) => ({
    id: c.id,
    name: `${c.firstName} ${c.lastName}`,
    email: c.email ?? "",
    company: c.company?.name ?? "—",
    title: c.title ?? "—",
  }));

  const companyOptions = companiesResult.data.map((c) => ({ value: c.id, label: c.name }));

  return (
    <ContactsClient
      contacts={contacts}
      totalCount={result.totalCount}
      companyOptions={companyOptions}
    />
  );
}
