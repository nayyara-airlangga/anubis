import Head from "next/head"

import { AuthForm } from "@components"
import { AuthFormProvider } from "@components/Auth/AuthForm/contexts"

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
