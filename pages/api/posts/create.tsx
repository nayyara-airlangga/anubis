import { NextApiRequest, NextApiResponse } from "next"
import nookies from "nookies"

import { prisma } from "@config"
import { decryptText, slugify, verifyJWT } from "@utils"

const superUser = process.env.SUPER_USER as string
const superEmail = process.env.SUPER_EMAIL as string

const encryptionKey = process.env.ENCRYPTION_KEY as string
const jwtSecret = process.env.JWT_SECRET as string

export const config = {
  api: {
    externalResolver: true,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      throw Error("Method not allowed")
    }

    const cookies = nookies.get({ req })

    if (!cookies?.jwt) {
      throw Error("Unauthorized")
    }

    const { status, payload } = verifyJWT(
      decryptText(cookies.jwt, encryptionKey),
      jwtSecret
    )

    if (status === "error" || !payload) {
      throw Error("Unauthorized")
    }

    const username = payload.username || payload.email

    if (username !== superUser && username !== superEmail) {
      throw Error("Permission denied")
    }

    const { title, content, published } = req.body
    const id = payload.id

    const posts = await prisma.post.findMany({ where: { title } })

    let samePosts = 0

    while (samePosts !== posts.length) {
      samePosts++
    }

    let slug = slugify(title)

    if (samePosts > 0) {
      slug = `${slug}-${samePosts}`
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        published: published ?? false,
        authorId: id,
      },
    })

    res
      .status(200)
      .send({ status: "success", message: "Post created successfully", post })
  } catch (error: any) {
    res
      .status(
        error.message === "Method not allowed"
          ? 405
          : error.message === "Permission denied"
          ? 403
          : 401
      )
      .send({
        status: "error",
        message: error.message,
      })
  }
}

export default handler
