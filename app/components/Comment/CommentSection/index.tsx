import axios from "axios"
import { useEffect, useState } from "react"

import { LoadStatus } from "@constants"
import { Heading } from "@components"
import { Comment as CommentModel, Post } from "@models"

import { Comment } from "./Comment"

const CommentSection = ({ post }: { post: Post }) => {
  const [comments, setComments] = useState<CommentModel[]>()

  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.SUCCESS)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(
          "/api/posts/" + post.slug + "/comments"
        )

        if (data.status === "success") {
          setComments(data.comments)
          setLoadStatus(LoadStatus.SUCCESS)
        }
      } catch (error: any) {
        console.log(error.response.data.message)
        setLoadStatus(LoadStatus.ERROR)
      }
    }

    fetchComments()
  }, [post.slug])

  return (
    <div className="dark:bg-neutral-700 p-4 my-8 rounded-lg break-words">
      <Heading
        variant="h6"
        size="text-[14px] tablet:text-[16px]"
        weight="bold"
        className="dark:text-white"
      >
        {loadStatus === "LOADING"
          ? "Loading"
          : loadStatus === "ERROR"
          ? "An error occured"
          : comments?.length === 0
          ? "No comments yet"
          : `${comments?.length} comments`}
      </Heading>
      <hr className="my-4" />
      {comments &&
        comments.map((comment, index) => (
          <div key={index + comment.comment}>
            <Comment
              key={index + comment.comment}
              post={post}
              comment={comment}
            />
            {index !== comments.length - 1 && (
              <hr className="border-dashed my-4" />
            )}
          </div>
        ))}
    </div>
  )
}

export { CommentSection }
