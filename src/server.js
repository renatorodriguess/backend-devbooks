require("dotenv").config();

const express = require("express");

const cors = require('cors');
const routes = require("./routes");
const connectToDatabase = require("./database");

connectToDatabase();


const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log(`⚡ BACKEND STARTED AT PORT http://localhost:${port} `)
});
