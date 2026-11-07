---
name: react-performance
description: "Use when diagnosing slow React rendering, large lists, expensive calculations, bundle growth, asset loading, or re-render problems in this React 19 and Vite app."
---

# React Performance

## When to Use
- A measured interaction, render, route load, or asset is too slow.
- A component renders repeatedly or performs expensive work.
- Changing code splitting, images, animation, or large collections.

## Core Principles
- Identify a real bottleneck and measure before and after changing it.
- Prefer simpler state ownership and smaller component boundaries over speculative memoization.
- Keep the initial route lightweight and respect reduced-motion and device constraints.
- The current project has a small local project list; do not virtualize it without evidence of scale.

## Implementation Guidelines
- Use React DevTools Profiler to locate expensive commits and repeated renders; record the interaction and representative data.
- Use `React.memo` only when profiling shows parent renders repeatedly produce equivalent props and skipping the child render matters.
- Use `useMemo` for expensive calculations with stable dependencies, and `useCallback` only when stable function identity enables a measured memoized child or dependency.
- Keep derived state out of effects; avoid adding dependencies or complexity to optimize trivial calculations.
- Use `React.lazy`/`Suspense` or Vite-supported dynamic `import()` for substantial optional route or feature code. Preserve a clear loading and failure experience.
- For genuinely large collections, consider pagination or list virtualization after measuring DOM and scroll costs; preserve keyboard and screen-reader access.
- Optimize images with appropriate formats, dimensions, responsive sources, and lazy loading below the fold. Avoid loading large assets before needed.
- Keep animation work off React state at frame frequency. Use CSS transforms/opacity or `requestAnimationFrame`, stop work when hidden/unmounted, and support reduced motion.
- Measure production bundle changes with the existing Vite build before adding a dependency.

## Good Example
```tsx
const normalizedQuery = query.trim().toLowerCase()
const filteredProjects = projects.filter((project) => {
  const matchesCategory = category === 'all' || project.category === category
  const searchText = `${project.id} ${project.technologies.join(' ')}`.toLowerCase()
  return matchesCategory && searchText.includes(normalizedQuery)
})
```
For a short list and inexpensive predicate, render the direct result. The portfolio's localized search also searches translated names and overviews; keep that behavior when editing `ProjectsPage`. Avoid memoizing unless profiling shows filtering is expensive.

## Bad Example
```tsx
const filteredProjects = useMemo(
  () => projects.filter((project) => project.category === category),
  [projects, category],
)
const handleClick = useCallback(() => setSelected(id), [id])
```
Adding both caches to a small list without measured cost or a memoized consumer adds complexity without a demonstrated benefit.

## Common Mistakes
- Wrapping every handler and value in a memo hook.
- Assuming `React.memo` prevents all renders or fixes expensive work inside a component.
- Virtualizing short lists or introducing a library before measuring.
- Splitting code into tiny chunks that increase request and loading overhead.
- Optimizing development-only Strict Mode behavior instead of production measurements.

## Performance Considerations
- This app already lazy-loads Three.js with `import('three')` when the intro scene is activated; preserve its fallback, cleanup, and low-power intent.
- Avoid initializing WebGL, observers, or event listeners before their feature is needed.
- Compare production builds and use browser performance tools on the route and device that showed the issue.
- Do not weaken accessibility, visual quality, or reduced-motion support for a benchmark alone.

## Checklist Before Completing a Task
- [ ] Is the bottleneck described and measured on representative production behavior?
- [ ] Does the proposed optimization reduce the identified cost?
- [ ] Are memoization dependencies correct, and is cache complexity justified?
- [ ] Are lazy chunks, loading states, fallback paths, and cleanup correct?
- [ ] Does the UI remain usable with reduced motion and keyboard/screen-reader input?
- [ ] Did the production build and relevant interaction remain correct?
