# Basic-API-ts-MongoDB
This is a Basic API of Movies managed on mongoDB and typed all the scripting side with TS

## Hey, welcome back mate
A really basic experiment to learn how typescript works or behave when managing databases, i know its not the best but was an excercise of my scoolarship that the have left me to do
Feel free to improve it, use it and whatever you want!

### Structure of the files:
src/
│── api/
│   ├── controllers/        -> contais the controllers 
│   │   └── movie.controller.ts
│   ├── routes/             -> contains the express routes for the api
│   │   └── movie.routes.ts
│── database/
│   ├── models/             -> models of mongoose to the DB
│   │   ├── genre.model.ts
│   │   └── movie.model.ts
│   ├── schemas/            -> schemas or sub-schemas for the DB
│   └── database.ts         -> config archive for MongoDB
│── structures/
│   ├── classes/            -> related logic classes for the api (only if its necesary)
│   ├── enums/              -> contains enumerations that help define preset values
│   ├── interfaces/         -> contains ts interfaces to define data structure
│   ├── types/              -> contains custom type definitions
│── server.ts               -> main.ts to init all the scripts
│── .env                    -> config archives
│── package.json            -> dependencies of npm
│── tsconfig.json           -> ts config archive

### Things to keep in mind:
- all the code use dotenv to protect the credentials (thats silly bcs all is running on local but i want it to put it xD)
- the form of the data push on json will be on this structure;
   - title {
   - director {
   - year {
   - genre {


