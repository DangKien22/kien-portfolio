---
name: ui-ux-implementation
description: "Use when implementing or reviewing React UI, responsive layouts, accessibility, loading/empty/error states, interaction feedback, transitions, or animation."
---

# UI and UX Implementation

## When to Use
- Building or adjusting a page, component, form, navigation, or responsive layout.
- Adding interaction feedback, loading/empty/error states, animation, or accessibility support.

## Core Principles
- Preserve the app's visual language and existing CSS design tokens.
- Use semantic HTML and native browser behavior before custom interaction.
- Accessible behavior, clear feedback, and responsive layouts are part of the feature, not a later pass.
- Keep visible content consistent with the existing i18next localization.

## Implementation Guidelines
- Inspect `src/styles.css` and neighboring components before introducing new classes, colors, spacing, breakpoints, or typography.
- Use semantic headings, buttons, links, labels, and landmarks; maintain visible keyboard focus and logical tab order.
- Give controls accessible names and state (`aria-label`, `aria-pressed`, `aria-expanded`) when native text does not communicate them.
- Announce asynchronous result changes with appropriate status semantics; show loading, empty, and recoverable error states where relevant.
- Test narrow and wide layouts; avoid fixed dimensions that clip text, controls, or translated content.
- Honor `prefers-reduced-motion`; prefer transform/opacity transitions, and avoid animating layout-heavy properties.
- Keep pointer-only interactions operable with a keyboard and provide a meaningful fallback when enhanced features such as WebGL are unavailable.
- Avoid direct DOM changes when declarative React state or CSS can express the UI.

## Good Example
```tsx
<button
  type="button"
  aria-pressed={category === filter}
  onClick={() => setCategory(filter)}
>
  {t(`projects.categories.${filter}`)}
</button>
```
The control is keyboard-operable, communicates its selected state, and uses localized text.

## Bad Example
```tsx
<div onClick={() => setCategory(filter)} className="filter-button">
  {filter}
</div>
```
A clickable `div` has no native button behavior, focus handling, or accessible pressed state.

## Common Mistakes
- Using placeholders instead of persistent labels.
- Removing focus outlines without an equally visible replacement.
- Relying on color, hover, or animation alone to communicate state.
- Animating width, position, or other layout properties continuously when transforms suffice.
- Leaving empty or failed filtered results indistinguishable from a blank page.
- Forgetting reduced-motion preferences or a non-WebGL fallback.

## Performance Considerations
- Avoid needless DOM changes, layout reads/writes, and React state updates during pointer or animation frames.
- Use CSS for simple transitions; stop JavaScript animation and listeners when hidden or unmounted.
- Keep images sized for their rendered dimensions and defer below-the-fold assets appropriately.
- Do not trade semantic controls or readable content for a minor rendering shortcut.

## Checklist Before Completing a Task
- [ ] Does the layout work at narrow and wide viewports without clipping?
- [ ] Are controls keyboard accessible with visible focus and accurate state?
- [ ] Are labels, announcements, and error messages localized and understandable?
- [ ] Are loading, empty, and failure states handled where applicable?
- [ ] Does the interaction support reduced motion and enhanced-feature fallbacks?
- [ ] Do spacing, typography, and colors fit the existing design system?
