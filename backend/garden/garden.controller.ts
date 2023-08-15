import { Request, Response } from 'express';
import * as gardenModel from './garden.model';

export async function createGarden(req: Request, res: Response) {
  if (req.body.name === undefined) {
    res.status(400).send({error: 'name is required'})
    return
  }
  if (req.body.latitude === undefined) {
    res.status(400).send({error: 'latitude is required'})
    return
  }
  if (req.body.longitude === undefined) {
    res.status(400).send({error: 'longitude is required'})
    return
  }
  if (!req.session.user) {
    res.status(400).send({error: 'must be logged in to create a garden'})
    return
  }
  const garden = await gardenModel.createNewGarden({
    name: req.body.name,
    userId: req.session.user.id,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  })
  res.status(200).send({success: true})
}

export async function gardenStatus(req: Request, res: Response) {
  if (req.session.user) {
    const garden = await gardenModel.findGarden(req.session.user.id)
    if (garden) {
      res.status(200).send(garden)
    } else {
      res.status(200).send({garden: null})
    }
  } else {
    res.status(400).send({error: 'logged out'})
  }
}
