//~  npm i express mongoose dotenv

import express from "express";

const app = express();

app.listen(9000, (err) => {
  if (err) console.log(`Error while starting the server: ${err}`);
  console.log(`Server running at port 9000`);
});

//! nodemon app.js

//? we can define script commands in .json file --> "start" is the default one
//? to run this start script --> type npm start

// ? if you are writing script commands which is not default then to run that script type --> npm run SCRIPT_NAME
//! it is also used when we are deploying this application

//~ mongoose --> it is a library for NodeJS used to interact with database

//? ODM(Object Document Mapping) and ORM(Object Relation Mapping)

//~ it is NodeJS library that provides a schema/structure based solution to add models in MONGODB, it also provides various other features like validation and middleware support while giving extra methods to perform CRUD. and making the whole process(interaction with database) a lot easier.
