const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const journalRoutes = require("../server/controller/journal")
const cors = require("cors")

app.use(bodyParser.json());
app.use(express.json())
app.use(cors());
app.use("/", journalRoutes)


module.exports = app;