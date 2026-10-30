# Stage 3 — Portfolio Structure and UI Implementation

## Standalone prompt for the coding agent

### Role and objective

Act as a senior React/TypeScript frontend engineer. Implement the structural portfolio UI in the existing Vite + ReactJS application, closely following the verified structure in `01-reference-analysis.md` and the safe file-level plan in `02-project-analysis.md`. Use fictional, clearly non-real portfolio content for **Trung Kiên, Frontend Developer, with 3+ years of experience**.

### Required preparation and shared project-preservation rules

Before editing, read `01-reference-analysis.md` and `02-project-analysis.md`, inspect their recommendations against the current code, and inspect every file you intend to change.

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

Build or adapt reusable React components and data structures to represent all required portfolio areas:

- **Header:** reference-appropriate wordmark/identity, location or status detail when evidenced, and accessible navigation.
- **Navigation:** links to Home/Hero, About, Experience, Projects, and Contact, reflecting the observed desktop/mobile patterns. Preserve existing route and hash behavior unless the analysis justifies a minimal adjustment.
- **Hero:** name “Trung Kiên,” role “Frontend Developer,” a concise fictional profile statement, relevant primary/secondary calls to action, and a visual treatment matching the reference composition.
- **About:** profile narrative, capability/skills content if supported by the reference hierarchy, and optional concise evidence/detail panels. Do not reproduce the reference author's biography or achievements as Trung Kiên's.
- **Experience:** a readable timeline or list with fictional roles, dates, responsibilities, and technology summary consistent with 3+ years of experience. Clearly avoid unverifiable real employer claims.
- **Projects:** reusable cards and a project data model; include appropriate fictional projects, concise problem/solution/outcome-style content if that structure appears in the verified analysis, technology labels, and honest link/image placeholders.
- **Contact:** accessible, working email/contact links using explicitly placeholder addresses or existing user-approved data; never invent or expose real personal contact details.
- **Footer:** identity, relevant links, copyright/year if appropriate, and a keyboard-accessible back-to-top or equivalent action if the reference supports it.

Match the verified content hierarchy and page order. Use semantic HTML, logical heading levels, descriptive accessible names, keyboard-operable controls, and responsive-friendly markup. Keep copy/data separate from layout when that matches project conventions. Reuse the installed icon package or existing assets rather than adding dependencies. Keep external links clearly distinguished and safe.

Preserve all existing app routes, including project-list/detail/fallback behavior where present. If an existing functionality conflicts with the target structure, prefer adapting it with the smallest change and explain the tradeoff. Do not attempt to complete advanced motion, pixel-level visual refinement, or the requested 3D intro in this stage unless minimal behavior is necessary to keep an existing feature working; those are later stages.

### Constraints

- Use verified reference structure; do not add unobserved sections or assert unverified content as reference fact.
- Fictionalize personal and employment content. Do not reuse the reference person's contact details, resume, images, or work claims as Trung Kiên's.
- Do not install a library solely to make basic layout easier.
- Do not replace the project, routing model, or global styles wholesale.
- Make changes only for the structural UI and data scope of this stage.
- Keep all pages and existing controls runnable and usable.

### Expected results

The existing application should render a coherent portfolio with the required sections in order, reusable components, fictional 3+ year profile content, and working section navigation. Existing routes and features remain intact. The UI should establish the reference's structural rhythm but may be refined visually in Stage 4 and behaviorally in Stages 5–6.

### Completion checklist

- [ ] Read and applied both earlier stage documents.
- [ ] Inspected each touched file and followed project conventions.
- [ ] Implemented header/navigation, hero, about, experience, projects, contact, and footer.
- [ ] Used fictional, appropriate Trung Kiên content and non-real placeholders for contact data.
- [ ] Reused components, dependencies, assets, and project patterns where suitable.
- [ ] Preserved existing routes and unrelated behavior.
- [ ] Ran an available focused validation and confirmed the app remains runnable.

### Acceptance criteria

This stage passes only when all required sections render in the intended order, navigation targets resolve, project cards and other controls are usable, content is consistently fictionalized for Trung Kiên with 3+ years of experience, existing unrelated functionality still works, and available build/type/lint checks for touched code pass or have clearly documented pre-existing blockers. No unrelated structure replacement or unnecessary dependency addition is permitted.

### Completion report

Report the files changed, sections and reusable components delivered, existing functionality preserved, fictional content approach, commands run and results, known visual/interaction gaps deferred to later stages, and whether Stage 3 acceptance criteria passed. Do not begin Stage 4 unless separately requested.

