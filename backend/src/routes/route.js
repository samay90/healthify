const express = require("express");
const router = express.Router();

router.use("/auth", require("../controllers/Auth/handler.js"));

router.use("/user", require("../controllers/User/handler.js"));

module.exports = router;