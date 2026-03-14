import { NextRequest } from "next/server";
import { getLeadById, updateLead, deleteLead } from "@/lib/dal";
import { updateLeadSchema } from "@/lib/validations/lead";
import { successResponse, errorResponse, validationErrorResponse, getRequestAccountId } from "@/lib/api-utils";
import { ZodError } from "zod";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  const lead = await getLeadById(id, accountId);
  if (!lead) return errorResponse("Lead not found", 404);
  return successResponse(lead);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  try {
    const body = await request.json();
    const validated = updateLeadSchema.parse(body);
    await updateLead(id, accountId, validated);
    const updated = await getLeadById(id, accountId);
    return successResponse(updated);
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return errorResponse("Failed to update lead", 500);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  await deleteLead(id, accountId);
  return successResponse({ success: true });
}
