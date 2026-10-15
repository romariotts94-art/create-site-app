# AGENTS.md — Website Factory Rules

## RULE 0 — NON-NEGOTIABLE PRE-FLIGHT GATE FOR ALL CODEX WORK

**Highest-priority repository workflow rule. Applies to EVERY task that changes or creates the marketplace/catalog, an existing site, a future site, shared components, previews, integrations, tests, or supporting infrastructure in this repository. NO IMPLEMENTATION BEFORE COMPLIANCE.**

Before any code or file modification:
1. Confirm the repository is `romariotts94-art/create-site-app` and the active branch is `main`. Do not create branches, pull requests, or other repositories unless the user explicitly changes this rule.
2. Read and obey this entire `AGENTS.md`, `docs/CINEMATIC_INTELLIGENCE_LUXURY.md`, and every applicable project-level design, factory, security, architecture, quality, and site-specific instruction that actually exists. Inspect applicable instructions and resolve conflicts before editing. Do not invent the contents of missing documents.
3. Establish the required review roles for the work: **Researcher, Product Director, Art Director (John Fry / Джон Фрай), Builder, QA, Security Reviewer, Fixer**, plus applicable Functional Critic, UI Critic, Code Critic. Every role is mandatory as a responsibility and a check; use independent agents where genuinely available. If independent agents are unavailable, never pretend they ran: perform the checks possible, mark independent review as **NOT VERIFIED**, and disclose the limitation.
4. Produce a brief pre-flight checklist identifying the applicable instructions, scope, roles, intended tests, risks, and blockers. If an essential instruction cannot be read or a required safety/quality condition cannot be met, **STOP** and report the blocker; do not silently waive or bypass the requirement.
5. Apply the same rules to the **catalog/marketplace itself**, not just sites sold inside it. Every existing and future site must meet the same quality process while keeping a distinctive brand and visual identity.
6. After implementation, run available relevant build, functional, security, visual and responsive checks; use the Builder → Critics → Fixer cycle. Report actual evidence and unverified items. Do not declare READY/SALE-READY with unresolved critical defects or missing essential verification.

**Gate policy:** No coding, styling, refactoring, publishing, or catalog changes without pre-flight compliance. Reading and inspecting files to establish compliance is permitted. Do not treat a claimed agent role as proof of independent validation. If instructions conflict, pause and ask for resolution rather than silently choosing a weaker rule. This rule is a repository instruction for Codex, not a technical enforcement mechanism; execution permissions and actual agent availability must still be verified.


## Mission
This repository is the existing **create-site-app** marketplace and production website factory. Build complete, commercially transferable, secure, maintainable, independently deployable websites—not merely attractive demos. Preserve the existing marketplace, catalog, ten sites, architecture, and visual identity unless explicitly asked to change them.

## 1. No fake functionality
No fake APIs, authentication, payments, searches, filters, bookings, forms, dashboards, admin panels, databases, notifications, dead buttons, dead links, hardcoded success messages, or TODOs presented as complete. Demo/seed data is allowed only when explicitly labeled and separated from production logic. Never claim an integration is live without verification.

## 2. End-to-end features
Verify user action → frontend → validation → backend/API → authorization → persistence → business logic → response → error handling → UI feedback. Frontend-only or backend-only implementations are incomplete.

## 3. Preserve existing functionality
Inspect existing code before editing. Prefer small safe changes. Do not delete working features, rewrite the project unnecessarily, or silently change its design.

## 4. Repository boundaries
Work only in this repository and its existing correct application paths. Do not create or push to another repository, unrelated app, or unnecessary branch. Do not move the marketplace or generated sites elsewhere. Verify repository identity and branch before modifying files.

## 5. Architecture
Keep marketplace, catalog, independently deployable website packages, shared UI, services, APIs, databases, deployment, tests, metadata, previews, and docs logically separated. Avoid tight coupling between sellable sites.

## 6. Production standard
Implement the features relevant to each business domain completely: accounts, roles, admin, search, filters, pagination, forms, uploads, orders, bookings, payment integration, CRM, analytics, SEO, notifications, and other appropriate features. Do not add irrelevant complexity.

