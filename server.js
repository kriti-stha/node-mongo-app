const dotenv = require("dotenv");

const express = require("express");
const cors = require("cors");
dotenv.config();

const app = express();
const serverPort = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong! Try again" });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from appy dappy!" });
});

app.listen(serverPort, () => {
  console.log(`Server is running at http://localhost:${serverPort}`);
});
