import { put, del, head, list } from "@vercel/blob";

export async function uploadFile(file: File | Buffer, filename: string, options?: { contentType?: string }) {
  const blob = await put(filename, file, {
    access: "public",
    contentType: options?.contentType,
  });

  return {
    url: blob.url,
    pathname: blob.pathname,
    contentType: blob.contentType,
  };
}

export async function deleteFile(url: string) {
  await del(url);
}

export async function getFileInfo(url: string) {
  return head(url);
}

export async function listFiles(prefix?: string) {
  const result = await list({ prefix });
  return result.blobs;
}

/**
 * Generate a unique filename with timestamp prefix to avoid collisions.
 */
export function generateFilename(originalName: string, projectId?: string) {
  const timestamp = Date.now();
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const prefix = projectId ? `projects/${projectId}` : "uploads";
  return `${prefix}/${timestamp}_${safeName}`;
}
