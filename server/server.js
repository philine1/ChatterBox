const express = require("express")
const app = express()

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Testing page working"))

module.exports = app;