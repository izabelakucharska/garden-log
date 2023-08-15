import prisma from '../util/prisma-client';

interface IUser {
  email: string,
  passwordHash: string,
  name: string
}

export async function createNewUser(user: IUser) {
  return await prisma.user.create({
    data: user
  })
}

export async function findUser(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  })
}