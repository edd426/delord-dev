# Backlog

- **Social preview image.** Open Graph and Twitter meta carry title and description
  but no image, so shared links render text-only. Add an optional `image` prop to
  the base layout and set it per page; `/work/cabin.png` for the cabin-and-tower
  page, something for the autobiographies page. (Added 2026-09-05.)

- **Notes section.** Removed from the front page on 2026-09-06 because all three
  posts were still "forthcoming". `/notes` still exists, unlinked. Restore the row
  when the first post ships. (Added 2026-09-06.)

- **Homepage after the bio and posts.** Reassess spacing and project visibility
  once Evan's planned content exists. Consider short project descriptions or a
  small existing project image. Do not fill the page with AI placeholder prose
  merely to occupy space; preserve Evan's writing pace. (Added 2026-09-06.)

- **Hidden theme influences.** Add Evan's explanation of the Lovecraft-inspired
  games and books behind the arcane theme inside the hidden section. Keep the
  theme intentionally undisclosed in normal recruiter-facing navigation.
  Wait for Evan's specific influences and wording. (Added 2026-09-06.)

- **Two candidate posts from the review-coverage work (agent_cost_optimization,
  2026-09-11/12).** Both draw on the same data; pick one as the lead, the other
  can follow. Status notes in that repo's HANDOFF.md and
  `bench/reports/keyaudit-2026-09-12/RESULTS.md`. (Added 2026-09-12.)
  1. *The efficient review shape.* Seven review configurations, one answer key,
     one grader. Finding: every shape (one cheap agent to a six-agent swarm)
     notices about the same share of defects; the loss is in the verify step,
     which never confirmed a defect its own sweep had not flagged and dropped
     most of what it was handed. A one-agent low-effort sweep notices 36/48 for
     $6 against the six-agent swarm's 44/48 for $44. Deliverable alongside: a
     public skill (sweep, dedupe, audit-shaped verify) with the aggregate data,
     no fixtures or preregs. Still needed before publishing: the verifier
     experiment (which brief converts flags to findings) and a held-out test
     against a naive solo review (on hold, Evan's call).
  2. *Why is it so hard to plug the holes in a sandbox?* Working title. The
     full audit of every flag ever raised against three review packages found
     263 real defects where the key had 71; review had been scored against a
     fifth of the truth. If the severity pass (running 2026-09-12) shows real
     isolation majors in the discarded pool, the thesis is: a sandbox is a list
     of permitted channels, every channel is a review surface, and review finds
     a fraction of what is there. Anchor: the July 2026 OpenAI / Hugging Face
     incident, where the escape went through the sandbox's one authorized
     outbound channel (Artifactory zero-day). Must say up front that our agents
     escaped nothing; the claim is about review coverage of a sandbox.
