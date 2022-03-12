import { createContext, useState } from "react"

import { LoginData, RegisterData } from "@constants"

const enum AuthFormType {
  Register = "register",
  Login = "login",
}

interface AuthFormContextType {
  authFormType: AuthFormType
  loginData: LoginData
  registerData: RegisterData
  setAuthFormType: React.Dispatch<React.SetStateAction<AuthFormType>>
  setLoginData: React.Dispatch<React.SetStateAction<LoginData>>
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterData>>
}

const AuthFormContext = createContext<AuthFormContextType>({
  authFormType: AuthFormType.Login,
  loginData: { username: "", password: "", rememberMe: false },
  registerData: {
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  },
  setAuthFormType: () => {},
  setLoginData: () => {},
  setRegisterData: () => {},
})

const AuthFormProvider = ({ children }: { children?: React.ReactNode }) => {
  const [authFormType, setAuthFormType] = useState<AuthFormType>(
    AuthFormType.Login
  )

  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
    rememberMe: false,
  })

  const [registerData, setRegisterData] = useState<RegisterData>({
    username: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  })

  return (
    <AuthFormContext.Provider
      value={{
        authFormType,
        loginData,
        registerData,
        setAuthFormType,
        setLoginData,
        setRegisterData,
      }}
    >
      {children}
    </AuthFormContext.Provider>
  )
}

export { AuthFormType, AuthFormContext, AuthFormProvider }
