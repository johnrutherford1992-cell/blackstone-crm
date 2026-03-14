import prisma from "@/lib/prisma";

export async function getDocumentsByProject(projectId: string, accountId: string) {
  // Verify project belongs to account
  const project = await prisma.project.findFirst({ where: { id: projectId, accountId }, select: { id: true } });
  if (!project) return [];

  return prisma.document.findMany({
    where: { projectId, isTrashed: false },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDrawingsByProject(projectId: string, accountId: string) {
  const project = await prisma.project.findFirst({ where: { id: projectId, accountId }, select: { id: true } });
  if (!project) return [];

  return prisma.drawingSheet.findMany({
    where: { projectId },
    include: { drawingSet: true },
    orderBy: { number: "asc" },
  });
}

export async function createDocument(data: {
  name: string;
  projectId: string;
  type?: string;
  category?: "RFP" | "DRAWINGS" | "SCHEDULES" | "PERMITS" | "CONTRACTS" | "MISC" | "PHOTOS";
  fileUrl?: string;
  fileSize?: number;
  mimeType?: string;
  createdById?: string;
}) {
  return prisma.document.create({ data });
}

export async function deleteDocument(id: string) {
  return prisma.document.update({ where: { id }, data: { isTrashed: true } });
}
