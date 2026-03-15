import { getCompanies } from "@/lib/dal";
import { getAccountId } from "@/lib/auth-context";
import { DirectoryClient } from "./directory-client";

export const dynamic = "force-dynamic";

export default async function DirectoryPage() {
  const accountId = await getAccountId();
  const result = await getCompanies(accountId);

  const companies = result.data.map((c) => ({
    id: c.id,
    name: c.name,
    assignedTo: c.assignedTo ? `${c.assignedTo.firstName} ${c.assignedTo.lastName}` : "—",
    category: c.category,
    phone: c.phone || "",
  }));

  return <DirectoryClient companies={companies} totalCount={result.totalCount} />;
}
