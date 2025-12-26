const express = require('express');
const router = express.Router();
const authorize = require('../../utils/middleware/authorize');
const validate = require('../../utils/middleware/validate');
const schema = require('../../../body_schema/schema.json');
const {updateInfo,updateProfilePic} = require('./update');

router.post("/update",authorize,validate(schema["user"]["update"]),updateInfo,updateProfilePic);

router.post("/detect-food",authorize,require("./detect-food"));

module.exports = router;