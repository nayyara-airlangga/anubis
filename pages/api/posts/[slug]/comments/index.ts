import { NextApiRequest, NextApiResponse } from "next"

import { prisma } from "@config"

export const config = {
  api: {
    externalResolver: true,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") {
      throw Error("Method not allowed")
    }

    const { slug } = req.query

    const postOfTheComments = await prisma.post.findUnique({
      where: { slug: slug as string },
    })

    if (!postOfTheComments) {
      throw Error("Post not found")
    }

    const comments = await prisma.comment.findMany({
      orderBy: [{ editedAt: "desc" }, { createdAt: "desc" }],
      where: { post: { slug: slug as string } },
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
        replies: {
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
        },
      },
    })

    res.status(200).send({
      status: "success",
      message: "Comments fetched successfully",
      comments,
    })
  } catch (error: any) {
    res
      .status(
        error.message === "Method not allowed"
          ? 405
          : error.message === "Post not found"
          ? 404
          : 500
      )
      .send({
        status: "error",
        message: error.message,
      })
  }
}

export default handler
