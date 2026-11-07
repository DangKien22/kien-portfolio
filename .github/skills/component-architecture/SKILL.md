---
name: component-architecture
description: "Use when designing or refactoring React component boundaries, reusable UI, custom hooks, folder placement, or separation of concerns in this portfolio."
---

# Component Architecture

## When to Use
- Splitting a large component or designing reusable UI.
- Extracting shared behavior into a hook or deciding where data and logic belong.
- Adding a page, component, type, or data module.

## Core Principles
- Keep each component responsible for one cohesive piece of UI or interaction.
- Prefer composition and explicit props to components that know about unrelated page details.
- Follow the repository's existing structure before proposing a new architecture.
- Extract abstractions to remove real duplication or clarify responsibility, not just to reduce line count.

## Implementation Guidelines
- Keep route composition in `src/App.tsx`, route-level screens in `src/pages/`, reusable UI in `src/components/`, shared behavior in `src/hooks/`, static content in `src/data/`, and domain shapes in `src/types/`.
- Keep shared styling and design tokens in the existing `src/styles.css` unless a localized style pattern is already established.
- Use custom hooks for reusable stateful behavior or lifecycle synchronization; keep visual markup in components.
- Pass the minimum data and callbacks needed through typed props. Do not introduce context or a global store for a single page's state.
- Compose page-specific content from existing components instead of making generic components aware of routes, translation keys, or unrelated data sources.
- Keep external data access separate from presentation if the app acquires a real API; do not invent a service layer for static data.
- Preserve React Router 6 and i18next integration when adding route or localized component behavior.

## Good Example
```tsx
import ProjectCard from '../components/ProjectCard'
import type { Project } from '../types/project'

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}
```
The list composes an existing card and receives data without taking over routing or fetching.

## Bad Example
```tsx
function ProjectCard({ projectId }: { projectId: string }) {
  const project = projects.find((item) => item.id === projectId)!
  const [route, setRoute] = useState(window.location.pathname)
  // Also fetches data, owns page filters, and renders navigation for every route.
  return <div>{project.id} {route}</div>
}
```
This hides dependencies, couples a reusable card to global data and routing, and combines unrelated responsibilities.

## Common Mistakes
- Extracting a component that is used once but adds indirection and hides the UI flow.
- Creating a large “shared” component with many boolean flags for different pages.
- Duplicating project data, translation strings, or interaction rules across components.
- Moving all state to a global provider instead of the closest common owner.
- Creating new folder conventions that conflict with the current `pages`, `components`, `hooks`, `data`, and `types` layout.

## Performance Considerations
- Component boundaries can localize state updates, but extra abstraction is not automatically faster.
- Avoid passing broad mutable objects when a small, explicit prop is sufficient.
- Use stable domain IDs as keys so filtering and reordering preserve component identity.
- Add code splitting at meaningful route or feature boundaries, not at every component boundary.

## Checklist Before Completing a Task
- [ ] Does each component or hook have a cohesive responsibility?
- [ ] Are data ownership and prop contracts clear and typed?
- [ ] Does the change fit the existing folder and styling conventions?
- [ ] Is the abstraction useful to multiple consumers or clearly clarifies ownership?
- [ ] Are routes, localization, and static content still handled by their existing owners?
- [ ] Are list keys stable and derived from domain identity?
