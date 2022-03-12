import { Body, Button, Heading } from "@components"

import { LoginForm } from "./LoginForm"
import { RegistrationForm } from "./RegistrationForm"

import { AuthFormType } from "./contexts"
import { useAuthForm } from "./hooks"

const AuthForm = () => {
  const { authFormType, setAuthFormType } = useAuthForm()

  const changeAuthFormType = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAuthFormType(
      authFormType === AuthFormType.Register
        ? AuthFormType.Login
        : AuthFormType.Register
    )
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90%] tablet:w-auto tablet:min-w-[350px] tablet:max-w-[400px] dark:bg-neutral-700 rounded-md p-4">
      <Heading
        variant="h2"
        weight="bold"
        className="text-center dark:text-white"
      >
        Postwrite
      </Heading>
      <hr className="mt-2 mb-8" />
      {authFormType === "login" ? <LoginForm /> : <RegistrationForm />}
      <Button
        bgColor="bg-transparent"
        hoverBgColor="hover:bg-transparent"
        clickedBgColor="active:bg-transparent"
        className="group w-full"
        onClick={changeAuthFormType}
      >
        <Body variant="b3" className="group-hover:underline">
          {authFormType === AuthFormType.Login
            ? "Don't have an account?"
            : "Already have an account?"}
        </Body>
      </Button>
    </div>
  )
}

export { AuthForm }
