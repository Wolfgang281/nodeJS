import express from "express";
//! always write import statement at the top of the file

import routesFile from "./routes/routes.js";

//? MVC --> (model views and controller) architecture

let app = express();

app.use(express.urlencoded({ extended: true })); //? middleware it parses/read the incoming html form data
//? :TODO:using http module
app.use("/api/v1", routesFile);
//! api versioning, static path

//! form submit
//? in html form -->
//? a) give value to action attribute which should be same as the endpoint
//? b) set attribute method with it's value as post
//? c) use name attribute to give variable-name

//! list

app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log("server running");
});

//? nodemon -v
//? to stop/start mongodb server --> open cmd as admin >> net stop/start mongodb
