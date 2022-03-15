import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

import { Body, Button, InputField } from "@components"
import { LoadStatus } from "@constants"
import { useAuth } from "@hooks"
import { Post } from "@models"

const CommentForm = ({ post }: { post: Post }) => {
  const { user } = useAuth()

  const router = useRouter()

  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.SUCCESS)
  const [commentData, setCommentData] = useState("")

  const submitComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoadStatus(LoadStatus.LOADING)

    try {
      const { data } = await axios.post(
        "/api/posts/" + post.slug + "/comments/create",
        { comment: commentData }
      )
      if (data.status === "success") {
        setLoadStatus(LoadStatus.SUCCESS)
        router.reload()
      }
    } catch (error: any) {
      console.log(error.response.data.message)
      setLoadStatus(LoadStatus.ERROR)
    }
  }

  return (
    <form onSubmit={submitComment} className="flex flex-col w-full rounded-lg">
      <InputField
        isDisabled={!user}
        type="textarea"
        rows={6}
        name="comment"
        placeholder="Write a comment"
        value={commentData}
        onChange={(event) => setCommentData(event.target.value)}
      />
      {user ? (
        <Button
          isDisabled={commentData.trim().length < 1}
          type={loadStatus === "LOADING" ? "button" : "submit"}
          className={loadStatus === "LOADING" ? "animate-pulse" : ""}
        >
          {loadStatus === "LOADING" ? "Loading..." : "Submit Comment"}
        </Button>
      ) : (
        <div className="bg-red-500 dark:text-white p-4 rounded-lg">
          <Body variant="b3">You need to be logged in to comment</Body>
        </div>
      )}
    </form>
  )
}

export { CommentForm }
