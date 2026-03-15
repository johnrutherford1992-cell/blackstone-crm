import prisma from "@/lib/prisma";
import { getPaginationArgs, paginatedResult, type PaginationParams } from "./utils";

export async function getCompanies(accountId: string, params?: PaginationParams) {
  const { skip, take, page, pageSize } = getPaginationArgs(params);

  const [data, totalCount] = await Promise.all([
    prisma.company.findMany({
      where: { accountId },
      include: { assignedTo: true },
      orderBy: { name: "asc" },
      skip,
      take,
    }),
    prisma.company.count({ where: { accountId } }),
  ]);

  return paginatedResult(data, totalCount, page, pageSize);
}

export async function getCompanyById(id: string, accountId: string) {
  return prisma.company.findFirst({
    where: { id, accountId },
    include: {
      assignedTo: true,
      contacts: true,
      industries: { include: { industry: true } },
      projectCompanies: { include: { project: true } },
      leads: true,
      activities: { include: { user: true }, orderBy: { createdAt: "desc" }, take: 20 },
    },
  });
}

export async function createCompany(data: {
  name: string;
  accountId: string;
  category?: "CLIENT" | "DESIGN" | "ENGINEERING" | "FINANCE" | "TRADE_PARTNER" | "OTHER";
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  website?: string;
}) {
  return prisma.company.create({ data });
}

export async function updateCompany(id: string, accountId: string, data: Record<string, unknown>) {
  return prisma.company.updateMany({ where: { id, accountId }, data });
}

export async function deleteCompany(id: string, accountId: string) {
  return prisma.company.deleteMany({ where: { id, accountId } });
}
