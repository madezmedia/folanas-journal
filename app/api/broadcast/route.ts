import { NextRequest, NextResponse } from 'next/server';

const ACMI_BUS_KEY = process.env.UPSTASH_REDIS_REST_URL
  ? 'acmi:bus:broadcast'
  : null;

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function writeToAcmi(event: object) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    console.log('[broadcast] No Upstash Redis — ACMI write skipped:', JSON.stringify(event));
    return false;
  }
  try {
    const body = {
      command: 'LPUSH',
      args: ['acmi:bus:broadcast', JSON.stringify(event)],
    };
    await fetch(UPSTASH_URL.replace(/\/$/, ''), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([body.command, ...body.args]),
    });
    return true;
  } catch (err) {
    console.error('[broadcast] ACMI write failed:', err);
    return false;
  }
}

const PLATFORMS = ['facebook', 'instagram', 'linkedin', 'reddit', 'slack'] as const;

interface BroadcastRequest {
  imageUrl?: string;
  caption: string;
  title: string;
  platforms: string[];
  link?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: BroadcastRequest = await request.json();

    if (!body.caption || !body.title) {
      return NextResponse.json(
        { success: false, message: 'caption and title are required' },
        { status: 400 }
      );
    }

    if (!body.platforms || body.platforms.length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one platform required' },
        { status: 400 }
      );
    }

    const invalidPlatforms = body.platforms.filter(p => !PLATFORMS.includes(p as any));
    if (invalidPlatforms.length > 0) {
      return NextResponse.json(
        { success: false, message: `Invalid platforms: ${invalidPlatforms.join(', ')}` },
        { status: 400 }
      );
    }

    const event = {
      version: '1.5',
      ts: Date.now(),
      source: 'folana-journal-ui',
      kind: 'broadcast_request',
      correlationId: `broadcast-ui-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      summary: `[broadcast] ${body.title} → ${body.platforms.join(', ')}`,
      payload: {
        title: body.title,
        caption: body.caption,
        imageUrl: body.imageUrl,
        platforms: body.platforms,
        link: body.link,
        source: 'archive-grid',
      },
      speaker_type: 'system',
      tenant_id: 'madez',
    };

    await writeToAcmi(event);

    return NextResponse.json({
      success: true,
      message: `Broadcast queued for ${body.platforms.join(', ')}`,
      correlationId: event.correlationId,
    });
  } catch (err) {
    console.error('[broadcast] Error:', err);
    return NextResponse.json(
      { success: false, message: 'Broadcast failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    available_platforms: PLATFORM_LABELS,
    status: 'ready',
  });
}

const PLATFORM_LABELS = [
  { id: 'facebook', label: 'Facebook', enabled: true },
  { id: 'instagram', label: 'Instagram', enabled: false, note: 'Needs IG business account setup' },
  { id: 'linkedin', label: 'LinkedIn', enabled: false, note: 'Re-auth needed' },
  { id: 'reddit', label: 'Reddit', enabled: false, note: 'Re-auth needed' },
  { id: 'slack', label: 'Slack', enabled: false, note: 'Slack MCP method pending' },
];
