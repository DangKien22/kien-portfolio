import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../types/project'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const artContent = (
    <>
      <span className="art-index">0{index + 1} / SELECTED WORK</span>
      <span className="art-category">{project.category}</span>
      <div className="art-window" aria-hidden="true">
        <div className="window-top"><span /><span /><span /></div>
        <div className="window-body">
          <div className="window-lines"><i /><i /><i /><i /></div>
          <div className="window-graphic">{project.technologies[0]?.slice(0, 3).toUpperCase()}</div>
        </div>
      </div>
      <span className="art-mark" aria-hidden="true">{project.name.slice(0, 1)}</span>
    </>
  )

  return (
    <article className="project-card" data-reveal aria-labelledby={`project-${project.id}`}>
      {project.href ? (
        <a
          className={`project-art art-${project.accent}`}
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.name} project`}
        >
          {artContent}
        </a>
      ) : (
        <div
          className={`project-art art-${project.accent}`}
          role="img"
          aria-label={`Decorative fictional project preview for ${project.name}; no live project link is provided.`}
        >
          {artContent}
        </div>
      )}
      <div className="project-meta">
        <div>
          <p className="eyebrow">{project.category} <span>·</span> {project.period}</p>
          <h3 id={`project-${project.id}`}>{project.name}</h3>
          <p className="project-description">{project.description}</p>
          <dl className="project-case-study">
            <div>
              <dt>Problem</dt>
              <dd>{project.problem}</dd>
            </div>
            <div>
              <dt>Built</dt>
              <dd>{project.built}</dd>
            </div>
            <div>
              <dt>Outcome</dt>
              <dd>{project.outcome}</dd>
            </div>
          </dl>
          <div className="project-links" aria-label={`${project.name} links`}>
            {project.href ? (
              <a className="text-link" href={project.href} target="_blank" rel="noreferrer">View project <ArrowUpRight size={14} /></a>
            ) : (
              <span>Fictional concept · preview only</span>
            )}
          </div>
        </div>
      </div>
      <ul className="tag-list" aria-label="Technologies">
        {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
      </ul>
    </article>
  )
}
