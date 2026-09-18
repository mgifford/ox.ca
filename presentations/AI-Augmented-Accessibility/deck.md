---
title: AI-Augmented Accessibility
lang: en
theme: default-high-contrast
durationMinutes: 20
slideWidth: 1280
slideHeight: 720
themeStylesheet:
titleSlide: true
subtitle: From Automated Alt-Text to Governance Gates
date: 10:45–11:30 CEST, 2026-03-22
location: DrupalCon Rotterdam 2026 (Leeuwen Room I&II)
speakers: Mike Gifford
closingSlide: true
closingTitle: Questions?
closingPrompt: Thanks for following along. Here is how to keep the conversation going.
contactUrl: https://ox.ca
socialLinks: Mastodon.social: @mgifford Bluesky @ox.ca
presentationUrl: https://ox.ca/p/10
conferenceURL: https://events.drupal.org/rotterdam2026/session/ai-augmented-accessibility-automated-alt-text-governance-gates

---

# 5 DrupalCon Accessibility Talks! (Yesterday)

- **Christopher Torgalson (13:30)** 
    Baseline WebAIM failures & WCAG semantics.

- **Junaid Masoodi (17:35)** 
    AI hallucinated ARIA, broken focus traps, false confidence.

---

# "Whack-a-Mole" Fails, Over and Over Again

- Organizations repeatedly fail basic automated testing
- [>] ... the focus hasn't been on the system, but the page. 
- axe-core initial release 1.0 was in 2015
- [>>]  ... which was over a decade ago. 
- Periodic automated scans catch issues 
- [>>] ... but *after* non-compliant code reaches production.

Note:
https://events.drupal.org/rotterdam2026/session/ai-augmented-accessibility-automated-alt-text-governance-gates

Stop reacting to accessibility errors and start automating inclusive governance. Learn how to use AI to find accessibility errors earlier and fix them faster. We’ll bridge the gaps between AI, code, and humans with clear guidance for everyone.

Prerequisite

It would be useful to be familiar with some basics of accessibility. This is not a 101.

Target Audience

Anyone working to meet accessibility targets.

Outline

Accessibility is often the last gate in a project. Like many bugs the longer they wait, the more difficult they are to fix. Learn how we can "shift left" by using AI not just to find errors, but to build better systems. This session provides a practical roadmap for integrating AI into the full Drupal lifecycle:

* Content: Automating descriptive alt-text & transcripts using Drupal AI Core.
* Infrastructure: Using LLMs to architect & configure CI/CD accessibility gates (Axe-core/Playwright).
* Triage: Leveraging GitHub’s AI-powered accessibility toos to turn scans into Pull Requests.
* Governance: Implementing ACCESSIBILITY.md or Claude skills to produce better results.
* Hierarchy of Truth: Adding AI roles to that of other automated tools & humans—why the user remains the ultimate source of truth.

Join us to move beyond "compliance checklists" & toward a scalable, AI-assisted inclusive web.

Mike will also be tying this into the book he recently co-authored. Digital Accessibility Ethics: Disability Inclusion in All Things Tech,

Learning Objectives

* Automate Content Workflows: Set up the Drupal AI module for automated, human-verified media accessibility.
* Architect Testing Gates: Use AI assistants to write configuration for robust CI/CD frameworks.
* Implement Modern Standards: Learn to use ACCESSIBILITY.md & Claude Skills to keep projects transparent and compliant.
* Validate Strategically: Understand the "Hierarchy of Truth" to know when to trust what.

---
::iframe title: Lighthouse Scores of European government sites
https://mgifford.github.io/eu-plus-government-scans/lighthouse-results.html#lighthouse-scores-by-country
::

---

::iframe title:CivicActions blog on automating tools accessibility CI/CD on GitHub
https://accessibility.civicactions.com/posts/how-we-scale-inclusive-website-content-with-automated-testing-and-open-source-tools
::

Note:
- **CI/CD - Continuous Integration / Continuous Development** 
    Moving from reactive post-launch fixes to continuous pipeline-level governance.

---

::iframe title:Guidepup Screen reader automation library
https://www.guidepup.dev/
::

Note: 
Automated site scanning tool.

---

::iframe title:AI Generated Accessibility Reports
https://mgifford.github.io/accessibility-sandbox/ai-report/
::

Note: 
What folks want.

---

# The Hierarchy of Truth

1. **Disabled Users & Lived Experience**  <-- Highest Authority
2. **Accessibility SME Manual Audits** backed by WCAG
3. Deterministic DOM Scanners (axe-core)
4. Synthetic AT Automation (GuidePup & GuidePup MCP)
5. Probabilistic AI Proposals (LLM Candidates)  <-- Lowest Authority


