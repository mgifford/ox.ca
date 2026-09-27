---
title: The Accessible Digital Commons
subtitle: Aligning Government Procurement to Sustain Open Source
lang: en
theme: default
durationMinutes: 20

titleSlide: true
date: Monday, 28 September 2026 · 10:40–11:00 CEST
location: Goudriaan Room I&II · DrupalCon Rotterdam 2026 Government Summit
speakers: Mike Gifford · CivicActions
presentationUrl: https://ox.ca/p/11

closingSlide: true
closingTitle: Fix it once. Fix it upstream.
closingPrompt: What will you change in your next procurement?
contactUrl: https://ox.ca/
---

# What could result from more intentional public procurement?

::large
- Government capability
- Accessible public services
- A more inclusive society
- [>] Open source can multiply that public value.
::

Note:

This follows directly from the discussion this morning about who is responsible for sustaining the open-source ecosystems that digital sovereignty depends on.

Open source is still not the default model for government technology procurement.

But digital sovereignty has made control, interoperability, reuse, resilience and the ability to maintain our own infrastructure much more important.

The outcome I care about is not simply publishing more code.

I want public procurement to leave government more capable, public services more accessible, and society more inclusive.

Open source can help because it gives us a mechanism for multiplying public investment.

When one government pays to improve software used by many governments, that investment can potentially benefit everyone using the same infrastructure.

Accessibility makes this especially important.

A publicly funded accessibility improvement should not have to be purchased again by the next ministry, municipality or agency using the same technology.

---

# What does procurement usually pay for?

::large
- A single implementation
- Project-specific customization
- Fixes that only benefit that project
- Ongoing support for that deployment
- [>] Who pays to improve Drupal itself?
::

Note:

Government already spends money maintaining Drupal systems.

We pay suppliers to build sites.

We pay them to customize those sites.

We pay them to fix accessibility problems.

And we pay them to support individual deployments.

All of that work is necessary.

The question is what happens when the problem is not unique to that website.

What if the accessibility problem is in Drupal core?

Or CKEditor?

Or a contributed module?

Or a reusable component that appears across dozens of government services?

A supplier can patch one implementation, satisfy the contract and move on.

Then another government may pay another supplier to solve essentially the same problem.

That is where procurement can create more public value.

If a generally useful accessibility improvement can be contributed back to Drupal or another shared dependency, public money can solve more than the immediate project problem.

---

# Accessibility exposes the repeat-work problem

::column-left
## Project by project

- Find an accessibility problem.
- Fix the page or site.
- Close the ticket.
- [>] Repeat.
::

::column-right
## Shared infrastructure

- Find the source of the problem.
- Fix the reusable component.
- Contribute the improvement.
- [>] Others can benefit.
::

::callout
The same accessibility bug should not need public funding fifty times.
::

Note:

I've been scanning government websites across Europe.

Automated accessibility testing has serious limits.

Lighthouse, axe and similar tools cannot determine whether a website conforms to WCAG.

But large-scale scanning can reveal patterns.

We repeatedly see the same classes of accessibility problems across different government websites: labels, names and roles, contrast, structure and component behaviour.

Some are content problems.

Some are specific to one implementation.

But some originate in reusable software.

That distinction matters.

If the defect is in a shared component and government only patches each website separately, government keeps purchasing the same repair.

So the question should not only be:

"How do we fix this page?"

We should also ask:

"How far upstream can we fix this problem?"

In Drupal, upstream can mean Drupal core, CKEditor, a contributed module or theme, a design-system component, or another shared library.

That is where one accessibility investment can have a much larger impact.

---

# What are we seeing across European government sites?

::iframe title:EU-government-Lighthouse-results
https://mgifford.github.io/eu-plus-government-scans/lighthouse-results.html
::

Note:

This is live data from the EU Plus Government Scans project.

The point is not that Lighthouse establishes accessibility conformance. It does not.

The point is scale.

When similar detectable barriers recur across government sites, that gives us evidence to investigate whether we are dealing with isolated implementation problems or problems in shared components and systems.

Accessibility needs both views.

We need to fix the immediate barrier for the person encountering it.

But we also need to ask what created the barrier and whether we can prevent it from appearing elsewhere.

---

# Accessibility does not stop at the public website

::large
- Authors need help creating accessible content for their users.
- [>] They also need accessible authoring tools.
- [>] Procurement has to cover both.
::

