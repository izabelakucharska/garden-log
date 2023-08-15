import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import  { PrismaClient } from '@prisma/client';
import  express  from 'express';
// import bcrypt from 'bcrypt';

const setupServer = () => {
  const app = express();
  // const saltRounds = 10;

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
  app.use("/", express.static(__dirname + "/public"));

  return app
};

export {
  setupServer
}