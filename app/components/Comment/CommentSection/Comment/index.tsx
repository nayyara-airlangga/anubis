import axios from "axios"
import Markdown from "markdown-to-jsx"
import { useRouter } from "next/router"
import { useState } from "react"

import { Body, Button, InputField } from "@components"
import { LoadStatus } from "@constants"
import { useAuth } from "@hooks"
import { Comment as CommentModel, Post } from "@models"

import DeleteIcon from "@icons/delete.svg"
import EditIcon from "@icons/edit.svg"

const Comment = ({ comment, post }: { comment: CommentModel; post: Post }) => {
  const {
    id,
    author: { name, username },
    comment: text,
    createdAt,
    editedAt,
  } = comment

  const { user } = useAuth()

  const { reload, push } = useRouter()

  const [newComment, setNewComment] = useState(text)
  const [editComment, setEditComment] = useState(false)

  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.SUCCESS)

  const updateComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoadStatus(LoadStatus.LOADING)

    try {
      const { data } = await axios.put(
        "/api/posts/" + post.slug + "/comments/" + id + "/update",
        { comment: newComment.trim(), editedAt: new Date().toISOString() }
      )

      if (data.status === "success") {
        setLoadStatus(LoadStatus.SUCCESS)
        reload()
      }
    } catch (error: any) {
      console.log(error.response.data.message)
      setLoadStatus(LoadStatus.ERROR)
      if (error.response.status === 401) {
        push("/auth")
      }
    }
  }

  const deleteComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setLoadStatus(LoadStatus.LOADING)

    try {
      const { data } = await axios.delete(
        "/api/posts/" + post.slug + "/comments/" + id + "/delete"
      )

      if (data.status === "success") {
        setLoadStatus(LoadStatus.SUCCESS)
        reload()
      }
    } catch (error: any) {
      console.log(error.response.data.message)
      setLoadStatus(LoadStatus.ERROR)
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

  const editedDate = new Date(editedAt).toLocaleDateString("en-US", {
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
      className="mb-4 flex space-x-4 justify-between items-start break-words"
    >
      <div className="w-full">
        <Body
          variant="b4"
          size="text-[10px] tablet:text-[14px]"
          weight="bold"
          className="dark:text-white"
        >
          {name}&nbsp;&nbsp;
          <span className="dark:text-neutral-400 font-normal">{`@${username}`}</span>
        </Body>
        <Body
          variant="b4"
          size="text-[10px] tablet:text-[14px]"
          className="dark:text-white"
        >
          {createdDate}
        </Body>
        {editedAt !== createdAt && (
          <Body
            variant="b4"
            size="text-[10px] tablet:text-[14px]"
            className="dark:text-white"
          >
            <i>Edited at {editedDate}</i>
          </Body>
        )}
        {editComment ? (
          <form onSubmit={updateComment}>
            <InputField
              padding="px-2"
              type="textarea"
              className="mt-4 tablet:text-[14px] text-[12px]"
              rows={6}
              name="comment"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            />
            {loadStatus === "ERROR" && (
              <Body
                variant="b3"
                size="text-[12px] tablet:text-[14px]"
                className="relative -mt-4 text-red-500"
              >
                An error occured
              </Body>
            )}
            <div className="flex justify-end items-center gap-4">
              <Button
                onClick={() => {
                  setEditComment(false)
                  setNewComment(text)
                }}
                padding="py-2 px-2"
                bgColor="bg-transparent"
                hoverBgColor="hover:bg-transparent"
                clickedBgColor="active:bg-transparent"
                className="relative -mt-2 group"
              >
                <Body
                  variant="b3"
                  size="text-[12px] tablet:text-[14px]"
                  className="text-red-500 group-hover:text-red-400 group-active:text-red-300"
                >
                  Cancel
                </Body>
              </Button>
              <Button
                padding="px-2 py-2"
                className={`relative -mt-2 ${
                  loadStatus === "LOADING" && "animate-pulse"
                }`}
                type={loadStatus === "LOADING" ? "button" : "submit"}
              >
                <Body variant="b3" size="text-[12px] tablet:text-[14px]">
                  {loadStatus === "LOADING" ? "Loading..." : "Edit comment"}
                </Body>
              </Button>
            </div>
          </form>
        ) : (
          <Markdown
            options={{ forceBlock: true }}
            className="max-w-full w-full mt-4 prose dark:prose-invert tablet:text-[14px] text-[12px]"
          >
            {text}
          </Markdown>
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
