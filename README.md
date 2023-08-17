# garden-log

Garden Log is a website to help manage your garden. 

## Building the application

To build this application start by cloning this repository.

You will need postgresql installed on your machine. 

First install dependencies.

`npm install`

Next initialize the database.

`npx prisma migrate dev`

Next build the frontend. 

`cd frontend`
`npm install`
`npm run build`

Once finished start the server.

`cd ..`
`$ npx ts-node index.ts`

Visit `localhost:8080` in your browser.



