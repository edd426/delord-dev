# Handoff

Pickup state for the next session (Claude Code or Codex). Read AGENTS.md first.
Last updated 2026-09-12 by Claude Fable 5.1.

## Where things stand

- Everything is committed and pushed. No uncommitted work.
- 2026-09-06 shipped: `/authorship` policy page (Evan's words), `AuthorNote`
  component, AGENTS.md rulebook with per-page provenance records, signed
  passages on colophon / autobiographies / cabin-and-tower, site-wide title
  case (arcane variants included), plain-hyphen `-Evan` rule, removal of the
  autobiographies "Drafted with help from" line.
- Verified live in the browser: /authorship, /colophon, /work/cabin-and-tower,
  /work/claude-autobiographies render correctly in the default theme.

## Bio page: shipped 2026-09-12

- `/about` is live with Evan's three paragraphs (verbatim from his Google Doc
  draft after three review passes), a `Written by Evan` byline, `-Evan` signoff,
  hyperlinks to his papers and the site's projects, and a portrait cropped from
  a photo in Amman, Jordan (`public/about/evan-amman.jpg`). Front page has a
  second section row linking to it. Authorship recorded in AGENTS.md.
- Not used: the "Bio photo candidates" album headshots; Evan preferred the Amman
  photo for its setting.
- Mobile layout (portrait centered under 600px) was checked by CSS only; the
  browser window resize did not take effect in the session. Worth a glance on a
  phone.

## Also on the table

- Social preview image (BACKLOG.md): base layout still has no `image` prop.
- `/notes` exists unlinked until the first post ships.
- Gallery order check: Evan confirmed Fable 5 released before Opus 5, so the
  current shelf order is correct.
