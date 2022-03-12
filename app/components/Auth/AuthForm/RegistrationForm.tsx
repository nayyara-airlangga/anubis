import { Body, Button, InputField } from "@components"

import { useAuthForm } from "./hooks"

const RegistrationForm = () => {
  const { registerData, setRegisterData } = useAuthForm()

  const registrationFormChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value

    setRegisterData({ ...registerData, [event.target.name]: value })
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
      <Button className="mt-6 mb-4 w-full">
        <Body variant="b3" weight="bold">
          Register
        </Body>
      </Button>
    </>
  )
}

export { RegistrationForm }
