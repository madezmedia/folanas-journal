import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// Dummy authentication function for MVP
function isAuthenticated(password: string | null | undefined): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

export async function POST(req: Request) {
  const { title, date, content, password } = await req.json();

  if (!isAuthenticated(password)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!title || !date || !content) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const slug = `${date}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '')}`;

  try {
    const { error } = await supabase
      .from('journal_entries')
      .upsert({
        id: slug,
        title,
        date,
        content
      });

    if (error) throw error;

    // Trigger on-demand revalidation for the home page
    revalidatePath('/');

    return NextResponse.json({ message: 'Entry created successfully', id: slug }, { status: 201 });
  } catch (error) {
    console.error('Error creating entry in Supabase:', error);
    return NextResponse.json({ message: 'Error creating entry' }, { status: 500 });
  }
}
