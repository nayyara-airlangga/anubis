import { useState } from "react"

import { Body, Button, InputField } from "@components"
import { LoadStatus } from "@constants"
import { useAuth } from "@hooks"

import { useAuthForm } from "./hooks"

const LoginForm = () => {
  const { login } = useAuth()
  const { loginData, setLoginData } = useAuthForm()

  const [loginStatus, setLoginStatus] = useState<LoadStatus>(LoadStatus.SUCCESS)
  const [errorMessage, setErrorMessage] = useState("")

  const loginFormChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value

    setLoginData({ ...loginData, [event.target.name]: value })
  }

  const submitLoginData = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    setLoginStatus(LoadStatus.LOADING)
    setErrorMessage("")

    const { status, message } = await login(loginData)

    setLoginStatus(status)

    if (status === LoadStatus.ERROR) {
      setErrorMessage(message)
    }
  }

  return (
    <>
      <InputField
        name="username"
        type="text"
        padding="py-3"
        placeholder="Username or Email"
        onChange={loginFormChangeHandler}
        value={loginData.username}
        className="mb-6"
      />
      <InputField
        name="password"
        type="password"
        padding="py-3"
        placeholder="Password"
        onChange={loginFormChangeHandler}
        value={loginData.password}
        className="mb-4"
      />
      <input
        type="checkbox"
        id="rememberMe"
        name="rememberMe"
        checked={loginData.rememberMe}
        onClick={() => {
          setLoginData({ ...loginData, rememberMe: !loginData.rememberMe })
        }}
        onChange={() => {}}
      />
      <label htmlFor="rememberMe" className="pl-2.5 dark:text-white">
        Remember Me?
      </label>
      <Button
        type="submit"
        onClick={submitLoginData}
        isDisabled={loginData.username === "" || loginData.password === ""}
        className={`${
          loginStatus === LoadStatus.LOADING && "animate-pulse"
        } mt-6 mb-4 w-full`}
      >
        <Body variant="b3" weight="bold">
          {loginStatus === LoadStatus.LOADING ? "Loading..." : "Login"}
        </Body>
      </Button>
      {loginStatus === LoadStatus.ERROR && (
        <Body variant="b3" className="relative -mt-2 mb-4 text-red-500">
          {errorMessage}
        </Body>
      )}
    </>
  )
}

export { LoginForm }
