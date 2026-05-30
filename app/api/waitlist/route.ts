import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, tier } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate tier
    const validTiers = ['codex', 'engine', 'atelier'];
    if (tier && !validTiers.includes(tier)) {
      return NextResponse.json(
        { success: false, message: 'Invalid tier. Must be one of: codex, engine, atelier' },
        { status: 400 }
      );
    }

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Append to JSONL file
    const entry = {
      name,
      email,
      tier: tier || 'codex',
      timestamp: new Date().toISOString(),
    };

    const jsonlPath = path.join(dataDir, 'waitlist.jsonl');
    fs.appendFileSync(jsonlPath, JSON.stringify(entry) + '\n', 'utf-8');

    return NextResponse.json({
      success: true,
      message: "You're on the waitlist!",
    });
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
