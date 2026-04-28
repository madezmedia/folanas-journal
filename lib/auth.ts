import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'admin_session';
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

function getSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error('ADMIN_SESSION_SECRET missing or too short (need >=16 chars)');
  }
  return s;
}

function b64urlEncode(buf: Buffer): string {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function b64urlDecode(s: string): Buffer {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (s.length % 4)) % 4);
  return Buffer.from(padded, 'base64');
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function checkAdminPassword(password: string | null | undefined): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function setAdminSession(): Promise<void> {
  const exp = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = b64urlEncode(Buffer.from(JSON.stringify({ exp })));
  const sig = sign(payload);
  const value = `${payload}.${sig}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function isAdminAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return false;
  const idx = raw.lastIndexOf('.');
  if (idx <= 0) return false;
  const payload = raw.slice(0, idx);
  const sig = raw.slice(idx + 1);
  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return false;
  }
  if (sig.length !== expected.length) return false;
  let sigOk: boolean;
  try {
    sigOk = timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
  if (!sigOk) return false;
  try {
    const parsed = JSON.parse(b64urlDecode(payload).toString('utf8'));
    if (typeof parsed.exp !== 'number') return false;
    if (Date.now() > parsed.exp) return false;
    return true;
  } catch {
    return false;
  }
}
