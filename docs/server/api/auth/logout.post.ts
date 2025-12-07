export default defineEventHandler(async (event) => {
  // Clear the session cookie
  deleteCookie(event, "auth_session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return {
    success: true,
  };
});
