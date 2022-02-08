import { NextApiRequest, NextApiResponse } from "next"
import nookies from "nookies"

import { prisma } from "@config"
import { encryptText, createJWT, verifyPassword } from "@utils"

const env = process.env.NODE_ENV

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

    const { username, password, rememberMe } = req.body

    const userWithUsername = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        name: true,
        password: true,
      },
    })

    const userWithEmail = await prisma.user.findFirst({
      where: {
        email: username,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    })

    let jwt

    if (!userWithUsername && !userWithEmail) {
      throw Error("User not found")
    } else if (userWithUsername) {
      if (!verifyPassword(password, userWithUsername.password)) {
        throw Error("Password is incorrect")
      }

      jwt = createJWT(
        {
          id: userWithUsername.id,
          username,
          name: userWithUsername.name,
        },
        jwtSecret,
        rememberMe ? "30d" : "7d"
      )
    } else {
      if (!verifyPassword(password, userWithEmail!.password)) {
        throw Error("Password is incorrect")
      }

      jwt = createJWT(
        {
          id: userWithEmail?.id,
          email: username,
          name: userWithEmail?.name,
        },
        jwtSecret,
        rememberMe ? "30d" : "7d"
      )
    }

    nookies.set({ res }, "jwt", encryptText(jwt, encryptionKey), {
      httpOnly: true,
      secure: env !== "development",
      path: "/",
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60,
    })

    res.status(200).send({ status: "success", message: "Login successful" })
  } catch (error: any) {
    res.status(error.message === "Method not allowed" ? 405 : 404).send({
      status: "error",
      message: error.message,
    })
  }
}

export default handler
