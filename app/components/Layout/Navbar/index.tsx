import Link from "next/link"
import { useRouter } from "next/router"
import { LegacyRef, useEffect, useRef, useState } from "react"

import { Body, Button } from "@components"
import { NavLinks } from "@constants"
import { useAuth } from "@hooks"

import PersonOutlineIcon from "@icons/person_outline.svg"

const Navbar = () => {
  const router = useRouter()

  const { user, loadStatus, logout } = useAuth()

  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const profileDropdownRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const checkIfClickedOutside = (event: Event) => {
      if (
        showProfileDropdown &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false)
      }
    }

    document.addEventListener("click", checkIfClickedOutside)

    return () => {
      document.removeEventListener("click", checkIfClickedOutside)
    }
  }, [showProfileDropdown])

  return (
    <nav className="z-40 w-full flex items-center justify-between my-4">
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
      {loadStatus !== "LOADING" ? (
        user ? (
          <div
            ref={profileDropdownRef as LegacyRef<HTMLDivElement>}
            className="relative"
          >
            <Button
              padding="p-2"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <PersonOutlineIcon className="w-6 h-6 dark:fill-white" />
            </Button>
            {showProfileDropdown && (
              <div className="z-50 absolute mt-2 right-0 rounded-md dark:bg-neutral-600 p-2 block">
                <Body variant="b3" className="dark:text-white">
                  {user.username}
                </Body>
                <hr className="my-2" />
                <Button
                  padding="px-2"
                  bgColor="bg-transparent"
                  hoverBgColor="hover:bg-transparent"
                  clickedBgColor="active:bg-transparent"
                  className="group w-full"
                  onClick={logout}
                >
                  <Body
                    variant="b3"
                    className="text-red-500 group-hover:underline"
                  >
                    Logout
                  </Body>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Button href="/auth">
            <Body variant="b3">Login</Body>
          </Button>
        )
      ) : null}
    </nav>
  )
}

export { Navbar }
