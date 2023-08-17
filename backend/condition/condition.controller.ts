import { Request, Response } from 'express';
import * as conditionModel from './condition.model';

export async function addCondition(req: Request, res: Response) {
  if (!req.body.plantId) {
    res.status(400).send({error: 'must have a plant'})
    return
  }
  const garden = await conditionModel.addNewCondition({
    temperature: req.body.temperature, 
    weather:     req.body.weather,
    fertilizer:  req.body.fertilizer,
    water:       req.body.water,
    bloom:       req.body.bloom,
    fruit:       req.body.fruit,
    condition:   req.body.condition,
    description: req.body.description,
    plantId:     req.body.plantId
  })
  res.status(200).send({success: true})
}

export async function conditionReports(req: Request, res: Response) {
    if (!req.query.plantId) {
      res.status(400).send({error: 'please provide a plant id'})
      return
    }

    // https://stackoverflow.com/questions/63579867/what-does-this-error-say-type-parsedqs-is-not-assignable-to-type-string
    // Solves the issue of handling query string types
    const plantId: string | null = <string>req.query.plantId

    const conditions = await conditionModel.getConditionReports(parseInt(plantId))
    if (conditions) {
      res.status(200).send(conditions)
    } else {
      res.status(200).send({conditions: null})
    }
}