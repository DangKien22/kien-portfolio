---
name: debugging
description: "Use when investigating React bugs, browser console errors, rendering issues, async races, state synchronization, effect cleanup, or memory leaks."
---

# Debugging

## When to Use
- A page, interaction, route, or request behaves incorrectly or inconsistently.
- Console errors, unexpected re-renders, stale state, leaks, or async races appear.

## Core Principles
- Reproduce the failure and identify its root cause before changing code.
- Use evidence from the browser, React DevTools, logs, types, and tests rather than guessing.
- Make the smallest durable fix that preserves intended behavior.
- Keep failures visible; do not hide them with broad catches or temporary guards.

## Implementation Guidelines
- Record the route, steps, expected result, actual result, and whether it occurs in production, development, or both.
- Read the full error and stack trace; trace the failing value back to its owner and the event or effect that changed it.
- For rendering problems, inspect props, state, keys, and component ownership in React DevTools before adding memoization.
- For async problems, inspect request start/end order, dependencies, abort behavior, and whether stale responses can commit.
- For effects and leaks, verify that timers, listeners, observers, animation frames, and WebGL resources are cleaned up symmetrically.
- Check Strict Mode behavior rather than disabling it; development remounts can expose missing cleanup.
- Add or update a focused regression test when test infrastructure exists; otherwise verify the exact reproduction manually and run the project's lint/build checks.
- Do not edit unrelated files or leave debugging logs, fake data, or bypasses in the fix.

## Good Example
```tsx
useEffect(() => {
  const onResize = () => setWidth(window.innerWidth)
  window.addEventListener('resize', onResize)
  return () => window.removeEventListener('resize', onResize)
}, [])
```
The subscription has a clear owner and symmetric cleanup.

## Bad Example
```tsx
useEffect(() => {
  window.addEventListener('resize', () => setWidth(window.innerWidth))
}, [])
```
The anonymous listener cannot be removed and can survive the intended lifecycle.

## Common Mistakes
- Fixing a symptom with a timeout, arbitrary ref guard, or disabled lint rule.
- Adding a state variable to mirror a value that can be derived.
- Ignoring rejected promises or treating errors as successful empty data.
- Blaming React re-renders without measuring which component and work are costly.
- Fixing a Strict Mode symptom by removing Strict Mode or weakening cleanup.

## Performance Considerations
- Use the React Profiler and browser performance tools to distinguish React render cost from scripting, layout, paint, network, or WebGL work.
- Confirm repeatable measurements on the affected route and representative device.
- For animation leaks, stop `requestAnimationFrame` loops when hidden and cancel frames during cleanup.
- Preserve the existing lazy Three.js loading, fallback, and resource disposal behavior while debugging the intro scene.

## Checklist Before Completing a Task
- [ ] Can the original failure be reproduced and is its cause understood?
- [ ] Does the fix address the owner or lifecycle that caused the bug?
- [ ] Are async operations, listeners, timers, observers, and resources cleaned up?
- [ ] Are errors reported instead of silently converted to success?
- [ ] Has the original reproduction been retested, including relevant edge cases?
- [ ] Have debugging artifacts and unrelated edits been removed?
