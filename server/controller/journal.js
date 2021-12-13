const express = require("express");
const journalEntries = require("../data");
const router = express.Router();
const journalData = require("../data")

//all routes starting with "/journal"
router.get("/" , (req,res) => {
    res.send("hi")
})

//route for all journal entries data
router.get("/journal" , (req,res) => {
    res.send(journalData)
})

//adding journal entries to our database
router.post("/journal", (req,res) => {
    console.log("Route reached");

    // pushing what we send to journalData in the request.body
    console.log(req.body);
    const data = req.body;
    journalData.push(data);
    res.send(`${data.author} has added a new journal entry!`);

})



module.exports = router;