export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse, getRequestAccountId } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  const accountId = getRequestAccountId();
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const contactId = searchParams.get("contactId");
  const companyId = searchParams.get("companyId");
  const projectId = searchParams.get("projectId");
  const leadId = searchParams.get("leadId");

  const where: any = { accountId, isDeleted: false };
  if (status) where.status = status;
  if (contactId) where.contactId = contactId;
  if (companyId) where.companyId = companyId;
  if (projectId) where.projectId = projectId;
  if (leadId) where.leadId = leadId;

  const tasks = await prisma.task.findMany({
    where,
    include: {
      assignedTo: { select: { id: true, firstName: true, lastName: true } },
      project: { select: { id: true, name: true } },
      company: { select: { id: true, name: true } },
      contact: { select: { id: true, firstName: true, lastName: true } },
      lead: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return successResponse(tasks);
}

export async function POST(request: NextRequest) {
  const accountId = getRequestAccountId();

  try {
    const body = await request.json();
    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description || null,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        accountId,
        createdById: body.createdById || "user_demo",
        assignedToId: body.assignedToId || null,
        projectId: body.projectId || null,
        companyId: body.companyId || null,
        contactId: body.contactId || null,
        leadId: body.leadId || null,
      },
    });
    return successResponse(task, 201);
  } catch (error) {
    return errorResponse("Failed to create task", 500);
  }
}
