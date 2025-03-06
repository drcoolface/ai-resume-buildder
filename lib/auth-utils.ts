import "server-only";
import bcrypt from "bcryptjs";

import jwt, { JwtPayload } from "jsonwebtoken";

import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./const";
import { cache } from "react";

const SECRET = String(process.env.secret);

export const hashPW = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePW = async (
  password: string,
  hashedPW: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPW);
};

export const createTokenForUser = (user: {
  userId: number;
  name: string;
}): string => {
  const token = jwt.sign(user, SECRET, { expiresIn: "7d" });
  return token;
};

export const getTokenPayload = async (
  token?: string
): Promise<JwtPayload | null> => {
  if (!token) return null;

  try {
    const payload = jwt.verify(token, SECRET) as JwtPayload;
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!cookie) {
    return null;
  }

  const session = await getTokenPayload(cookie);

  if (!session?.userId) {
    return null;
  }

  return { isAuth: true, userId: session.userId, name: session.name };
});
