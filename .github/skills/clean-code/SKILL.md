---
name: clean-code
description: "Use when writing, refactoring, or reviewing React and TypeScript code for readability, naming, duplication, complexity, and maintainability."
---

# Clean Code

## When to Use
- Implementing or refactoring a component, hook, data model, or utility.
- Reducing duplication or reviewing code that is hard to understand.

## Core Principles
- Make the intended behavior obvious to the next maintainer.
- Prefer simple, explicit code over cleverness or premature generalization.
- Apply DRY and SOLID principles when they improve this code; do not abstract coincidental similarities.
- Preserve established formatting and naming conventions.

## Implementation Guidelines
- Use descriptive names for components, hooks (`use...`), props, state, and handlers; use domain vocabulary already present in the project.
- Keep TypeScript types specific. Avoid `any`, unsafe non-null assertions, and unnecessary casts.
- Use early returns for clear guard conditions and extract a helper when it makes a complex operation easier to name and test.
- Keep state updates immutable and transformations local and readable.
- Avoid deeply nested conditional JSX; name meaningful intermediate values or extract a cohesive component.
- Follow current formatting: single quotes, no semicolons, two-space indentation, and existing import conventions.
- Keep user-facing strings in the locale files; keep CSS class names consistent with the existing styles.

## Good Example
```tsx
const normalizedQuery = query.trim().toLowerCase()
const visibleProjects = projects.filter((project) => {
  const matchesCategory = category === 'all' || project.category === category
  const itemKey = `projects.items.${project.id}`
  const searchText = `${t(`${itemKey}.name`)} ${t(`${itemKey}.overview`)} ${project.technologies.join(' ')}`.toLowerCase()
  const matchesQuery = searchText.includes(normalizedQuery)
  return matchesCategory && matchesQuery
})
```
Names expose each part of the filtering rule and preserve the portfolio's localized project search.

## Bad Example
```tsx
const x = p.filter((a) => (c === 'all' || a.category === c) && (q ? `${a.id}${a.category}`.toLowerCase().includes(q.toLowerCase()) : true))
```
The names and compressed expression obscure the search contract and make it easy to omit meaningful fields.

## Common Mistakes
- Adding abstractions for one-off expressions without improving clarity.
- Repeating translation keys, transformations, or business rules in multiple places.
- Hiding errors behind empty catches, fallback success values, or unexplained `!` assertions.
- Using boolean props with unclear combinations instead of explicit composition.
- Changing files or formatting unrelated to the requested behavior.

## Performance Considerations
- Readability and performance are compatible: optimize only a demonstrated hot path and retain clear names.
- Avoid expensive derived work in render only when profiling demonstrates a meaningful cost.
- Do not cache trivial strings or short-array operations without evidence.
- Keep large optional code such as the Three.js scene behind its existing dynamic import boundary.

## Checklist Before Completing a Task
- [ ] Do names describe intent and domain concepts?
- [ ] Is the simplest correct implementation used?
- [ ] Is real duplicated logic consolidated without creating a premature abstraction?
- [ ] Are types precise, state updates immutable, and errors explicit?
- [ ] Does formatting match the surrounding code?
- [ ] Have unrelated files and behavior been left unchanged?
