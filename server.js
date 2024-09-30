const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

dotenv.config();

const app = express();
const serverPort = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());

app.get("/error", (req, res, next) => {
  const error = new Error("Internal Server Error");
  error.status = 500;
  next(error);
});

app.use((err, _req, res, _next) => {
  //params need to be in this order and needs to include them all
  //the .use middleware needs to be placed AFTER the route handlers
  res.status(500);
  res.json({ error: err.message || "Something went wrong" });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from my app!" });
});

app.get("/status", (req, res) => {
  res.send("Status is all good.");
});

app.get("/person", (req, res) => {
  // http://localhost:8000/person
  res.send([1, 2, 3]);
});

app.get("/person/:id", (req, res) => {
  // http://localhost:8000/person/1
  res.send(req.params.id);
});

app.get("/person/:birthMonth/:birthYear", (req, res) => {
  // http://localhost:8000/person/12/5?sortBy=name
  res.send(req.query);
});

app.listen(serverPort, () => {
  console.log(`Server is running at http://localhost:${serverPort}`);
});
