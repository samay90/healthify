const express = require('express');
const authorize = require('../../utils/middleware/authorize');
const router = express.Router();

router.get("/nutrition/:date",authorize, require("./nutrition_date.js"));

router.get("/foods/:date",authorize, require("./foods_date.js"));

router.get("/food/:food_log_id",authorize, require("./food_item.js"));

module.exports = router;