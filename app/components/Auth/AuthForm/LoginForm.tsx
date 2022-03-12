import { Body, Button, InputField } from "@components"

import { useAuthForm } from "./hooks"

const LoginForm = () => {
  const { loginData, setLoginData } = useAuthForm()

  const loginFormChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value

    setLoginData({ ...loginData, [event.target.name]: value })
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
      <Button className="mt-6 mb-4 w-full">
        <Body variant="b3" weight="bold">
          Login
        </Body>
      </Button>
    </>
  )
}

export { LoginForm }