Note:
- **Rule 1:** Don't use a LLM where a simpler algorithm will do.
- **Rule 2:** Trust people over machines

1. Accessibility Statements, Users with Disabilities
2. Professionals
3. Standard automated tools
4. AI driven tools
5. AI driven answers

---

# The AI Alt-Text Paradox: Capability vs. Context

- **The FOSDEM 2025 Baseline:** Vision models consistently generate richer candidate descriptions than untrained human authors.
- **The GitHub Engineering Trap:**
  - **Passing automated checks doesn't mean your site is accessible.**
  - Automated scanners confirm the rule works as defined, it does not mean it meets WCAG SC.
- **The AI Blind Spot:** LLMs do not know context, editorial intent, or when an image requires alt text (vs declaring the image a decorative element  `alt=""`).

---
::iframe title:ACCESSIBILITY.md Markdown Files
https://mgifford.github.io/ACCESSIBILITY.md
::

Note:
**Culture Dictates What Is Acceptable:** Compliance is an organizational.
**Repo-Level Guardrails (`ACCESSIBILITY.md`):**
- Commit standards directly into project roots alongside `README.md`.
- Provide machine-readable instructions that both human developers and coding LLMs must obey.
- accessibility-skills too

---

::iframe title:ZivTech Cross-Model Accessibility Skills
https://zivtech.github.io/accessibility-skills/
::

Note:


---

::iframe title:Alt Text Scans
https://mgifford.github.io/alt-text-scan/reports.html
::

Note:
- Alt text can be rated with an algorithm
- A LLM can probably do it better than a person.

---

::iframe title:Top Task Finder - Popular URLs
https://mgifford.github.io/top-task-finder/
::

Note:
- Scan a site that has already been scanned and demonstrate the LLM Prompt
- Best experience is still with data and someone with User Researcher

---

::iframe title:Drupal MCP
https://drupalmcp.io/en
::

Note:
- Note this hasn't been tested to see if it works

---

::iframe title:WCAG MCP
https://mcp.so/servers/accessibilitymcp
::

Note:
- Note this hasn't been tested to see if it works


---

::iframe title:WCAG WebMCP Community Group
https://webmachinelearning.github.io/webmcp/
::

Note:
- The W3C is working on this.

---

::iframe title:Playwright MCP
https://playwright.dev/docs/getting-started-mcp
::

Note:
- I am still working on this.

---

::iframe title:Open Accessibility Workbench
https://mgifford.github.io/open-accessibility-workbench/#/overview

::

Note:
- Sample URLs: 
  - https://mgifford.github.io/open-scans/reports/issues/issue-353/2026-09-14T14-12-20-749Z/report.csv
  - https://mgifford.github.io/open-scans/reports/issues/issue-353/2026-09-14T14-12-20-749Z/report.csv
  - https://mgifford.github.io/open-scans/reports/issues/issue-350/2026-09-14T13-56-56-213Z/report.csv
  - https://mgifford.github.io/open-scans/reports/issues/issue-351/2026-09-14T14-44-51-809Z/report.csv

---

# The 5-Step Operational Remediation Pipeline

1. **Scan Site** 
  * Auto-scan (playwright + axe-core): Ingest raw DOM violations into Open Accessibility Workbench.
  * Synthetic Pass (Guidepup + Playwright MCP): Execute programmatic VoiceOver/NVDA passes.
3. **Review Results**
  * Context Lookup (wcag-mcp + uswds-mcp): Pair violations with normative rules and token patterns.
4. **Remediate Priorities**: 
  * Generate constrained patches using approved semantics where possible.
5. **Validate Solutions** 
    * Scan page: Use a tool like Accessibility Insights to validate the page is fixed.
    * Synthetic Pass2 Rescan to validate it has been fixed. Include updated 
6. **Human Audit:** SME reviews diffs, tests new UI, and approves PR.

---

# Human Driven
- **Nothing About Us, Without Us**  
  - We need to do much better at engaging PwD and hiring them.
- **Accessibility Statements**
  - These are a key feedback loop for any system. Actively listen to your users.
- **Design Systems**
  - Shift left. Yes, an ACCESSIBILITY.md may help, but not as much as a well supported design system.
- **Accessibility Champions**
  - Accessibility is a team sport. Build your champions. 
- **Training**
  - Everyone needs to learn more about how others interact with the tools we build.

---

# Next Accessibility Sessions

- **14:05 (Room 2):** Daniel Angelov — *The Reality of Accessibility Automation*
- **16:00 (Room 3):** John Jameson — *Getting the Most Out of Editoria11y v3*
