import { useState, type PointerEvent } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  GraduationCap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { capabilities, experience, profile } from '../data/profile'
import { projects } from '../data/projects'

export default function HomePage() {
  const [selectedCapability, setSelectedCapability] = useState(capabilities[0].id)
  const activeCapability = capabilities.find(({ id }) => id === selectedCapability) ?? capabilities[0]

  const moveHeroVisual = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty('--pointer-x', `${x * 24}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${y * 20}px`)
    event.currentTarget.style.setProperty('--pointer-rotate-x', `${y * -5}deg`)
    event.currentTarget.style.setProperty('--pointer-rotate-y', `${x * 6}deg`)
  }

  const resetHeroVisual = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.removeProperty('--pointer-x')
    event.currentTarget.style.removeProperty('--pointer-y')
    event.currentTarget.style.removeProperty('--pointer-rotate-x')
    event.currentTarget.style.removeProperty('--pointer-rotate-y')
  }

  return (
    <>
      <section className="hero container" id="home" aria-labelledby="hero-title">
        <div className="hero-copy" id="hero">
          <p className="availability"><span /> SOFTWARE &amp; FRONTEND DEVELOPMENT</p>
          <h1 id="hero-title">Trung<br /><span>Kiên.</span></h1>
          <p className="hero-role">Frontend Developer <span>·</span> React <span>·</span> TypeScript</p>
          <p className="hero-lead">{profile.summary}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">See selected work <ArrowRight size={17} /></a>
          </div>
          <a className="scroll-cue" href="#about"><ArrowDown size={15} /> MEET KIÊN</a>
        </div>
        <div
          className="hero-visual"
          onPointerMove={moveHeroVisual}
          onPointerLeave={resetHeroVisual}
          role="img"
          aria-label="Decorative portfolio visual for Trung Kiên; the interactive 3D scene is planned for a later stage."
        >
          <div className="hero-orbit" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-core">
            <span className="hero-monogram">TK</span>
          </div>
          <div className="hero-coordinates">REACT<br />TYPESCRIPT<br />PRODUCT UI</div>
          <span className="visual-caption">FRONTEND <span>·</span> DIGITAL EXPERIENCES</span>
          <div className="floating-chip chip-code"><Code2 size={16} /> reusable interfaces</div>
          <div className="floating-chip chip-design">3+ years building for the web</div>
          <span className="orbit-dot orbit-dot-one" />
          <span className="orbit-dot orbit-dot-two" />
        </div>
        <div className="hero-bottom">
          <span>REACT · TYPESCRIPT · ACCESSIBLE UI</span>
          <span>{profile.location.toUpperCase()}</span>
        </div>
      </section>

      <section className="section section-soft" id="about" aria-labelledby="about-title" data-reveal>
        <div className="container">
          <div className="about-grid">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" /> ABOUT <span>·</span> 02</p>
              <h2 id="about-title">
                <span className="split-line"><span>Thoughtful interfaces.</span></span>
                <span className="split-line"><span><span className="text-accent">Useful</span> experiences.</span></span>
              </h2>
            </div>
            <div className="about-copy">
              <p>{profile.about}</p>
              <p>{profile.summary}</p>
              <div className="education-card">
                <GraduationCap size={20} aria-hidden="true" />
                <div>
                  <p className="education-period">{profile.education.period}</p>
                  <h3>{profile.education.school}</h3>
                  <p>{profile.education.degree}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="skills-block">
            <div className="skills-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-dot" /> CAPABILITIES</p>
                <h3>How I work</h3>
              </div>
              <p>Sample capability areas and evidence for this fictional portfolio.</p>
            </div>
            <div className="capability-layout">
              <ul className="capability-list" aria-label="Capability areas">
                {capabilities.map((capability) => (
                  <li key={capability.id}>
                    <button
                      type="button"
                      aria-pressed={selectedCapability === capability.id}
                      aria-controls="capability-proof"
                      onClick={() => setSelectedCapability(capability.id)}
                    >
                      <span>
                        <strong>{capability.title}</strong>
                        <span className="capability-skills">{capability.skills.join(' · ')}</span>
                      </span>
                      <span className="capability-depth" aria-label={`Depth: ${capability.depth} of 3`}>
                        {Array.from({ length: 3 }, (_, index) => (
                          <span className={index < capability.depth ? 'is-filled' : ''} key={index} />
                        ))}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <aside className="capability-proof" id="capability-proof" aria-live="polite">
                <p className="eyebrow">SAMPLE PROOF <span>·</span> {activeCapability.title}</p>
                <h4>{activeCapability.proofTitle}</h4>
                <p>{activeCapability.proof}</p>
                <p className="capability-note">Depth indicates a fictional portfolio example, not a verified work claim.</p>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="section container" id="experience" aria-labelledby="experience-title" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" /> EXPERIENCE <span>·</span> 03</p>
            <h2 id="experience-title">
              <span className="split-line"><span>From interfaces</span></span>
              <span className="split-line"><span className="text-muted">to product experiences.</span></span>
            </h2>
          </div>
          <p className="section-intro">A fictional timeline representing more than three years of frontend experience.</p>
        </div>
        <ol className="experience-list">
          {experience.map((role, index) => (
            <li className="experience-item" key={`${role.company}-${role.period}`}>
              <span className="experience-number">{String(index + 1).padStart(2, '0')} /</span>
              <article>
                <div className="experience-heading">
                  <div>
                    <h3>{role.company}</h3>
                    <p className="experience-role">{role.role}</p>
                  </div>
                  <p className="experience-period">{role.period}</p>
                </div>
                <ul className="experience-highlights">
                  {role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <p className="experience-stack">{role.stack.join(' · ')}</p>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section-projects" id="work" aria-labelledby="projects-title" data-reveal>
        <div className="container">
          <div className="section-heading project-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" /> PROJECTS <span>·</span> 04</p>
              <h2 id="projects-title">
                <span className="split-line"><span>Public work,</span></span>
                <span className="split-line"><span className="text-muted">sample case studies.</span></span>
              </h2>
            </div>
            <Link className="text-link" to="/projects">Explore all projects <ArrowRight size={16} /></Link>
          </div>
          <div className="project-grid">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact" aria-labelledby="contact-title" data-reveal>
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> CONTACT <span>·</span> 05</p>
            <h2 id="contact-title">
              <span className="split-line"><span>Let&apos;s build</span></span>
              <span className="split-line"><span className="text-accent">what&apos;s next.</span></span>
            </h2>
            <p>This sample portfolio uses placeholder contact details. Replace them with verified details before publishing.</p>
          </div>
          <div className="contact-details">
            <a className="contact-detail" href={`mailto:${profile.email}`}>
              <span>Email</span><strong>{profile.email}</strong><ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
