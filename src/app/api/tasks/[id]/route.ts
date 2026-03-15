export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse, getRequestAccountId } from "@/lib/api-utils";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  try {
    const body = await request.json();
    const data: any = {};
    if (body.title !== undefined) data.title = body.title;
    if (body.description !== undefined) data.description = body.description;
    if (body.status !== undefined) data.status = body.status;
    if (body.dueDate !== undefined) data.dueDate = body.dueDate ? new Date(body.dueDate) : null;
    if (body.assignedToId !== undefined) data.assignedToId = body.assignedToId;

    await prisma.task.updateMany({ where: { id, accountId }, data });
    return successResponse({ success: true });
  } catch {
    return errorResponse("Failed to update task", 500);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  await prisma.task.updateMany({ where: { id, accountId }, data: { isDeleted: true } });
  return successResponse({ success: true });
}
