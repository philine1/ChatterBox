const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const journalRoutes = require("../server/controller/journal")

app.use(bodyParser.json());

app.use("/", journalRoutes)


module.exports = app;