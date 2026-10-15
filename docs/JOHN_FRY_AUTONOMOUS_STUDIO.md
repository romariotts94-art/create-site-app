# John Fry autonomous studio — controlled rollout

Status: **FOUNDATION ONLY / NOT OPERATIONAL AUTONOMOUS CODING**. No AI runner, model credential, staging target, verified project build commands, or deployment integration has been configured by this document. Never present this as an active autonomous deployment pipeline.

## Scope and repository rules
Only `romariotts94-art/create-site-app`. Candidate work: `john-fry-pending-approval`. Approved integration: `main`. Pull requests from the candidate branch are allowed; no other repositories or branches. Read `AGENTS.md`, `agents/john-fry/PERSONA.md`, `docs/CINEMATIC_INTELLIGENCE_LUXURY.md`. All seven mandatory roles remain required, with truthful independent-agent disclosures.

## Workflow
1. Daily research brief (ChatGPT automation is separate from GitHub Actions). Source and date every finding; do not assume this automation can directly push code to GitHub.
2. John Fry creates a scoped proposal with affected pages, acceptance criteria, expected commercial hypothesis, baseline metrics, accessibility and performance constraints.
3. AI coding runner (NOT YET CONNECTED) works in an ephemeral, isolated checkout, with restricted repository credentials and no production secrets; it cannot push unreviewed changes.
4. Builder, QA, Security Reviewer, Fixer and John Fry iterate. Test actual browser screenshots at mobile/tablet/desktop sizes, functionality, accessibility, performance and security. Record failures and evidence.
5. Candidate preview (NOT YET CONNECTED) must be isolated from production. Owner receives preview URL, screenshots, test report, diff summary and exact candidate SHA.
6. **Explicit owner approval required** for any publication. Approval must identify the exact candidate SHA; any new commit invalidates previous approval. No auto-publish on silence.
7. Publication (NOT YET CONNECTED) uses a separately configured, least-privilege deployment workflow and records a rollback identifier. Revert or rollback must be rehearsed before enabling.

## Safety invariant
Do not grant an AI runner a token with unguarded main write access while requiring owner approval: direct pushes would circumvent the gate. Work on the approval branch or in an isolated workspace. Never grant the coding runner permission to merge or directly push to `main`. Require owner authorization for the exact reviewed SHA before merge. GitHub Environments with required reviewers may gate deployment, but do not by themselves prevent main pushes. No production publishing or merges until owner approves.

## GitHub workflow status
`.github/workflows/john-fry-studio.yml` is a deliberately **fail-closed skeleton**: validates input and refuses to declare success without verified project-specific tests. It does not run Codex, change code, or publish. Once the actual application paths, runner, tests, staging and approval environment are verified, replace the blocking test step with real checks and configure approval.

## Setup remaining
- Determine actual application root, package manager, build/test commands and deployment host.
- Connect an isolated coding agent runner with scoped credentials and budget limits.
- Add deterministic build, lint, typecheck, unit, Playwright E2E, visual snapshots, security scans and artifacts.
- Provision isolated staging with no production customer data.
- Add explicit owner-controlled approval and deployment workflow with SHA pinning and rollback.
- Verify end-to-end using a harmless change before granting any autonomy.

## Owner decision
The owner authorizes autonomous research, proposal drafting, and staging experimentation **only**, not publication. All publication requires explicit consent.

## Implemented on 2026-10-15
- `.github/workflows/john-fry-studio.yml` supports manual SHA-pinned test runs and uploads evidence; it has no write or deploy permissions.
- `scripts/john-fry/verify.mjs` detects potential Node apps and attempts checks when an npm lockfile and scripts exist; no application path or successful CI run has been verified.
- The workflow remains deliberately red until visual/security/staging checks are integrated. It is not an autonomous coding agent and cannot publish.
- A live AI coding executor and a staging host require external service configuration and credentials, which must never be committed to the repository.

## Browser QA added 2026-10-15
- Manual GitHub Action `.github/workflows/john-fry-browser.yml` runs Chromium/Playwright against the repository's existing static `dist/` catalog.
- `scripts/john-fry/browser-qa.mjs` checks 390/768/1440 px layouts, overflow, title, visible content, catalog and first site hash routes, uncaught JS errors, and captures screenshots and a JSON report.
- This is an unexecuted workflow definition, **not evidence that tests passed**. It does not create a public preview URL, deploy GitHub Pages, change production, or provide an AI coding runner.
- GitHub Pages can host static `dist/` only after the owner explicitly approves a publication SHA and enables a separate owner-gated deployment workflow. Static browser demo features are not proof of real production backends.
- For autonomous AI coding, select and authorize a runner and credential method; do not grant unguarded push access to `main`.

## Target: website factory control plane (not yet implemented)
The user enters one task in Codex. The orchestrator loads AGENTS.md and role profiles, records a job with an ID, delegates research/art direction/build/QA as capabilities permit, and commits candidate files only to `john-fry-pending-approval`. The candidate must contain a separately transferable site package, marketplace catalog metadata, preview artifacts, tests and a handover manifest. A status dashboard may later display queued/running/failed/awaiting-approval jobs, previews, logs and costs. No agent may claim a role actually executed without an execution record. A draft PR presents a SHA-pinned candidate for owner approval; only an owner-authorized merge updates `main`. A merge is not the same as deploying a live website. Codex subscription-based automatic unattended scheduling is not assumed available; verify native Codex automation before implementing any runner or asking for API credentials.
