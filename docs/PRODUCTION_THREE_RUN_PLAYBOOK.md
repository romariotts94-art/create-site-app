# PRODUCTION WEBSITE FACTORY — THREE-RUN PLAYBOOK

**Purpose:** Build a real, sellable, independently deployable business web application, not a mockup, static demo, or prototype. Read `AGENTS.md` and `docs/UNIVERSAL_SITE_FACTORY.md`. Seven roles: Researcher, Builder, Art Director, Product Director, QA, Security Reviewer, Fixer. When true independent subagents are unavailable, execute roles sequentially with separately documented reviews; do not pretend they are independent.

**Repository:** romariotts94-art/create-site-app only. Preserve marketplace and other sites. Never merge to main automatically. Work in the same selected branch across all three runs; inspect and reuse prior artifacts. Do not restart the project.

**Target:** replace SITE_ID and INDUSTRY in the first prompt only. For Nova Estate use SITE_ID=nova-estate and INDUSTRY=real estate. Keep these values in `docs/sites/SITE_ID/PROJECT_STATE.md` so runs 2 and 3 need no substitutions.

**Shared evidence:** write `PROJECT_STATE.md` (current stage, commit, completed/blocked work, next actions), `SPEC.md`, `FEATURE_MATRIX.md`, `REVIEW_REPORT.md`, `HANDOFF.md` under `docs/sites/SITE_ID/`. Follow existing source layout. No fake API success, mock payment or placeholder buttons. External provider integrations must be implemented with configuration and truthful unavailable states, then live-tested before certification. A real deployment requires infrastructure, credentials, and business/legal content supplied by the owner.

## RUN 1 — RESEARCH, ARCHITECTURE, CORE PRODUCT
Paste exactly:
```
Read AGENTS.md, docs/UNIVERSAL_SITE_FACTORY.md and docs/PRODUCTION_THREE_RUN_PLAYBOOK.md. Start the production pipeline for SITE_ID=nova-estate, INDUSTRY=real estate (change these two values for another site). Work ONLY in create-site-app and preserve all existing sites. Inspect code and existing architecture first. As Researcher and Product Director, benchmark relevant market products, define business personas, complete information architecture and all P0 journeys, actual feature matrix and explicit release criteria. As Art Director define distinctive premium design system and responsive page standards. As Builder implement production architecture and the first end-to-end vertical slice with real server validation, persistence, access control where relevant, migrations and tests. Implement working navigation and actual core pages, not placeholders. As QA and Security Reviewer run available checks and document findings. As Fixer resolve highest-severity issues. Write docs/sites/<SITE_ID>/{SPEC,FEATURE_MATRIX,REVIEW_REPORT,PROJECT_STATE,HANDOFF}.md, replacing SITE_ID with actual ID. Record precise unfinished work for RUN 2. Do not claim the whole product is ready. Commit to this branch, never merge main.
```

## RUN 2 — COMPLETE FEATURES AND PREMIUM DESIGN
Paste exactly:
```
Continue the SAME site and branch from docs/PRODUCTION_THREE_RUN_PLAYBOOK.md. Read docs/sites/<SITE_ID>/PROJECT_STATE.md to recover target and outstanding tasks; do not recreate the project. Execute RUN 2: finish P0 business flows end-to-end (front end, backend, database, auth/permissions, validation, errors, tests), add industry-relevant P1 features as feasible. No dead navigation, fake forms or simulated integrations. Art Director independently critiques actual screenshots at mobile/tablet/desktop and demands a distinctive premium visual redesign where necessary. Product Director compares working features with FEATURE_MATRIX and blocks missing P0. QA runs browser workflows where possible; Security Reviewer inspects critical attack paths; Fixer resolves issues. Run up to three review/fix rounds WITHIN THIS RUN, log evidence and remaining issues. Update all site docs and PROJECT_STATE with next actions for RUN 3. Never merge main or alter other sites.
```

## RUN 3 — RELEASE HARDENING AND HANDOFF
Paste exactly:
```
Continue the SAME site and branch from docs/PRODUCTION_THREE_RUN_PLAYBOOK.md. Read docs/sites/<SITE_ID>/PROJECT_STATE.md, SPEC.md and FEATURE_MATRIX.md. Execute RUN 3: finish outstanding P0 items and harden the complete product. Run lint/typecheck/build, database migration checks, unit/integration/API and browser E2E tests, mobile/tablet/desktop visual review, performance/accessibility/SEO checks and security review as supported. Seven roles must document separate findings; Fixer resolves and retests, up to three rounds. Prepare .env.example (names only), real deployment configuration, admin setup and client handoff instructions. Do not expose secrets. Record actual screenshots, test commands/results, and any unverified external service. Mark READY FOR HANDOFF only if ALL P0 paths work, no HIGH/CRITICAL/BLOCKER remains, deploy/build and handoff are verified, and required integrations have been live-tested. Otherwise mark NOT READY and write an exact remaining-work queue plus a repeatable next-run prompt; never fake readiness. Open or update a draft PR; never merge main.
```

## Release logic and limits
Three runs are **milestones, not a promise of completion**. If work remains after RUN 3, continue the generated remaining-work prompt until evidence meets the gate. Codex Cloud subscription usage is subject to its limits; tasks may stop due to time, context or permissions. Production readiness cannot be certified without actual infrastructure, configured providers and realistic acceptance tests. The playbook is a reusable manual launch protocol, not an autonomous multi-agent runtime or scheduler.
