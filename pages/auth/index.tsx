import Head from "next/head"

import { AuthForm } from "@components"
import { AuthFormProvider } from "@components/Auth/AuthForm/contexts"

import { useAuth } from "@hooks"

const AuthPage = () => {
  const { loadStatus } = useAuth()

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
