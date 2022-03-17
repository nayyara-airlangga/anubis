import Markdown from "markdown-to-jsx"

import { Body, Heading } from "@components"
import { Post } from "@models"

const PostDetails = ({ post }: { post: Post }) => {
  const createdDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  const editedDate = new Date(post.editedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  return (
    <div>
      <Heading
        variant="h1"
        size="tablet:text-[48px] text-[36px]"
        weight="bold"
        className="dark:text-white"
      >
        {post.title}
      </Heading>
      <Body
        variant="b2"
        size="text-[16px] tablet:text-[20px]"
        className="mt-2 dark:text-white"
      >
        {createdDate}
      </Body>
      {editedDate !== createdDate && (
        <Body
          variant="b3"
          size="text-[14px] tablet:text-[16px]"
          className="mt-1 dark:text-white"
        >
          <i>Edited at {editedDate}</i>
        </Body>
      )}
      <Body
        variant="b4"
        size="tablet:text-[16px] text-[14px]"
        className="mb-12 break-words mt-4 dark:text-white"
      >
        {post.headline}
      </Body>
      <Markdown className="max-w-full w-full prose dark:prose-invert prose-a:text-blue-400 prose-code:text-[14px] break-words overflow-x-auto">
        {post.content}
      </Markdown>
    </div>
  )
}

export { PostDetails }
