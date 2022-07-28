const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');


dotenv.config();

const metadataExtractor = require("./metadataExtractor");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// app.use(express.static('./public'));

app.use('/upload', metadataExtractor);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server up and running on PORT: ${PORT}`);
});

// For  Vercel to turn Express into a serverless function

module.exports = app;
