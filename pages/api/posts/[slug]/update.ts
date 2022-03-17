import { NextApiRequest, NextApiResponse } from "next"
import nookies from "nookies"

import { prisma } from "@config"
import { decryptText, verifyJWT } from "@utils"

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
    if (req.method !== "PUT") {
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

    const { slug } = req.query

    const postToEdit = await prisma.post.findUnique({
      where: { slug: slug as string },
    })

    if (!postToEdit) {
      throw Error("Post not found")
    }

    const { title, headline, content, published, editedAt } = req.body

    const post = await prisma.post.update({
      where: { slug: slug as string },
      data: {
        title,
        headline,
        content,
        published: published ?? false,
        editedAt: editedAt ?? postToEdit.createdAt,
      },
    })

    res
      .status(200)
      .send({ status: "success", message: "Post updated successfully", post })
  } catch (error: any) {
    res
      .status(
        error.message === "Method not allowed"
          ? 405
          : error.message === "Permission denied"
          ? 403
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
