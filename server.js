const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const Joi = require("joi"); //schema validator

dotenv.config();
const app = express();
const serverPort = process.env.SERVER_PORT || 8000;

app.use(cors()); //middleware
// app.use(cors({ origin: "http://localhost:3000" }));
//only allow api requests from that originate from the above url

app.use(express.json()); //also a middleware

const persons = [
  { id: 1, name: "kriti", course: "IT" },
  { id: 2, name: "shrestha", course: "Computer science" },
];

app.get("/", (req, res) => {
  res.json({ message: "Hello from my app!" });
});

app.get("/status", (req, res) => {
  res.send("Status is all good.");
});

app.get("/person", (req, res) => {
  res.send(persons);
});

app.get("/person/:id", (req, res, next) => {
  const selectedPerson = persons.find(
    (person) => person.id === parseInt(req.params.id)
  );

  if (!selectedPerson) {
    const error = new Error("Person not found");
    error.status = 404;
    next(error);
  } else {
    res.send(selectedPerson);
  }
});

app.post("/person", (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    course: Joi.string().min(2).required(),
  });
  const validation = schema.validate(req.body);
  const { error: validationError } = schema.validate(req.body);

  if (validationError) {
    const error = new Error(validationError.message);
    error.status = 400;
    res.status(400).send(validationError.message);
    next(error);
    return;
  } else {
    const addPerson = {
      id: persons.length + 1,
      name: req.body.name,
      course: req.body.course,
    };
    persons.push(addPerson);
    res.send(addPerson);
  }
});

app.get("/person/:birthMonth/:birthYear", (req, res) => {
  // http://localhost:8000/person/12/5?sortBy=name
  res.send(req.query);
});

app.get("/error", (_req, _res, next) => {
  const error = new Error("Internal Server Error");
  error.status = 500;

  next(error);
});

app.use((err, _req, res, _next) => {
  //params need to be in this order and needs to include them all
  //the .use method needs to be placed AFTER the route handlers
  res.status(err.statusCode || 500); 
  res.json({ error: err.message || "Something went wrong! Please try again!" });
});

app.listen(serverPort, () => {
  console.log(`Server is running at http://localhost:${serverPort}`);
});
