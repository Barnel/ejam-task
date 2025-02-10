## Before starting
This project uses Node v18.
Make sure Node.js and MongoDB are installed, working properly (check ports etc...)

## Scripts
1. `npm install` installs dependencies
2. `npm start` starts the server
3. `npm test` executes the tests

## Docs
Swagger docs available at `/api-docs` path

## Project structure

### /src directory
1. `index.ts` entry point for the app
2. `controllers` directory - controllers for routes
3. `services` directory - services used by controller
4. `interfaces` directory - interfaces for all objects
5. `models` directory - schemas of MongoDB documents
6. `utils` directory - useful functions, constants etc...

### usage
By default app works on port 3111 (check you config).
FOr endpoint descriptions please check swagger docs.
I added basic usage of mongoDB, if you want to use it please configure this database on your environment and use proper envs in .env file
example
```
SERVER_PORT=3111
DB_PORT=27017
DB_NAME=mydb
MODE=in-memory-only
```

### /test directory
Includes all test, uses jest test framework.

## Team Player Attitude

With another teammate we could discuss possible superpowers (and feature of saving/editing it DB) and other features like evolvoing a superhero.
We could also discuss range of test cases, creating proper DB and it's opitimization.

## If I had more time
I would add features mentioned above in team player attitude

