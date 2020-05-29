// importing required modules
const express = require("express");
const cors = require("cors");
const { cart } = require("./routes");

// defining configurating variables 
const serverPort = 5000;

// creating instance of express server/ app
const app = express();

// enabling cors 
app.use(cors());

// allow use of JSON
app.use(express.json());

// including my routes
app.use("/", cart);

// run the server 
app.listen(serverPort, () => {
    console.log(`Server up and listening on port ${serverPort}`);
})