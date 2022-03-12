import { Comment } from "../Comment"
import { User } from "../User"

interface Post {
  id: number
  title: string
  slug: string
  content: string
  published: boolean
  createdat: string
  editedAt: string
  publishedAt?: string
  authorId: number
  author?: User
  comments?: Comment[]
}

export type { Post }
