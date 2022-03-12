import { useContext } from "react"

import { AuthFormContext } from "../../contexts/AuthForm"

const useAuthForm = () => useContext(AuthFormContext)

export { useAuthForm }
