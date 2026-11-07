---
name: react-best-practices
description: "Use when building, changing, or reviewing React components, hooks, props, effects, or state in this React 19 TypeScript and Vite project."
---

# React Best Practices

## When to Use
- Implementing or refactoring a component, custom hook, or interaction.
- Reviewing state, props, effects, controlled inputs, or render behavior.

## Core Principles
- Use functional components and React 19 APIs supported by the installed version.
- Keep state minimal; derive values from props and state during render.
- Effects synchronize with external systems; they are not a general calculation or event mechanism.
- Keep state near the components that own and update it.
- Preserve the project's TypeScript, React Router, and i18next patterns.

## Implementation Guidelines
- Type component props with an `interface` or `type`; make props optional only when a useful default exists.
- Use controlled inputs when React must own the current value; use refs or native form submission when it does not.
- Use functional state updates when the next value depends on the previous value.
- Include every reactive value used by an effect in its dependency list. Restructure the effect rather than suppressing `react-hooks` lint rules.
- Put user-event work in event handlers. Use an effect for subscriptions, timers, DOM APIs, and other external synchronization, with symmetric cleanup.
- Avoid copying props or derived values into state unless there is a specific, documented reason.
- Keep user-facing text in the existing i18next locales; use semantic HTML and accessible names.

## Good Example
```tsx
import { useState } from 'react'

interface FilterProps {
  onChange: (value: string) => void
}

export function ProjectFilter({ onChange }: FilterProps) {
  const [query, setQuery] = useState('')

  const handleChange = (value: string) => {
    setQuery(value)
    onChange(value)
  }

  return (
    <label>
      Project search
      <input value={query} onChange={(event) => handleChange(event.target.value)} />
    </label>
  )
}
```

## Bad Example
```tsx
function ProjectFilter({ initialQuery }) {
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  useEffect(() => {
    document.title = query
  }, [])

  return <input value={query} onChange={(event) => setQuery(event.target.value)} />
}
```
This leaves props untyped, mirrors a prop into state, and uses an incomplete effect dependency list.

## Common Mistakes
- Adding an effect to compute filtered, formatted, or concatenated render data.
- Omitting effect dependencies, or using a ref to evade a real dependency.
- Mutating arrays or objects held in state.
- Using array indexes as keys for reorderable or filtered data.
- Introducing context or global state for values used by one page.

## Performance Considerations
- A state update re-renders its owning component and descendants that need new output; first locate the costly work before optimizing.
- Keep fast-changing interaction state local so unrelated sections do not re-render.
- Avoid state updates that produce an equivalent value or repeat expensive work unnecessarily.
- Do not add memoization by default; measure or identify a clear repeated cost first.

## Checklist Before Completing a Task
- [ ] Is each state value necessary, and can derived data remain derived?
- [ ] Are props and event/state shapes correctly typed?
- [ ] Does every effect synchronize with an external system and clean it up?
- [ ] Are dependencies complete and compatible with the Hooks lint rules?
- [ ] Are labels, state announcements, and visible copy accessible and localized?
- [ ] Does the change preserve existing routing and component behavior?
