import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Joi from "joi";
import { MongoClient } from "mongodb";
dotenv.config();

const app = express();
const serverPort = process.env.SERVER_PORT || 8000;
const dbConnectionUrl = process.env.DB_URI;
const client = new MongoClient(dbConnectionUrl);

let db, collection;

async function run() {
  try {
    // Connect the client to the database
    await client.connect();
    console.log("MongoDB connected successfully!");
    db = client.db("University");
    collection = db.collection("Individuals");

    app.post("/person", async (req, res, next) => {
      const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        course: Joi.string().required(),
        age: Joi.number().required(),
      });

      const { error: validationError } = schema.validate(req.body);
      console.log("SCHEMA==>", { req, validationError, res });

      if (validationError) {
        const error = new Error(validationError.message);
        error.status = 400;
        return next(error);
      }

      try {
        const addPerson = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: req.body.age,
          course: req.body.course,
        };

        const result = await collection.insertOne(addPerson); // Insert into MongoDB
        res.status(201).send(addPerson); // Respond with the newly added person
      } catch (error) {
        next(error);
        console.log("ERROR WHILE POSTING=>", { error });
      }
    });

    // Perform operations on the database here
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run().catch(console.dir);

app.use(cors());
// app.use(cors({ origin: "http://localhost:3002" }));
//only allow api requests from that originate from the above url
app.use(express.json()); //also a middleware

const persons = [];

app.get("/", (req, res) => {
  res.send({ persons });
});

// app.post("/person", async (req, res, next) => {
//   const schema = Joi.object({
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     course: Joi.string().required(),
//     age: Joi.number().required(),
//   });

//   const { error: validationError } = schema.validate(req.body);

//   if (validationError) {
//     const error = new Error(validationError.message);
//     error.status = 400;
//     return next(error);
//   }

//   try {
//     const addPerson = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       age: req.body.age,
//       course: req.body.course,
//     };

//     const result = await collection.insertOne(addPerson); // Insert into MongoDB
//     res.status(201).send(result.ops[0]); // Respond with the newly added person
//   } catch (error) {
//     next(error);
//   }
// });

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

app.listen(serverPort, () => {
  console.log(`Server is running at http://localhost:${serverPort}`);
});
