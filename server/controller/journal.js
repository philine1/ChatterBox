const express = require("express");
const journalEntries = require("../data");
const router = express.Router();
const journalEntries = require("../data")

//all routes starting with "/journal"
router.get("/" , (req,res) => {
    res.send(journalEntries)
})

module.exports = router;