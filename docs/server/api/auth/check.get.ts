export default defineEventHandler(async (event) => {
  // Check Authorization header first (from localStorage)
  const authHeader = getHeader(event, "authorization");
  let sessionToken: string | undefined;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    sessionToken = authHeader.substring(7);
  } else {
    // Fallback to cookie
    sessionToken = getCookie(event, "auth_session");
  }

  // Simple check: if token exists, user is authenticated
  // In a production app, you'd validate the token against a database
  const authenticated = !!sessionToken;

  return {
    authenticated,
  };
});
