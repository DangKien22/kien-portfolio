import { useEffect, useRef } from 'react'
import type * as THREE from 'three'

export interface PacketScenePoint {
  x: number
  y: number
}

interface ThreePacketSceneProps {
  enabled: boolean
  aim: PacketScenePoint
  packets: PacketScenePoint[]
  caught: number[]
  onModeChange: (mode: 'webgl' | 'fallback') => void
}

interface SceneState {
  aim: PacketScenePoint
  packets: PacketScenePoint[]
  caught: number[]
}

export default function ThreePacketScene({ enabled, aim, packets, caught, onModeChange }: ThreePacketSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<SceneState>({ aim, packets, caught })
  const modeCallbackRef = useRef(onModeChange)

  useEffect(() => {
    stateRef.current = { aim, packets, caught }
    modeCallbackRef.current = onModeChange
  })

  useEffect(() => {
    let disposed = false
    let frame = 0
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let renderer: THREE.WebGLRenderer | undefined
    let scene: THREE.Scene | undefined
    let camera: THREE.OrthographicCamera | undefined
    let aimRing: THREE.Mesh | undefined
    let packetMeshes: THREE.Group[] = []
    let geometries: THREE.BufferGeometry[] = []
    let materials: THREE.Material[] = []
    let cleanupListeners = () => {}

    const host = hostRef.current
    if (!host) return
    if (!enabled) {
      host.classList.add('is-fallback')
      return () => host.classList.remove('is-fallback')
    }

    const disposeSceneResources = () => {
      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())
      geometries = []
      materials = []
      packetMeshes = []
      aimRing = undefined
      scene = undefined
      camera = undefined
    }

    const showFallback = () => {
      if (disposed) return
      window.cancelAnimationFrame(frame)
      cleanupListeners()
      cleanupListeners = () => {}
      renderer?.dispose()
      renderer?.domElement.remove()
      renderer = undefined
      disposeSceneResources()
      host.classList.add('is-fallback')
      modeCallbackRef.current('fallback')
    }

    const startScene = async () => {
      let THREEJS: typeof import('three')
      try {
        THREEJS = await import('three')
      } catch (error) {
        console.error('Unable to load Three.js for the intro; using the 2D fallback.', error)
        showFallback()
        return
      }
      if (disposed) return

      try {
        scene = new THREEJS.Scene()
        scene.background = null
        camera = new THREEJS.OrthographicCamera(-1, 1, 1, -1, 0.1, 40)
        camera.position.z = 8
        scene.add(new THREEJS.AmbientLight(0xbdeee7, 1.8))

        const keyLight = new THREEJS.DirectionalLight(0x71ffe4, 3.2)
        keyLight.position.set(-2.5, 3.5, 5)
        scene.add(keyLight)

        const orbitGeometry = new THREEJS.TorusGeometry(0.7, 0.006, 6, 96)
        const orbitMaterial = new THREEJS.MeshBasicMaterial({ color: 0x2fd9bc, transparent: true, opacity: 0.2 })
        geometries.push(orbitGeometry)
        materials.push(orbitMaterial)
        const orbit = new THREEJS.Mesh(orbitGeometry, orbitMaterial)
        orbit.rotation.set(0.35, -0.3, 0.15)
        scene.add(orbit)

        const innerOrbitGeometry = new THREEJS.TorusGeometry(0.46, 0.004, 6, 72)
        const innerOrbitMaterial = new THREEJS.MeshBasicMaterial({ color: 0x93f6e3, transparent: true, opacity: 0.15 })
        geometries.push(innerOrbitGeometry)
        materials.push(innerOrbitMaterial)
        const innerOrbit = new THREEJS.Mesh(innerOrbitGeometry, innerOrbitMaterial)
        innerOrbit.rotation.set(-0.45, 0.2, -0.4)
        scene.add(innerOrbit)

        const packetGeometry = new THREEJS.BoxGeometry(0.18, 0.18, 0.12)
        const packetMaterial = new THREEJS.MeshStandardMaterial({
          color: 0x2fd9bc,
          emissive: 0x0b594b,
          emissiveIntensity: 1.1,
          metalness: 0.42,
          roughness: 0.32,
        })
        const edgeGeometry = new THREEJS.EdgesGeometry(packetGeometry)
        const edgeMaterial = new THREEJS.LineBasicMaterial({ color: 0xc3fff3, transparent: true, opacity: 0.82 })
        geometries.push(packetGeometry, edgeGeometry)
        materials.push(packetMaterial, edgeMaterial)

        stateRef.current.packets.forEach(() => {
          const group = new THREEJS.Group()
          const cube = new THREEJS.Mesh(packetGeometry, packetMaterial)
          const edges = new THREEJS.LineSegments(edgeGeometry, edgeMaterial)
          group.add(cube, edges)
          scene?.add(group)
          packetMeshes.push(group)
        })

        const catcherGeometry = new THREEJS.TorusGeometry(0.25, 0.012, 8, 48)
        const catcherMaterial = new THREEJS.MeshBasicMaterial({ color: 0x9dffe9, transparent: true, opacity: 0.94 })
        geometries.push(catcherGeometry)
        materials.push(catcherMaterial)
        aimRing = new THREEJS.Mesh(catcherGeometry, catcherMaterial)
        scene.add(aimRing)

        const element = document.createElement('canvas')
        renderer = new THREEJS.WebGLRenderer({ canvas: element, alpha: true, antialias: true, powerPreference: 'low-power' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
        renderer.setClearColor(0x0a0e14, 0)
        renderer.outputColorSpace = THREEJS.SRGBColorSpace
        host.prepend(renderer.domElement)
        host.classList.remove('is-fallback')

        const resize = () => {
          if (!renderer || !camera) return
          const width = Math.max(1, host.clientWidth)
          const height = Math.max(1, host.clientHeight)
          const aspect = width / height
          camera.left = -aspect
          camera.right = aspect
          camera.top = 1
          camera.bottom = -1
          camera.updateProjectionMatrix()
          renderer.setSize(width, height, false)
        }

        const setWorldPosition = (object: THREE.Object3D, point: PacketScenePoint) => {
          if (!host.clientWidth) return
          const aspect = host.clientWidth / Math.max(1, host.clientHeight)
          object.position.set((point.x * 2 - 1) * aspect, 1 - point.y * 2, 0.5)
        }

        const render = (time: number) => {
          if (disposed || !renderer || !scene || !camera) return
          const current = stateRef.current
          const caughtSet = new Set(current.caught)
          current.packets.forEach((point, index) => {
            const mesh = packetMeshes[index]
            if (!mesh) return
            mesh.visible = !caughtSet.has(index)
            setWorldPosition(mesh, point)
            if (!reducedMotion.matches) {
              mesh.rotation.x = 0.35 + Math.sin(time * 0.0012 + index) * 0.17
              mesh.rotation.y = time * 0.00055 + index * 0.7
              mesh.position.y += Math.sin(time * 0.0015 + index * 2) * 0.035
            }
          })
          if (aimRing) {
            setWorldPosition(aimRing, current.aim)
            if (!reducedMotion.matches) {
              aimRing.rotation.z = time * 0.00022
              const pulse = 1 + Math.sin(time * 0.004) * 0.05
              aimRing.scale.setScalar(pulse)
            }
          }
          renderer.render(scene, camera)
          if (!reducedMotion.matches && !document.hidden) {
            frame = window.requestAnimationFrame(render)
          }
        }

        const handleContextLost = (event: Event) => {
          event.preventDefault()
          showFallback()
        }

        renderer.domElement.addEventListener('webglcontextlost', handleContextLost)
        window.addEventListener('resize', resize, { passive: true })
        document.addEventListener('visibilitychange', resize)

        const stopOnHidden = () => {
          window.cancelAnimationFrame(frame)
          if (!document.hidden && !disposed) render(performance.now())
        }
        document.addEventListener('visibilitychange', stopOnHidden)

        cleanupListeners = () => {
          renderer?.domElement.removeEventListener('webglcontextlost', handleContextLost)
          window.removeEventListener('resize', resize)
          document.removeEventListener('visibilitychange', resize)
          document.removeEventListener('visibilitychange', stopOnHidden)
        }

        resize()
        render(performance.now())
        modeCallbackRef.current('webgl')
      } catch (error) {
        console.error('Unable to initialize the WebGL intro scene; using the 2D fallback.', error)
        showFallback()
      }
    }

    void startScene()

    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      cleanupListeners()
      renderer?.dispose()
      renderer?.domElement.remove()
      disposeSceneResources()
      host.classList.remove('is-fallback')
    }
  }, [enabled])

  return (
    <div ref={hostRef} className="packet-scene" aria-hidden="true">
      <div className="packet-scene-fallback">
        <span className="packet-fallback-orbit" />
        <span className="packet-fallback-orbit packet-fallback-orbit-inner" />
        {packets.map((point, index) => (
          <span
            className={`packet-fallback-cube${caught.includes(index) ? ' is-caught' : ''}`}
            style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
            key={index}
          />
        ))}
        <span className="packet-fallback-catcher" style={{ left: `${aim.x * 100}%`, top: `${aim.y * 100}%` }} />
      </div>
    </div>
  )
}