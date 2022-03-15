import Head from "next/head"

import { Heading } from "@components"

const ProfilePage = () => {
  return (
    <div className="w-full relative my-8">
      <Head>
        <title>Angga | Profile</title>
      </Head>
      <Heading
        variant="h2"
        size="tablet:text-[36px] text-[32px]"
        weight="bold"
        className="dark:text-white"
      >
        Who am I?
      </Heading>
    </div>
  )
}

export default ProfilePage
