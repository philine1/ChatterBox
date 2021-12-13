const express = require("express");
const journalEntries = require("../data");
const router = express.Router();

router.get("/" , (req,res) => {
    res.send(journalEntries)
})

module.exports = router;