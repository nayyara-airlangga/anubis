interface LoginData {
  username: string
  password: string
  rememberMe: false
}

interface RegisterData extends LoginData {
  name: string
  email: string
  confirmPassword: string
}

export type { LoginData, RegisterData }
