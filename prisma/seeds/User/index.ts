import bcrypt from "bcrypt"

const salt = bcrypt.genSaltSync(10)

const UserSeed = [
  {
    email: "example@example.com",
    name: "John Doe Mike",
    username: "johndoe",
    password: bcrypt.hashSync("anjay123", salt),
  },
  {
    email: "example2@example.com",
    name: "John Doe James",
    username: "johndoe2",
    password: bcrypt.hashSync("anjay321", salt),
  },
  {
    email: "example3@example.com",
    name: "John Doe Jack",
    username: "johndoe3",
    password: bcrypt.hashSync("anjay231", salt),
  },
  {
    email: "example4@example.com",
    name: "John Doe Jim",
    username: "johndoe4",
    bio: "I am a bio",
    password: bcrypt.hashSync("anjay132", salt),
  },
]

export { UserSeed }
