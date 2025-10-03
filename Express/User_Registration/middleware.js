import express from "express";

let app = express();

app.use((req, res, next) => {
  console.log("function 1");
  req.myKey = 123;
  next();
});

app.use((req, res, next) => {
  console.log("function 2");
  next();
});

app.get("/", (req, res) => {
  console.log(req.myKey);
  res.send("hi");
});

app.listen(9000);

//? req: "/" -------> controller (callback function)
//? req: "/" ------> middleware1(modify) -------> controller (callback function)
//? req: "/" ------> middleware1 ---> middleware2 -------> controller (callback function)

//! middleware --> it is a function which comes between req and res and have access to these two objects (which means it can be modified) and it also has a third parameter next(): it calls for the next middleware if present, other-wise continue the normal flow of execution
//? middleware is declared using use(); it accepts one callback function with three parameters req, res and next.

//! there are different types of middlewares
//? 1) router level middleware
//? 2) error middleware
//? 3) user-defined middleware
//? 4) built-in middleware
