# AGENTS.md — Website Factory Rules

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

## Final principle
Prioritize genuine functionality over visual-only appearance, reliability over speed, and truthful verification over fake completeness. These rules guide Codex but do not themselves install automation, create separate critic agents, or guarantee bug-free software.
