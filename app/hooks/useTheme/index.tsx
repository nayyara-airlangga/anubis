import { ThemeContext } from "@contexts"
import { useContext } from "react"

const useTheme = () => useContext(ThemeContext)

export { useTheme }
