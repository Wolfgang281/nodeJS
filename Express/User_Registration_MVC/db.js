import mongodb from "mongodb";

export async function connectDB() {
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
