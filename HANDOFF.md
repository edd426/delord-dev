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

- `/about` is live with Evan's bio (five paragraphs, verbatim from his Google
  Doc draft after three review passes; the two extra paragraph breaks were his
  call), `-Evan` signoff, hyperlinks to his papers and the site's projects, and
  his own landscape crop of a photo from Amman, Jordan
  (`public/about/evan-amman-wide.jpg`, metadata stripped, capped at 440px on
  desktop, full width on phones).
- Navigation, after feedback from Peta: an uppercase `About Me` marker top
  right on the front page only (arcane: `Concerning the Author`). The footer
  holds outbound links (GitHub, LinkedIn, RSS) and site pages (Colophon, AI &
  Authorship), grouped so it wraps into two deliberate rows on phones. Evan
  considered moving AI & Authorship to the top as well; left in the footer.
- Front-page tagline is Evan's: `Platform engineer. Cloud infrastructure. AI
  hobbyist.` (arcane: `Dabbler in artificial minds.`). Meta description and
  llms.txt updated to match.
- The `Written by Evan` byline is gone site-wide; the `-Evan` signoff is the
  attribution per `/authorship`. AGENTS.md rule corrected.
- Open: Evan said he does not really do MLOps, but his bio still says "six
  years as an MLOps engineer at Chevron". His prose, his call; not changed.

## Contact address: set up 2026-09-12

- `evan@delord.dev` forwards to Evan's Gmail via Cloudflare Email Routing
  (dashboard: Email Routing > delord.dev; one rule, catch-all disabled, MX and
  SPF records managed by Cloudflare). Linked from the footer's outbound group
  and in the Person JSON-LD. No Cloudflare API credentials exist locally; the
  setup was done through Evan's signed-in browser.
- Outbound: Gmail "Send mail as" alias for evan@delord.dev through
  smtp.gmail.com with a Google App Password (stored in Evan's Apple Passwords),
  verified 2026-09-12. Open: delord.dev's SPF record names only Cloudflare;
  adding `include:_spf.google.com` would cover mail sent via Gmail.

## Also on the table

- Social preview image (BACKLOG.md): base layout still has no `image` prop.
- `/notes` exists unlinked until the first post ships.
- Gallery order check: Evan confirmed Fable 5 released before Opus 5, so the
  current shelf order is correct.
