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
app.use(cors());
app.use(expressFileUpload());

app.use("/api", require("./src/routes/route.js"));
app.get("/",(req,res)=>{
    const ua = new UAParser(req.headers["user-agent"]).getResult();
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip);

    res.json({
        device: ua.device,
        os: ua.os,
        browser: ua.browser,
        ip,
        location: geo,
    });

})
app.listen(process.env.PORT,"192.168.0.102", () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});