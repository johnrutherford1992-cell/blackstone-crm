import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { auth } from "@/lib/auth";

export function successResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function validationErrorResponse(error: ZodError) {
  const issues = (error as any).issues || [];
  return NextResponse.json(
    {
      error: "Validation failed",
      details: issues.map((e: any) => ({
        path: Array.isArray(e.path) ? e.path.join(".") : "",
        message: e.message,
      })),
    },
    { status: 400 }
  );
}

/**
 * Require authentication on an API route.
 * Returns the authenticated user info or null.
 */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) return null;

  return {
    userId: (session.user as any).id as string,
    accountId: ((session.user as any).accountId as string) || "acct_blackstone",
    role: ((session.user as any).role as string) || "LIMITED",
  };
}

/**
 * Fallback for development — returns default account.
 * Use requireAuth() in production routes.
 */
export function getRequestAccountId(): string {
  return "acct_blackstone";
}
