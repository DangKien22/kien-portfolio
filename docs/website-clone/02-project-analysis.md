# Stage 2 — Existing Project Analysis

## Standalone prompt for the coding agent

### Role and objective

Act as a senior React/TypeScript application architect. Inspect the existing Vite + ReactJS project and prepare a safe, project-specific plan for implementing the website recreation described in `01-reference-analysis.md`. Do not implement the plan or alter existing functionality in this stage.

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

For this analysis stage, make no application implementation, configuration, dependency, or content changes.

### Detailed instructions

First read `docs/website-clone/01-reference-analysis.md` if it exists. Then inspect the project from its actual root. Do not assume the framework, structure, dependencies, assets, naming, current behavior, or state of the working tree.

Analyze at least:

1. **Project and tooling**
   - `package.json` scripts, runtime versions, dependencies, and dev dependencies.
   - Vite, TypeScript, ESLint, test, build, and routing configuration that exists.
   - Root-level folders and source/asset organization, excluding generated or dependency directories from the application inventory.
2. **Application structure**
   - Entry point, root component, route definitions, pages, layouts, shared components, hooks, utilities, data models, and state ownership.
   - Current URL routes and fallback behavior.
   - Existing features that must remain functional.
3. **Styles and design conventions**
   - Global CSS, tokens, fonts, responsive breakpoints, animation patterns, and component styles.
   - Existing CSS methodology and conventions; identify likely style conflicts before proposing changes.
4. **Assets and content**
   - Local images, fonts, icons, downloadable files, and their use or licenses when known.
   - Existing profile, experience, skills, and project data; distinguish verified project facts from placeholder/fictitious content.
   - Identify missing reference assets and recommend non-misleading alternatives without taking or reusing assets improperly.
5. **Implementation readiness and risks**
   - Determine whether current components already implement pieces of the requested portfolio, including navigation, section tracking, scroll reveal, cursor, projects, and intro.
   - Identify what can be extended or reused, what needs adjustment, and what should remain untouched.
   - Note build/lint status only if you can run existing commands safely; do not install packages to make analysis work.

Produce a staged implementation plan aligned to the remaining documentation prompts. For every planned change, name likely files, purpose, existing behavior to preserve, dependencies that could be reused, validation command, and risk/mitigation. Explicitly identify whether the existing app already has routes or interactions that should not be overwritten. Use a “no change” decision when extending a feature is riskier than preserving it.

### Constraints

- Do not edit, create, delete, rename, or format project implementation files in this stage.
- Do not install packages or update the dependency manifest.
- Do not delete, overwrite, or replace existing routes, assets, CSS, data, or functionality.
- Do not treat project content as truth if it is fictional or unverified.
- Do not request or expose secrets, credentials, or personal details unnecessarily.
- Report commands that were not run instead of claiming validation.

### Expected results

Deliver a project inventory and a prioritized, stage-by-stage plan for Stages 3–8. Include:

- Current architecture and conventions with paths.
- Dependencies and scripts relevant to the task.
- Current functionality that must be preserved.
- Assets and data usable for the work, plus their limitations.
- Proposed component, styling, and data changes with file-level scope.
- Risks, open decisions, required reference evidence, and validation strategy.
- A baseline status for runnable, lint, test, and build checks, distinguishing checked from unchecked.

### Completion checklist

- [ ] Read the reference analysis before planning.
- [ ] Inspected the package manifest, source tree, configuration, routing, styling, assets, and data.
- [ ] Identified existing functionality to preserve and possible reuse.
- [ ] Produced a scoped plan for each remaining stage.
- [ ] Made no implementation or configuration changes.
- [ ] Clearly documented unknowns, risks, and unrun validation.

### Acceptance criteria

This stage passes only when another engineer can use the plan to make incremental changes without replacing the app or breaking existing routes/features. The inventory must be based on the actual project, document exact paths and available scripts, and distinguish existing behavior from planned changes. The working tree must have no changes attributable to this stage.

### Completion report

Finish with a report summarizing the inspected architecture, high-priority preservation constraints, plan highlights, any checks actually run and their results, and confirmation that no project implementation was modified. State whether Stage 2 acceptance criteria passed. Do not begin Stage 3 unless separately requested.

