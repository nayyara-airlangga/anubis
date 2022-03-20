import axios from "axios"
import { useEffect, useState } from "react"

import { LoadStatus } from "@constants"
import { Body, Button, Heading } from "@components"
import { Comment as CommentModel, Post } from "@models"

import { Comment } from "./Comment"

const CommentSection = ({ post }: { post: Post }) => {
  const [comments, setComments] = useState<CommentModel[]>()

  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.SUCCESS)

  const [lastCommentId, setLastCommentId] = useState<number>()
  const [hasNextPage, setHasNextPage] = useState(false)

  const fetchComments = async () => {
    setLoadStatus(LoadStatus.LOADING)

    try {
      const { data } = await axios.get(
        "/api/posts/" +
          post.slug +
          "/comments?" +
          (lastCommentId ? "lastId=" + lastCommentId : "")
      )

      if (data.status === "success") {
        if (!comments) {
          setComments(data.comments)
        } else {
          setComments(comments.concat(...data.comments))
        }
        setLastCommentId(data.lastCommentId)
        setHasNextPage(data.hasNextPage)

        setLoadStatus(LoadStatus.SUCCESS)
      }
    } catch (error: any) {
      console.log(error.response.data.message)
      setLoadStatus(LoadStatus.ERROR)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [post.slug])

  return (
    <div className="dark:bg-neutral-800 p-4 my-8 rounded-lg break-words w-full">
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
          : `${post._count?.comments} comments`}
      </Heading>
      <hr className="my-4" />
      {comments &&
        comments.map((comment: CommentModel, index: number) => (
          <div key={index + comment.comment}>
            <Comment
              replyCount={comment._count?.replies as number}
              key={index + comment.comment}
              post={post}
              comment={comment}
            />
            {index !== comments.length - 1 && (
              <hr className="border-dashed my-4" />
            )}
          </div>
        ))}
      {comments && hasNextPage && loadStatus !== "LOADING" && (
        <Button
          onClick={fetchComments}
          padding="pt-4"
          bgColor="bg-transparent"
          hoverBgColor="hover:bg-transparent"
          clickedBgColor="active:bg-transparent"
          className="my-2 group w-full"
        >
          <Body
            variant="b3"
            size="text-[14px] tablet:text-[16px]"
            className="text-blue-500 group-hover:text-blue-400 group-active:text-blue-300"
          >
            Show more comments
          </Body>
        </Button>
      )}
      {comments && loadStatus === "LOADING" && (
        <Body
          variant="b3"
          size="text-[14px] tablet:text-[16px]"
          className="text-center mx-auto mt-2 dark:text-neutral-300"
        >
          Loading...
        </Body>
      )}
    </div>
  )
}

export { CommentSection }
