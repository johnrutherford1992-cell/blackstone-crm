import { NextRequest } from "next/server";
import { getCompanies, createCompany } from "@/lib/dal";
import { createCompanySchema } from "@/lib/validations/company";
import { successResponse, errorResponse, validationErrorResponse, getRequestAccountId } from "@/lib/api-utils";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  const accountId = getRequestAccountId();
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "50");

  const result = await getCompanies(accountId, { page, pageSize });
  return successResponse(result);
}

export async function POST(request: NextRequest) {
  const accountId = getRequestAccountId();

  try {
    const body = await request.json();
    const validated = createCompanySchema.parse(body);

    const company = await createCompany({
      name: validated.name,
      accountId,
      category: validated.category,
      phone: validated.phone,
      address: validated.address,
      city: validated.city,
      state: validated.state,
      website: validated.website,
    });

    return successResponse(company, 201);
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return errorResponse("Failed to create company", 500);
  }
}
