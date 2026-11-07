---
name: api-data-management
description: "Use when adding or changing remote data loading, Axios or fetch requests, API services, cancellation, loading/error states, caching, pagination, filtering, or data transformation in this app."
---

# API and Data Management

## When to Use
- A feature must load or mutate data from a remote API.
- Handling request state, cancellation, duplicate requests, caching, pagination, or filtering.
- Refactoring the boundary between remote data and UI.

## Core Principles
- First identify whether data is static or remote; current profile and project content lives in `src/data/`.
- Do not convert local content to an API or add Axios, a query library, or a cache dependency without a concrete requirement.
- Reuse a client, service, and conventions only if they already exist; the current dependencies do not include Axios or a server-state library.
- Represent loading, success, empty, and error states explicitly; never turn a failed request into successful empty data.

## Implementation Guidelines
- For a new request with current dependencies, prefer native `fetch` and a focused typed function in an appropriate existing module; add `src/services/` only when remote data is actually introduced.
- Check `response.ok`, validate/parse the response into an explicit shape, and surface errors to the UI or repository-standard error reporting.
- For effect-owned requests, create an `AbortController`, pass its `signal`, and abort during cleanup. Ignore no errors silently: distinguish an intentional abort from a real failure.
- If Axios is already deliberately added for a feature, use its supported `signal` option and existing configured instance; do not create a second client.
- Avoid duplicate calls by fixing ownership and effect dependencies first. Add caching or request deduplication only when repeat access and freshness requirements justify it.
- Keep pagination/filter state in the owning route; push filtering to the server only when dataset size or API semantics require it.
- Keep transformations pure and outside rendering when they are shared or expensive; retain simple local transforms for small static datasets.
- Respect React Strict Mode in development; do not disable it or add ref guards just to conceal duplicate-effect bugs.

## Good Example
```tsx
useEffect(() => {
  const controller = new AbortController()

  async function loadProjects() {
    try {
      const response = await fetch('/api/projects', { signal: controller.signal })
      if (!response.ok) throw new Error(`Project request failed: ${response.status}`)
      const payload: unknown = await response.json()
      const result = parseProjects(payload)
      setProjects(result)
    } catch (error) {
      if (controller.signal.aborted) return
      setError(error instanceof Error ? error.message : 'Unable to load projects')
    }
  }

  void loadProjects()
  return () => controller.abort()
}, [])
```
`parseProjects` represents a runtime validator that returns `Project[]` or throws; define it with the feature rather than trusting `response.json()` as typed data. Use this only for an actual remote-data feature; expose loading and error state alongside `projects`.

## Bad Example
```tsx
useEffect(() => {
  fetch('/api/projects')
    .then((response) => response.json())
    .then(setProjects)
    .catch(() => setProjects([]))
}, [projects])
```
This can refetch after each state update, has no cancellation or HTTP status check, and makes failure indistinguishable from an empty response.

## Common Mistakes
- Adding Axios or a query/cache package when the app has no API requirement.
- Putting fetch logic directly into many presentational cards.
- Omitting cancellation when an effect-owned request can outlive its component.
- Silently catching failures or treating malformed data as valid.
- Introducing cache invalidation without a defined freshness or mutation model.

## Performance Considerations
- Avoid repeated network requests; inspect component ownership, effect dependencies, and route lifecycle before adding cache machinery.
- Paginate or filter large remote results at the API boundary when supported; do not fetch an unbounded collection by default.
- Avoid re-transforming a large response on every render; measure and memoize only if the cost is meaningful.
- Keep loading UI responsive and prevent stale responses from overwriting newer results.

## Checklist Before Completing a Task
- [ ] Is remote data actually needed, and does the implementation reuse existing dependencies?
- [ ] Are response status, data shape, and error states handled explicitly?
- [ ] Are pending requests cancelled and stale results prevented?
- [ ] Are loading, empty, and error states understandable and accessible?
- [ ] Are caching, pagination, and filtering justified by actual requirements?
- [ ] Does existing static data remain local unless the task requires otherwise?
