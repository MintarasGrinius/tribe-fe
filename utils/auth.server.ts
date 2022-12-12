import { PrismaClient } from '@prisma/client'
import { bcrypt } from 'bcryptjs'
import { prisma } from './prisma.server'

export async function login({ email, password }: LoginForm) {
  console.log(bcrypt)
  const user = await prisma.user.findUnique({
    where: { email },
  })
  if (!user || !(await bcrypt?.compare(password, user.password)))
    return 'Incorrect login'

  return 'createUserSession(user.id, )'
}

// const sessionSecret = process.env.SESSION_SECRET
// if (!sessionSecret) {
//   throw new Error('SESSION_SECRET must be set')
// }
