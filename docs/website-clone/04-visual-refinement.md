# Stage 4 — Visual Fidelity Refinement

## Standalone prompt for the coding agent

### Role and objective

Act as a senior visual frontend engineer. Refine the existing portfolio implementation to match the verified appearance of [mananthakkar.dev](https://mananthakkar.dev/) as closely as practical, without disrupting its React architecture or behavior.

### Required preparation and shared project-preservation rules

Read `01-reference-analysis.md`, `02-project-analysis.md`, and `03-ui-implementation.md`. Inspect the current implementation and compare it with the reference at matching viewports before changing styles. Inspect every touched file.

1. Work inside the existing Vite + ReactJS project.
2. Never create a new project.
3. Never replace the entire project structure.
4. Never remove existing functionality unnecessarily.
5. Inspect existing code before modifying it.
6. Reuse installed dependencies when possible.
7. Do not install unnecessary packages.
8. Use reusable components.
9. Keep the application runnable after each stage.
10. Do not move to the next stage until the current stage passes its acceptance criteria.

### Detailed instructions

Use the Stage 1 evidence as the source of visual truth, not a generic portfolio template. Compare like-for-like reference and local screenshots at the same viewport and scroll positions. Refine, in order:

1. **Typography:** verified font families or closest available fallback; heading/body/metadata roles, size, weight, line height, letter spacing, text width, wrapping, and hierarchy.
2. **Layout and dimensions:** global max-width, gutters, header height, hero proportions, section alignment, columns, card dimensions, image aspect/crop, sticky/fixed elements, and section transitions.
3. **Spacing:** horizontal/vertical rhythm, section padding, intra-component gaps, paragraph measure, and mobile-safe spacing.
4. **Color and surfaces:** page and section backgrounds, text contrast, muted labels, accent usage, borders, dividers, gradients, and subtle surface contrast. Use measured values where known; label approximate matching as such.
5. **Imagery and decoration:** authentic local/licensed assets when available, appropriate crop and alt text, decorative graphics, overlays, background texture, and reference-like detail. Do not hotlink unauthorized assets or substitute misleading imagery.
6. **Borders, shadows, and alignment:** corner treatment, border opacity, shadow softness, icon/text alignment, baseline consistency, and grid balance.

Create or reuse CSS variables/design tokens only when consistent with the project. Make the fewest CSS/component changes needed. Keep visual focus on the required portfolio sections and reference composition. Check text overflow, long names/URLs, project tag wrapping, and absent images. Respect `prefers-reduced-motion` even when tuning static transition states; detailed animation behavior remains Stage 5.

### Constraints

- Do not change content meaning or present reference-person details as Trung Kiên's.
- Do not invent exact color, type, or dimension values when not measured. Record estimates and prioritize visible similarity.
- Do not add a CSS framework, font dependency, or design system package unnecessarily.
- Do not hide, remove, or make existing controls unusable for visual reasons.
- Keep changes restricted to visual refinement; defer new interaction logic to later stages.
- Preserve semantic markup, focus visibility, and readable contrast.

### Expected results

The running application should closely match the reference's measured typography, grid, spacing, dimensions, colors, image treatment, borders, shadows, and alignments at the tested viewport sizes. Deliver screenshot comparison notes that identify any remaining deviations and explain unverified assumptions.

### Completion checklist

- [ ] Read the prior stage documentation and inspect the current UI.
- [ ] Compared reference and local rendering at matching viewport sizes and scroll positions where possible.
- [ ] Refined typography, layout, dimensions, spacing, colors, backgrounds, imagery, borders, shadows, and alignment.
- [ ] Checked section transitions and long-content/overflow cases.
- [ ] Preserved interactions, accessibility, and existing routes.
- [ ] Ran relevant available checks and confirmed the app is runnable.

### Acceptance criteria

This stage passes only when the main sections align in composition and hierarchy with the reference at tested viewports, major visible differences are resolved or recorded as limitations, content remains legible and non-overflowing, and visual changes have not broken navigation or existing functionality. Report any reference view that could not be compared rather than claiming fidelity for it.

### Completion report

List touched files, viewport sizes and comparison method, visual corrections made, important remaining differences and evidence limits, checks run and results, and whether Stage 4 acceptance criteria passed. Do not begin Stage 5 unless separately requested.

