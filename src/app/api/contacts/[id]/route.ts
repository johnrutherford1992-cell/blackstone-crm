export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { getContactById, updateContact, deleteContact } from "@/lib/dal";
import { updateContactSchema } from "@/lib/validations/contact";
import { successResponse, errorResponse, validationErrorResponse, getRequestAccountId } from "@/lib/api-utils";
import { ZodError } from "zod";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  const contact = await getContactById(id, accountId);
  if (!contact) return errorResponse("Contact not found", 404);
  return successResponse(contact);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  try {
    const body = await request.json();
    const validated = updateContactSchema.parse(body);
    await updateContact(id, accountId, validated);
    const updated = await getContactById(id, accountId);
    return successResponse(updated);
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return errorResponse("Failed to update contact", 500);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();

  await deleteContact(id, accountId);
  return successResponse({ success: true });
}
