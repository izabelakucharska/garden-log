import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import  { PrismaClient } from '@prisma/client';
import  express  from 'express';
import path from 'path'
import * as userController from './user/user.controller'
import * as gardenController from './garden/garden.controller'
import * as plantController from './plant/plant.controller'
import * as conditionController from './condition/condition.controller'

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}


const setupServer = () => {
  const app = express();

  app.use(
    expressSession({
      cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // ms
      },
      secret: 'w szczebrzeszynie chrzaszcz brzmi w trzcinie',
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(
        new PrismaClient(),
        {
          checkPeriod: 2 * 60 * 1000,  //ms
          dbRecordIdIsSessionId: true,
          dbRecordIdFunction: undefined,
        }
      )
    })
  );

  app.use(express.json());
  app.use("/", express.static(path.join(__dirname, '/../frontend/dist')));

  app.post('/signup', userController.signup);
  app.post('/login', userController.login);
  app.get('/logout', userController.logout);
  app.get('/login-status', userController.loginStatus);

  app.post('/create-garden', gardenController.createGarden);
  app.get('/garden-status', gardenController.gardenStatus);

  app.post('/add-plant', plantController.createPlant)

  app.post('/condition', conditionController.addCondition)
  app.get('/conditions', conditionController.conditionReports)

  return app
};

export {
  setupServer
}