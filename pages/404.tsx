import Head from "next/head"

import { Heading } from "@components"

const NotFoundPage = () => {
  return (
    <div className="w-full relative my-8">
      <Head>
        <title>Angga | Page Not Found</title>
      </Head>
      <Heading
        variant="h1"
        size="tablet:text-[48px] text-[36px]"
        weight="bold"
        className="dark:text-white"
      >
        Page not found
      </Heading>
    </div>
  )
}

export default NotFoundPage
