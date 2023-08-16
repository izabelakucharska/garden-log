import { Request, Response } from 'express';
import * as plantModel from './plant.model';

export async function createPlant(req: Request, res: Response) {
  if (req.body.name === undefined) {
    res.status(400).send({error: 'name is required'})
    return
  }
  if (!req.body.gardenId) {
    res.status(400).send({error: 'must have a garden'})
    return
  }
  const garden = await plantModel.createNewPlant({
    name: req.body.name,
    gardenId: req.body.gardenId,
    genus: req.body.genus,  
    species: req.body.species,
    image: req.body.image
  })
  res.status(200).send({success: true})
}