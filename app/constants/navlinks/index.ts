interface NavLink {
  label: string
  path: string
}

const NavLinks: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "Profile", path: "/profile" },
  { label: "Posts", path: "/posts" },
]

export { NavLinks }
