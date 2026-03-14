import prisma from "@/lib/prisma";
import { getPaginationArgs, paginatedResult, type PaginationParams } from "./utils";

export async function getContacts(accountId: string, params?: PaginationParams) {
  const { skip, take, page, pageSize } = getPaginationArgs(params);

  const [data, totalCount] = await Promise.all([
    prisma.contact.findMany({
      where: { accountId },
      include: { company: true, assignedTo: true },
      orderBy: { lastName: "asc" },
      skip,
      take,
    }),
    prisma.contact.count({ where: { accountId } }),
  ]);

  return paginatedResult(data, totalCount, page, pageSize);
}

export async function getContactById(id: string, accountId: string) {
  return prisma.contact.findFirst({
    where: { id, accountId },
    include: {
      company: true,
      assignedTo: true,
      projectContacts: { include: { project: true } },
      leadContacts: { include: { lead: true } },
      activities: { include: { user: true }, orderBy: { createdAt: "desc" }, take: 20 },
    },
  });
}

export async function createContact(data: {
  firstName: string;
  lastName: string;
  accountId: string;
  email?: string;
  mobilePhone?: string;
  officePhone?: string;
  title?: string;
  companyId?: string;
}) {
  return prisma.contact.create({ data });
}

export async function updateContact(id: string, accountId: string, data: Record<string, unknown>) {
  return prisma.contact.updateMany({ where: { id, accountId }, data });
}

export async function deleteContact(id: string, accountId: string) {
  return prisma.contact.deleteMany({ where: { id, accountId } });
}
