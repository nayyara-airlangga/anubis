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

    const posts = await prisma.post.findMany({
      orderBy: [{ createdAt: "desc" }, { editedAt: "desc" }, { title: "asc" }],
    })

    res.status(200).send({
      status: "success",
      message: "Fetched posts successfully",
      posts,
    })
  } catch (error: any) {
    res.status(error.message === "Method not allowed" ? 405 : 500).send({
      status: "error",
      message: error.message,
    })
  }
}

export default handler
