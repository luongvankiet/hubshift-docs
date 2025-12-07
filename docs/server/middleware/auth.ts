export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);

  // Allow access to login page and API auth endpoints
  if (
    url.pathname === "/login" ||
    url.pathname.startsWith("/api/auth/") ||
    url.pathname.startsWith("/_nuxt/") ||
    url.pathname.startsWith("/__nuxt/")
  ) {
    return;
  }

  // Check Authorization header first (from localStorage)
  const authHeader = getHeader(event, "authorization");
  let sessionToken: string | undefined;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    sessionToken = authHeader.substring(7);
  } else {
    // Fallback to cookie
    sessionToken = getCookie(event, "auth_session");
  }

  if (!sessionToken) {
    // For API requests, return 401
    if (url.pathname.startsWith("/api/")) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    // For page requests, redirect will be handled by client middleware
    // Server middleware just allows the request through
    return;
  }
});
