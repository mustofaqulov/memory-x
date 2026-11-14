import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from './db';

const cookieName = 'mx_session';
const sessionDays = 30;
function secret() {
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) throw new Error('SESSION_SECRET is missing or too short');
  return process.env.SESSION_SECRET;
}
function tokenHash(token: string) { return createHmac('sha256', secret()).update(token).digest('hex'); }
export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}
export function verifyPassword(password: string, saved: string) {
  const [salt, hash] = saved.split(':');
  if (!salt || !hash || hash.length !== 128) return false;
  const expected = Buffer.from(hash, 'hex');
  const actual = scryptSync(password, salt, expected.length);
  return timingSafeEqual(expected, actual);
}
export async function createSession(userId: string) {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + sessionDays * 86400000);
  await db.session.create({ data: { userId, tokenHash: tokenHash(token), expiresAt } });
  (await cookies()).set(cookieName, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', expires: expiresAt });
}
export async function clearSession() {
  const jar = await cookies();
  const token = jar.get(cookieName)?.value;
  if (token) await db.session.deleteMany({ where: { tokenHash: tokenHash(token) } });
  jar.delete(cookieName);
}
export async function getUser() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;
  const session = await db.session.findUnique({ where: { tokenHash: tokenHash(token) }, include: { user: { include: { profile: true } } } });
  if (!session || session.expiresAt < new Date()) return null;
  return session.user;
}
export async function requireUser() {
  const user = await getUser();
  if (!user) redirect('/kirish');
  return user;
}
