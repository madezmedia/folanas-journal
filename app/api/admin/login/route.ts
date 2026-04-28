import { NextResponse } from 'next/server';
import { checkAdminPassword, setAdminSession, clearAdminSession } from '@/lib/auth';

export async function POST(req: Request) {
  const { password } = await req.json();

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ message: 'Login successful' }, { status: 200 });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ message: 'Logged out' }, { status: 200 });
}
