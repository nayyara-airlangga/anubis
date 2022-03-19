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

    const { slug, id, lastId } = req.query

    const postOfTheComment = await prisma.post.findUnique({
      where: { slug: slug as string },
    })

    if (!postOfTheComment) {
      throw Error("Post not found")
    }

    const commentOfTheReplies = await prisma.comment.findUnique({
      where: { id: Number.parseInt(id as string) },
    })

    if (!commentOfTheReplies) {
      throw Error("Parent comment not found")
    }

    let replies
    let lastReplyId

    if (!lastId) {
      replies = await prisma.comment.findMany({
        take: 5,
        where: { parentId: Number.parseInt(id as string) },
        orderBy: [{ createdAt: "desc" }, { editedAt: "desc" }],
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
    } else {
      replies = await prisma.comment.findMany({
        skip: 1,
        take: 5,
        cursor: { id: Number.parseInt(lastId as string) },
        where: { parentId: Number.parseInt(id as string) },
        orderBy: [{ createdAt: "desc" }, { editedAt: "desc" }],
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
    }

    lastReplyId = replies.length === 0 ? null : replies[replies.length - 1].id

    let nextReplies

    if (lastReplyId) {
      nextReplies = await prisma.comment.findFirst({
        where: { parentId: Number.parseInt(id as string) },
        skip: 1,
        cursor: { id: lastReplyId },
        orderBy: [{ createdAt: "desc" }, { editedAt: "desc" }],
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
    }

    const total = (
      await prisma.comment.findMany({
        where: { parentId: Number.parseInt(id as string) },
      })
    ).length

    res.status(200).send({
      status: "success",
      message: "Replies fetched successfully",
      total,
      replies,
      lastReplyId,
      hasNextPage: lastReplyId && nextReplies ? true : false,
    })
  } catch (error: any) {
    res
      .status(
        error.message === "Method not allowed"
          ? 405
          : error.message === "Post not found" ||
            error.message === "Parent comment not found"
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
