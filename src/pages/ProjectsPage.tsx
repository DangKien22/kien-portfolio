import { useMemo, useState } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

const filters = ['All', 'E-commerce', 'Management', 'Enterprise', 'Education'] as const

export default function ProjectsPage() {
  const [category, setCategory] = useState<(typeof filters)[number]>('All')
  const [query, setQuery] = useState('')
  const visibleProjects = useMemo(() => projects.filter((project) => {
    const matchesCategory = category === 'All' || project.category === category
    const searchText = `${project.name} ${project.description} ${project.technologies.join(' ')}`.toLowerCase()
    return matchesCategory && searchText.includes(query.trim().toLowerCase())
  }), [category, query])

  return (
    <section className="projects-page container">
      <div className="page-intro">
        <p className="eyebrow"><span className="eyebrow-dot" /> PROJECT EXPERIENCE</p>
        <h1>Project<br /><span className="text-muted">concepts.</span></h1>
        <p>A selection of fictional e-commerce, product, and learning concepts created to demonstrate frontend work.</p>
      </div>
      <div className="project-toolbar">
        <div className="filter-list" aria-label="Filter by category">
          {filters.map((filter) => (
            <button
              className={`filter-button${category === filter ? ' is-active' : ''}`}
              key={filter}
              type="button"
              aria-pressed={category === filter}
              onClick={() => setCategory(filter)}
            >{filter}</button>
          ))}
        </div>
        <label className="search-field">
          <Search size={17} />
          <span className="visually-hidden">Search projects</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects..." />
        </label>
      </div>
      {visibleProjects.length > 0 ? (
        <div className="project-grid all-projects">
          {visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
      ) : (
        <div className="empty-state" role="status">
          <Search size={23} />
          <h2>No matching projects found</h2>
          <p>Try a different search term or choose another category.</p>
          <button type="button" className="text-link" onClick={() => { setQuery(''); setCategory('All') }}>Clear filters <ArrowUpRight size={16} /></button>
        </div>
      )}
      <p className="results-count">{visibleProjects.length} / {projects.length} projects</p>
    </section>
  )
}
