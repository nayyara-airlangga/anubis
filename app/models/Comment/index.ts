import { Post } from "../Post"
import { User } from "../User"

interface Comment {
  id: number
  comment: string
  createdAt: string
  editedAt: string
  postId: number
  post: Post
  authorId: number
  author: User
  parentId?: number
  parent?: Comment
  replies: Comment
}

export type { Comment }
