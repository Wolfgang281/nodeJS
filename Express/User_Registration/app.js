import express from "express";
import { createReadStream } from "fs";
import { join } from "path";

// let rootPath = "C:UsersASUSDesktopClasses\node_1030ExpressUser_Registration";

let app = express();

app.use(express.urlencoded({ extended: true })); //TODO:

//! home page
app.get("/", (req, res) => {
  res.send(`<h6>Home Page</h6>`);
});

//! form page
app.get("/get-form", (req, res) => {
  let formContents = createReadStream("./form.html", "utf-8");
  formContents.pipe(res);
});

//! form submit
//? in html form -->
//? a) give value to action attribute which should be same as the endpoint
//? b) set attribute method with it's value as post
//? c) use name attribute to give variable-name
app.post("/submit-form", (req, res) => {
  console.log("user data: " + req.body);
  let { userEmail, userPassword } = req.body;
  console.log(req.body); //! whatever data user is submitting, it stores inside req.body which is an object.
  // { userEmail: 'abc', userPassword: '123' }
  // let coll = connectDB();
  // coll.insertOne({ userPassword, userEmail });
  res.json({ success: true, message: "user registered successfully" });
});

//! list
app.get("/all-users", (req, res) => {});

app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log("server running");
});

//? nodemon -v
