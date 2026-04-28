import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';
import { isAdminAuthed } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('id, title, date, content')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ message: 'Entry not found' }, { status: 404 });
      }
      throw error;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(`Error fetching entry ${id} for edit:`, error);
    return NextResponse.json({ message: 'Error fetching entry' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const { title, date, content } = await req.json();

  if (!title || !date || !content) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const newSlug = `${date}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '')}`;

  try {
    if (id !== newSlug) {
      const { error: delErr } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id);
      if (delErr) throw delErr;
    }

    const { error: upErr } = await supabase
      .from('journal_entries')
      .upsert({ id: newSlug, title, date, content });

    if (upErr) throw upErr;

    revalidatePath('/');
    revalidatePath(`/entries/${id}`);
    if (id !== newSlug) revalidatePath(`/entries/${newSlug}`);

    return NextResponse.json({ message: 'Entry updated successfully', id: newSlug }, { status: 200 });
  } catch (error) {
    console.error(`Error updating entry ${id}:`, error);
    return NextResponse.json({ message: 'Error updating entry' }, { status: 500 });
  }
}
