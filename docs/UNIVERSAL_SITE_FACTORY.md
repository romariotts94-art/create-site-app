# UNIVERSAL SITE FACTORY — reusable blueprint v1

## Mission
Build production-oriented, premium, multi-page demonstration websites that can be previewed inside the create-site-app marketplace, purchased, customized, deployed and handed over to clients. Not static mockups or empty links. The first pilot is Nova Estate, but this specification applies to any next industry/site.

## Repository isolation and scope
- Work ONLY in romariotts94-art/create-site-app, never other repositories or apps.
- Each new site gets a distinct site ID, isolated routes/components/assets/config and its own product spec, feature matrix and report.
- Do not overwrite or break the marketplace or existing sites. No automatic merge into main.
- Use a dedicated branch and draft PR for review. Changes to shared components require regression checks of existing sites.
- Prefer the existing repository architecture and tooling; inspect before editing. Do not invent directories or commands.

## Per-site input contract
Record: site name and ID; target industry and audience; business model and customer journeys; language/region; visual direction; required integrations; user roles; required P0/P1/P2 features; backend/data expectations; privacy/security constraints; acceptance tests; delivery and deployment requirements. If missing, infer a reasonable initial proposal, label assumptions, and do not fabricate live integrations.

## Seven sequential roles and deliverables
1. Researcher: investigate 3–5 relevant competing products or reference patterns; extract common user journeys, UX and feature opportunities. Do not copy proprietary code/assets.
2. Builder: implement complete multi-page frontend and real supported backend/data workflows; no dead links, fake submissions, nonfunctional forms or placeholder buttons. Separate demo data clearly from production data.
3. Art Director (strict veto): audit brand, hierarchy, layout, grid, typography, spacing, imagery, motion, consistency, responsive behavior, accessibility and perceived premium quality. Require actual viewport screenshots and actionable issues. Reject generic template quality.
4. Product Director (strict veto): create and maintain a prioritized feature matrix (feature, rationale, user journey, priority, implementation, verification, status). Compare with relevant competitor functionality, test P0 user journeys, block release on missing/broken P0 functions. Do not require every competitor feature without considering project scope and cost.
5. QA Engineer (strict veto): verify navigation, CTA actions, filters, forms, auth if applicable, CRUD if applicable, empty/loading/error states, mobile/desktop, keyboard usability, lint/typecheck/build, and browser E2E tests. Record exact commands, observed results and coverage gaps.
6. Security Reviewer (strict veto): inspect auth, authorization, validation, secrets, sensitive data, dependency risks and unsafe redirects; block critical findings. Never put credentials in code or reports.
7. Fixer: repair prioritized findings and request re-review. Never hide, waive or mislabel defects.

## Iteration engine
A. Inspect repo and select exactly one target site.
B. Define site spec, competitor/feature research, acceptance criteria and baseline checks.
C. Builder implements.
D. Art Director, Product Director, QA and Security review independently, recording evidence and blockers.
E. Fixer addresses issues, then repeat reviews. Maximum three complete review/fix rounds per run.
F. End with a verified status, report and draft PR; do not merge automatically.

## Release gates
- P0 journeys actually function and have reproducible evidence; all visible primary navigation and CTAs lead to meaningful results.
- No critical security defects.
- Build and available automated checks pass; browser tests must be run where supported. Untested is not passed.
- Art Director signs off on screenshots at mobile, tablet and desktop sizes; no obvious responsive breakage or unfinished UI.
- Product Director signs off on required P0 features; external integrations not available are labeled explicitly and are NOT presented as production-ready.
- Performance, accessibility and basic SEO are assessed and blockers recorded.
- If any gate fails or cannot be verified, verdict is NOT READY with precise blockers, even after three rounds. Never silently downgrade acceptance criteria.

## Standard artifacts for each site
- `sites/<site-id>` or existing equivalent (follow actual repo conventions).
- `docs/sites/<site-id>/SPEC.md`: audience, scope, journeys, acceptance criteria, assumptions.
- `docs/sites/<site-id>/FEATURE_MATRIX.md`: P0/P1/P2, implementation paths, verification evidence, status.
- `docs/sites/<site-id>/REVIEW_REPORT.md`: round-by-round Art/Product/QA/Security findings and fixes.
- `docs/sites/<site-id>/HANDOFF.md`: deployment steps, required environment variables (names only), demo vs live integrations, customization and client handoff checklist.
- Screenshots, tests, preview URL and PR link when actually available. Do not invent links or test results.

## Quality bar and honesty
A high-priced product requires actual useful functionality, maintainable code, coherent design, documentation and a realistic client handoff. A polished demo alone is not necessarily a production-ready deliverable. Avoid blanket promises of 100% completeness or automatic sale-readiness.

## Reusable Codex Cloud invocation
"Read docs/UNIVERSAL_SITE_FACTORY.md. Target only <SITE_ID> in romariotts94-art/create-site-app. Create/update its specification and feature matrix, execute all seven roles sequentially for up to three review/fix rounds, implement and test the site, record actual evidence and remaining gaps, create a draft PR, and do not merge into main. Keep the marketplace and all other sites intact. Final verdict READY or NOT READY with reasons."

## Scaling to 10 / 100 sites
Use a site manifest (site ID, industry, route, demo URL, status, ownership, feature tier, last review), reusable design system and test harness, site-specific configs, preview deployments and release gates. Add concurrency controls and cost/time budgets before parallel runs. Never infer that one successful pilot proves all future sites are production-ready.

## Automation note
This document is an operational specification, not itself an executing GitHub Actions workflow or autonomous agent runtime. Run it through Codex Cloud or a separately implemented orchestration workflow; do not imply unattended execution is configured merely by committing this file.
