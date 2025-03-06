# Basic-API-ts-MongoDB
This is a Basic API of Movies managed on mongoDB and typed all the scripting side with TS

## Hey, welcome back mate
A really basic experiment to learn how typescript works or behave when managing databases, i know its not the best but was an excercise of my scoolarship that the have left me to do
Feel free to improve it, use it and whatever you want!

### Structure of the files:
- src
   - api
      - controllers
          - movie.controller.ts
      - routes
          - movie.routes.ts
      - structures
          - genre.model.ts
          - movie.model.ts 
   - node-modules
   - server.ts
   - .env
   - package.json
   - package-lock.json
   - tsconfig.json

### Things to keep in mind:
- all the code use dotenv to protect the credentials (thats silly bcs all is running on local but i want it to put it xD)
- the form of the data push on json will be on this structure;
   - title {
   - director {
   - year {
   - genre {


