import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { profile } from '../data/profile'
import { useScrollReveal } from '../hooks/useScrollReveal'
import CursorRing from './CursorRing'
import IntroOverlay from './IntroOverlay'

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState(pathname === '/' ? 'home' : '')
  const progressRef = useRef<HTMLDivElement>(null)

  useScrollReveal(pathname)

  useEffect(() => {
    if (pathname !== '/') return

    let frame = 0
    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const anchor = window.innerHeight * 0.42
        const sections = Array.from(document.querySelectorAll<HTMLElement>('#home, #about, #experience, #work, #contact'))
        const active = sections.find((section) => {
          const bounds = section.getBoundingClientRect()
          return bounds.top <= anchor && bounds.bottom > anchor
        }) ?? sections.reduce<HTMLElement | undefined>((nearest, section) => {
          if (!nearest) return section
          const top = section.getBoundingClientRect().top
          const nearestTop = nearest.getBoundingClientRect().top
          return Math.abs(top - anchor) < Math.abs(nearestTop - anchor) ? section : nearest
        }, undefined)

        if (active) setActiveSection((current) => current === active.id ? current : active.id)
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      window.cancelAnimationFrame(frame)
    }
  }, [pathname])

  useEffect(() => {
    if (pathname !== '/' || !hash) return

    let firstFrame = 0
    let secondFrame = 0
    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
    }
  }, [pathname, hash])

  useEffect(() => {
    let frame = 0
    const updateProgress = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
        progressRef.current?.style.setProperty('--scroll-progress', String(progress))
      })
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      window.cancelAnimationFrame(frame)
    }
  }, [pathname])

  const closeMenu = () => setMenuOpen(false)
  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    closeMenu()
    const nextHash = `#${id}`

    if (pathname !== '/' || hash !== nextHash) {
      navigate({ pathname: '/', hash: nextHash })
      return
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const current = (section: string) => pathname === '/' && activeSection === section ? 'location' : undefined
  const sectionLinks = [
    { id: 'home', label: '01 · Index' },
    { id: 'about', label: '02 · About' },
    { id: 'experience', label: '03 · Experience' },
    { id: 'work', label: '04 · Projects' },
    { id: 'contact', label: '05 · Contact' },
  ]

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <IntroOverlay />
      <div ref={progressRef} className="progress-hairline" aria-hidden="true" />
      {pathname === '/' && (
        <nav className="chapter-rail" aria-label="Page sections">
          {sectionLinks.map(({ id, label }) => (
            <a
              className={`chapter-item${activeSection === id ? ' chapter-active' : ''}`}
              href={`/#${id}`}
              key={id}
              aria-current={activeSection === id ? 'location' : undefined}
              onClick={(event) => navigateToSection(event, id)}
            >
              <span className="chapter-label">{label}</span>
              <span className="chapter-dot" aria-hidden="true" />
            </a>
          ))}
        </nav>
      )}
      <header className="site-header">
        <div className="container header-inner">
          <div className="header-topline">
            <Link className="wordmark" to="/#main" aria-label={`${profile.displayName} — home`} onClick={closeMenu}>
              {profile.displayName} <span>·</span>
            </Link>
            <span className="header-location">{profile.location}</span>
          </div>
          <div className="header-bottomline">
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            <a href="/#home" aria-current={current('home')} onClick={(event) => navigateToSection(event, 'home')}>Index</a>
            <a href="/#about" aria-current={current('about')} onClick={(event) => navigateToSection(event, 'about')}>About</a>
            <a href="/#experience" aria-current={current('experience')} onClick={(event) => navigateToSection(event, 'experience')}>Experience</a>
            <a href="/#work" aria-current={current('work')} onClick={(event) => navigateToSection(event, 'work')}>Projects</a>
            <a href="/#contact" aria-current={current('contact')} onClick={(event) => navigateToSection(event, 'contact')}>Contact</a>
          </nav>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <Link className="wordmark" to="/#main" aria-label={`${profile.displayName} — home`}>{profile.displayName} <span>·</span></Link>
          <p>{profile.title} · {profile.location}</p>
          <a className="footer-top" href="#main">Back to top <ArrowUpRight size={13} /></a>
          <span>© {new Date().getFullYear()} {profile.displayName}</span>
        </div>
      </footer>
      <CursorRing />
    </>
  )
}
