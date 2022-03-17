import axios from "axios"
import { NextPageContext } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import nookies from "nookies"
import { useState, useEffect } from "react"

import { Heading, PostCreate } from "@components"
import { LoadStatus } from "@constants"
import { Post } from "@models"
import { decryptText, verifyJWT } from "@utils"

export const getServerSideProps = async (ctx: NextPageContext) => {
  const superUser = process.env.SUPER_USER as string
  const superEmail = process.env.SUPER_EMAIL as string

  const encryptionKey = process.env.ENCRYPTION_KEY as string
  const jwtSecret = process.env.JWT_SECRET as string

  const cookies = nookies.get(ctx)

  if (!cookies.jwt) {
    return {
      redirect: { destination: "/posts", permanent: false },
    }
  }

  const { status, payload } = verifyJWT(
    decryptText(cookies.jwt, encryptionKey),
    jwtSecret
  )

  if (status === "error" || !payload) {
    return {
      redirect: { destination: "/posts", permanent: false },
    }
  }

  const username = payload.username || payload.email

  if (username !== superUser && username !== superEmail) {
    return { redirect: { destination: "/posts", permanent: false } }
  }

  return { props: {} }
}

const PostUpdatePage = () => {
  const router = useRouter()

  const [post, setPost] = useState<Post>()
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.LOADING)

  useEffect(() => {
    if (router.isReady) {
      const { slug } = router.query
      const fetchPost = async () => {
        try {
          const { data } = await axios.get(("/api/posts/" + slug) as string)

          if (data.status === "success") {
            setPost(data.post)
            setLoadStatus(LoadStatus.SUCCESS)
          } else {
            setLoadStatus(LoadStatus.ERROR)
          }
        } catch (error: any) {
          setLoadStatus(LoadStatus.ERROR)
          console.log(error.response.data.message)

          if (error.response.status === 401) {
            router.push("/auth")
          }
        }
      }
      fetchPost()
    }
  }, [router, router.query, router.isReady])

  return (
    <div className="w-full relative my-8">
      <Head>
        <title>
          Angga |{" "}
          {loadStatus === "LOADING"
            ? "Loading..."
            : loadStatus === "SUCCESS"
            ? "Update a Post"
            : "Error"}{" "}
        </title>
      </Head>
      <Heading
        variant="h1"
        size="tablet:text-[48px] text-[36px]"
        weight="bold"
        className="dark:text-white"
      >
        {loadStatus === "LOADING"
          ? "Loading..."
          : loadStatus === "SUCCESS"
          ? "Update this post"
          : "An error occured"}
      </Heading>
      {loadStatus === "SUCCESS" && <PostCreate post={post} />}
    </div>
  )
}

export default PostUpdatePage
