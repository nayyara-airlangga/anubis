import { useState } from "react"

import { Body, Button, InputField } from "@components"
import { LoadStatus } from "@constants"
import { useAuth } from "@hooks"

import { useAuthForm } from "./hooks"

const RegistrationForm = () => {
  const { register } = useAuth()
  const { registerData, setRegisterData } = useAuthForm()

  const [registerStatus, setRegisterStatus] = useState<LoadStatus>(
    LoadStatus.SUCCESS
  )
  const [errorMessage, setErrorMessage] = useState("")

  const registrationFormChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value

    setRegisterData({ ...registerData, [event.target.name]: value })
  }

  const submitRegisterData = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    setRegisterStatus(LoadStatus.LOADING)
    setErrorMessage("")

    const { status, message } = await register(registerData)

    setRegisterStatus(status)

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
        placeholder="Username"
        onChange={registrationFormChangeHandler}
        value={registerData.username}
      />
      <InputField
        name="name"
        type="text"
        padding="py-3"
        placeholder="Name"
        onChange={registrationFormChangeHandler}
        value={registerData.name}
      />
      <InputField
        name="email"
        type="email"
        padding="py-3"
        placeholder="Email"
        onChange={registrationFormChangeHandler}
        value={registerData.email}
      />
      <InputField
        name="password"
        type="password"
        padding="py-3"
        placeholder="Password"
        onChange={registrationFormChangeHandler}
        value={registerData.password}
      />
      <InputField
        name="confirmPassword"
        type="password"
        padding="py-3"
        placeholder="Confirm Password"
        onChange={registrationFormChangeHandler}
        value={registerData.confirmPassword}
      />
      <input
        type="checkbox"
        id="rememberMe"
        name="rememberMe"
        checked={registerData.rememberMe}
        onClick={() => {
          setRegisterData({
            ...registerData,
            rememberMe: !registerData.rememberMe,
          })
        }}
        onChange={() => {}}
      />
      <label htmlFor="rememberMe" className="pl-2.5 dark:text-white">
        Remember Me?
      </label>
      <Button
        type="submit"
        onClick={submitRegisterData}
        isDisabled={
          !registerData.username ||
          !registerData.name ||
          !registerData.email ||
          !registerData.password ||
          !registerData.confirmPassword ||
          registerData.password !== registerData.confirmPassword
        }
        className={`${
          registerStatus === LoadStatus.LOADING && "animate-pulse"
        } mt-6 mb-4 w-full`}
      >
        <Body variant="b3" weight="bold">
          {registerStatus === LoadStatus.LOADING ? "Loading..." : "Register"}
        </Body>
      </Button>
      {registerStatus === LoadStatus.ERROR && (
        <Body variant="b3" className="relative -mt-2 mb-4 text-red-500">
          {errorMessage}
        </Body>
      )}
    </>
  )
}

export { RegistrationForm }
