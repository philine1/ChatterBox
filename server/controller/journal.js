const express = require("express")
const router = express.Router();
const journalData = require("../data")

//all routes starting with "/journal"
router.get("/" , (req,res) => {
    res.send(journalData)
})

module.exports = router;