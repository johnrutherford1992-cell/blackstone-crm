import { NextRequest } from "next/server";
import { getProjectById, updateProject, deleteProject } from "@/lib/dal";
import { updateProjectSchema } from "@/lib/validations/project";
import { successResponse, errorResponse, validationErrorResponse, getRequestAccountId } from "@/lib/api-utils";
import { ZodError } from "zod";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  const project = await getProjectById(id, accountId);
  if (!project) return errorResponse("Project not found", 404);
  return successResponse(project);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  try {
    const body = await request.json();
    const validated = updateProjectSchema.parse(body);
    await updateProject(id, accountId, validated);
    const updated = await getProjectById(id, accountId);
    return successResponse(updated);
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return errorResponse("Failed to update project", 500);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  await deleteProject(id, accountId);
  return successResponse({ success: true });
}
