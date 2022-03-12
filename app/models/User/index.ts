import { Comment } from "../Comment"
import { Post } from "../Post"

interface User {
  id: number
  createdAt: string
  email: string
  username: string
  name: string
  bio?: string
  password?: string
  posts?: Post[]
  comments?: Comment[]
}

export type { User }