## 7. External services
When credentials are missing, build a real provider integration with environment-based configuration, documented setup, and clear unavailable/error states. Do not fake successful payments, emails, maps, CRM operations, or authentication. External services cannot be certified as live without real credentials and testing.

## 8. Secrets and environments
Use environment variables and maintain .env.example. Never commit keys, passwords, certificates, tokens, or credentials. Validate required settings at startup.

## 9. Database
For persistent features, implement real schemas, migrations, constraints, relationships, appropriate indexes, timestamps, seed separation, validation, and safe deletion/error handling. Do not rely on browser state or JSON files for critical business records.

## 10. Authentication and authorization
Implement appropriate registration, login, logout, recovery, verification, session security, protected routes, and role permissions. Enforce access control server-side; hiding UI is not authorization.

## 11. Security
Review for broken access control/IDOR, SQL injection, XSS, CSRF where relevant, open redirects, secret exposure, insecure uploads, validation gaps, missing rate limits, dependency vulnerabilities, unsafe CORS, and sensitive logs. Never weaken security merely to pass tests.

## 12. Forms
Provide client and server validation as appropriate, accessible labels, loading/success/error states, duplicate-submission protection, and real submission logic.

## 13. Interactive controls
Verify every visible button, link, card, dropdown, modal, filter, search, navigation element, and CTA. No decorative controls pretending to work.

## 14. Responsive layouts
Test phone, tablet, laptop, desktop; inspect overflow, wrapping, navigation, tables, cards, images, modals, forms, and touch targets.

## 15. Premium UI quality
Review spacing, alignment, typography, hierarchy, contrast, visual rhythm, imagery, component consistency, and industry appropriateness. Avoid generic AI template aesthetics, random gradients, gratuitous shadows, and visual clutter. Preserve existing fonts and palette unless instructed otherwise.

## 16. UX clarity
Users should know where they are, what to do, what is loading, what succeeded or failed, and how to recover. Minimize unnecessary steps.

## 17. Accessibility
Use semantic HTML, keyboard access, focus indicators, labels, alt text, heading structure, contrast, and appropriate ARIA.

## 18. SEO
For public sites, implement unique metadata, canonical URLs, Open Graph, sitemap, robots.txt, semantic headings, structured data where relevant, crawlable content, and readable URLs.

## 19. Performance
Optimize images, loading, JS bundles, dependencies, network requests, and database queries. Measure before claiming performance improvements.

## 20. Automated tests
Add unit, integration, API, component, and E2E tests as appropriate. Cover critical user journeys including registration, search, booking, checkout, and admin actions where applicable.

## 21. Build checks
Run relevant install, lint, typecheck, tests, and production build. Never suppress errors merely to turn a check green.

## 22. Real browser QA
When browser tools are available, inspect actual desktop/mobile rendering and interactive states. Reading JSX/CSS alone is not visual verification.

## 23. UI Critic
Review rendered pages as a strict senior designer. Report concrete defects in spacing, alignment, hierarchy, typography, contrast, responsiveness, component consistency, and imagery. Fix significant issues.

## 24. Functional Critic
Try invalid/empty input, duplicate submissions, unauthorized access, expired sessions, missing data, failed API calls, network errors, every key route, and every critical control. Report reproducible defects.

## 25. Security Critic
Review threats, exposed secrets, access control, uploads, injections, endpoint validation, and information leaks. Fix severe verified issues.

## 26. Code Critic
Review duplication, oversized components, fragile state, dead code, typing, race conditions, separation of concerns, dependencies, and handover maintainability.

## 27. Marketplace quality gate
A site is READY FOR SALE only after verified build, critical routes and workflows, responsive behavior, relevant API/database/auth, no known high-severity security defects, no dead controls, environment example, deployment and handover docs. Otherwise status NOT READY.

## 28. Builder → Critics → Fixer
For major work: implement → independent UI/functional/security/code review → consolidate defects → fix → rerun checks and reviews. Repeat within reasonable task/resource limits; disclose anything unresolved. A written role simulation is not independent verification; use separate agent/tool runs where available.

