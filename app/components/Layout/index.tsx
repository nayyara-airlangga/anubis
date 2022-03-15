import { Navbar } from "./Navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export { Layout }
