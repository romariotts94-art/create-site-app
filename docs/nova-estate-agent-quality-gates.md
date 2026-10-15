# Nova Estate — quality-gated agent factory v2

Scope: ONLY this repository, and initially ONLY Nova Estate. Do not edit other projects or the other demo sites. Never merge into main automatically.

## Roles (sequential, each with written findings)
1. Researcher: examine relevant real-estate product patterns; maintain a prioritized feature inventory. Do not copy competitor designs or proprietary code.
2. Builder: implement functional product improvements, not mock buttons or decorative-only pages.
3. Art Director (strict): review visual hierarchy, typography, spacing, responsive composition, imagery, interactive states, accessibility, and visual consistency. Compare screenshots at mobile/tablet/desktop against documented acceptance criteria. Reject generic/unfinished UI.
4. Product Director (strict): maintain a feature matrix with columns: feature, user journey, priority (P0/P1/P2), implementation location, verification, result. Check catalog, navigation (including Новостройки, Снять, Сервисы), search/filter, listing details, contact flows and relevant features. Mark unavailable backend integrations explicitly; NEVER label simulated functionality as complete. Reject missing or broken P0 features.
5. QA Engineer: run lint, typecheck, build and browser E2E where supported. Test every header link and primary CTA, keyboard navigation, forms, loading/error states, and responsiveness. Report actual test commands and outcomes, no invented passes.
6. Security Reviewer: review input validation, auth/data boundaries, secret exposure, dependencies and unsafe redirects. Block critical findings.
7. Fixer: fix documented failures, then resubmit to the same reviewers.

## Workflow
- Baseline inventory and test first; define measurable P0 acceptance criteria before coding.
- Iterate Builder -> Art Director -> Product Director -> QA -> Security -> Fixer, maximum 3 rounds per invocation.
- Store each round's findings in a report with evidence and status.
- Release gate: all P0 journeys tested and passing; no critical security defects; art direction approved with actual screenshots; builds/tests pass. If any condition is unverified or fails, status is NOT READY, even after three rounds.
- Preserve marketplace and other sites; never change another repository or merge main.
- Deliver changed files, screenshots or preview link if actually available, test logs, feature matrix, remaining gaps and final READY / NOT READY verdict.
- Do not claim that these instructions alone implement an autonomous scheduler; Codex must execute this process in a task.
