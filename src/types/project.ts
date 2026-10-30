export type ProjectCategory = 'Management' | 'E-commerce' | 'Enterprise' | 'Education'

export interface Project {
  id: string
  name: string
  description: string
  category: ProjectCategory
  period: string
  problem: string
  built: string
  outcome: string
  technologies: string[]
  accent: string
  href?: string
}
