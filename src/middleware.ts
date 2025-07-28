import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect
} from "@convex-dev/auth/nextjs/server";

// Define public routes more explicitly
const isPublicPage = createRouteMatcher([
  "/auth",
  "/auth/(.*)",
  "/api/auth/(.*)",
  "/login",
  "/register",
  "/signin",
  "/signup"
]);

export default convexAuthNextjsMiddleware(async (request) => {
  const { pathname } = request.nextUrl;

  console.log("=== MIDDLEWARE DEBUG ===");
  console.log("Path:", pathname);
  console.log("Is public:", isPublicPage(request));

  // Check authentication first
  const isAuthenticated = await isAuthenticatedNextjs(request);
  console.log("Is authenticated:", isAuthenticated);

  // If user is authenticated and trying to access public/auth pages, redirect to home
  if (isAuthenticated && isPublicPage(request)) {
    console.log("✅ Authenticated user on public page - redirecting to /");
    return nextjsMiddlewareRedirect(request, "/");
  }

  // Allow public pages for unauthenticated users
  if (isPublicPage(request)) {
    console.log("✅ Public page for unauthenticated user - allowing access");
    return;
  }

  // Protect private routes - redirect unauthenticated users to auth
  if (!isAuthenticated) { 
    console.log("❌ Not authenticated on protected route - redirecting to /auth");
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  console.log("✅ Authenticated user on protected route - allowing access");
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
};