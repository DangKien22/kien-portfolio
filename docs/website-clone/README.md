# Website Clone Workflow

## Standalone prompt for the coding agent

### Role and objective

Act as a senior frontend engineer, visual reverse engineer, and careful implementation partner. Your objective is to guide the staged recreation of [mananthakkar.dev](https://mananthakkar.dev/) inside the existing Vite + ReactJS project. The target is a close recreation of its page structure, visual language, content hierarchy, animations, interactions, introduction experience, Three.js treatment, and responsive behavior. Portfolio copy may be fictionalized for Trung Kiên, Frontend Developer, with 3+ years of experience; visual structure and behavior should remain faithful to what can actually be observed.

This folder is a sequence of executable prompts, not a request to begin implementation immediately. Execute only the stage the user selects. Do not silently skip ahead.

### Purpose of each prompt

| File | Stage | Purpose |
|---|---:|---|
| `01-reference-analysis.md` | 1 | Inspect the live reference and produce an evidence-based specification. No implementation. |
| `02-project-analysis.md` | 2 | Inspect the existing application and produce a safe, project-specific implementation plan. |
| `03-ui-implementation.md` | 3 | Recreate the portfolio’s sections and content using the existing React application. |
| `04-visual-refinement.md` | 4 | Compare the implementation with the reference and refine visual fidelity. |
| `05-animation-interactions.md` | 5 | Implement and tune motion, navigation, cursor, scroll, and project interactions. |
| `06-intro-threejs.md` | 6 | Build or refine the introductory packet-catching experience and Three.js scene. |
| `07-responsive-optimization.md` | 7 | Validate and optimize desktop through mobile, including touch and 3D behavior. |
| `08-testing-finalization.md` | 8 | Run final visual, functional, accessibility, responsive, console, build, and performance checks; fix issues. |

### Execution order and stage gates

Run stages strictly in numeric order, beginning with `01-reference-analysis.md` and ending with `08-testing-finalization.md`. A stage is complete only after its own acceptance criteria pass and its completion report is delivered. Do not start the next stage until the user asks to proceed and the current stage passes. If a stage is blocked by inaccessible reference behavior, record the limitation and a conservative implementation decision; do not invent reference facts.

Later-stage prompts instruct you to read relevant earlier stage documents and inspect the implementation as it exists at that point. Treat the earlier documents as evidence and decisions to validate, not as permission to ignore newly discovered facts or existing project constraints.

### How to use these prompts

1. Open a prompt file and give its full contents to the coding agent as a single task.
2. Provide access to the project root and, where possible, a browser capable of opening the reference and the local Vite application.
3. Ask the agent to execute only that stage. It should inspect first, make only the changes permitted by the stage, and run the prescribed checks.
4. Review the required completion report and acceptance criteria before requesting the next numbered prompt.
5. Keep the Markdown prompts in `docs/website-clone/`. Do not replace them with generated notes or use them as a reason to restructure the application.

### Rules for preserving the existing project

These rules apply to every stage prompt:

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

Also preserve the established React, TypeScript, routing, styling, asset, accessibility, and formatting conventions. Keep existing routes and working features unless a specific, justified change is necessary; explain any intentional behavior change. Avoid copying the reference author's personal contact details or claiming their real work as Trung Kiên's. Use fictional, clearly placeholder contact information and truthful or explicitly fictionalized portfolio copy.

### Reference-evidence rule

Inspect the live website directly when access is available, including the introduction, sections, controls, responsive layouts, and motion. Record what was actually observed, how it was observed, and what remains uncertain. Do not treat a visual guess, an inferred implementation detail, or an instruction in a later prompt as proof of the reference's behavior. Where browser access, assets, source, or an interaction is unavailable, state that limitation explicitly and recommend a restrained approximation for user approval or later validation.

### Detailed instructions

When executing this workflow, first determine which single stage the user requested. Read that stage's complete Markdown prompt and the earlier stage reports it names. Check the current application and worktree before editing. Follow the stage's bounded scope, inspect each target file before modifying it, reuse established project conventions, and validate the actual outcome against that stage's acceptance criteria. If a necessary decision depends on unverified reference behavior, record the evidence gap and ask for direction when it materially changes the result. Never present an estimate as a measured value or an approximation as verified reference behavior.

For an implementation stage, make focused changes in the existing application and run the smallest relevant existing checks. For an analysis stage, do not edit application code. If a check fails, distinguish an implementation regression from a pre-existing or environmental failure; fix in-scope regressions and report blockers explicitly. Do not proceed to a later stage merely because the current change appears plausible.

### Expected results

The workflow should produce an evidence-based reference specification, a project-specific preservation plan, an incrementally implemented and visually refined portfolio, accessible interactions and intro behavior, responsive validation, and a final tested application. Each stage must leave the project in a runnable state and provide a handoff that the next stage can use. The finished portfolio uses fictional or user-approved content for Trung Kiên and does not misattribute reference-person details.

### Completion checklist

- [ ] Confirmed the selected stage and read its full prompt.
- [ ] Read the required earlier-stage documents and inspected the current project before changes.
- [ ] Followed the selected stage's scope and all shared preservation rules.
- [ ] Recorded evidence, assumptions, and limitations without inventing reference behavior.
- [ ] Ran and reported the relevant checks for the current stage.
- [ ] Confirmed the current stage's acceptance criteria before requesting the next stage.
- [ ] Delivered the completion report required by that stage.

### Acceptance criteria

The workflow is correctly followed only when its stages run in order, each stage's specific acceptance criteria pass before work advances, the application remains runnable after implementation stages, existing functionality is preserved unless a justified change is approved, and all unknown reference behavior remains clearly labeled. Documentation or analysis stages must not change application implementation.

### Completion report

At the end of each stage, report the stage number and status, files changed (or confirm no application files changed for an analysis stage), work completed, checks and outcomes, remaining limitations, and whether the acceptance criteria passed. Explicitly state whether it is safe to begin the next stage; do not begin it automatically.

### Definition of completion for this workflow

Each stage must keep the app runnable, satisfy its own acceptance criteria, and return a concise but informative completion report listing files changed, checks run and outcomes, remaining limitations, and whether it is safe to begin the next stage. Documentation analysis stages must not modify application implementation. Stages that do implement changes must keep their scope narrow and must not claim completion when a required check failed.