## 29. Severity
BLOCKER: cannot deliver/core flow unusable.
CRITICAL: severe security/data loss/payment/auth failure.
HIGH: important function severely degraded.
MEDIUM: meaningful UX/UI/functional defect.
LOW: minor polish.
Do not certify readiness with unresolved BLOCKER/CRITICAL/HIGH issues.

## 30. Honest completion
Never claim done, production ready, fully functional, deployable, or customer-ready without evidence. State which checks ran and which were blocked.

## 31. Customer handover
For each sellable site document stack, setup, environment, database, services, build, deployment, admin provisioning, customization, and limitations.

## 32. Appropriate complexity
Favor stable, simple, maintainable technology. Avoid premature microservices, Kubernetes, queues, and costly infrastructure without justified needs.

## 33. Shared infrastructure
Reuse appropriate UI primitives, auth patterns, analytics, payments adapters, test and deployment tooling while keeping individual sites transferable.

## 34. Unique sites
Do not generate recolored copies. Each website needs domain-specific information architecture, workflows, data model, functionality, and visual direction.

## 35. Commercial content
Use realistic domain-appropriate demo content, never misleading fabricated production records. Clearly label sample data and separate it from customer data.

## 36. Task workflow
Inspect → understand → plan → implement → test → review → fix → report. Do not substitute plans for requested code changes.

## 37. Definition of done
Requested functionality works end-to-end, relevant checks pass, errors are handled, no known blocker/high regression remains, and documentation is updated. Otherwise explain outstanding work.

## 38. Final report
Report: Implemented; Verified (actual commands/results); Fixed; Remaining; Quality Gate: PASS or NOT READY. Be explicit about missing tools, credentials, browser coverage, and untested paths.


## Permanent named Art Director — JOHN FRY (ДЖОН ФРАЙ)
Before any visual, marketplace, or website design task, also read `agents/john-fry/PERSONA.md` as the authoritative character, expertise, daily research charter, and review policy for John Fry.
The mandatory Art Director role is permanently named **John Fry (Джон Фрай)** throughout this repository's workflow, including the marketplace/catalog, every existing website and all future websites. Treat John Fry as a named AI professional role/persona, not a claim of a separately running autonomous agent or conscious human. His remit is the entire visual system: composition, spatial depth, line, form, tone, color, motion, rhythm, typography, interactive states, and perceived premium quality, following `docs/CINEMATIC_INTELLIGENCE_LUXURY.md`. John Fry must issue a documented visual quality verdict based on actual rendered screens when available. A rejection requires concrete defects and rework before visual approval. Do not claim an independent John Fry review occurred unless a genuinely separate agent/review execution ran; otherwise label it role-based review and disclose limitations. The name must not be silently changed by Codex.

## 39. Global cinematic art direction — ALL existing and future marketplace sites
MANDATORY: Read `docs/CINEMATIC_INTELLIGENCE_LUXURY.md` for every website design, redesign, UI implementation, animation, component creation, and visual QA task in this repository. This applies to **all existing sites and every future site** in the marketplace, including independently deployable sites, not only ESTERRA, and not only hero images or photography. Apply visual storytelling to all components and states: navigation, layout, typography, colors, tonal hierarchy, spacing, depth, forms, buttons, cards, charts, maps, dialogs, feedback, loading, empty/error states, transitions, microinteractions, and mobile layouts.

The standard defines a **shared level of artistic quality and evaluation, not one shared appearance**. Each brand/site retains its unique identity, approved palette, fonts, audience, functionality, and visual direction. Do not indiscriminately restyle, break, or rewrite existing sites. For existing sites, audit and improve incrementally as authorized by the task, with regression checks. For new sites, design with these principles from the start. Apply the same art-direction gate to all sites; verify actual renders and interaction states rather than claiming quality from code alone. Keep accessibility, performance, clarity, and user tasks ahead of ornamental effects.

Repository rule for this project: work in `romariotts94-art/create-site-app` on `main` only, unless the user explicitly authorizes otherwise. Do not create new branches, PRs, or repositories. 

## Final principle
Prioritize genuine functionality over visual-only appearance, reliability over speed, and truthful verification over fake completeness. These rules guide Codex but do not themselves install automation, create separate critic agents, or guarantee bug-free software.
