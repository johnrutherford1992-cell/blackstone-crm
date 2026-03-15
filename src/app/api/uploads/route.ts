export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { uploadFile, generateFilename } from "@/lib/storage";
import { createDocument } from "@/lib/dal";
import { successResponse, errorResponse, requireAuth } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  const authUser = await requireAuth();
  if (!authUser) return errorResponse("Unauthorized", 401);

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const projectId = formData.get("projectId") as string;
    const category = (formData.get("category") as string) || "MISC";

    if (!file) return errorResponse("No file provided");
    if (!projectId) return errorResponse("Project ID is required");

    // Max 50MB
    if (file.size > 50 * 1024 * 1024) {
      return errorResponse("File size exceeds 50MB limit");
    }

    const filename = generateFilename(file.name, projectId);
    const result = await uploadFile(file, filename, { contentType: file.type });

    // Create document record in database
    const document = await createDocument({
      name: file.name,
      projectId,
      type: file.name.split(".").pop()?.toUpperCase() || "FILE",
      category: category as any,
      fileUrl: result.url,
      fileSize: file.size,
      mimeType: file.type,
      createdById: authUser.userId,
    });

    return successResponse(document, 201);
  } catch (error) {
    console.error("Upload error:", error);
    return errorResponse("Failed to upload file", 500);
  }
}
