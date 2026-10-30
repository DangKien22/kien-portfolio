# Stage 6 — Interactive Intro and Three.js Scene

## Standalone prompt for the coding agent

### Role and objective

Act as a senior creative frontend engineer specializing in accessible WebGL and interactive loading experiences. Recreate or refine the requested interactive 64 KB packet-catching intro and Three.js scene inside the existing Vite + ReactJS project, matching the reference where observable and clearly labeling any unverified details as approximations.

### Required preparation and shared project-preservation rules

Read `01-reference-analysis.md` through `05-animation-interactions.md`, especially the evidence and limitations about the live intro. Inspect the current intro, app boot sequence, lifecycle, route behavior, dependencies, build configuration, reduced-motion handling, and asset budget before modifying anything. Verify reference behavior directly where possible. The requested “64 KB packet-catching” concept is a task requirement, not evidence that the reference has those exact mechanics.

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

Deliver a lightweight, optional intro that communicates and tests these user-requested features:

1. **Loading and progress**
   - Show a clear, accessible loading/progress state and label meaningful progress honestly.
   - Avoid displaying fabricated asset-loading progress if the scene is not actually loading those assets.
   - Do not block the rest of the site indefinitely; include reliable automatic completion/fallback and a visible Skip Intro control.
2. **Packet-catching interaction**
   - Implement a small packet-like target/collectible and an understandable catch objective. Use the exact “64 KB” motif only as a clearly stylized creative concept; do not imply real network transfer or security measurement.
   - Support mouse movement, pointer/touch interaction, dragging where appropriate, and keyboard controls with clear instructions and feedback.
   - Define boundaries, collision/catch behavior, progress or scoring, reset/failure behavior, and a non-interactive way to skip, based on the evidence or an explicitly documented design decision.
3. **Three.js scene**
   - Use Three.js only if already installed or if the requirement cannot reasonably be met without adding it; justify any dependency addition first and keep it narrowly scoped.
   - Implement a measured, responsive camera/framing, restrained lighting, materials, and a small set of performant 3D objects.
   - Keep the scene decorative and non-blocking. Provide a graceful fallback when WebGL is unavailable, initialization fails, context is lost, or the device is underpowered.
   - Dispose geometries/materials/textures/renderers and remove listeners/animation frames on unmount.
4. **Scroll-linked effects**
   - Add scroll-linked scene/transition effects only when reference evidence supports them or label them as a deliberate approximation.
   - Avoid coupling the main portfolio's scroll responsiveness to the intro renderer.
5. **Exit, accessibility, and preference handling**
   - Escape and the visible Skip Intro button must dismiss the intro reliably.
   - Respect reduced-motion preferences, keyboard use, focus management, screen-reader progress/status announcements, and touch targets.
   - Ensure the document remains navigable if scripts/WebGL fail; do not leave a blocking overlay or hidden primary content.

Before any dependency change, check the project manifest and lockfile, existing dependencies, and the actual bundle constraints. Consider dynamic import/code splitting and device capability checks. Quantify any claimed “64 KB” budget precisely (for example compressed chunk vs source asset total); do not claim a target is met without measuring the relevant output.

### Constraints

- Never invent reference mechanics, controls, camera movement, or scene contents. Clearly separate observed behavior from this prompt's design requirements.
- Do not use a WebGL scene as the only way to access content or dismiss the intro.
- Do not block primary content, focus, scrolling, or route changes with a failed or stalled intro.
- Avoid heavyweight assets, unnecessary packages, continuous expensive rendering, and uncleaned GPU resources.
- Do not claim 64 KB compliance unless the measured bundle/asset definition and result support the claim.
- Preserve all previously working application behavior.

### Expected results

The application has a robust optional intro with truthful progress, skip controls, pointer/drag/keyboard interaction, a lightweight Three.js scene or justified fallback, accessible feedback, reduced-motion behavior, predictable exit, and no leaks or blocking failure states. Any unverified reference interpretation is recorded in the handoff.

### Completion checklist

- [ ] Read prior stage reports and inspect the actual reference intro again where possible.
- [ ] Recorded verified behavior separately from the requested packet-catching design.
- [ ] Implemented loading, progress, skip, mouse/touch/drag, and keyboard paths.
- [ ] Added a lightweight scene with camera, lighting, materials, and objects or documented a justified fallback.
- [ ] Added WebGL failure handling, reduced-motion support, accessible status, and reliable exit.
- [ ] Cleaned up renderer resources, listeners, and animation frames.
- [ ] Measured any claimed bundle budget and ran applicable build checks.

### Acceptance criteria

This stage passes only if the intro never prevents access to the site, all supported input modes have working and testable paths, Skip/Escape always work, progress is not misleading, WebGL failure degrades safely, reduced-motion users are supported, scene resources are released, and the app builds and runs. Reference parity claims must be limited to verified observations.

### Completion report

Report the files changed, verified-versus-approximated intro behavior, controls and test results, Three.js implementation/fallback and cleanup, measured bundle budget if claimed, accessibility and reduced-motion behavior, remaining limitations, and whether Stage 6 acceptance criteria passed. Do not begin Stage 7 unless separately requested.

