export const ADMIN_EMAIL = "gaurav07c@gmail.com";
export const ADMIN_PASSWORD = "Gaurav@12";
export const ADMIN_COOKIE_NAME = "admin_session";

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET || "local-admin-secret";
}

export function createAdminSessionToken(email: string) {
  return `${email}:${sessionSecret()}`;
}

export function isValidAdminCredentials(email: string, password: string) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function isValidAdminSession(token: string | undefined) {
  if (!token) return false;
  return token === createAdminSessionToken(ADMIN_EMAIL);
}
