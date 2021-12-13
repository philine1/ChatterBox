const express = require("express");
const router = express.Router();
const journalData = require("../data")
const journalEntry = require("../models/journal")

//all routes starting with "/journal"
router.get("/" , (req,res) => {
    res.send("hi")
})

//route for all journal entries data
router.get("/journal" , (req,res) => {
    res.send(journalData)
})

// router.get()

//adding journal entries to our database
router.post("/journal", (req,res) => {
    console.log("Route reached");
    // pushing what we send to journalData in the request.body
    console.log(req.body);
    const data = req.body;
    const newEntry = journalEntry.createEntry(data)
    console.log("new entry created")
    res.send(`${data.author} has added a new journal entry!`);
})



module.exports = router;