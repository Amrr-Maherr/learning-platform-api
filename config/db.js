const { MongoClient } = require("mongodb");

const url = process.env.DATABASE_URL;
const dbName = process.env.DATABASE_NAME;

const client = new MongoClient(url);

const db = {};

async function main() {
  await client.connect();
  const database = client.db(dbName);
  db.database = database;
  db.users_collection = database.collection("users");
  db.courses_collection = database.collection("courses");
  return "Connected successfully to server";
}

module.exports = {
  main,
  db,
};
