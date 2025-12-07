import { randomBytes } from "node:crypto";

const ADMIN_EMAIL = "admin@hubshift.au";
const ADMIN_PASSWORD = "Hubshift2026!";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required",
    });
  }

  // Validate credentials
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }

  // Generate session token
  const sessionToken = randomBytes(32).toString("hex");

  // Set HTTP-only cookie (fallback for server-side validation)
  setCookie(event, "auth_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  // Return token in response for localStorage storage
  return {
    success: true,
    token: sessionToken,
  };
});
