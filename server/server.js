const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const journalRoutes = require("../server/controller/journal")

app.use(bodyParser.json());

app.use("/journal", journalRoutes)
app.get("/", (req, res) => res.send("Testing page working"))

module.exports = app;