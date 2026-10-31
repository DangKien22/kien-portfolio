export type ProjectCategory = 'management' | 'ecommerce' | 'enterprise' | 'education'

export interface Project {
  id: string
  category: ProjectCategory
  period: string
  technologies: string[]
  accent: string
}
