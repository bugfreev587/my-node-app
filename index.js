const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dao = require('./dao');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// For form submissions (optional)
app.use(express.urlencoded({ extended: true }));

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

app.delete("/api/items", (req, res) => {
    items = [];
    res.status(204).send();
});

app.get("/v1/getAll", async (req, res) => {
    try {
        const content = await dao.getAll();
        res.json(content);  
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/v1/addItem", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const newItem = await dao.addItem(name);
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});