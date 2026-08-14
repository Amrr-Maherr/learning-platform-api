const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.DATABASE_URL;
const client = new MongoClient(url);

// Database Name
const dbName = process.env.DATABASE_NAME;

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  const users_collection = db.collection("users");
  const courses_collection = db.collection("courses");
  return "Connected successfully to server";
}

main().then(console.log).catch(console.error);

module.exports = main;
