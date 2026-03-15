import prisma from "@/lib/prisma";
import { getPaginationArgs, paginatedResult, type PaginationParams } from "./utils";

export async function getProjects(accountId: string, params?: PaginationParams) {
  const { skip, take, page, pageSize } = getPaginationArgs(params);

  const [data, totalCount] = await Promise.all([
    prisma.project.findMany({
      where: { accountId },
      include: {
        stage: true,
        division: true,
        companies: { include: { company: true } },
        assignedTo: true,
      },
      orderBy: { updatedAt: "desc" },
      skip,
      take,
    }),
    prisma.project.count({ where: { accountId } }),
  ]);

  return paginatedResult(data, totalCount, page, pageSize);
}

export async function getProjectById(id: string, accountId: string) {
  return prisma.project.findFirst({
    where: { id, accountId },
    include: {
      stage: true,
      division: true,
      companies: { include: { company: true } },
      contacts: { include: { contact: true } },
      assignedTo: true,
      documents: { where: { isTrashed: false }, orderBy: { createdAt: "desc" } },
      drawingSets: { include: { sheets: true } },
      drawings: true,
      budgetLines: { include: { costCode: true } },
      bidPackages: { include: { bids: true } },
      activities: { include: { user: true }, orderBy: { createdAt: "desc" }, take: 20 },
    },
  });
}

export async function getProjectsByStage(accountId: string) {
  const stages = await prisma.stage.findMany({
    where: { accountId },
    include: {
      projects: {
        include: { companies: { include: { company: true } } },
      },
    },
    orderBy: { sortOrder: "asc" },
  });
  return stages;
}

export async function createProject(data: {
  name: string;
  accountId: string;
  contractValue?: number;
  stageId?: string;
  divisionId?: string;
  assignedToId?: string;
  address?: string;
  city?: string;
  state?: string;
}) {
  return prisma.project.create({ data });
}

export async function updateProject(id: string, accountId: string, data: Record<string, unknown>) {
  return prisma.project.updateMany({
    where: { id, accountId },
    data,
  });
}

export async function deleteProject(id: string, accountId: string) {
  return prisma.project.deleteMany({ where: { id, accountId } });
}
