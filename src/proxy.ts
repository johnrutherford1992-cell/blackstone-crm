import { auth } from "@/lib/auth";

export const proxy = auth;

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     * - login and register pages
     * - API auth routes
     */
    "/((?!_next/static|_next/image|favicon.ico|public|login|register|api/auth).*)",
  ],
};
