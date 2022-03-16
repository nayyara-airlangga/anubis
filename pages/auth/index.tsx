import { NextPageContext } from "next"
import Head from "next/head"
import nookies from "nookies"

import { AuthForm } from "@components"
import { AuthFormProvider } from "@components/Auth/AuthForm/contexts"

export const getServerSideProps = async (ctx: NextPageContext) => {
  const cookies = nookies.get(ctx)

  if (cookies.jwt) {
    return {
      redirect: { destination: "/", permanent: false },
    }
  }

  return { props: {} }
}

const AuthPage = () => {
  return (
    <div className="relative w-screen h-screen">
      <Head>
        <title>Snippets | Auth</title>
      </Head>
      <AuthFormProvider>
        <AuthForm />
      </AuthFormProvider>
    </div>
  )
}

export default AuthPage
