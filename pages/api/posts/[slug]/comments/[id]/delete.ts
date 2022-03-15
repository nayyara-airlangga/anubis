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
    if (req.method !== "DELETE") {
      throw Error("Method not allowed")
    }

    const cookies = nookies.get({ req })

    if (!cookies?.jwt) {
      throw Error("Unauthorized")
    }

    const { slug, id } = req.query

    const postOfTheComment = await prisma.post.findUnique({
      where: { slug: slug as string },
    })

    if (!postOfTheComment) {
      throw Error("Post not found")
    }

    const commentToDelete = await prisma.comment.findUnique({
      where: { id: Number.parseInt(id as string) },
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
      },
    })

    if (!commentToDelete) {
      throw Error("Comment not found")
    }

    const { status, payload } = verifyJWT(
      decryptText(cookies.jwt, encryptionKey),
      jwtSecret
    )

    if (status === "error" || !payload) {
      throw Error("Unauthorized")
    }

    const username = payload.username || payload.email

    if (
      commentToDelete.author.username !== username &&
      commentToDelete.author.email !== username
    ) {
      throw Error("Permission denied")
    }

    const comment = await prisma.comment.delete({
      where: { id: Number.parseInt(id as string) },
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
      },
    })

    res.status(200).send({
      status: "success",
      mesage: "Comment deleted successfulky",
      comment,
    })
  } catch (error: any) {
    res
      .status(
        error.message === "Method not allowed"
          ? 405
          : error.message === "Permission denied"
          ? 403
          : error.message === "Post not found" ||
            error.message === "Comment not found"
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
