---
name: code-review
description: "Use when reviewing proposed or completed React and TypeScript changes for correctness, bugs, accessibility, security, duplication, performance, and maintainability."
---

# Code Review

## When to Use
- Reviewing a diff before implementation, before merge, or after a bug fix.
- Checking React patterns, behavior changes, dependencies, performance, accessibility, or security risks.

## Core Principles
- Review the actual diff and surrounding code; report actionable defects, not personal style preferences.
- Prioritize correctness, data safety, accessibility, and regressions over cosmetic concerns.
- State concrete evidence and impact; distinguish confirmed issues from questions or uncertainty.
- Suggest the smallest maintainable fix that fits the existing architecture.

## Implementation Guidelines
- Read changed code plus the relevant caller, types, translations, styles, and tests before concluding.
- Trace state and props through their owners; check effect dependencies, cleanup, stable keys, controlled inputs, and async ordering.
- Check route behavior using the existing React Router 6 setup; verify locale keys exist when translated text changes.
- Look for duplicate logic, unnecessary abstractions, accidental global state, dependency additions, and static-data migrations without need.
- Check accessibility: semantic controls, keyboard access, focus, labels, status announcements, responsive behavior, and reduced motion.
- Assess performance only with a clear cost or evidence. Avoid treating missing memoization as a defect by itself.
- Check security boundaries: unsafe HTML, untrusted URL construction, exposed secrets, unsafe user-controlled redirects, and missing validation when crossing a trust boundary.
- Report each finding with file/line, impact, and a concrete correction; do not report speculative risks as confirmed vulnerabilities.
- Verify the changed behavior with focused tests or the repository scripts: `npm run lint` and `npm run build`.

## Good Example
> **Finding — `ProjectsPage.tsx`:** The request effect depends on `projects` and also updates `projects`, so each response triggers another request. Depend on the request inputs instead, cancel stale requests, and test that one query change produces one active request.

This identifies evidence, behavior, and a specific minimal correction.

## Bad Example
> This component is too big and should be rewritten with a state library and memoized.

This is not tied to a defect or measurable cost and proposes architecture without evidence.

## Common Mistakes
- Reviewing only a snippet without checking its callers or state ownership.
- Reporting style preferences as bugs or recommending memoization everywhere.
- Missing behavior changes in keyboard, empty, error, or reduced-motion states.
- Overlooking request cancellation, stale results, timer/listener cleanup, or unhandled errors.
- Recommending new libraries without checking the installed dependencies and project patterns.

## Performance Considerations
- Treat React Profiler or browser measurements, collection size, and bundle output as evidence.
- Check whether expensive work runs repeatedly and whether a change would actually remove it.
- Review lazy loading and fallback paths, not just bundle size.
- Avoid performance changes that regress accessibility, maintainability, or small-list simplicity.

## Checklist Before Completing a Task
- [ ] Were changed lines and their callers/context read?
- [ ] Are findings concrete, prioritized, and supported by code evidence?
- [ ] Were React lifecycle, async/error paths, and cleanup checked?
- [ ] Were accessibility, security boundaries, and localization reviewed?
- [ ] Are performance findings evidence-based rather than speculative?
- [ ] Were relevant tests, lint, or build checks run or clearly identified as pending?
