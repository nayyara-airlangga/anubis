import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { LoadStatus, LoginData, RegisterData } from "@constants"
import { User } from "@models"

interface AuthContextType {
  isAuthenticated: boolean
  user?: User
  loadStatus: LoadStatus
  register: (registerData: RegisterData) => Promise<{
    status: LoadStatus
    message: any
  }>
  login: (loginData: LoginData) => Promise<{
    status: LoadStatus
    message: any
  }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loadStatus: LoadStatus.LOADING,
  register: async () => ({ status: LoadStatus.LOADING, message: "" }),
  login: async () => ({ status: LoadStatus.LOADING, message: "" }),
  logout: async () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { push, reload } = useRouter()

  const [user, setUser] = useState<User>()
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.LOADING)

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/users/me")

      setUser(data)
      setLoadStatus(LoadStatus.SUCCESS)
    } catch (error: any) {
      setUser(undefined)
      setLoadStatus(LoadStatus.ERROR)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const register = async (registerData: RegisterData) => {
    try {
      const { data } = await axios.post("/api/auth/register", registerData)

      switch (data.status) {
        case "success":
          reload()
          return { status: LoadStatus.SUCCESS, message: data.message }

        default:
          throw Error
      }
    } catch (error: any) {
      push("/auth")
      return { status: LoadStatus.ERROR, message: error.response.data.message }
    }
  }

  const login = async (loginData: LoginData) => {
    try {
      const { data } = await axios.post("/api/auth/login", loginData)

      switch (data.status) {
        case "success":
          reload()
          return { status: LoadStatus.SUCCESS, message: data.message }

        default:
          throw Error
      }
    } catch (error: any) {
      push("/auth")
      return { status: LoadStatus.ERROR, message: error.response.data.message }
    }
  }

  const logout = async () => {
    await axios.post("/api/auth/logout")
    setUser(undefined)

    push("/auth")
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        register,
        login,
        logout,
        loadStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
