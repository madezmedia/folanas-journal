/**
 * PostHog client init (Next.js 15.3+ / 16).
 * @see https://posthog.com/docs/libraries/next-js
 */
import posthog from 'posthog-js';

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (typeof window !== 'undefined' && token && host) {
  posthog.init(token, {
    api_host: host,
    defaults: '2026-05-30',
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
  });
}
