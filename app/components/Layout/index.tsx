import { useRouter } from "next/router"
import { Navbar } from "./Navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  return (
    <div className={router.pathname !== "/auth" ? "px-4 tablet:px-24" : ""}>
      {router.pathname !== "/auth" && <Navbar />}
      <main>{children}</main>
    </div>
  )
}

export { Layout }
