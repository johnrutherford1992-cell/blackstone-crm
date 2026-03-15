export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse, getRequestAccountId } from "@/lib/api-utils";

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

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();
  const type = request.nextUrl.searchParams.get("type");
  const model = resolveModel(type);
  if (!model) return errorResponse("Invalid type parameter", 400);

  try {
    const body = await request.json();
    await model.updateMany({ where: { id, accountId }, data: body });
    return successResponse({ success: true });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return errorResponse("A record with this name already exists", 409);
    }
    return errorResponse("Failed to update record", 500);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accountId = getRequestAccountId();
  const type = request.nextUrl.searchParams.get("type");
  const model = resolveModel(type);
  if (!model) return errorResponse("Invalid type parameter", 400);

  try {
    await model.deleteMany({ where: { id, accountId } });
    return successResponse({ success: true });
  } catch {
    return errorResponse("Failed to delete record", 500);
  }
}
