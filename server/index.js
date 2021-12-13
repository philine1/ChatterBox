const express =require("express")
const app = express ()




app.get("/", function(req, res) {
    res.send("Testing page working")
})

// Heroku port/ local
app.listen(process.env.PORT || 3000)