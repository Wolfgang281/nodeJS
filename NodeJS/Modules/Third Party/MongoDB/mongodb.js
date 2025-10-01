//! before installing any third-party modules, we need to have a file named "package.json" (which stores meta data of the project) in the project directory.

//~ to create command is --< "npm init -y" (open terminal with correct path, i.e, path of the project directory/folder)

//! once the "package.json" file is created, we can install the third-party modules using command
// "npm install/i <name of the module>"
// all modules names are lowercase, if multiple then separated by "-"

// npm i mongodb
// npm i Mongodb (wrong)
// npm i mongo-db (wrong)

//~ there will be three changes --> (1) package.json (2) node_modules (3) package-lock.json.
//TODO: express

//! mongodb://localhost:27017/

//! use the module ny importing it.

import mongodb from "mongodb";
// console.log(mongodb.MongoClient);
//~ MongoClient class helps to create a connection with nodeJS project and database.

async function connectDB() {
  //! use connect("url") to connect with database
  let client = await mongodb.MongoClient.connect("mongodb://localhost:27017/");
  //   console.log(client.db);
  //! create a database, using db("database-name")
  let database = client.db("NodeDB");
  //   console.log(database.createCollection);
  //! create a collection using createCollection("collection-name")
  let collection = await database.createCollection("nodeCollections");
  //   console.log(collection);

  //&======================================================
  //! insert/create
  //~ add a document
  // let result = await collection.insertOne({ name: "abc", age: 23 });
  // console.log(result);
  //~ adding multiple documents
  // let result = await collection.insertMany([{ name: "def" }, { age: 67 }]);
  // console.log(result);

  // collection.insertMany([{ email: "abc@gmail.com" }, { phone: "345678" }]);

  //& ======================================================
  //! update --> updateOne/updateMany()
  // let op = await collection.updateOne({ filter }, { updation }, { options });
  // let op = await collection.updateOne({ name: "def" }, { $set: { age: 78 } });
  // console.log(op);

  // let op = await collection.updateMany(
  //   { name: "abc" },
  //   { $set: { gender: "m" } }
  // );
  // console.log(op);

  //& ======================================================
  //! update --> deleteOne/deleteMany()
  // deleteOne({filter})
  // let op = await collection.deleteOne({ name: "def" });
  // console.log(op);

  // let op = await collection.deleteMany({ name: "abc" });
  // console.log(op);

  //& ======================================================
  //! find/ read/ fetch/ get --> findOne(). find()
  // let op = await collection.findOne({ phone: "3456788" });
  // console.log(op);

  let op = await collection.find({}).toArray();
  //~ use toArray() to convert cursor object to array
  console.log(op);
}
connectDB();
