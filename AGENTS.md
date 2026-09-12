# Project guidance

These rules apply to all agents working on this site, including Codex and Claude
Code. Read `README.md` for development and deployment and `BACKLOG.md` for future
work. Explicit instructions from Evan take precedence.

## Purpose and voice

This is Evan's personal hobby website, also intended to show recruiters his
sustained interest in AI. Preserve its warm, restrained, book-like appearance.
The site can grow slowly as Evan has time to write; empty sections are not a
reason to generate filler or create a large redesign backlog.

## Editing Evan's writing

- Preserve Evan's wording. Offer spelling, grammar, and minor clarity edits
  individually; do not rewrite his prose wholesale. Apply only accepted edits
  and explicit replacement wording.
- Do not silently polish signed prose, generate new first-person claims, or put
  AI-written material inside a human-authored block.
- Authorship is established by Evan's statements or explicit project records,
  not writing style, a Git commit's author field, or an AI detector score.
- Where authorship is uncertain, keep the default AI attribution and ask Evan
  before marking a passage as his.

## Authorship presentation

- `/authorship` contains Evan's policy. By default, visitors should assume text
  is AI-written unless identified as Evan's. Keep the policy accessible through
  the shared footer beside Colophon; do not duplicate that link in the colophon
  body.
- Use `src/components/AuthorNote.astro` for individual human-written passages on
  mixed-authorship pages. It supplies a dark green left border in the default
  theme and an italic serif `-Evan` signoff. It uses the theme accent in arcane
  mode. Reserve this bordered passage style for authorship, not generic emphasis.
- For a whole article written by Evan, the `-Evan` signoff at the end is the
  attribution, matching the policy on `/authorship`. Do not add a `Written by
  Evan` byline (one was added to cabin-and-tower on September 6, 2026 without
  basis in the policy and removed on September 12), and do not put a continuous
  border around a long article containing images and captions.
- AI-written introductions, gallery descriptions, metadata, and technical notes
  remain outside signed passages. A byline for an article's prose does not
  attribute the depicted AI-generated artwork or linked experiments to Evan.
- The policy's only bold prose is `by default, assume the words have come from
  AI models`. Do not italicize `substantive content`.
- The signoff is `-Evan` with a plain ASCII hyphen, never an en dash or em dash.
  Evan chose the hyphen deliberately: dashes read as AI-written. Do not "fix"
  it typographically, in the component, in page markup, or in his prose.
- Title case applies to the arcane-theme variants of headings too.

### Recorded authorship

- `src/pages/authorship.astro`: policy supplied by Evan in the September 6, 2026
  editing session; only individually accepted spot edits were applied.
- `src/pages/colophon.astro`: the opening theme/design paragraph is Evan's;
  technical notes about fonts, hosting, and source are AI-written.
- `src/pages/work/claude-autobiographies.astro`: the introduction beginning
  `One of my favorite traditions` (including `Enjoy the gallery.`) and the
  `An Observation` paragraph are Evan's. Commit `f052736` explicitly records
  these passages as his words. The gallery and introductory deck are AI-written;
  the page carries no separate AI-disclosure line because the policy makes AI
  authorship the default.
- `src/pages/work/cabin-and-tower.astro`: article prose is Evan's writeup,
  recorded by commit `8d7e1c6`, which replaced the AI placeholder. That record
  does not separately establish authorship of captions or metadata.
- `src/pages/about.astro`: the three bio paragraphs are Evan's, supplied from
  his Google Doc draft in the September 12, 2026 session after three review
  passes of individually accepted spot edits; placed verbatim. Hyperlinks were
  added by Claude at Evan's request. On September 12 Evan replaced `language`
  with `culture` in the Budapest sentence. The portrait and caption are not
  his text.

## Content and design conventions

- Use title case for headings and section titles.
- Keep the arcane theme intentionally hidden from ordinary/recruiter browsing.
  Do not add homepage hints, conspicuous controls, or other discovery prompts.
  Its literary/game influences can be explained inside the hidden section.
- The autobiographies gallery is ordered by model release date, oldest first,
  with works by the same model together in edition order. Displayed dates remain
  the dates the works were created, not model release dates.
- Do not add announcements explaining the gallery's sorting. Its inspiration
  credit links to Simon Willison's pelican SVG retrospective.

## Verification and delivery

Run `npm run build` and `git diff --check` for changes. Visually inspect layout
changes in the local browser preview. Do not claim a local preview is deployed;
after an authorized deployment, verify the changed public pages.
