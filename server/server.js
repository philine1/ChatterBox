const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors'); 
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

// Route for localhost
app.get('/', (req, res) =>{
    res.json({
        message: 'Hello'
    });
});














app.listen(port, console.log(`App Listening on http://localhost: ${port}`));
