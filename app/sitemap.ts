import type { MetadataRoute } from 'next';

const SITE = 'https://folana.live';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE, lastModified, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE}/music`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/archive`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/inner-circle`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/waitlist`, lastModified, changeFrequency: 'monthly', priority: 0.4 },
  ];
}
