import { useTranslation } from 'react-i18next'
import type { Project } from '../types/project'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { t } = useTranslation()
  const itemKey = `projects.items.${project.id}`
  const name = t(`${itemKey}.name`)
  const artContent = (
    <>
      <span className="art-index">0{index + 1} / {t('projects.selectedWork')}</span>
      <span className="art-category">{t(`projects.categories.${project.category}`)}</span>
      <div className="art-window" aria-hidden="true">
        <div className="window-top"><span /><span /><span /></div>
        <div className="window-body">
          <div className="window-lines"><i /><i /><i /><i /></div>
          <div className="window-graphic">{project.technologies[0]?.slice(0, 3).toUpperCase()}</div>
        </div>
      </div>
      <span className="art-mark" aria-hidden="true">{name.slice(0, 1)}</span>
    </>
  )

  return (
    <article className="project-card" data-reveal aria-labelledby={`project-${project.id}`}>
      <div
        className={`project-art art-${project.accent}`}
        role="img"
        aria-label={t('projects.projectPreviewAria', { name })}
      >
        {artContent}
      </div>
      <div className="project-meta">
        <div>
          <p className="eyebrow">{t(`projects.categories.${project.category}`)} <span>·</span> {project.period}</p>
          <h3 id={`project-${project.id}`}>{name}</h3>
          <p className="project-description">{t(`${itemKey}.overview`)}</p>
          <dl className="project-case-study">
            <div>
              <dt>{t('projects.client')}</dt>
              <dd>{t(`${itemKey}.client`)}</dd>
            </div>
            <div>
              <dt>{t('projects.domain')}</dt>
              <dd>{t(`${itemKey}.domain`)}</dd>
            </div>
            <div>
              <dt>{t('projects.role')}</dt>
              <dd>{t(`${itemKey}.role`)}</dd>
            </div>
            <div>
              <dt>{t('projects.teamSize')}</dt>
              <dd>{t(`${itemKey}.teamSize`)}</dd>
            </div>
            <div>
              <dt>{t('projects.responsibilities')}</dt>
              <dd>{t(`${itemKey}.responsibilities`)}</dd>
            </div>
          </dl>
        </div>
      </div>
      <ul className="tag-list" aria-label={t('projects.technologies')}>
        {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
      </ul>
    </article>
  )
}
