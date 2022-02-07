import { PrismaClient } from "@prisma/client"

import { UserSeed } from "./seeds"

const prisma = new PrismaClient()

const main = async () => {
  await prisma.user.createMany({ data: UserSeed })
}

const runMain = async () => {
  try {
    await main()
    await prisma.$disconnect()
    process.exit(0)
  } catch (error) {
    console.log(error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

runMain()

export {}
