const express = require('express');
const authorize = require('../../utils/middleware/authorize');
const router = express.Router();

router.get("/nutrition/:start_date/:end_date",authorize, require("./nutrition_date.js"));

router.get("/foods/:date",authorize, require("./foods_date.js"));

router.get("/food/:food_log_id",authorize, require("./food_item.js"));

router.get("/nutrition/insights",authorize, require("./nutrition_insights.js"));

module.exports = router;