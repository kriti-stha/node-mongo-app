const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");

const connectionStr =
  "mongodb+srv://kritishrestha:6D760rhOM7UgnXqj@kritiscluster.tclbh.mongodb.net/?retryWrites=true&w=majority&appName=KritisCluster";

// Your MongoDB URI
const uri = process.env.DB_URI;
console.log("MongoDB URI:", uri);
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
