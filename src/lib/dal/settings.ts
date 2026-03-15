import prisma from "@/lib/prisma";

export async function getDivisions(accountId: string) {
  return prisma.division.findMany({ where: { accountId }, orderBy: { name: "asc" } });
}

export async function getStages(accountId: string) {
  return prisma.stage.findMany({ where: { accountId }, orderBy: { sortOrder: "asc" } });
}

export async function getIndustries(accountId: string) {
  return prisma.industry.findMany({ where: { accountId }, orderBy: { name: "asc" } });
}

export async function getContractTypes(accountId: string) {
  return prisma.contractType.findMany({ where: { accountId }, orderBy: { name: "asc" } });
}

export async function getTenderTypes(accountId: string) {
  return prisma.tenderType.findMany({ where: { accountId }, orderBy: { name: "asc" } });
}

export async function getMarketSectors(accountId: string) {
  return prisma.marketSector.findMany({ where: { accountId }, orderBy: { name: "asc" } });
}

export async function getDeliveryMethods(accountId: string) {
  return prisma.deliveryMethod.findMany({ where: { accountId }, orderBy: { name: "asc" } });
}

export async function getWorkScopes(accountId: string) {
  return prisma.workScope.findMany({ where: { accountId }, orderBy: { name: "asc" } });
}

export async function getLossReasons(accountId: string) {
  return prisma.lossReason.findMany({ where: { accountId }, orderBy: { name: "asc" } });
}

export async function getWorkforceRoles(accountId: string) {
  return prisma.workforceRole.findMany({ where: { accountId }, orderBy: { name: "asc" } });
}

export async function getCostCodes(accountId: string) {
  return prisma.costCode.findMany({ where: { accountId }, orderBy: { code: "asc" } });
}

export async function getTeamMembers(accountId: string) {
  return prisma.user.findMany({
    where: { accountId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      lastLogin: true,
      createdAt: true,
    },
    orderBy: { lastName: "asc" },
  });
}
