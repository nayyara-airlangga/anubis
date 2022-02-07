import jwt, { JwtPayload } from "jsonwebtoken"

const createJWT = (
  payload: string | Object,
  secret: string,
  duration: number | string = "3h"
) => {
  const token = jwt.sign(payload, secret, { expiresIn: duration })

  return token
}

const verifyJWT = (token: string, secret: string) => {
  try {
    const decodedToken = jwt.verify(token, secret) as JwtPayload

    return { status: "success", payload: decodedToken }
  } catch (error) {
    console.log(error)
    return { status: "error", payload: null }
  }
}

export { createJWT, verifyJWT }
