Summary of language and accessibility edits for `presentations/procurement-fosdem26.html`

What I changed
- Expanded acronym `FLOSS` to `Free/Libre Open Source Software (FLOSS)` in the title and cover h1.
- Reworded the puppy/chair metaphor to avoid casual or potentially unclear simile. Replaced with: "Open source needs ongoing care, not a one-time gift." This follows the plain-language guidance.
- Clarified "OpEx" as "Operating Expenses (OpEx)" and changed the "Open Source (trap)" label to "Open Source (neglected)" for clarity and to avoid jargon.
- Added DPI expansion: "Digital Public Infrastructure (DPI)".
- Made the RFP example explicit as an RFP clause and kept the upstream-first requirement but framed it as an example.
- Expanded DITAP reference to "U.S. Digital Service (USDS) Digital IT Acquisition Playbook (DITAP)" to spell out the acronym.
- Rephrased the final emphatic sentence to be less flippant and more direct, per the AGENTS.md guidance.
- Added a note to the resources slide to include an image `alt` for the QR code and to ensure full URLs are present in speaker notes.

Further suggestions (optional)
- Use en-CA spelling in text if you prefer (AGENTS.md says American spelling by default, but your site prefers en-CA elsewhere). Pick one and apply consistently.
- Replace metaphors like "Whales vs. Minnows" with literal phrasing for accessibility and clarity (e.g., "Small grants vs. large procurement budgets").
- Ensure every slide that includes an image or QR has an `img` tag with descriptive `alt` text (e.g., `alt="QR code linking to civicactions playbook"`).
- Expand any acronyms on first use in the speaker notes as well as the slide body.
- Consider adding one-line speaker-note scripts for visually-impaired attendees who follow the slides via screen readers (keep notes succinct and explicit).
- Keep the `aria-live` region content brief and meaningful; consider updating the message for entering and exiting slide mode.

Requested outline & mapping (added)
- Title: Procurement Is the Biggest Form of Fundraising for Free/Libre Open Source Software (FLOSS)
	Theme: Moving from "Charity" to "Infrastructure Investment"

Introduction (0:00 - 5:00)
- Hook: "We spend hours debating how to get a $5/month donation from a user on GitHub Sponsors. Meanwhile, governments spend trillions on IT contracts annually. We are looking for funding in the wrong pocket." (Inserted as slide `#hook`.)
- Who am I: Mike Gifford, CivicActions, Drupal Accessibility Maintainer (cover notes updated).
- The Problem: The "Charity Model" of FOSS funding is broken — leads to maintainer burnout & insecure supply chains (Log4j, xz-utils). (Inserted as slide `#charity-model`.)
- The Thesis: "We don't need more donations; we need better procurement policies. We need to turn 'using' FOSS into 'buying' FOSS expertise." (Added to cover notes.)

Section 1: The Economics of Government IT (5:00 - 10:00)
- Show the scale: Small donations vs. government IT budgets. Replace "Whales vs. Minnows" with specific numbers or "Small grants vs. government procurement budgets." (Suggestion: show a visual with donation totals under water and procurement budgets above.)

Section 2: Friction in Procurement (10:00 - 15:00)
- Keep points about vendor lock-in, body shops, and the need to define maintenance as a deliverable rather than license seats.

Section 3: The Solution — Hacking the RFP (15:00 - 22:00)
- Policy levers suggested: prefer open standards, contribution as a deliverable, tie sustainability/accessibility as procurement tie-breakers, and OSPOs.
- Example language: "All bug fixes to upstream libraries used in delivery must be submitted and tracked upstream." Consider an explicit RFP clause slide.

Section 4: Call to Action (22:00 - 27:00)
- For Maintainers: build enterprise-ready docs and simple compliance checkboxes.
- For Vendors: sell contribution and allocate a line item for upstream maintenance.
- For Governments: shift budgets to fund ecosystems; the 1% Pledge is added to the CTA slide.

Conclusion (27:00 - 30:00)
- Closing Thought: "Procurement is the most unsexy topic in open source, but it is the only one with enough money to actually save it." (Slide already contains a version of this line; updated to align with the new thesis.)

Visual suggestions
- Replace metaphors with literal diagrams: donations as small surface bubbles, procurement as the deep volume under the surface; show dependency trees for a typical government site with many unpaid libs.

If you'd like, I can draft the exact RFP language and a slide-ready bullet list for the "Hacking the RFP" slide.

Accessibility checklist applied
- Headings are sequential and present.
- Tables have `aria-label` and `th` scope attributes.
- Links are descriptive; avoid adding "click here".
- Notes include resource references and suggested alt-text placeholders.

If you want, I can:
- Apply the remaining suggestions (alt attributes, en-CA spelling changes, replace metaphors) directly into the file.
- Create a parallel `presentations/procurement-fosdem26.accessibility.md` checklist for event delivery.

Next step
- I will mark the TODOs: update language (in-progress -> completed), add suggestions (not-started -> completed), and run a final review.
