import axios from "axios"
import Markdown from "markdown-to-jsx"
import { useRouter } from "next/router"
import { useState } from "react"

import { ReplyForm } from "../ReplyForm"
import { Body, Button } from "@components"
import { useAuth } from "@hooks"
import { Comment as CommentModel, Post } from "@models"

import DeleteIcon from "@icons/delete.svg"
import EditIcon from "@icons/edit.svg"
import { EditCommentForm } from "../EditCommentForm"

const Comment = ({ comment, post }: { comment: CommentModel; post: Post }) => {
  const {
    id,
    author: { name, username },
    comment: text,
    createdAt,
    editedAt,
  } = comment

  const { reload, push } = useRouter()

  const { user } = useAuth()

  const [editComment, setEditComment] = useState(false)

  const deleteComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    try {
      const { data } = await axios.delete(
        "/api/posts/" + post.slug + "/comments/" + id + "/delete"
      )

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
    hour12: false,
  })

  return (
    <section
      id={`comment-${id}`}
      className="mb-2 flex space-x-4 justify-between items-start break-words"
    >
      <div className="w-full">
        <Body
          variant="b4"
          size="text-[12px] tablet:text-[14px]"
          weight="bold"
          className="dark:text-white"
        >
          {name}&nbsp;&nbsp;
          <span className="dark:text-neutral-500 font-normal">{`@${username}`}</span>
        </Body>
        <Body
          variant="b4"
          size="mt-0.5 text-[12px] tablet:text-[14px]"
          className="dark:text-neutral-400"
        >
          {createdDate} ({editedAt !== createdAt && "Edited"})
        </Body>

        {editComment ? (
          <EditCommentForm
            comment={comment}
            post={post}
            setEditComment={setEditComment}
          />
        ) : (
          <div className="w-full">
            <Markdown
              options={{ forceBlock: true }}
              className="max-w-full w-full mt-4 prose dark:prose-invert tablet:text-[14px] text-[12px]"
            >
              {text}
            </Markdown>
            {user && <ReplyForm comment={comment} post={post} />}
          </div>
        )}
      </div>
      {user && user.username === username && !editComment && (
        <div className="flex flex-col gap-8">
          <Button
            onClick={deleteComment}
            padding=""
            bgColor="bg-transparent"
            hoverBgColor="hover:bg-transparent"
            clickedBgColor="active:bg-transparent"
            className="group"
          >
            <DeleteIcon className="duration-500 dark:fill-red-500 dark:group-hover:fill-red-400 w-6 h-6" />
          </Button>
          <Button
            onClick={() => setEditComment(!editComment)}
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
    </section>
  )
}

export { Comment }
