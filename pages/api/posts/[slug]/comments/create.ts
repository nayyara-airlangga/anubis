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

    const { slug } = req.query

    const postToComment = await prisma.post.findUnique({
      where: { slug: slug as string },
    })

    if (!postToComment) {
      throw Error("Post not found")
    }

    const { comment: incomingComment, parentId } = req.body

    const comment = await prisma.comment.create({
      data: {
        comment: incomingComment,
        postId: postToComment.id,
        authorId: payload.id,
        parentId: parentId ?? null,
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
      .send({ status: "success", message: "Commented successfully", comment })
  } catch (error: any) {
    res
      .status(
        error.message === "Method not allowed"
          ? 405
          : error.message === "Post not found"
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
