import express from "express";
//! always write import statement at the top of the file

//! importing routes.js file
import routesFile from "./routes.js"; //~ always pass ext

//? MVC --> (model views and controller) architecture

let app = express();

app.use(express.urlencoded({ extended: true })); //? middleware it parses/read the incoming html form data
app.use(routesFile);
//? :TODO:using http module

//! form submit
//? in html form -->
//? a) give value to action attribute which should be same as the endpoint
//? b) set attribute method with it's value as post
//? c) use name attribute to give variable-name

app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log("server running");
});

//? nodemon -v
//? to stop/start mongodb server --> open cmd as admin >> net stop/start mongodb

//~ https://github.com/Wolfgang281/nodeJS
