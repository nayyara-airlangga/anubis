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
    if (req.method !== "GET") {
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

    let user

    if (payload?.username) {
      user = await prisma.user.findUnique({
        where: {
          username: payload.username,
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          bio: true,
        },
      })
    } else {
      user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          bio: true,
        },
      })
    }

    res.status(200).send({
      status: "success",
      message: "Fetched user successfully",
      user,
    })
  } catch (error: any) {
    res.status(error.message === "Method not allowed" ? 405 : 401).send({
      status: "error",
      message: error.message,
    })
  }
}

export default handler
