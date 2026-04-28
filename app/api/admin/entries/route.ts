import { NextResponse } from 'next/server';
import { getSortedJournalEntries } from '@/lib/journal';
import { isAdminAuthed } from '@/lib/auth';

export async function GET() {
  if (!(await isAdminAuthed())) {
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
