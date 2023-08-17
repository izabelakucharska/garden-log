import prisma from '../util/prisma-client';

interface ICondition {
  temperature?: number, 
  weather?:     string,
  fertilizer?:  string,
  water?:       boolean,
  bloom?:       boolean,
  fruit?:       boolean,
  condition?:   number,
  description?: string,
  plantId:     number
}

export async function addNewCondition(condition: ICondition) {
  return await prisma.condition.create({
    data: condition
  })
}

export async function getConditionReports(plantId: number) {
  return await prisma.condition.findMany({
    where: {
      plantId: plantId
    }
  })
}
