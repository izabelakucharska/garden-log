import prisma from '../util/prisma-client';

interface IGarden {
  name: string,
  userId: number, 
  latitude: number,
  longitude: number
}

export async function createNewGarden(garden: IGarden) {
  return await prisma.garden.create({
    data: garden
  })
}

export async function findGarden(userId: number) {
  return await prisma.garden.findUnique({
    where: {
      userId: userId
    }, 
    include: {
      plants: true
    }
  })
}
