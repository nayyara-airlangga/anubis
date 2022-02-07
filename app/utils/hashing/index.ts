import bcrypt from "bcrypt"

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(12)
  const hashedPassword = bcrypt.hashSync(password, salt)
  return hashedPassword
}

const verifyPassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword)
}

export { hashPassword, verifyPassword }
