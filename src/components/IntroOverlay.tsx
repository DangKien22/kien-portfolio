import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import ThreePacketScene from './ThreePacketScene'

const packets = [
  { x: 0.2, y: 0.29 },
  { x: 0.78, y: 0.29 },
  { x: 0.25, y: 0.72 },
  { x: 0.75, y: 0.72 },
]

type SceneMode = 'idle' | 'initializing' | 'webgl' | 'fallback'

interface Aim {
  x: number
  y: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function IntroOverlay({ duration = 18000 }: { duration?: number }) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [caught, setCaught] = useState<number[]>([])
  const [aim, setAim] = useState<Aim>({ x: 0.5, y: 0.5 })
  const [sceneMode, setSceneMode] = useState<SceneMode>('idle')
  const [sceneEnabled, setSceneEnabled] = useState(false)
  const [status, setStatus] = useState<{ key: string; caught?: number }>({ key: 'intro.statusMove' })
  const playfieldRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const caughtRef = useRef<number[]>([])
  const sceneStarted = useRef(false)
  const wasVisible = useRef(visible)

  useEffect(() => {
    if (wasVisible.current && !visible) document.getElementById('main')?.focus()
    wasVisible.current = visible
  }, [visible])

  useEffect(() => {
    if (!visible) return

    const closeTimer = window.setTimeout(() => setVisible(false), duration)
    const skipOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setVisible(false)
      }
    }

    window.addEventListener('keydown', skipOnEscape)
    return () => {
      window.clearTimeout(closeTimer)
      window.removeEventListener('keydown', skipOnEscape)
    }
  }, [duration, visible])

  const getAimFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return null
    return {
      x: clamp((event.clientX - bounds.left) / bounds.width, 0, 1),
      y: clamp((event.clientY - bounds.top) / bounds.height, 0, 1),
    }
  }

  const updateAimFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const nextAim = getAimFromPointer(event)
    if (nextAim) setAim(nextAim)
  }

  const activateScene = () => {
    if (sceneStarted.current) return
    sceneStarted.current = true
    setSceneMode('initializing')
    setSceneEnabled(true)
  }

  const attemptCatch = (position = aim) => {
    const bounds = playfieldRef.current?.getBoundingClientRect()
    if (!bounds) return

    const available = packets
      .map((packet, index) => ({
        index,
        distance: Math.hypot((packet.x - position.x) * bounds.width, (packet.y - position.y) * bounds.height),
      }))
      .filter(({ index }) => !caughtRef.current.includes(index))
      .sort((a, b) => a.distance - b.distance)[0]

    const catchRadius = Math.min(66, Math.max(50, bounds.width * 0.09))
    if (!available || available.distance > catchRadius) {
      setStatus({ key: 'intro.statusOutOfRange' })
      return
    }

    const nextCaught = [...caughtRef.current, available.index]
    caughtRef.current = nextCaught
    setCaught(nextCaught)
    setStatus(nextCaught.length === packets.length
      ? { key: 'intro.statusAllCaught' }
      : { key: 'intro.statusCaught', caught: nextCaught.length })
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    activateScene()
    dragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    updateAimFromPointer(event)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' && !dragging.current) return
    activateScene()
    updateAimFromPointer(event)
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const nextAim = getAimFromPointer(event)
    if (nextAim) setAim(nextAim)
    dragging.current = false
    attemptCatch(nextAim ?? aim)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    activateScene()
    const bounds = playfieldRef.current?.getBoundingClientRect()
    if (!bounds) return

    const stepX = 36 / bounds.width
    const stepY = 36 / bounds.height
    const movement: Record<string, Aim> = {
      ArrowLeft: { x: -stepX, y: 0 },
      ArrowRight: { x: stepX, y: 0 },
      ArrowUp: { x: 0, y: -stepY },
      ArrowDown: { x: 0, y: stepY },
    }
    const move = movement[event.key]

    if (move) {
      event.preventDefault()
      setAim((current) => ({ x: clamp(current.x + move.x, 0.04, 0.96), y: clamp(current.y + move.y, 0.08, 0.92) }))
    } else if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      attemptCatch()
    }
  }

  if (!visible) return null

  const progress = Math.round((caught.length / packets.length) * 100)
  const aimStyle = { '--aim-x': `${aim.x * 100}%`, '--aim-y': `${aim.y * 100}%` } as CSSProperties
  const dismiss = () => setVisible(false)

  return (
    <aside className="intro-overlay" aria-label={t('intro.ariaLabel')}>
      <section className="intro-panel" aria-labelledby="intro-title">
        <p className="intro-kicker">{t('intro.kicker')}</p>
        <h2 id="intro-title">{t('intro.title')}</h2>
        <p className="intro-description">
          {t('intro.description')}
        </p>

        <div
          ref={playfieldRef}
          className="packet-playfield"
          style={aimStyle}
          role="group"
          aria-label={t('intro.gameLabel')}
          aria-describedby="packet-instructions packet-progress-label"
          aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Space Enter"
          tabIndex={0}
          onFocus={activateScene}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { dragging.current = false }}
        >
          <ThreePacketScene
            enabled={sceneEnabled}
            aim={aim}
            packets={packets}
            caught={caught}
            onModeChange={(mode) => setSceneMode(mode)}
          />
          {packets.map((packet, index) => {
            const markerStyle = { left: `${packet.x * 100}%`, top: `${packet.y * 100}%` }
            return (
              <span
                className={`packet-marker${caught.includes(index) ? ' is-caught' : ''}`}
                style={markerStyle}
                key={index}
                aria-hidden="true"
              >
                {caught.includes(index) ? t('intro.caughtMarker') : '64 KB'}
              </span>
            )
          })}
          <span className="packet-catcher" aria-hidden="true" />
        </div>

        <p className="intro-hint" id="packet-instructions">
          {t('intro.hint')}
        </p>
        <div className="intro-progress">
          <div className="intro-progress-label" id="packet-progress-label">
            <span>{t('intro.packetsCaught')}</span>
            <span>{caught.length} / {packets.length}</span>
          </div>
          <div
            className="intro-progress-track"
            role="progressbar"
            aria-label={t('intro.progressLabel')}
            aria-valuemin={0}
            aria-valuemax={packets.length}
            aria-valuenow={caught.length}
          >
            <div className="intro-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <p className="intro-scene-status" aria-label={t('intro.sceneStatusLabel')}>
          {sceneMode === 'idle'
            ? t('intro.sceneIdle')
            : sceneMode === 'initializing'
              ? t('intro.sceneInitializing')
              : sceneMode === 'webgl'
                ? t('intro.sceneReady')
                : t('intro.sceneFallback')}
        </p>
        <p className="intro-live-status" role="status" aria-live="polite">
          {t(status.key, { caught: status.caught, total: packets.length })}
        </p>
        <div className="intro-controls">
          <button className="intro-skip" type="button" onClick={dismiss}>{t('intro.skip')}</button>
          {caught.length === packets.length && (
            <button className="intro-continue" type="button" onClick={dismiss}>{t('intro.continue')}</button>
          )}
        </div>
      </section>
    </aside>
  )
}
