import axios from "axios"
import Head from "next/head"
import { useEffect, useState } from "react"

import { PostCard } from "@components"
import { Post } from "@models"

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("/api/posts")

        if (data.status === "success") {
          setPosts(data.posts)
        } else {
          throw Error(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="relative w-full">
      <Head>
        <title>Angga | Posts</title>
      </Head>
      <div className="my-16">
        {posts &&
          posts.map(({ title, slug, headline, createdAt }, index) => (
            <PostCard
              key={slug + index}
              title={title}
              slug={slug}
              headline={headline}
              createdAt={createdAt}
            />
          ))}
      </div>
    </div>
  )
}

export default PostsPage
