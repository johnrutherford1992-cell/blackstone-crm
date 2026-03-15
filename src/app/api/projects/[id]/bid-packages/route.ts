export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse, getRequestAccountId } from "@/lib/api-utils";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = await params;
  const accountId = getRequestAccountId();

  // Verify project belongs to account
  const project = await prisma.project.findFirst({ where: { id: projectId, accountId } });
  if (!project) return errorResponse("Project not found", 404);

  try {
    const body = await request.json();
    const bidPackage = await prisma.bidPackage.create({
      data: {
        number: body.number,
        name: body.name,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        projectId,
      },
    });
    return successResponse(bidPackage, 201);
  } catch {
    return errorResponse("Failed to create bid package", 500);
  }
}