Note:

Accessibility requirements in procurement are often focused on the resulting public-facing service.

With Drupal, that is only part of the system being procured.

Public servants use Drupal to create, review and publish government information and services.

Some of those employees are disabled.

So procurement has to ask two questions.

Can disabled citizens use the resulting service?

And can disabled civil servants independently use the system that creates and manages it?

This is where EN 301 549 Clause 5.10 on authoring tools is particularly relevant.

It addresses helping authors create accessible content, preserving accessibility information, providing repair assistance and supporting accessible templates.

For Drupal, that can affect the administrative interface, CKEditor, media workflows, layout tools, contributed modules, themes and reusable components.

The U.S. federal accessibility program has reached a similar operational conclusion. Its 2025 recommendations specifically prioritize accessible authoring tools because preventing defects at the source reduces remediation and rework.

For government procuring Drupal, authoring accessibility is not an optional backend concern.

It is part of the accessibility of the system.

Resources:

- https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/
- https://www.section508.gov/manage/section-508-assessment/2025/recommendations/

---

# The Netherlands gives us a model

## Open Source Ambitieladder

- [>] Publish the code — make it inspectable
- [>] Develop increasingly in the open — show your work
- [>] Enable collaboration and contribution

::callout
Ketenverantwoordelijkheid

**Supply-chain responsibility**
::

Note:

Here in the Netherlands, the Ministry of Health, Welfare and Sport has developed a practical Open Source Ambitieladder for procurement.

I had the opportunity to contribute to that work.

The interesting part is not merely whether the code eventually appears on GitHub.

There is a progression.

Government can publish software after development.

It can expose development earlier.

And it can increasingly work as part of an open community rather than throwing source code over the wall when a contract ends.

One of the concepts I find especially useful is:

Ketenverantwoordelijkheid.

Supply-chain responsibility.

When we depend on free and open-source components, we also have responsibilities toward that software supply chain.

The Ambitieladder discusses contributing through reporting problems, providing solutions, contributing financially and participating in communities.

Its procurement guidance discusses this largely through the lens of security.

Accessibility deserves the same systems thinking.

If a government service depends on a Drupal component and discovers an accessibility defect in that shared component, what responsibility does the procurement have beyond repairing its own deployment?

Resources:

- https://minvws.opensourcewerken.nl/open-source-ambitieladder-voor-maatwerk-aanbesteding-of-opdracht/
- https://www.rvo.nl/onderwerpen/maatschappelijk-verantwoord-ondernemen/ketenverantwoordelijkheid

---

# The U.S. has procurement machinery we can learn from

- [>] Define accessibility requirements before solicitation
- [>] Require suppliers to explain how accessibility will be tested
- [>] Validate vendor accessibility claims
- [>] Make accessibility part of deliverable acceptance
- [>] Re-test when products change

::callout
Accessibility is managed across the acquisition lifecycle.
::

Note:

The United States has not solved digital accessibility.

Its own federal assessments identify significant weaknesses in verification and enforcement.

But the U.S. federal accessibility program has developed procurement machinery Europe can learn from, even though the U.S. still struggles to achieve consistent accessibility outcomes.

Section508.gov treats accessibility as part of the whole acquisition lifecycle.

Before award, agencies determine requirements, conduct market research, develop solicitation language and request accessibility evidence.

During award, they evaluate vendor claims.

After award, they validate contractor compliance.

For development contracts, the guidance specifically asks how, by whom and when accessibility testing will happen.

The Quality Assurance Surveillance Plan guidance turns accessibility into measurable contractor performance.

It addresses testing checkpoints during design, development and user acceptance.

It addresses testing methods, corrective action, re-testing and acceptance of deliverables.

That is much more useful than simply writing:

"This site must meet EN 301 549."

A standards reference is necessary.

It is not a procurement strategy.

Resources:

- https://bidenwhitehouse.archives.gov/omb/management/ofcio/m-24-08-strengthening-digital-accessibility-and-the-management-of-section-508-of-the-rehabilitation-act/
- https://www.section508.gov/buy/
- https://www.section508.gov/buy/integrate-section-508-in-qasps/
- https://www.section508.gov/manage/section-508-assessment/2025/recommendations/

---

# Put accessibility into the contract

- [>] **Requirements**
    Define applicable standards, users, journeys and authoring workflows.
- [>] **Testing**
    Define how, when and by whom accessibility will be tested.
