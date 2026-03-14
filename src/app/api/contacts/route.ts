import { NextRequest } from "next/server";
import { getContacts, createContact } from "@/lib/dal";
import { createContactSchema } from "@/lib/validations/contact";
import { successResponse, errorResponse, validationErrorResponse, getRequestAccountId } from "@/lib/api-utils";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  const accountId = getRequestAccountId();
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "50");

  const result = await getContacts(accountId, { page, pageSize });
  return successResponse(result);
}

export async function POST(request: NextRequest) {
  const accountId = getRequestAccountId();

  try {
    const body = await request.json();
    const validated = createContactSchema.parse(body);

    const contact = await createContact({
      firstName: validated.firstName,
      lastName: validated.lastName,
      accountId,
      email: validated.email || undefined,
      mobilePhone: validated.mobilePhone,
      officePhone: validated.officePhone,
      title: validated.title,
      companyId: validated.companyId,
    });

    return successResponse(contact, 201);
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return errorResponse("Failed to create contact", 500);
  }
}
