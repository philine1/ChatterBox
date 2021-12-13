const server = require("./server")
const express =require("express")
const app = express ()




// Heroku port/local
server.listen(process.env.PORT || 3000)