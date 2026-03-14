import { auth } from "@/lib/auth";

/**
 * Get the current account ID from the authenticated session.
 * Returns the account ID or falls back to the demo account for unauthenticated requests.
 */
export async function getAccountId(): Promise<string> {
  try {
    const session = await auth();
    if (session?.user && (session.user as any).accountId) {
      return (session.user as any).accountId;
    }
  } catch {
    // Auth not available in this context
  }
  // Fallback for development / unauthenticated pages
  return "acct_blackstone";
}

export async function getSessionUser() {
  const session = await auth();
  if (!session?.user) return null;
  return {
    id: (session.user as any).id as string,
    email: session.user.email!,
    name: session.user.name!,
    role: (session.user as any).role as string,
    accountId: (session.user as any).accountId as string,
  };
}
