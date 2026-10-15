# Codex Cloud Run — NOVA ESTATE

Use this file for Codex Cloud runs. Do not use the GitHub Actions-specific restrictions in `.factory/ORCHESTRATOR.md` for this run.

## Scope

Repository: `romariotts94-art/create-site-app`
Base branch: `factory-automation-v1`
Target: `dist/nova-estate.html`

## Required preparation

Read, in this order:
1. `/AGENTS.md`
2. `/.factory/FACTORY.md`
3. `/.factory/quality-gate.schema.json`

Work only in this repository. Preserve the existing marketplace and unrelated sites. Do not modify or merge `main` directly.

## Goal

Autonomously upgrade NOVA ESTATE from its current demo state into the strongest production-ready commercial real-estate website that can be achieved within this repository and environment.

Preserve the current premium visual identity unless a defect requires change.

## Autonomous loop

Run these roles sequentially in one task:

BUILDER → CRITIC → FIXER → CRITIC → FIXER → CRITIC → FIXER → FINAL QUALITY GATE

Maximum 3 repair cycles. Stop early if the quality gate passes. Do not invent new scope merely to keep iterating.

### Builder

Inspect the current target and repository architecture before editing. Implement the required business capabilities end-to-end where relevant, including:
- real data architecture instead of demo-only hardcoded core workflows;
- backend/API and persistence where required;
- real viewing/lead submissions with server-side validation and persistence;
- property management/admin business workflow where appropriate;
- authentication/authorization only where genuinely needed;
- favorites and user-facing persistence at a production-appropriate level;
- correct mortgage calculator logic;
- removal of fake success behavior;
- no decorative map presented as a real map;
- provider boundaries for external maps, email, CRM and similar services;
- environment variables and `.env.example` where needed;
- loading, error, empty and unavailable states;
- responsive behavior;
- accessibility;
- SEO and metadata;
- logging/error handling;
- tests;
- deployment and customer handoff documentation.

Do not fake external services. If credentials are unavailable, implement a real integration boundary, configuration, validation, graceful unavailable state, and setup documentation, and explicitly mark the integration as unverified.

### Critic

Act independently and do not edit while auditing. Try to disprove completion claims. Check:
- every button, link, form and control;
- search and filters;
- property cards and details;
- favorites;
- lead/viewing submissions;
- admin/business flows;
- backend/API;
- persistence/database integrity;
- validation;
- authentication/authorization where applicable;
- security;
- desktop/tablet/mobile UI;
- visual hierarchy, spacing and typography;
- accessibility;
- SEO;
- performance risks;
- environment/secrets handling;
- build/tests;
- deployment readiness;
- customer handoff readiness;
- any remaining fake/demo behavior.

Classify findings only as BLOCKER, CRITICAL, HIGH, MEDIUM or LOW.
The gate fails if any reproducible BLOCKER, CRITICAL or HIGH remains.

### Fixer

Fix all reproducible BLOCKER, CRITICAL and HIGH findings. Fix safe, relevant MEDIUM findings when practical. Re-run relevant checks after changes.

## Known issues to verify

Confirm and fix if reproducible:
- property data is hardcoded in JavaScript;
- favorites rely only on `localStorage`;
- viewing form shows a demo success message without a real submission path;
- the map is decorative;
- mortgage calculation is demo-only/fixed-rate;
- a price such as `38,5 млн ₽` must not be parsed as `385 млн ₽`.

## Verification

Before finalizing, run all repository-appropriate install, lint, typecheck, test, production build and end-to-end/browser checks available in the environment.

If rendered browser/UI tools are available, verify desktop and mobile rendering. If not, state that visual verification was not performed rather than pretending it was.

## Final quality gate

The final response must conform to `/.factory/quality-gate.schema.json`.

Set `overall_pass = true` only when:
- blocker_count = 0
- critical_count = 0
- high_count = 0

If the gate passes, state `READY FOR SALE` in the summary.
If it does not, state `NOT READY` and list concrete remaining defects.

Do not hide unfinished work or unverified external integrations.

At the end, leave the completed changes in the Codex Cloud task so they can be reviewed and turned into a Pull Request. Do not merge to `main` automatically.
