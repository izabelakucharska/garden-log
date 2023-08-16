import prisma from '../util/prisma-client';

interface IPlant {
  name: string,
  gardenId: number,
  genus?: string,  
  species?: string,
  image?: string
}

export async function createNewPlant(plant: IPlant) {
  return await prisma.plant.create({
    data: plant
  })
}