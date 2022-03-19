import { NextApiRequest, NextApiResponse } from "next"
import nookies from "nookies"

import { prisma } from "@config"
import { decryptText, verifyJWT } from "@utils"

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

    const { slug, id } = req.query

    const postOfComment = await prisma.post.findUnique({
      where: { slug: slug as string },
    })

    if (!postOfComment) {
      throw Error("Post not found")
    }

    const commentOfTheReplies = await prisma.comment.findUnique({
      where: { id: Number.parseInt(id as string) },
    })

    if (!commentOfTheReplies) {
      throw Error("Parent comment not found")
    }

    const { comment } = req.body

    const reply = await prisma.comment.create({
      data: {
        comment,
        postId: postOfComment.id,
        authorId: payload.id,
        parentId: Number.parseInt(id as string),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            createdAt: true,
          },
        },
        post: true,
      },
    })

    res
      .status(200)
      .send({ status: "success", message: "Replied successfully", reply })
  } catch (error: any) {
    res
      .status(
        error.message === "Method not allowed"
          ? 405
          : error.message === "Post not found" ||
            error.message === "Parent comment not found"
          ? 404
          : 401
      )
      .send({
        status: "error",
        message: error.message,
      })
  }
}

export default handler
