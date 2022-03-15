import { Navbar } from "./Navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 tablet:px-24">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

export { Layout }
