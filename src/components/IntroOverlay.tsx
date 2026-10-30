import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
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
  const [visible, setVisible] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [caught, setCaught] = useState<number[]>([])
  const [aim, setAim] = useState<Aim>({ x: 0.5, y: 0.5 })
  const [sceneMode, setSceneMode] = useState<SceneMode>('idle')
  const [sceneEnabled, setSceneEnabled] = useState(false)
  const [status, setStatus] = useState('Move the catcher over a packet, then click or press Space.')
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
      setStatus('No packet in range. Move closer to a 64 KB marker and try again.')
      return
    }

    const nextCaught = [...caughtRef.current, available.index]
    caughtRef.current = nextCaught
    setCaught(nextCaught)
    setStatus(
      nextCaught.length === packets.length
        ? 'All four demo packets caught. Continue to the portfolio whenever you are ready.'
        : `Packet caught. ${nextCaught.length} of ${packets.length} demo packets collected.`,
    )
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
    <aside className="intro-overlay" aria-label="Optional portfolio introduction">
      <section className="intro-panel" aria-labelledby="intro-title">
        <p className="intro-kicker">Optional interaction · Trung Kiên portfolio</p>
        <h2 id="intro-title">Catch the packets.</h2>
        <p className="intro-description">
          Catch four fictional 64 KB packets. This is a visual demo; it does not represent network traffic or site loading.
        </p>

        <div
          ref={playfieldRef}
          className="packet-playfield"
          style={aimStyle}
          role="group"
          aria-label="Packet-catching game"
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
                {caught.includes(index) ? 'CAUGHT' : '64 KB'}
              </span>
            )
          })}
          <span className="packet-catcher" aria-hidden="true" />
        </div>

        <p className="intro-hint" id="packet-instructions">
          Move the ring with your mouse or arrows. Click, tap, drag-release, or press Space/Enter near a packet.
        </p>
        <div className="intro-progress">
          <div className="intro-progress-label" id="packet-progress-label">
            <span>Packets caught</span>
            <span>{caught.length} / {packets.length}</span>
          </div>
          <div
            className="intro-progress-track"
            role="progressbar"
            aria-label="Demo packets caught"
            aria-valuemin={0}
            aria-valuemax={packets.length}
            aria-valuenow={caught.length}
          >
            <div className="intro-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <p className="intro-scene-status" aria-label="3D scene status">
          {sceneMode === 'idle'
            ? 'Lightweight 2D preview · interact to load the optional 3D scene'
            : sceneMode === 'initializing'
              ? 'Preparing optional 3D scene…'
              : sceneMode === 'webgl'
                ? 'Three.js scene ready'
                : '2D scene fallback · WebGL unavailable'}
        </p>
        <p className="intro-live-status" role="status" aria-live="polite">{status}</p>
        <div className="intro-controls">
          <button className="intro-skip" type="button" onClick={dismiss}>Skip intro</button>
          {caught.length === packets.length && (
            <button className="intro-continue" type="button" onClick={dismiss}>Continue to portfolio</button>
          )}
        </div>
      </section>
    </aside>
  )
}
