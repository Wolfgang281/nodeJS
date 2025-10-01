// const express = require("express");
//! 1) import express module
import express from "express";

// console.log(express);
//! 2) invoke the top-level function
let app = express();

//! 4) create routes
//& home page
//? format of get/post/put/patch/delete = ( "endpoint", callback )
app.get("/", (req, res) => {
  // statements
  res.json({ message: "home page", success: true });
});
//& using json() we can send json responses.

//& download page
app.get("/download", (req, res) => {
  res.send("download page");
});

//! 3) assign a port number
app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log("server running.....");
});

//! execute this file using nodemon --> nodemon filename.js

//? "/something" ==> endpoint
