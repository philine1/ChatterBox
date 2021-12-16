const express = require("express");
const router = express.Router();
const journalData = require("../data")
const journalEntry = require("../models/journal")

//all routes starting with "/journal"
router.get("/" , (req,res) => {
    res.send("hi thsis is chatterbox")
})

//route for all journal entries data
router.get("/journal" , (req,res) => {
    res.send(journalData)
})

// route for retrieving journal entries by id
router.get("/journal/:id", (req,res) => {
    res.send(journalData[req.params.id -1])
})

// route for retrieving specific emoji reaction by id
router.get("/journal/:id/emoji/:emojiid", (req,res) => {
    res.send(journalData[req.params.id -1].emoji[req.params.emojiid -1])
})

// route for retrieving all comments
router.get("/journal/:id/comments", (req,res) => {
    res.send(journalData[req.params.id -1].comment)
})

// router.get("/journal/:id/comment/:commentid", (req,res) => {
//     res.send(journalData[req.params.id -1].comments)
// })

//adding journal entries to our database
router.post("/journal", (req,res) => {
    console.log("Route reached");
    // pushing what we send to journalData in the request.body
    // console.log(req.body);
    const data = req.body;
    const newEntry = journalEntry.createEntry(data)
    console.log("new entry created")
    res.send(`${data.author} has added a new journal entry!`);
})

router.patch("/journal/:id/comments", (req,res) => {
    const commentData = req.body
    const id = req.params.id
    const updateEntry = new journalEntry(journalEntry.getId(id))
    // console.log("hi")
    updateEntry.addComment(id, commentData)
    res.send("new comment created")
})

router.patch("/journal/:id/emoji/:emojiid", (req,res) => {
    const data = req.body
    const id = data.id
    const emojiId = data.emojiId
    console.log(emojiId + " hihihihi" ) 
    const updateEntry = new journalEntry(journalEntry.getId(id))
    // console.log(updateEntry)
    updateEntry.addEmoji(id, emojiId, data)
    res.send("emoji added to entry")
})



//deleting journal entries
// router.delete("/journal/:id", (req,res) => {
//     const {id} = req.params;
//     journalData = journalData.filter((entries) => entries.id !== id) 
//     res.send(`Entry with the id ${id} deleted from the journal`)
// })



module.exports = router;