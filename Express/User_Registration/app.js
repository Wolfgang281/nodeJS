import express from "express";
import { createReadStream } from "fs";
import mongodb from "mongodb";
//! always write import statement at the top of the file

async function connectDB() {
  //! define connection
  let client = await mongodb.MongoClient.connect("mongodb://localhost:27017");
  //? "127.0.0.1" instead of localhost
  //! create database
  let database = client.db("userRegister");
  //! create collection
  let collection = await database.createCollection("users");
  //! return that collection
  return collection;
}

let app = express();

app.use(express.urlencoded({ extended: true })); //? middleware it parses/read the incoming html form data

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
app.post("/submit-form", async (req, res) => {
  console.log("user data: " + req.body);
  let { userEmail, userPassword } = req.body;
  console.log(req.body); //! whatever data user is submitting, it stores inside req.body which is an object.
  // { userEmail: 'abc', userPassword: '123' }
  // let coll = connectDB();
  // coll.insertOne({ userPassword, userEmail });

  let myCollection = await connectDB();
  // myCollection.insertOne({ userEmail: userEmail, userPassword: userPassword });
  let op = await myCollection.insertOne({ userEmail, userPassword });

  res.json({ success: true, message: "user registered successfully", op });
});

//! list
app.get("/all-users", async (req, res) => {
  let myCollection = await connectDB();
  let users = await myCollection.find().toArray();
  let nameArr = users.map((user) => user.userEmail);
  res.json({ success: true, message: "users fetched", nameArr });
});

app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log("server running");
});

//? nodemon -v
//? to stop/start mongodb server --> open cmd as admin >> net stop/start mongodb
