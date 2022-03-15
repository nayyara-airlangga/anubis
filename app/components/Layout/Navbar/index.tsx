import Link from "next/link"
import { useRouter } from "next/router"

import { Body } from "@components"
import { NavLinks } from "@constants"

const Navbar = () => {
  const router = useRouter()

  return (
    <nav className="w-full flex items-center justify-between my-4">
      <ul className="flex items-center justify-between space-x-4">
        {NavLinks.map(({ label, path }, index) => (
          <li key={path + index} className="group">
            <Link href={path}>
              <a>
                <Body
                  variant="b3"
                  className={`duration-500 ${
                    router.pathname === path ||
                    router.pathname.startsWith("/posts")
                      ? "dark:text-blue-300"
                      : "dark:text-white"
                  } dark:group-hover:text-blue-400`}
                >
                  {label}
                </Body>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { Navbar }
