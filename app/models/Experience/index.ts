interface Experience {
  organization: string
  position: string
  duration: string
  description: string
  techStack: (new () => React.Component<any, any>)[]
  pointers: string[]
}

export type { Experience }
