import { useState, type PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
          <p className="availability"><span /> {t('hero.availability')}</p>
          <h1 id="hero-title">
            {t('hero.nameFirst')}<br /><span>{t('hero.nameLast')}</span>
          </h1>
          <p className="hero-role">{t('hero.role')} <span>·</span> {t('hero.stackFirst')} <span>·</span> {t('hero.stackSecond')}</p>
          <p className="hero-lead">{t('hero.summary')}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">{t('hero.selectedWork')} <ArrowRight size={17} /></a>
          </div>
          <a className="scroll-cue" href="#about"><ArrowDown size={15} /> {t('hero.meet')}</a>
        </div>
        <div
          className="hero-visual"
          onPointerMove={moveHeroVisual}
          onPointerLeave={resetHeroVisual}
          role="img"
          aria-label={t('hero.visualLabel')}
        >
          <div className="hero-orbit" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-core">
            <span className="hero-monogram">TK</span>
          </div>
          <div className="hero-coordinates">{t('hero.coordinates').split('\n').map((line) => <span key={line}>{line}<br /></span>)}</div>
          <span className="visual-caption">{t('hero.visualCaption')}</span>
          <div className="floating-chip chip-code"><Code2 size={16} /> {t('hero.reusableInterfaces')}</div>
          <div className="floating-chip chip-design">{t('hero.yearsBuilding')}</div>
          <span className="orbit-dot orbit-dot-one" />
          <span className="orbit-dot orbit-dot-two" />
        </div>
        <div className="hero-bottom">
          <span>{t('hero.bottomSkills')}</span>
          <span>{t('hero.location').toUpperCase()}</span>
        </div>
      </section>

      <section className="section section-soft" id="about" aria-labelledby="about-title" data-reveal>
        <div className="container">
          <div className="about-grid">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" /> {t('about.eyebrow')} <span>·</span> 02</p>
              <h2 id="about-title">
                <span className="split-line"><span>{t('about.titleThoughtful')}</span></span>
                <span className="split-line"><span><span className="text-accent">{t('about.titleUseful')}</span> {t('about.titleExperiences')}</span></span>
              </h2>
            </div>
            <div className="about-copy">
              <p>{t('about.description')}</p>
              <p>{t('hero.summary')}</p>
              <div className="education-card">
                <GraduationCap size={20} aria-hidden="true" />
                <div>
                  <p className="education-period">{t('about.educationPeriod')}</p>
                  <h3>{t('about.school')}</h3>
                  <p>{t('about.degree')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="skills-block">
            <div className="skills-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-dot" /> {t('skills.eyebrow')}</p>
                <h3>{t('skills.howIWork')}</h3>
              </div>
              <p>{t('skills.description')}</p>
            </div>
            <div className="capability-layout">
              <ul className="capability-list" aria-label={t('skills.areas')}>
                {capabilities.map((capability) => (
                  <li key={capability.id}>
                    <button
                      type="button"
                      aria-pressed={selectedCapability === capability.id}
                      aria-controls="capability-proof"
                      onClick={() => setSelectedCapability(capability.id)}
                    >
                      <span>
                        <strong>{t(`skills.items.${capability.id}.title`)}</strong>
                        <span className="capability-skills">
                          {Array.from({ length: capability.skillCount }, (_, index) => t(`skills.items.${capability.id}.skills.${index}`)).join(' · ')}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <aside className="capability-proof" id="capability-proof" aria-live="polite">
                <p className="eyebrow">{t('skills.sampleProof')} <span>·</span> {t(`skills.items.${activeCapability.id}.title`)}</p>
                <h4>{t(`skills.items.${activeCapability.id}.proofTitle`)}</h4>
                <p>{t(`skills.items.${activeCapability.id}.proof`)}</p>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="section container" id="experience" aria-labelledby="experience-title" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" /> {t('experience.eyebrow')} <span>·</span> 03</p>
            <h2 id="experience-title">
              <span className="split-line"><span>{t('experience.titleFrom')}</span></span>
              <span className="split-line"><span className="text-muted">{t('experience.titleTo')}</span></span>
            </h2>
          </div>
          <p className="section-intro">{t('experience.description')}</p>
        </div>
        <ol className="experience-list">
          {experience.map((role, index) => (
            <li className="experience-item" key={role.id}>
              <span className="experience-number">{String(index + 1).padStart(2, '0')} /</span>
              <article>
                <div className="experience-heading">
                  <div>
                    <h3>{t(`experience.roles.${role.id}.company`)}</h3>
                    <p className="experience-role">{t(`experience.roles.${role.id}.role`)}</p>
                  </div>
                  <p className="experience-period">{t(`experience.roles.${role.id}.period`)}</p>
                </div>
                <ul className="experience-highlights">
                  {Array.from({ length: role.highlightCount }, (_, highlightIndex) => (
                    <li key={highlightIndex}>{t(`experience.roles.${role.id}.highlights.${highlightIndex}`)}</li>
                  ))}
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
              <p className="eyebrow"><span className="eyebrow-dot" /> {t('projects.homeEyebrow')} <span>·</span> 04</p>
              <h2 id="projects-title">
                <span className="split-line"><span>{t('projects.homeTitlePublic')}</span></span>
                <span className="split-line"><span className="text-muted">{t('projects.homeTitleSample')}</span></span>
              </h2>
            </div>
            <Link className="text-link" to="/projects">{t('projects.exploreAll')} <ArrowRight size={16} /></Link>
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
            <p className="eyebrow"><span className="eyebrow-dot" /> {t('contact.eyebrow')} <span>·</span> 05</p>
            <h2 id="contact-title">
              <span className="split-line"><span>{t('contact.titleStart')}</span></span>
              <span className="split-line"><span className="text-accent">{t('contact.titleEnd')}</span></span>
            </h2>
            <p>{t('contact.description')}</p>
          </div>
          <div className="contact-details">
            <a className="contact-detail" href={`mailto:${profile.email}`}>
              <span>{t('contact.email')}</span><strong>{profile.email}</strong><ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
