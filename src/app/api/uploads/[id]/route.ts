import { NextRequest } from "next/server";
import { deleteFile } from "@/lib/storage";
import { deleteDocument } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAuth } from "@/lib/api-utils";

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authUser = await requireAuth();
  if (!authUser) return errorResponse("Unauthorized", 401);

  try {
    // Get document to find file URL
    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) return errorResponse("Document not found", 404);

    // Delete from blob storage
    if (doc.fileUrl) {
      await deleteFile(doc.fileUrl);
    }

    // Soft-delete from database
    await deleteDocument(id);

    return successResponse({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return errorResponse("Failed to delete file", 500);
  }
}
