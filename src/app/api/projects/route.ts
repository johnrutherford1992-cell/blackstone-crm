import { NextRequest } from "next/server";
import { getProjects, createProject } from "@/lib/dal";
import { createProjectSchema } from "@/lib/validations/project";
import { successResponse, errorResponse, validationErrorResponse, getRequestAccountId } from "@/lib/api-utils";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  const accountId = getRequestAccountId();
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "50");

  const result = await getProjects(accountId, { page, pageSize });
  return successResponse(result);
}

export async function POST(request: NextRequest) {
  const accountId = getRequestAccountId();

  try {
    const body = await request.json();
    const validated = createProjectSchema.parse(body);

    const project = await createProject({
      name: validated.name,
      accountId,
      contractValue: validated.contractValue,
      stageId: validated.stageId,
      divisionId: validated.divisionId,
      assignedToId: validated.assignedToId,
      address: validated.address,
      city: validated.city,
      state: validated.state,
    });

    return successResponse(project, 201);
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return errorResponse("Failed to create project", 500);
  }
}
