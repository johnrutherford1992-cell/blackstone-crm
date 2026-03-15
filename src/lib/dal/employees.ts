import prisma from "@/lib/prisma";
import { getPaginationArgs, paginatedResult, type PaginationParams } from "./utils";

export async function getEmployees(accountId: string, params?: PaginationParams) {
  const { skip, take, page, pageSize } = getPaginationArgs(params);

  const [data, totalCount] = await Promise.all([
    prisma.employee.findMany({
      where: { accountId },
      include: { division: true, role: true },
      orderBy: { lastName: "asc" },
      skip,
      take,
    }),
    prisma.employee.count({ where: { accountId } }),
  ]);

  return paginatedResult(data, totalCount, page, pageSize);
}

export async function getEmployeeById(id: string, accountId: string) {
  return prisma.employee.findFirst({
    where: { id, accountId },
    include: {
      division: true,
      role: true,
      assignments: { include: { project: true, role: true } },
      certifications: true,
    },
  });
}

export async function createEmployee(data: {
  firstName: string;
  lastName: string;
  accountId: string;
  email?: string;
  phone?: string;
  divisionId?: string;
  roleId?: string;
}) {
  return prisma.employee.create({ data });
}

export async function updateEmployee(id: string, accountId: string, data: Record<string, unknown>) {
  return prisma.employee.updateMany({ where: { id, accountId }, data });
}

export async function deleteEmployee(id: string, accountId: string) {
  return prisma.employee.deleteMany({ where: { id, accountId } });
}
