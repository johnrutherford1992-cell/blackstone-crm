import { NextRequest } from "next/server";
import { getCompanyById, updateCompany, deleteCompany } from "@/lib/dal";
import { updateCompanySchema } from "@/lib/validations/company";
import { successResponse, errorResponse, validationErrorResponse, getRequestAccountId } from "@/lib/api-utils";
import { ZodError } from "zod";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  const company = await getCompanyById(id, accountId);
  if (!company) return errorResponse("Company not found", 404);
  return successResponse(company);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  try {
    const body = await request.json();
    const validated = updateCompanySchema.parse(body);
    await updateCompany(id, accountId, validated);
    const updated = await getCompanyById(id, accountId);
    return successResponse(updated);
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return errorResponse("Failed to update company", 500);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  await deleteCompany(id, accountId);
  return successResponse({ success: true });
}
