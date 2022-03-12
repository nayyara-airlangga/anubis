import { useRouter } from "next/router"
import React, { createContext, useEffect, useState } from "react"

interface ThemeContextType {
  theme?: "dark" | "light" | "system"
  setTheme: React.Dispatch<
    React.SetStateAction<"light" | "dark" | "system" | undefined>
  >
}

const ThemeContext = createContext<ThemeContextType>({
  setTheme: () => {},
})

const ThemeProvider = ({
  defaultTheme = "system",
  children,
}: {
  defaultTheme?: "dark" | "light" | "system"
  children: React.ReactNode
}) => {
  const { reload } = useRouter()

  const [theme, setTheme] = useState<"dark" | "light" | "system">()

  useEffect(() => {
    if (typeof localStorage !== "undefined" && typeof window !== "undefined") {
      if (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark")
      } else if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", defaultTheme)
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [theme, defaultTheme])

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      switch (theme) {
        case "dark":
          localStorage.setItem("theme", "dark")
          break
        case "light":
          localStorage.setItem("theme", "light")
          break
        case "system":
          localStorage.removeItem("theme")
          break
        default:
          setTheme(localStorage.getItem("theme") as "dark" | "light" | "system")
          break
      }
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme: theme ?? defaultTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
