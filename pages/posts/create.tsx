import { NextPageContext } from "next"
import Head from "next/head"
import nookies from "nookies"

import { Heading, PostCreate } from "@components"
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

const CreatePostPage = () => {
  return (
    <div className="w-full relative my-8">
      <Head>
        <title>Anggans | Create a Post </title>
      </Head>
      <Heading
        variant="h1"
        size="tablet:text-[48px] text-[36px]"
        weight="bold"
        className="dark:text-white"
      >
        Write a new post
      </Heading>
      <PostCreate />
    </div>
  )
}

export default CreatePostPage
