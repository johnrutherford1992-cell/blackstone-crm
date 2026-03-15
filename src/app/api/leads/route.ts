export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { getLeads, createLead } from "@/lib/dal";
import { createLeadSchema } from "@/lib/validations/lead";
import { successResponse, errorResponse, validationErrorResponse, getRequestAccountId } from "@/lib/api-utils";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  const accountId = getRequestAccountId();
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "50");

  const result = await getLeads(accountId, { page, pageSize });
  return successResponse(result);
}

export async function POST(request: NextRequest) {
  const accountId = getRequestAccountId();

  try {
    const body = await request.json();
    const validated = createLeadSchema.parse(body);

    const lead = await createLead({
      name: validated.name,
      accountId,
      value: validated.value,
      companyId: validated.companyId,
      assignedToId: validated.assignedToId,
      divisionId: validated.divisionId,
    });

    return successResponse(lead, 201);
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return errorResponse("Failed to create lead", 500);
  }
}
