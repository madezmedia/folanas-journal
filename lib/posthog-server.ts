/**
 * Server-side PostHog (API routes / server actions).
 * Create per request or reuse via getPostHogServer(); always await shutdown() when done with a one-shot client.
 */
import { PostHog } from 'posthog-node';

let shared: PostHog | null = null;

export function getPostHogServer(): PostHog | null {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!token || !host) return null;
  if (!shared) {
    shared = new PostHog(token, {
      host,
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return shared;
}

/** One-shot client for a single request/action — call await client.shutdown() when finished. */
export function createPostHogServer(): PostHog | null {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!token || !host) return null;
  return new PostHog(token, {
    host,
    flushAt: 1,
    flushInterval: 0,
  });
}
