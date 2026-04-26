import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const journalsDirectory = path.join(process.cwd(), 'journal-entries');

// Dummy authentication function for MVP
function isAuthenticated(password: string | null | undefined): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const url = new URL(req.url);
  const password = url.searchParams.get('password'); // For simplicity, pass password in query for now. NOT secure for production.

  if (!isAuthenticated(password)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const filePath = path.join(journalsDirectory, `${id}.md`);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ message: 'Entry deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Entry not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(`Error deleting entry ${id}:`, error);
    return NextResponse.json({ message: 'Error deleting entry' }, { status: 500 });
  }
}
