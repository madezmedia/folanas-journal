import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const journalsDirectory = path.join(process.cwd(), 'journal-entries');

// Dummy authentication function for MVP
function isAuthenticated(password: string | null | undefined): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

export async function GET(
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
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: 'Entry not found' }, { status: 404 });
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);

    return NextResponse.json(
      {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        content: matterResult.content,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error fetching entry ${id} for edit:`, error);
    return NextResponse.json({ message: 'Error fetching entry' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { title, date, content, password } = await req.json();

  if (!isAuthenticated(password)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!title || !date || !content) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const oldFilePath = path.join(journalsDirectory, `${id}.md`);

  const newSlug = `${date}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '')}`;
  const newFileName = `${newSlug}.md`;
  const newFilePath = path.join(journalsDirectory, newFileName);

  const markdownContent = `---
title: ${title}
date: ${date}
---

${content}
`;

  try {
    // If the slug changed, rename the file
    if (id !== newSlug) {
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
    fs.writeFileSync(newFilePath, markdownContent);
    return NextResponse.json({ message: 'Entry updated successfully', id: newSlug }, { status: 200 });
  } catch (error) {
    console.error(`Error updating entry ${id}:`, error);
    return NextResponse.json({ message: 'Error updating entry' }, { status: 500 });
  }
}
