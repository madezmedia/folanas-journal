import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { isAdminAuthed } from '@/lib/auth';

export async function POST(req: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, date, content } = await req.json();

  if (!title || !date || !content) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const slug = `${date}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '')}`;

  try {
    const { error } = await supabase
      .from('journal_entries')
      .upsert({ id: slug, title, date, content });

    if (error) throw error;

    revalidatePath('/');

    return NextResponse.json({ message: 'Entry created successfully', id: slug }, { status: 201 });
  } catch (error) {
    console.error('Error creating entry in Supabase:', error);
    return NextResponse.json({ message: 'Error creating entry' }, { status: 500 });
  }
}
