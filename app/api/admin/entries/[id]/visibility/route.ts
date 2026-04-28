import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';
import { isAdminAuthed } from '@/lib/auth';

const ALLOWED_VISIBILITIES = new Set(['live', 'draft']);

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  const visibility = typeof body.visibility === 'string' ? body.visibility : null;
  if (!visibility || !ALLOWED_VISIBILITIES.has(visibility)) {
    return NextResponse.json(
      { message: `Invalid visibility (allowed: ${[...ALLOWED_VISIBILITIES].join(', ')})` },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .update({ visibility })
      .eq('id', id)
      .select('id')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ message: 'Entry not found' }, { status: 404 });
      }
      throw error;
    }

    revalidatePath('/');
    revalidatePath(`/entries/${id}`);

    return NextResponse.json({ message: 'Visibility updated', id: data?.id ?? id, visibility }, { status: 200 });
  } catch (error) {
    console.error(`Error updating visibility for ${id}:`, error);
    return NextResponse.json({ message: 'Error updating visibility' }, { status: 500 });
  }
}
