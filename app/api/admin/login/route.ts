import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    // In a real application, you'd set a session cookie or JWT here.
    // For this MVP, we'll just return success.
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }
}
