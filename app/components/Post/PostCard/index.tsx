import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"

import { Body, Button, Heading } from "@components"
import { useAuth } from "@hooks"
import { Post } from "@models"

import DeleteIcon from "@icons/delete.svg"
import EditIcon from "@icons/edit.svg"

const PostCard = ({ post }: { post: Post }) => {
  const { title, createdAt, editedAt, headline, slug, author } = post

  const { reload, push } = useRouter()
  const { user } = useAuth()

  const deleteComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    try {
      const { data } = await axios.delete("/api/posts/" + post.slug + "/delete")

      if (data.status === "success") {
        reload()
      }
    } catch (error: any) {
      console.log(error.response.data.message)
      if (error.response.status === 401) {
        push("/auth")
      }
    }
  }

  const createdDate = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })

  const editedDate = new Date(editedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })

  return (
    <div className="w-full my-4 dark:bg-neutral-700 rounded-lg p-4 flex space-x-2 justify-between items-start break-words ">
      <div className="w-full">
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
          <Body variant="b4" className="mt-1 dark:text-neutral-400">
            (Edited at {editedDate})
          </Body>
        )}
        <Body variant="b4" className="break-words mt-4 dark:text-white">
          {headline}
        </Body>
      </div>
      {user && user.username === author?.username && (
        <div className="flex flex-col gap-6">
          <Button
            onClick={deleteComment}
            padding=""
            bgColor="bg-transparent"
            hoverBgColor="hover:bg-transparent"
            clickedBgColor="active:bg-transparent"
            className="group"
          >
            <DeleteIcon className="duration-500 dark:fill-red-500 dark:group-hover:fill-red-400 w-6 h-6 mt-2" />
          </Button>
          <Button
            href={"/posts/" + slug + "/update"}
            padding=""
            bgColor="bg-transparent"
            hoverBgColor="hover:bg-transparent"
            clickedBgColor="active:bg-transparent"
            className="group"
          >
            <EditIcon className="duration-500 dark:fill-neutral-500 dark:group-hover:fill-neutral-400 w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  )
}

export { PostCard }
