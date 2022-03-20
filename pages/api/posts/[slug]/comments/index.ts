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

    const { slug, lastId } = req.query

    const postOfTheComments = await prisma.post.findUnique({
      where: { slug: slug as string },
    })

    if (!postOfTheComments) {
      throw Error("Post not found")
    }

    let comments
    let lastCommentId

    if (!lastId) {
      comments = await prisma.comment.findMany({
        take: 5,
        orderBy: [{ createdAt: "desc" }, { editedAt: "desc" }],
        where: { post: { slug: slug as string }, parentId: null },
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
          _count: { select: { replies: true } },
        },
      })
    } else {
      comments = await prisma.comment.findMany({
        skip: 1,
        cursor: { id: Number.parseInt(lastId as string) },
        take: 5,
        orderBy: [{ createdAt: "desc" }, { editedAt: "desc" }],
        where: { post: { slug: slug as string }, parentId: null },
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
          _count: { select: { replies: true } },
        },
      })
    }

    lastCommentId =
      comments.length === 0 ? null : comments[comments.length - 1].id

    let nextComment

    if (lastCommentId) {
      nextComment = await prisma.comment.findFirst({
        skip: 1,
        cursor: { id: lastCommentId },
        orderBy: [{ createdAt: "desc" }, { editedAt: "desc" }],
        where: { post: { slug: slug as string }, parentId: null },
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
          _count: { select: { replies: true } },
        },
      })
    }

    res.status(200).send({
      status: "success",
      message: "Comments fetched successfully",
      comments,
      lastCommentId,
      hasNextPage: lastCommentId && nextComment ? true : false,
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
