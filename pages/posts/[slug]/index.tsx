import axios from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { CommentForm, CommentSection, Heading, PostDetails } from "@components"
import { LoadStatus } from "@constants"
import { Post } from "@models"

const PostPage = () => {
  const router = useRouter()

  const [statusCode, setStatusCode] = useState<number>()

  const [post, setPost] = useState<Post>()
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.LOADING)

  useEffect(() => {
    if (router.isReady) {
      const { slug } = router.query
      const fetchPost = async () => {
        try {
          const { data, status } = await axios.get(
            ("/api/posts/" + slug) as string
          )

          if (data.status === "success") {
            setPost(data.post)
            setLoadStatus(LoadStatus.SUCCESS)
            setStatusCode(status)
          } else {
            setLoadStatus(LoadStatus.ERROR)
          }
        } catch (error: any) {
          setLoadStatus(LoadStatus.ERROR)
          console.log(error.response.data.message)

          setStatusCode(error.response.status)
        }
      }
      fetchPost()
    }
  }, [router.query, router.isReady])

  return (
    <div className="w-full relative my-8">
      <Head>
        <title>
          Angga |{" "}
          {loadStatus === "LOADING"
            ? "Loading..."
            : loadStatus === "SUCCESS"
            ? post?.title
            : "Error"}
        </title>
      </Head>
      {loadStatus !== LoadStatus.SUCCESS && (
        <Heading
          variant="h1"
          size="tablet:text-[48px] text-[36px]"
          weight="bold"
          className="dark:text-white"
        >
          {loadStatus === LoadStatus.LOADING
            ? "Loading..."
            : statusCode === 404
            ? "Post not found"
            : "An error occured"}
        </Heading>
      )}
      {post && (
        <>
          <PostDetails post={post} />
          <hr className="my-8" />
          <CommentForm post={post} />
          <CommentSection post={post} />
        </>
      )}
    </div>
  )
}

export default PostPage
