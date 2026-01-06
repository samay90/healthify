const express = require('express');
const router = express.Router();
const authorize = require('../../utils/middleware/authorize');
const validate = require('../../utils/middleware/validate');
const schema = require('../../../body_schema/schema.json');
const {updateInfo,updateProfilePic} = require('./update');
const parser = require("../../utils/middleware/parser.js");

router.post("/update",authorize,parser,validate(schema["user"]["update"]),updateInfo,updateProfilePic);

router.post("/detect-food",authorize,require("./detect-food"));

router.post("/add-food",parser,authorize,validate(schema["user"]["add_food"]),require("./add-food.js"));

router.post("/delete-food",authorize,validate(schema["user"]["delete_food"]),require("./delete-food")); 

router.get('/info',authorize,require('./user_info.js'));

router.delete("/delete-account",authorize,require("./delete-account.js"));

module.exports = router;