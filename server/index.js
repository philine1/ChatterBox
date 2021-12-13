const express =require("express")
const app = express ()

app.get("/", function(res, req) {
    res.send("Testing page working")
})

// Heroku port/local
app.listen(process.env.PORT || 3000)