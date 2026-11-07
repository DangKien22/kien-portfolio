import { useState } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
import type { ProjectCategory } from '../types/project'

const filters: Array<ProjectCategory | 'all'> = ['all', 'ecommerce', 'management', 'enterprise', 'education']

export default function ProjectsPage() {
  const { t } = useTranslation()
  const [category, setCategory] = useState<(typeof filters)[number]>('all')
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const visibleProjects = projects.filter((project) => {
    const matchesCategory = category === 'all' || project.category === category
    const itemKey = `projects.items.${project.id}`
    const searchText = `${t(`${itemKey}.name`)} ${t(`${itemKey}.overview`)} ${project.technologies.join(' ')}`.toLowerCase()
    return matchesCategory && searchText.includes(normalizedQuery)
  })

  return (
    <section className="projects-page container">
      <div className="page-intro">
        <p className="eyebrow"><span className="eyebrow-dot" /> {t('projects.pageEyebrow')}</p>
        <h1>{t('projects.pageTitle')}<br /><span className="text-muted">{t('projects.pageTitleMuted')}</span></h1>
        <p>{t('projects.pageDescription')}</p>
      </div>
      <div className="project-toolbar">
        <div className="filter-list" role="group" aria-label={t('projects.filterByCategory')}>
          {filters.map((filter) => (
            <button
              className={`filter-button${category === filter ? ' is-active' : ''}`}
              key={filter}
              type="button"
              aria-pressed={category === filter}
              onClick={() => setCategory(filter)}
            >{t(`projects.categories.${filter}`)}</button>
          ))}
        </div>
        <label className="search-field">
          <Search size={17} />
          <span className="visually-hidden">{t('projects.searchLabel')}</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('projects.searchPlaceholder')} />
        </label>
      </div>
      {visibleProjects.length > 0 ? (
        <div className="project-grid all-projects">
          {visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
      ) : (
        <div className="empty-state" role="status">
          <Search size={23} />
          <h2>{t('projects.noMatches')}</h2>
          <p>{t('projects.tryDifferent')}</p>
          <button type="button" className="text-link" onClick={() => { setQuery(''); setCategory('all') }}>{t('projects.clearFilters')} <ArrowUpRight size={16} /></button>
        </div>
      )}
      <p className="results-count">{t('projects.resultsCount', { visible: visibleProjects.length, total: projects.length })}</p>
    </section>
  )
}
