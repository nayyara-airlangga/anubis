interface Project {
  name: string
  description: string
  repo: string
  siteUrl?: string
  techStack: (new () => React.Component<any, any>)[]
}

export type { Project }
