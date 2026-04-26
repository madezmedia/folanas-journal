import { NextResponse } from 'next/server';
import { getSortedJournalEntries } from '@/lib/journal';

function isAuthenticated(password: string | null | undefined): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const password = url.searchParams.get('password'); // For simplicity, pass password in query for now. NOT secure for production.
  
  if (!isAuthenticated(password)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const entries = await getSortedJournalEntries();
    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch journal entries:', error);
    return NextResponse.json({ message: 'Error fetching entries' }, { status: 500 });
  }
}
