import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { isAdminAuthed, checkAdminPassword } from '@/lib/auth';

export async function POST(req: Request) {
  // Allow either session cookie auth OR password in request body/header
  const body = await req.json().catch(() => ({}));
  const headerPw = req.headers.get('x-admin-password');
  const isAuthed = await isAdminAuthed() || checkAdminPassword(body.password) || checkAdminPassword(headerPw);
  if (!isAuthed) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, date, content } = body;

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
