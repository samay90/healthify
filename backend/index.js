const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const UAParser = require("ua-parser-js");
const geoip = require("geoip-lite");
const expressFileUpload = require("express-fileupload");
require("dotenv").config(); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(expressFileUpload());

const delay = (req,res,next) =>{
    setTimeout(next,1000);
}

app.use("/api",delay, require("./src/routes/route.js"));

app.listen(process.env.PORT,"192.168.0.102", () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});