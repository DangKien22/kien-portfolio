import { useEffect } from 'react'

export function useScrollReveal(routeKey: string) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('main')
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      return
    }

    const observed = new Set<HTMLElement>()
    const siblingCounts = new Map<HTMLElement, number>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-reveal-state', 'visible')
          observer.unobserve(entry.target)
          observed.delete(entry.target as HTMLElement)
        }
      })
    }, { threshold: 0.05, rootMargin: '0px 0px 240px 0px' })

    const observeTarget = (target: HTMLElement) => {
      if (observed.has(target)) return

      const parent = target.parentElement
      const siblingIndex = parent ? siblingCounts.get(parent) ?? 0 : 0
      if (parent) siblingCounts.set(parent, siblingIndex + 1)
      target.style.setProperty('--reveal-delay', `${Math.min(siblingIndex, 4) * 70}ms`)
      target.setAttribute('data-reveal-state', 'pending')
      observer.observe(target)
      observed.add(target)
    }

    const observeTree = (node: Node) => {
      if (!(node instanceof HTMLElement)) return
      if (node.matches('[data-reveal]')) observeTarget(node)
      node.querySelectorAll<HTMLElement>('[data-reveal]').forEach(observeTarget)
    }

    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(observeTarget)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach(observeTree))
    })
    mutationObserver.observe(root, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
      observed.forEach((target) => {
        target.removeAttribute('data-reveal-state')
        target.style.removeProperty('--reveal-delay')
      })
      observed.clear()
    }
  }, [routeKey])
}
