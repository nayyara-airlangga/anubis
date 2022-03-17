import Link from "next/link"

import { Body, Heading } from "@components"

interface PostCardProps {
  title: string
  createdAt: string
  editedAt: string
  headline: string
  slug: string
}

const PostCard = ({
  title,
  createdAt,
  editedAt,
  headline,
  slug,
}: PostCardProps) => {
  const createdDate = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  const editedDate = new Date(editedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  return (
    <div className="w-full my-4 dark:bg-neutral-700 rounded-lg p-4">
      <Link href={`/posts/${slug}`}>
        <a>
          <Heading
            variant="h3"
            size="tablet:text-[32px] text-[28px]"
            weight="bold"
            className="duration-300 dark:text-blue-400 dark:hover:text-blue-500"
          >
            {title}
          </Heading>
        </a>
      </Link>
      <Body variant="b3" className="mt-2 dark:text-white">
        {createdDate}
      </Body>
      {editedAt !== createdAt && (
        <Body variant="b4" className="mt-1 dark:text-white">
          <i>Edited at {editedDate}</i>
        </Body>
      )}
      <Body variant="b4" className="break-words mt-4 dark:text-white">
        {headline}
      </Body>
    </div>
  )
}

export { PostCard }
