# Website Factory Automation

This directory defines the autonomous website production loop for `create-site-app`.

## Goal

Run a bounded production loop that upgrades or creates a sellable website without modifying `main` directly.

## Required phases

1. Builder
   - Read root `AGENTS.md` first.
   - Inspect the existing target and surrounding architecture before changing code.
   - Implement the requested work end-to-end.
   - Do not fake external services. When credentials are unavailable, implement real provider boundaries, environment variables, validation, graceful unavailable states, and setup docs.
   - Run all relevant checks available in the repository.

2. Critic
   - Do not change code.
   - Independently inspect functionality, UI/UX, architecture, code quality, security, accessibility, responsive behavior, SEO, deployment readiness, and customer handoff readiness.
   - Try to falsify completion claims.
   - Emit structured findings using `.factory/quality-gate.schema.json`.
   - `overall_pass` may be true only when BLOCKER, CRITICAL, and HIGH counts are all zero.

3. Fixer
   - Read the latest critic JSON.
   - Fix all reproducible BLOCKER, CRITICAL, and HIGH findings first.
   - Fix MEDIUM findings when safe and relevant.
   - Preserve visual identity unless a defect requires change.
   - Run relevant tests/checks after repairs.

4. Repeat
   - Maximum three repair cycles.
   - Stop early if the quality gate passes.

5. Result
   - Never merge to `main` automatically.
   - Commit generated changes to a run-specific branch.
   - Create a pull request with the final quality report.
   - If the final gate does not pass, the PR must clearly say `NOT READY`.

## Definition of READY FOR SALE

A website is `READY FOR SALE` only if the final critic returns:

- blocker_count = 0
- critical_count = 0
- high_count = 0
- overall_pass = true

External integrations that require real credentials must be explicitly listed as unverified until tested with those credentials. A missing credential by itself does not require fake behavior and must never be hidden.
