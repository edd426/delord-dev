# Handoff

Pickup state for the next session (Claude Code or Codex). Read AGENTS.md first.
Last updated 2026-09-06 by Claude Fable 5.1.

## Where things stand

- Everything is committed and pushed; delord.dev is live at `442c6d1`. No
  uncommitted work.
- 2026-09-06 shipped: `/authorship` policy page (Evan's words), `AuthorNote`
  component, AGENTS.md rulebook with per-page provenance records, signed
  passages on colophon / autobiographies / cabin-and-tower, site-wide title
  case (arcane variants included), plain-hyphen `-Evan` rule, removal of the
  autobiographies "Drafted with help from" line.
- Verified live in the browser: /authorship, /colophon, /work/cabin-and-tower,
  /work/claude-autobiographies render correctly in the default theme.

## Next: the bio page

The bio is the last gap before the site is ready for its near-term purpose
(see BACKLOG.md). Evan writes the prose; agents place it verbatim.

Decisions reached in the 2026-09-06 session, pending Evan's confirmation:

- Name the employer in one clause and nothing more. It is already public on
  LinkedIn, which the footer links to. No cost figures, team names, internal
  tool names, or project details from the day job.
- Frame the arc as sustained experiments on how agents behave, not "ML engineer
  who moved to cloud": artificial-life research (Wilke lab, ALIFE 14 paper),
  cerebellum simulation (Mauk lab), six years shipping ML products at Chevron
  incl. leading a seven-person team across three continents, platform
  engineering at Bosch, then the experiments on this site.
- Suggested shape: three short paragraphs plus a links line, signed `-Evan`
  with a plain hyphen, wrapped in `AuthorNote` or given the whole-article
  byline treatment per AGENTS.md.

Public record worth linking or citing (from LinkedIn, all public):

- Publications (four): ALIFE 14, 2014, "Structured Populations with Limited
  Resources Exhibit Higher Rates of Complex Function Evolution" (self-replicating
  programs, Wilke lab); Science Advances, May 2018, "A cerebellar adaptation to
  uncertain inputs" (cerebellum simulation data); Journal of Neuroscience, Aug
  2018, "Medial auditory thalamus is necessary for expression of auditory trace
  eyelid conditioning" (cerebellum simulations); WWW '20, Apr 2020, "Few-Sample
  and Adversarial Representation Learning for Continual Stream Mining" (few-shot
  metric learning, UT Dallas). The two neuroscience papers and the ALIFE paper
  are the natural citations for the "experiments on agents" framing.
- LinkedIn has no About section (only Experience, Education, Skills,
  Publications, Courses, Honors), so the bio page will be the only long-form
  self-description Evan has online.
- The Bosch role description on LinkedIn already says "using AI to automate
  infrastructure tasks", so a one-line mention of AI work at the day job is
  consistent with what recruiters can already see.

Open questions for Evan:

1. Mention the unpublished genetics games (Panthalassa, Herdloom)?
2. Mention Budapest and the move from Houston?
3. One paragraph or a short sectioned page?

When the prose arrives:

1. Create `src/pages/bio.astro` (or `/about`; Evan's call) using the `Stub`
   layout; title case the heading and give it an arcane variant.
2. Place Evan's text byte-for-byte, no rewording, sign-off with a plain hyphen.
3. Add a second section row on the front page (`src/pages/index.astro`)
   linking to it, and a default/arcane label pair.
4. Record the authorship in AGENTS.md "Recorded authorship" with the commit.
5. `npm run build`, `git diff --check`, browser check in both themes, push,
   then verify the live page. Tick the BACKLOG.md bio item.

## Also on the table

- Social preview image (BACKLOG.md): base layout still has no `image` prop.
- `/notes` exists unlinked until the first post ships.
- Gallery order check: Evan confirmed Fable 5 released before Opus 5, so the
  current shelf order is correct.
