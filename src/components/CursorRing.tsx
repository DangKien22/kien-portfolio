import { useEffect, useRef } from 'react'

export default function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!ring || !finePointer.matches || reducedMotion.matches) return

    let targetX = -100
    let targetY = -100
    let currentX = targetX
    let currentY = targetY
    let frame = 0

    const scheduleAnimation = () => {
      if (frame === 0) frame = window.requestAnimationFrame(animate)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return
      targetX = event.clientX
      targetY = event.clientY
      ring.style.opacity = '1'
      scheduleAnimation()
    }

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target
      ring.classList.toggle(
        'cursor-hover',
        target instanceof Element && Boolean(target.closest('a, button, [data-cursor]')),
      )
    }

    const onPointerLeave = () => {
      ring.style.opacity = '0'
    }

    const animate = () => {
      frame = 0
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      ring.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        scheduleAnimation()
      } else {
        currentX = targetX
        currentY = targetY
      }
    }

    document.documentElement.classList.add('custom-cursor')
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerover', onPointerOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerover', onPointerOver)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      window.cancelAnimationFrame(frame)
      ring.style.opacity = '0'
      ring.style.removeProperty('transform')
      ring.classList.remove('cursor-hover')
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [])

  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
}
