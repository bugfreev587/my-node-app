const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let items  = [{id: 1, name: 'Item 1'}, {id: 2, name: 'Item 2'}];


// Basic route
app.get("/", (req, res) => {
  res.send("Hello, Node.js App is running! 🚀");
});

app.get("/api/items", (req, res) => {
    res.json(items);
});

app.post("/api/items", (req, res) => {
    const newItem = {id: items.length + 1, name: req.body.name};
    items.push(newItem);
    res.status(201).json(newItem);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});