# Stage 5 — Animation and Interaction Implementation

## Standalone prompt for the coding agent

### Role and objective

Act as a senior interaction designer and React motion engineer. Implement the verified animations and interactive behavior from the reference in the existing portfolio, using the earlier analysis and the current implementation as your evidence and baseline.

### Required preparation and shared project-preservation rules

Read `01-reference-analysis.md` through `04-visual-refinement.md`. Inspect existing event handlers, hooks, CSS transitions, routes, focus behavior, and user preferences before editing. Re-test the reference interactions that Stage 1 marked uncertain when possible.

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

Implement only interactions supported by the reference evidence or explicitly identified as intentional approximation. Create a behavior inventory before editing, then implement and test:

- **Entrance and text motion:** staged reveals, opacity/position transitions, text treatments, and sequence timing if observed.
- **Scroll-triggered motion:** section/card reveals, parallax or progress effects, active section indicators, scroll progress, and scroll-linked transitions as verified.
- **Hover and focus:** links, buttons, project cards, tooltips, navigation states, and focus-visible feedback with matching visual responses.
- **Mouse and cursor:** pointer-following elements, magnetic/tilt responses, custom cursor states, and pointer exit behavior only when verified and appropriate.
- **Navigation transitions:** smooth section links, active chapter/section state, mobile menu open/close, route changes, browser history/hash behavior, and keyboard navigation.
- **Project interactions:** card hover/preview, links, filters or details when present in the existing app, and disabled/unavailable link treatment.
- **Other observed controls:** sound toggle, assistant/chat, capability selectors, or other controls only if confirmed relevant to the target and feasible without breaking current behavior.

Use existing hooks and dependencies where possible. If the project has no animation library, prefer CSS and small focused React hooks over a package installation. If an existing dependency is installed and fits the evidence, reuse it. Make motion performant (transform/opacity where appropriate), cancel observers/animation frames/listeners on cleanup, and avoid layout thrashing. Support keyboard input and touch where an interaction has a non-pointer equivalent. Respect `prefers-reduced-motion`; do not rely on animation to communicate required content or state.

### Constraints

- Do not invent timings, cursor effects, scroll sequences, or control behavior. Mark and explain approximations.
- Do not add a motion library without demonstrating that installed options and CSS cannot meet the verified requirements.
- Do not make hover the only way to access content or feedback.
- Do not interfere with scrolling, links, text selection, pointer capture, or accessible focus.
- Avoid global event leaks, unnecessary per-frame React state updates, and permanent animations when the user has requested reduced motion.
- Do not implement or redesign the Three.js intro in this stage; that is Stage 6.

### Expected results

All verified motion and interaction behaviors operate consistently on the appropriate input mode, remain usable with keyboard/touch, and degrade gracefully for reduced-motion preferences. Existing routes, menu, anchors, project interactions, and controls remain functional.

### Completion checklist

- [ ] Read prior analysis and revalidated uncertain interactions where possible.
- [ ] Implemented evidenced entrance, text, scroll, hover, cursor, navigation, and project interactions.
- [ ] Included keyboard/touch alternatives where applicable.
- [ ] Honored reduced motion and cleaned up event/animation resources.
- [ ] Checked state transitions, active navigation, and existing routes.
- [ ] Ran focused lint/build or equivalent checks; app remains runnable.

### Acceptance criteria

This stage passes only when each implemented interaction has an observed or explicitly approved basis, works with its documented trigger, does not trap or obstruct users, has an accessible alternative, respects reduced motion, cleans up correctly, and does not regress existing routes or functionality. Unverified behavior must remain documented rather than silently simulated as fact.

### Completion report

Report the interaction inventory, files changed, evidence basis and any approximations, accessibility/reduced-motion handling, checks run and results, known gaps, and whether Stage 5 acceptance criteria passed. Do not begin Stage 6 unless separately requested.

