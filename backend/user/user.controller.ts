import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as userModel from './user.model';

const saltRounds = 10;

export async function signup(req: Request, res: Response) {
  if (req.body.email === undefined) {
    res.status(400).send({error: 'email is required'})
  }

  if (req.body.password === undefined) {
    res.status(400).send({error: 'password is required'})
  }

  if (req.body.name === undefined) {
    res.status(400).send({error: 'name is required'})
  }

  if (req.body.password !== req.body.password_confirmation) {
    res.status(400).send({error: 'passwords must match'})
  }

  if (req.body.password.length < 8) {
    res.status(400).send({error: 'password must be 8 or more characters'})
  }

  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
  const user = await userModel.createNewUser({
    name: req.body.name,
    email: req.body.email,
    passwordHash: hashedPassword
  })
  res.status(200).send({success: true})
}

export async function login(req: Request, res: Response) {
  if (req.body.email === undefined) {
    res.status(400).send({error: 'email is required'})
    return
  }

  if (req.body.password === undefined) {
    res.status(400).send({error: 'password is required'})
    return
  }

  const user = await userModel.findUser(req.body.email);

  if (!user) {
    res.status(400).send({error: 'no such user found'});
    return
  }

  // check if the password matches the encrypted password saved in the user table
  const match = await bcrypt.compare(req.body.password, user.passwordHash);

  if (match) {
    // create login session
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    }
    res.status(200).send({success: true})
  } else {
    res.status(400).send({error: 'incorrect password'})
  }
}

export async function logout(req: Request, res: Response) {
  req.session.destroy( () => {
    res.status(200).send({ success: true });
  });
}


export async function loginStatus(req: Request, res: Response) {
  if (req.session.user) {
    res.status(200).send({
      user: {
        name: req.session.user.name
      },
      status: "logged in"
    })
  } else {
    res.status(200).send({status: 'logged out'})
  }
}