---
title: Open source a11y tools with Mike Gifford
lang: en
theme: default-high-contrast
durationMinutes: 30
slideWidth: 1280
slideHeight: 720
themeStylesheet:
titleSlide: true
subtitle: From Automated Alt-Text to Governance Gates
date: 9am ET November 5
location: LocalGov Drupal - Accessibility Meetup
speakers: Mike Gifford
closingSlide: true
closingTitle: Questions?
closingPrompt: Thanks for following along. Here is how to keep the conversation going.
contactUrl: https://ox.ca
socialLinks: Mastodon.social: @mgifford Bluesky @ox.ca
presentationUrl: https://ox.ca/p/12
conferenceURL: https://luma.com/an8uq8do?tk=FArMBa

Note:
Mike Gifford from CivicActions has built Vital Core, a free, open source tool that scans websites for accessibility issues every week and tracks how they change over time.

​He's kindly set up a proof of concept for LocalGov Drupal councils - thanks to Hackney, Luton and Walsall sfor volunteering.

​Mike will show us how it works. Then we'll talk about:
  -  ​whether we could use it to find and fix accessibility issues in LocalGov Drupal
  -  ​whether councils would find it useful to track their own sites, or compare them with others
  -  ​what's missing, and what would make it easier to use

​It's an early version, so your feedback will help decide what happens next.

​You don't need to be an accessibility specialist. If you work on a council website, come along.

---

# "Whack-a-Mole" Fails, Over and Over Again

- Organizations repeatedly fail basic automated testing
- [>] ... the focus hasn't been on the system, but the page. 
- axe-core initial release 1.0 was in 2015
- [>>]  ... which was over a decade ago. 
- Periodic automated scans catch issues 
- [>>] ... but *after* non-compliant code reaches production.

Note:

---
::iframe title: Lighthouse Scores of European government sites
https://mgifford.github.io/eu-plus-government-scans/lighthouse-results.html#lighthouse-scores-by-country
::

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



::iframe title:LocalGov Drupal Vital Core Scans
https://mgifford.github.io/vital-core-lgd/
::

Note:
- **CI/CD - Continuous Integration / Continuous Development** 
    Moving from reactive post-launch fixes to continuous pipeline-level governance.

---
