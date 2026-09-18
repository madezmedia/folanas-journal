import type { MetadataRoute } from 'next';

const SITE = 'https://folana.live';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/', '/orchestrator', '/api/admin', '/api/internal'],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
