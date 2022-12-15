import { prisma } from 'utils/prisma.server'
export default async function handler(req, res) {
  await prisma.user
    .findUnique({
      where: { email: 'email@email.com' },
    })
    .then((user) => {
      return res.status(200).json({ name: user.email })
    })
}
