import prisma from "@/lib/prisma";
import { getPaginationArgs, paginatedResult, type PaginationParams } from "./utils";

export async function getLeads(accountId: string, params?: PaginationParams) {
  const { skip, take, page, pageSize } = getPaginationArgs(params);

  const [data, totalCount] = await Promise.all([
    prisma.lead.findMany({
      where: { accountId, isArchived: false },
      include: {
        company: true,
        assignedTo: true,
        division: true,
        contractType: true,
      },
      orderBy: { lastActivity: "desc" },
      skip,
      take,
    }),
    prisma.lead.count({ where: { accountId, isArchived: false } }),
  ]);

  return paginatedResult(data, totalCount, page, pageSize);
}

export async function getLeadById(id: string, accountId: string) {
  return prisma.lead.findFirst({
    where: { id, accountId },
    include: {
      company: true,
      assignedTo: true,
      division: true,
      contractType: true,
      tenderType: true,
      marketSector: true,
      deliveryMethod: true,
      contacts: { include: { contact: true } },
      workScopes: { include: { workScope: true } },
      gngResponses: { include: { question: true } },
      activities: { include: { user: true }, orderBy: { createdAt: "desc" }, take: 20 },
    },
  });
}

export async function createLead(data: {
  name: string;
  accountId: string;
  value?: number;
  companyId?: string;
  assignedToId?: string;
  divisionId?: string;
}) {
  return prisma.lead.create({ data });
}

export async function updateLead(id: string, accountId: string, data: Record<string, unknown>) {
  return prisma.lead.updateMany({ where: { id, accountId }, data });
}

export async function deleteLead(id: string, accountId: string) {
  return prisma.lead.deleteMany({ where: { id, accountId } });
}
