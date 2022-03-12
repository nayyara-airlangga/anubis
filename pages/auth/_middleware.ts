import { NextRequest, NextResponse } from "next/server"

const middleware = (req: NextRequest) => {
  const url = req.nextUrl

  const jwt = req.cookies.jwt

  if (jwt) {
    url.pathname = "/"

    return NextResponse.redirect(url)
  }
}

export { middleware }