- [>] **People**
    Include disabled people in research and testing.
- [>] **Acceptance**
    Make accessibility part of deliverable acceptance.
- [>] **Maintenance**
    Re-test after significant changes and upgrades.
- [>] **Upstream contribution**
    Require a path for vendors to contribute generally useful accessibility fixes back to shared open-source projects.

::callout
Standards define the target. Procurement defines how we get there.
::

Note:

This has to go significantly beyond:

"The site must meet EN 301 549."

That tells the supplier what standard matters.

The procurement still needs to explain what that means operationally.

Define the important users and journeys.

If Drupal is being procured, include the authoring experience as well as the public website.

Define how accessibility will be tested, when that testing occurs and what evidence the supplier must provide.

Automated testing is useful evidence, but it is not sufficient.

Important user journeys should include appropriate manual and assistive-technology testing and participation by disabled people.

Accessibility also needs to affect acceptance.

A requirement that has no consequence when the deliverable fails it is easily treated as optional.

And accessibility can regress after launch. Drupal, modules, browsers, assistive technologies, content and configuration all change.

Finally, upstream contribution is where the Dutch open-source model and the U.S. accessibility procurement model come together.

The U.S. gives us useful machinery for requirements, testing, evidence, acceptance and remediation.

The Dutch approach gives us open collaboration and supply-chain responsibility.

For open-source government systems, procurement should require a path for vendors to contribute generally useful accessibility fixes back to shared open-source projects.

Not every local change belongs upstream.

And a contract cannot require Drupal or another independent project to accept a contribution.

But a contractor can be required to prepare and submit a useful contribution, with appropriate tests, documentation and engagement so the community can evaluate it.

Resources:

- https://www.section508.gov/buy/
- https://www.section508.gov/buy/integrate-section-508-in-qasps/
- https://www.section508.gov/manage/section-508-assessment/2025/recommendations/
- https://minvws.opensourcewerken.nl/open-source-ambitieladder-voor-maatwerk-aanbesteding-of-opdracht/

---

# Say what you mean

::callout
Define when accessibility is tested.
::

::callout on-click
Define what evidence the supplier provides.
::

::callout on-click
Define what happens when a deliverable fails.
::

::callout on-click
Define who fixes it, and who pays.
::

Note:

These are not hypothetical concerns.

Section508.gov provides procurement and Quality Assurance Surveillance Plan guidance covering these questions.

It calls for accessibility testing checkpoints during design, development and user acceptance.

It calls for defined testing methodologies.

It calls for supporting evidence.

It calls for corrective action and re-testing when a product does not meet the requirement.

The 2025 recommendations go further and recommend provisions requiring vendors to fix, replace or correct non-conforming products.

This is what it means to move beyond:

"This site must meet EN 301 549."

Specify when accessibility is evaluated.

Specify the evidence required.

Specify how a failure affects acceptance.

Specify who is responsible for correcting it.

And for open-source systems, specify what happens when the accessibility defect is in shared infrastructure rather than only in the government's implementation.

Resources:

- https://www.section508.gov/buy/integrate-section-508-in-qasps/
- https://www.section508.gov/manage/section-508-assessment/2025/recommendations/

---

# One public problem. One reusable improvement.

::large
- Find the barrier.
- Fix the system producing it.
- Share the improvement.
- Continue maintaining it.
::

::callout
That is how accessibility becomes infrastructure.
::

Note:

My other DrupalCon presentation looks at essentially the same problem from the technical side.

There, my argument is that accessibility cannot remain a page-by-page game of whack-a-mole.

We need to identify the systems producing accessibility problems and improve those systems.

This talk is the same argument one level higher.

If public procurement repeatedly pays to fix the same accessibility problem in separate implementations, we have created an economic version of accessibility whack-a-mole.

Open source gives us another option.

Find the barrier.

Work out where it originates.

Fix it at the most reusable level we reasonably can.

Share the improvement.

And continue maintaining it.

Later today, this summit will ask whether local government can build and sustain the digital commons it needs.

Accessibility gives us a very concrete test.

When several public bodies depend on the same Drupal component, should each of them purchase the same accessibility fix independently?

Or can procurement create a path toward a shared solution?

Government already has enormous purchasing power.

The question is how we use it.

Not simply to buy accessible websites.

But to build government capability, accessible public infrastructure and a more inclusive society.
