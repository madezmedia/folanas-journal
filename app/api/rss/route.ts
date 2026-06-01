import { type NextRequest } from 'next/server';
import { REAL_PRODUCTIONS } from '@/lib/music-manifest';

function getTrackDate(track: typeof REAL_PRODUCTIONS[number]): Date {
  const dateTag = track.tags.find((t) => /^\d{4}-\d{2}-\d{2}$/.test(t));
  if (dateTag) return new Date(dateTag + 'T00:00:00Z');
  return new Date('2026-05-27T00:00:00Z');
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const siteUrl = `${origin}/music`;

  const itemsXml = REAL_PRODUCTIONS.map((track) => {
    const date = getTrackDate(track);
    return `
    <item>
      <title>${escapeXml(track.title)}</title>
      <description>${escapeXml(track.description)}</description>
      <link>${siteUrl}</link>
      <guid isPermaLink="false">${escapeXml(track.id)}</guid>
      <pubDate>${date.toUTCString()}</pubDate>
    </item>`;
  }).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Folana's Journal | Signals from the Static</title>
    <link>${origin}</link>
    <description>The holographic chronicle of Folana Lanez — AI music producer, visual alchemist, and dark fairy of the wires. Brooklyn node. Neon transmissions. Locked signatures.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${origin}/api/rss" rel="self" type="application/rss+xml"/>${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
