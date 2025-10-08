//~  npm i express mongoose dotenv
import express from "express";
import connectDB from "./config/database.js";

import userRoutes from "./routers/user.routes.js";

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
//TODO: it is used to parse the html form data

app.use("/api", userRoutes);

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

//? users --> name(string), email(string), password(string) (totalBlogs: Number, blogs: []id)
//? blogs --> title, description (strings), [createdBy: id]
//? embedded and reference documents

//! postman --> https://www.postman.com/downloads/
//! thunder-client --> no network required (extension for vscode)
//? https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client
