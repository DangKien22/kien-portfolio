# Stage 7 — Responsive and Performance Optimization

## Standalone prompt for the coding agent

### Role and objective

Act as a senior responsive frontend and performance engineer. Validate and optimize the completed portfolio across desktop, laptop, tablet, and mobile, including touch interaction, responsive navigation and animation, and mobile 3D performance.

### Required preparation and shared project-preservation rules

Read `01-reference-analysis.md` through `06-intro-threejs.md`. Inspect the current responsive CSS, navigation, touch/pointer behavior, animation preferences, image loading, scene lifecycle, and existing validation scripts before editing. Recheck the live reference at the same widths when possible; use recorded observations and label unknowns.

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

Test a representative width/height set covering:

- **Desktop:** wide monitor and standard laptop-sized viewport.
- **Laptop:** constrained height and width as well as common laptop proportions.
- **Tablet:** portrait and landscape where testing is available.
- **Mobile:** narrow and typical smartphone widths, with both short and tall viewports if possible.

Record exact viewport dimensions, browser/device or emulation mode, and any unavailable physical-device tests. At each size, verify:

1. **Layout:** header and hero reflow, section order, content gutters, columns/cards, images and art, fixed/sticky elements, footer, and no horizontal overflow.
2. **Typography:** sensible scale and line wrapping, readable line length, legible metadata, and no clipping or collisions.
3. **Navigation:** desktop links, mobile menu state and close behavior, keyboard focus, touch targets, anchor offsets, hash/history behavior, and navigation after scrolling.
4. **Touch and pointer:** no hover-only content, usable tap targets, sensible pointer/drag gestures, no accidental scroll lock, and no conflicting touch events.
5. **Responsive animation:** reduced or simplified motion for narrow/low-power contexts where justified; ensure scroll effects do not jitter, flash, or cause layout shifts.
6. **Mobile 3D:** verify the intro scene on a mobile-sized viewport and constrained-device path where possible; use a static/degraded fallback when WebGL is unavailable or too costly. Avoid unnecessary rendering while hidden or offscreen.
7. **Loading/performance:** optimize local images and fonts, defer optional effects, inspect bundle output, reduce layout shift, and avoid unnecessary third-party requests. Do not trade accessibility or the visual reference for arbitrary performance micro-optimizations.

Make focused fixes in the established project structure. Re-test the affected sizes after changes and preserve existing routes and features.

### Constraints

- Do not claim physical-device validation from browser emulation.
- Do not invent responsive reference behavior where not observed; note approximation.
- Do not remove essential content or controls to make a layout fit.
- Do not install optimization packages without a demonstrated need.
- Do not change desktop design unnecessarily while fixing mobile issues.
- Respect safe-area insets, keyboard operation, touch use, reduced motion, and readable contrast where relevant.

### Expected results

The complete portfolio remains usable and visually coherent from desktop through mobile. Navigation works with touch and keyboard, content reflows without clipping or horizontal overflow, animations remain stable, and the intro/3D scene degrades gracefully on constrained devices.

### Completion checklist

- [ ] Read all prior stage documentation and inspect responsive implementation.
- [ ] Tested representative desktop, laptop, tablet, and mobile viewports.
- [ ] Checked orientation, overflow, typography, images, cards, header, menu, and footer.
- [ ] Tested touch/keyboard navigation and anchor behavior.
- [ ] Tested responsive/reduced-motion behavior and mobile 3D fallback/performance.
- [ ] Applied focused fixes and repeated affected viewport checks.
- [ ] Ran available lint/build and recorded device/emulation limitations.

### Acceptance criteria

This stage passes only when the page has no unintended horizontal overflow or clipped essential content at the tested sizes; navigation, content, and controls work across input modes; typography and layout remain readable; responsive motion is stable; and the 3D experience remains optional and non-blocking. All tested sizes and untested device limitations must be reported.

### Completion report

List tested viewport dimensions and environments, responsive/performance issues fixed, files changed, touch/navigation/3D results, remaining device-specific limitations, commands run and outcomes, and whether Stage 7 acceptance criteria passed. Do not begin Stage 8 unless separately requested.

