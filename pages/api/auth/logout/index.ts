import { NextApiRequest, NextApiResponse } from "next"
import nookies from "nookies"

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

    nookies.destroy({ res }, "jwt", {
      path: "/",
    })

    res
      .status(200)
      .send({ status: "success", message: "Logged out successfully" })
  } catch (error: any) {
    res
      .status(error.message === "Method not allowed" ? 405 : 500)
      .send({ status: "error", message: error.message })
  }
}

export default handler
