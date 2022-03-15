import type { AppProps } from "next/app"

import { Layout } from "@components"
import { AuthProvider, ThemeProvider } from "@contexts"

import "@styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
