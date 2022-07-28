const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const metadataExtractor = require("./metadataExtractor");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static('./public'));

app.use('/upload', metadataExtractor);

app.listen(PORT, () => {
    console.log(`Server up and running on PORT: ${PORT}`);
});

