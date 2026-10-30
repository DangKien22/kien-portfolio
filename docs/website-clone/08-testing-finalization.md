# Stage 8 — Testing and Finalization

## Standalone prompt for the coding agent

### Role and objective

Act as a senior frontend QA engineer and release finisher. Verify the complete portfolio against the reference evidence, test functionality and accessibility-related behavior, inspect the browser console, run the existing build/lint checks, optimize only where a real issue is found, and fix problems directly rather than merely reporting them.

### Required preparation and shared project-preservation rules

Read `01-reference-analysis.md` through `07-responsive-optimization.md`. Inspect the current worktree and application before changing files. Run the existing project scripts and identify baseline or environmental failures before attributing them to the clone.

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

Run a final verification matrix and fix any issue within the existing project:

1. **Visual comparison**
   - Compare reference and local page at matching viewport sizes, scroll positions, and states.
   - Check all sections, spacing, typography, colors, backgrounds, images, borders, shadows, alignment, and major responsive compositions.
   - Separate true mismatches from evidence gaps or fictionalized content differences.
2. **Functional testing**
   - Test every navigation link, section anchor, route, logo, CTA, project card/link, contact action, back-to-top action, filters/search if present, mobile menu, and any added control.
   - Confirm direct route loads, hash navigation, browser history, and not-found behavior if those routes exist.
3. **Animation and interaction testing**
   - Test entrance, text, scroll, hover, cursor, project, intro, packet-catching, and Three.js behavior as implemented.
   - Test keyboard, touch emulation, Escape, reduced motion, interrupted loads, skip, hidden/unmounted scene, and WebGL fallback.
   - Check for stuck states, animation flicker, focus loss, event listener leaks, and console errors.
4. **Responsive testing**
   - Repeat critical paths at tested desktop, laptop, tablet, and mobile sizes.
   - Check portrait/landscape when available, overflow, safe areas, touch targets, long text, and constrained-height layouts.
5. **Browser console and accessibility sanity checks**
   - Inspect runtime errors, warnings attributable to the implementation, failed assets, and network failures.
   - Check semantic headings/landmarks, accessible names/status announcements, focus visibility, keyboard order, contrast issues, and reduced-motion behavior.
   - Do not claim a formal accessibility audit unless one was performed.
6. **Build and performance**
   - Run the project's existing build and lint scripts; run existing tests if configured.
   - Inspect generated bundle/chunks and actual image/font loading where relevant. Report measured performance only when measured with a named method.
   - Fix actionable failures directly, retest the affected behavior, and rerun relevant checks.

If a reference interaction cannot be independently confirmed, do not “fix” the clone toward an invented behavior. Record the evidence gap and the conservative chosen behavior. Avoid scope expansion or unrelated refactoring during finalization.

### Constraints

- Do not merely produce a bug list: fix in-scope problems, then retest.
- Do not hide warnings/errors, weaken checks, or claim success after a failed command.
- Do not make unrelated visual/design changes or remove functionality to get a passing build.
- Do not claim a screenshot comparison, device test, accessibility audit, bundle threshold, or performance score that was not performed and measured.
- Do not add dependencies unless a concrete defect cannot be fixed with the existing stack.
- Keep the application runnable and preserve existing project structure and features.

### Expected results

The final application passes available project build/lint/tests; core navigation, content, controls, interactions, intro fallback, and responsive layouts are verified; implementation-caused console errors and actionable defects are fixed; and any remaining limitations are accurately reported with evidence.

### Completion checklist

- [ ] Read the prior stage documentation and inspect current worktree/application.
- [ ] Compared visual output with the reference at matched conditions.
- [ ] Functionally tested routes, links, sections, forms/actions, and controls.
- [ ] Tested animations, mouse/keyboard/touch, intro skip/fallback, and reduced motion.
- [ ] Rechecked desktop through mobile responsive behavior.
- [ ] Inspected console, asset requests, accessibility basics, and build output.
- [ ] Ran existing lint/build/tests, fixed actionable issues, and retested fixes.
- [ ] Clearly reported remaining unknowns, environmental failures, and untested paths.

### Acceptance criteria

This stage passes only when all available existing validation commands complete successfully or their unrelated/environmental blockers are precisely evidenced; core UI and interactions have been exercised; implementation-caused console errors and in-scope failures are fixed; representative responsive layouts have been checked; and no unverified claim of parity, accessibility, performance, or device testing is made.

### Completion report

Provide a final report with:

- Overall acceptance status.
- Files changed during final fixes.
- Visual, functional, animation, responsive, and accessibility sanity checks performed.
- Exact commands and outcomes for lint, tests, and build.
- Console/runtime errors found and their resolution.
- Performance or bundle measurements, including methods, if measured.
- Remaining known limitations and unverified reference behavior.
- A clear statement whether the workflow is complete and the app is ready for the next release step.

