import axios from "axios"
import Head from "next/head"
import { useEffect, useState } from "react"

import { Heading, PostCard } from "@components"
import { LoadStatus } from "@constants"
import { Post } from "@models"

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>()

  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.LOADING)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, status } = await axios.get("/api/posts")

        if (data.status === "success") {
          setPosts(data.posts)
          setLoadStatus(LoadStatus.SUCCESS)
        } else {
          throw Error(data.message)
        }
      } catch (error: any) {
        console.log(error.response.data.message)
        setLoadStatus(LoadStatus.ERROR)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="relative w-full">
      <Head>
        <title>
          Angga |{" "}
          {loadStatus === "LOADING"
            ? "Loading..."
            : loadStatus === "SUCCESS"
            ? "Posts"
            : "Error"}
        </title>
      </Head>
      <div className={loadStatus !== "SUCCESS" ? "my-8" : "my-16"}>
        {loadStatus !== "SUCCESS" && (
          <Heading
            variant="h1"
            size="tablet:text-[48px] text-[36px]"
            weight="bold"
            className="dark:text-white"
          >
            {loadStatus === LoadStatus.LOADING
              ? "Loading..."
              : "An error occured"}
          </Heading>
        )}
        {posts &&
          posts.map(({ title, slug, headline, createdAt, editedAt }, index) => (
            <PostCard
              key={slug + index}
              title={title}
              slug={slug}
              headline={headline}
              createdAt={createdAt}
              editedAt={editedAt}
            />
          ))}
      </div>
    </div>
  )
}

export default PostsPage
