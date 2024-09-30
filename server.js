const express = require("express");
const server = express();
const port = 3000;

server.get("/", (req, res) => {
  res.send("Hello, Worldy Swirldy!");
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
