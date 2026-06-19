# Folana Journal Homepage Release Hub Design

Date: 2026-06-19

## Purpose

Turn the Folana Journal homepage into a release hub that makes the latest episode impossible to miss while still preserving the journal, archive, and operational surfaces.

The goal is not to replace the editorial voice. The goal is to make the homepage support the actual release workflow now in use:

- publish the newest episode
- surface the final mixed cut
- keep individual scene versions discoverable
- expose archive and back-catalog discovery
- expose syndication and music-registration state
- keep ACMI coordination visible for the fleet

## Scope

This redesign affects the homepage only.

It includes:

- the main hero
- the first release block below the hero
- archive and recent-entry placement
- social / syndication / music-registration entry points
- ACMI feed placement
- removal or demotion of legacy sections that compete with the release flow

It does not include:

- changing the EP87 premium page itself
- changing the clip pipeline
- changing the music manifest schema
- changing music distribution tooling
- implementing social posting automation

## Current State

The homepage already has strong surfaces, but they are ordered like a magazine front page rather than a release desk:

- MusicFirstHero leads the page
- archive freshness is present
- latest journal entries are present
- SigilGallery, ACMI feed, and older narrative sections compete for attention

That layout is good for exploration, but it hides the operational truth that the site is now a production and release surface.

## Proposed Layout

### 1. Release Hero

Replace the generic “start with the track” lead with a release hub hero.

The hero should contain:

- the newest featured episode title
- a short release-state summary
- a primary action to open the premium episode page
- a secondary action to open the archive
- a tertiary action for the syndication / ops lane

The hero should still feel like Folana:

- cinematic
- editorial
- high contrast
- music-first
- but clearly operational

### 2. Release Status Strip

Add a compact status strip directly below the hero with four states:

- Episode
- Archive
- Syndication
- Music Registration

Each state should show one short status line such as:

- `EP87 live`
- `Newest archive items indexed`
- `Social queue ready`
- `Music metadata staged`

This strip is the “what is live now” truth layer.

### 3. Main Release Lanes

The main body should be organized into four lanes:

- `Featured Episode`
- `Archive`
- `Social / Syndication`
- `Music Registration`

Each lane should have one job and one obvious CTA.

#### Featured Episode lane

This lane should show:

- current featured release
- title
- short description
- live page link
- final cut link

#### Archive lane

This lane should show:

- newest items first
- archive browse action
- a small visual list or rail

#### Social / Syndication lane

This lane should show:

- what is queued for posting
- what has already been posted
- where resurfacing is happening

This lane is about distribution, not writing the posts inside the homepage.

#### Music Registration lane

This lane should show:

- release registration state
- CD Baby / streaming prep state
- whether the episode is awaiting registration or already registered

If the operational detail is not ready, the lane can stay concise and point to the canonical process doc.

### 4. ACMI / Fleet Panel

The ACMI feed should remain on the homepage, but it should move lower on the page and read as an operational panel rather than a centerpiece.

The panel should show:

- current fleet sync state
- recent coordination events
- current rollup or last known canonical state

The intent is to keep the coordination surface visible without letting it dominate discovery.

### 5. Story / Legacy Surfaces

Older storytelling sections should be demoted below the release and operations lanes, or linked out instead of expanded inline.

The homepage should not make users scroll past old lore to reach the latest release.

## Components

The implementation should be broken into clear units:

- `MusicFirstHero` becomes a release-hub hero
- a new `ReleaseStatusStrip` renders the four-state truth layer
- a new `ReleaseLaneGrid` renders the four operational lanes
- existing archive and entry components are reused where possible
- the ACMI feed remains as a lower operational panel

This should preserve existing styling patterns while reducing page-level responsibility.

## Data Flow

The homepage should derive its state from the current source of truth already used in the app:

- `music-manifest.ts` for featured releases
- journal entries for latest editorial content
- archive view for fresh archive items
- profile signals for live status metrics
- ACMI timeline for coordination state

The page should not synthesize a second release truth in the component tree. It should read from the same canonical sources and then present them in a more deliberate order.

## Error Handling

The homepage must degrade cleanly when one source fails:

- If profile signals fail, keep the hero and release lanes rendered with fallback labels.
- If archive items fail, keep the release hero and latest entries visible.
- If ACMI fails, render the page without the feed and show a lightweight fallback state.
- If featured release metadata is missing, fall back to the newest real production track.

No single data fetch should blank the whole homepage.

## Testing

Verify the redesign with:

- a local build
- a production build
- a live browser check of the homepage
- a check that the EP87 premium page remains reachable
- a check that archive and latest-entry links still resolve

Useful behavioral assertions:

- The newest featured release is the first release users see.
- The archive is visible without scrolling through unrelated lore.
- Social / syndication and music-registration states are visible on the home surface.
- ACMI coordination remains visible but no longer competes with release discovery.

## Rollout Plan

1. Update the homepage component structure.
2. Reuse existing release metadata and archive components.
3. Preserve current routes and page URLs.
4. Build and verify locally.
5. Deploy to production.
6. Confirm the live homepage now acts as a release hub.

## Risks

- The page may become too dense if every lane is too verbose.
- Existing hero styling may not translate cleanly to a release-state layout.
- The operational lane could become noisy if it tries to show too much of ACMI.
- The user-facing release page could be buried again if the archive and narrative sections are not demoted enough.

## Success Criteria

The redesign is successful when:

- the homepage clearly foregrounds the newest episode
- the page reads as a release hub, not just a journal feed
- archive, syndication, and registration are visible in one place
- ACMI coordination stays present but secondary
- the live site still builds and deploys cleanly

