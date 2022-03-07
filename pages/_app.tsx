import type { AppProps } from "next/app"

import { AuthProvider, ThemeProvider } from "@contexts"

import "@styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
