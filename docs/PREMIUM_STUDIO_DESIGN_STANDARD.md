# STUDIO-GRADE DESIGN STANDARD — MANDATORY

## Objective
Build websites that look like a top-tier professional product design studio created them: cohesive, restrained, elegant, fast and extremely usable. For real estate, use samolet.ru as a *quality benchmark for visual hierarchy and product UX*, not a template to copy. Do not reproduce its branding, graphics, copy or protected assets.

## Art direction
- Quiet confidence, contemporary editorial clarity, precise spacing, professional photography, uncluttered hierarchy. No gaudy 'AI-generated landing page' look.
- Each site gets one documented identity, not a patchwork of component styles. Use an intentional palette: neutral backgrounds, near-black typography, one restrained brand accent and semantic success/warning/error colors only where needed.
- Define tokens for color, type scale, spacing (4/8px system), radius, borders, shadows, motion and breakpoints. Use shared tokens throughout all routes, including auth, search, dashboards and admin.
- One coherent type family or intentional type pairing, controlled line lengths and consistent hierarchy. Never mix arbitrary font sizes/weights.
- Generous but functional whitespace, balanced grid, consistent card geometry, restrained borders, subtle or no shadows.
- Real, licensed, high-resolution property photography and authentic context. No random stock collage, stretched images, mismatched crops or unrelated visuals. If assets unavailable, record the dependency; do not certify visual readiness.
- Motion should clarify interaction, be subtle and quick, support reduced-motion. Avoid gratuitous carousels, parallax, flashy gradients, neon, glassmorphism, decorative blobs and constant animations.
- Navigation, filters, cards, maps, property details and calls to action should be intuitive, accessible and performant. Use carousels only where helpful and with controls.
- Use purposeful color and visual hierarchy: never yellow + green + purple + gradients randomly across unrelated sections.

## Mandatory deliverables BEFORE implementation
1. `docs/sites/<SITE_ID>/DESIGN_SYSTEM.md`: visual concept, brand identity, tokens, typography, grid, responsive rules, components, imagery and motion standards.
2. `docs/sites/<SITE_ID>/PAGE_INVENTORY.md`: every route and its component/layout family.
3. Visual acceptance checklist and reference analysis: identify the specific principles learned from high-quality market websites; do not claim direct inspection if unavailable.

## Art Director quality gate — hard veto
Inspect real rendered screenshots at 390px, 768px, 1440px and representative interactive states across ALL page families. Check typography, alignment, spacing, contrast, imagery, responsive behavior, layout continuity, hierarchy, perceived quality and content density. Review side-by-side against the site's own design system, not subjective adjectives. Record actionable defects with page, viewport, severity and fix. A single incoherent page family or obvious template-quality section blocks DESIGN PASS. Do not approve based solely on code review.

## Regression protection
Once approved, tokens/components may only change through an explicitly documented design decision and cross-page regression review. Do not let Builder or Fixer introduce new colors, fonts, corner radii or visual patterns ad hoc. Test every newly added page against the same tokens.

## Honest evidence
If screenshot/browser tooling or licensed visual assets are unavailable, mark DESIGN UNVERIFIED or NOT READY and list what is needed. Never substitute a written claim for actual visual inspection.

## Codex instruction
Read this document, `AGENTS.md`, and `docs/UNIVERSAL_SITE_FACTORY.md` before any design work. Treat Art Director as an independent veto role, with documented review and fixes. Preserve existing marketplace visual identity unless the user specifically authorizes a redesign. Apply these rules to new production websites and Nova Estate in its own scope.
