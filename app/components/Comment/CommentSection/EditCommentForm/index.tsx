import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

import { Body, Button, InputField } from "@components"
import { LoadStatus } from "@constants"
import { Comment, Post } from "@models"

const EditCommentForm = ({
  comment,
  setEditComment,
  post,
}: {
  comment: Comment
  setEditComment: React.Dispatch<React.SetStateAction<boolean>>
  post: Post
}) => {
  const { id, comment: text } = comment

  const { reload, push } = useRouter()

  const [newComment, setNewComment] = useState(text)

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

  return (
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
  )
}

export { EditCommentForm }
