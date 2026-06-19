import { SignJWT, jwtVerify } from "jose";
import bcryptjs from "bcryptjs";
import type { Role } from "./constants";
import { ADMIN_ROLES } from "./constants";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "lsy-dev-secret-change-in-production-2025",
);

export const SESSION_COOKIE = "lsy_session";
const EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: Role;
}

export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRES_IN}s`)
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

export function isAdminRole(role: Role): boolean {
  return ADMIN_ROLES.includes(role);
}
