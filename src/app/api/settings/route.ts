export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse, getRequestAccountId } from "@/lib/api-utils";

// Map from plural API names to singular Prisma model names
const TYPE_MAP: Record<string, string> = {
  divisions: "division",
  stages: "stage",
  industries: "industry",
  lossReasons: "lossReason",
  costCodes: "costCode",
  costTypes: "costType",
  contractTypes: "contractType",
  tenderTypes: "tenderType",
  marketSectors: "marketSector",
  deliveryMethods: "deliveryMethod",
  workScopes: "workScope",
  workforceRoles: "workforceRole",
  customActivities: "customActivityType",
};

function resolveModel(type: string | null) {
  if (!type) return null;
  const modelName = TYPE_MAP[type];
  if (!modelName) return null;
  return (prisma as any)[modelName];
}

export async function GET(request: NextRequest) {
  const accountId = getRequestAccountId();
  const type = request.nextUrl.searchParams.get("type");
  const model = resolveModel(type);
  if (!model) return errorResponse("Invalid type parameter", 400);

  const orderBy = type === "stages" ? { sortOrder: "asc" as const } : type === "costCodes" ? { code: "asc" as const } : { name: "asc" as const };

  const data = await model.findMany({ where: { accountId }, orderBy });
  return successResponse(data);
}

export async function POST(request: NextRequest) {
  const accountId = getRequestAccountId();
  const type = request.nextUrl.searchParams.get("type");
  const model = resolveModel(type);
  if (!model) return errorResponse("Invalid type parameter", 400);

  try {
    const body = await request.json();
    const record = await model.create({
      data: { ...body, accountId },
    });
    return successResponse(record, 201);
  } catch (error: any) {
    if (error?.code === "P2002") {
      return errorResponse("A record with this name already exists", 409);
    }
    return errorResponse("Failed to create record", 500);
  }
}
