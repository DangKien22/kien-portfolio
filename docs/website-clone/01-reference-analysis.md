# Stage 1 — Reference Website Analysis

## Standalone prompt for the coding agent

### Role and objective

Act as a senior visual reverse engineer and frontend interaction analyst. Analyze [https://mananthakkar.dev/](https://mananthakkar.dev/) and produce a detailed, evidence-based specification that a separate coding agent can use to recreate the experience in an existing Vite + ReactJS project. Do not implement the website or modify project files in this stage.

### Shared project-preservation rules

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

These are workflow-wide constraints. This stage is analysis-only: do not edit application code, install packages, change project configuration, or alter existing behavior.

### Detailed instructions

Inspect the reference directly in a browser if available. Examine the complete page from the initial load through the footer, not just the first viewport. Capture observations at a desktop viewport and at narrower tablet and mobile widths when possible. Interact with the page: use navigation, scroll, hover, keyboard controls, pointer movement, touch emulation if available, buttons, cards, and the introduction. Note loading and error states. Use source/network inspection only when available and appropriate; do not assume hidden implementation details.

The initial browser inspection of this reference showed a loading overlay with a progress percentage, the label `topic · manan.site.assets`, and an instruction that Escape skips the intro. The page then exposed a chapter navigation, sticky primary navigation, hero, About, Experience, Projects, and later Contact content. Treat these as initial observations, not proof of all intro mechanics, exact technical implementation, or complete responsive behavior. The user specifically requests a 64 KB packet-catching intro and Three.js scene for the eventual recreation; verify whether those details are observable on the reference. If not, mark them as user-specified targets whose actual reference behavior could not be confirmed.

Document:

1. **Page map and content hierarchy**
   - Enumerate every visible section, in order, from load/intro through footer.
   - Record headings, subheadings, content groups, section labels/numbering, cards, calls to action, and visible page-level controls.
   - Include sticky, fixed, or repeated elements and note where they appear or disappear.
   - Distinguish the homepage from any additional routes reached by links.
2. **Layout and visual system**
   - Describe page background, surface layers, containers, columns, alignment, section widths, density, whitespace, borders, shadows, radii, decorative motifs, and image treatment.
   - Identify color values from browser inspection where possible; otherwise label them as visual estimates and include the sampling method or viewport.
   - Identify font families, weights, sizes, line heights, letter spacing, and typographic roles when verifiable. Otherwise describe their appearance and explicitly mark the exact font/values as unknown.
   - Record image dimensions/crops and any visible alt/caption/credit treatment.
3. **Motion and interaction inventory**
   - For each control or interactive component, record the trigger, observed response, duration/easing if measurable, state changes, keyboard behavior, and reduced-motion behavior.
   - Cover page entry, text, scroll-triggered effects, active-section navigation, progress indicators, hover and focus states, pointer/cursor effects, project cards/links, media or sound controls, and any assistant/chat panel.
   - Mark interactions that were not testable. Do not infer their behavior from a static screenshot.
4. **Intro and Three.js investigation**
   - Record intro copy, loading percentage/progress behavior, controls and affordances, keyboard shortcuts, skip behavior, pointer/drag interaction, scene bounds, objects, camera movement, lighting, materials, and exit/transition into the site, but only where actually observed.
   - Determine whether a Three.js/WebGL scene is visibly present and whether its implementation can be confirmed. If not, state exactly what browser evidence is missing.
   - Separate user-requested goals (including “64 KB packet-catching”) from facts verified on the live site.
5. **Responsive behavior and accessibility**
   - Record tested viewport dimensions, navigation changes, reflow, typography changes, component visibility, overflow, touch targets, orientation behavior, focus handling, semantic labels, and reduced-motion or contrast observations.
   - List untested widths, assistive-technology limitations, and accessibility concerns as open questions.
6. **Evidence and uncertainty**
   - For every material observation, indicate the evidence source: browser view, interaction, source inspection, asset inspection, or estimate.
   - Include a concise confidence rating (high/medium/low) and a reproducible browser test where practical.
   - Do not copy reference-specific personal information into a fictional Trung Kiên portfolio specification except to describe the content shape or hierarchy.

### Constraints

- Do not write or modify implementation code in this stage.
- Do not invent animation timing, color values, typography, Three.js details, mobile behavior, or hidden interactions.
- Do not claim to have tested a viewport, device, assistive technology, or behavior that was not tested.
- When reference access or evidence is incomplete, report the limitation plainly and propose a conservative approximation only as a clearly labeled proposal.
- Keep the existing application runnable and unchanged.

### Expected results

Return a structured reference specification containing:

- A section-by-section page outline.
- A visual design inventory with measured values and clearly labeled estimates.
- An interaction matrix including intro, motion, scroll, mouse/touch, navigation, and projects.
- A responsive behavior matrix organized by tested viewport.
- A verified-versus-unknown list, including explicit treatment of the requested 64 KB intro and Three.js scene.
- A prioritized implementation fidelity checklist for Stage 3 and later stages.

### Completion checklist

- [ ] Inspected the entire page, including its footer, where access allowed.
- [ ] Tested meaningful controls and interactions rather than relying only on a screenshot.
- [ ] Recorded desktop and narrower viewport observations, or documented why not.
- [ ] Distinguished directly observed facts, estimates, user-specified goals, and unknowns.
- [ ] Did not implement or modify the application.
- [ ] Produced a usable, detailed handoff for Stage 2.

### Acceptance criteria

This stage passes only when the page structure is complete enough to guide implementation; visual and interaction observations are evidence-based; all unknown or untestable behavior is explicitly identified; the intro/Three.js requirement is not falsely presented as verified; and no application implementation or configuration has changed.

### Completion report

Finish with a report stating the reference URL and test conditions, what was inspected, the evidence and limitations, the structured specification location or response, confirmation that no implementation files were changed, and whether Stage 1 acceptance criteria passed. Do not begin Stage 2 unless separately requested.

