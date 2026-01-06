const express = require("express");
const schema = require("../../../body_schema/schema.json");
const router = express.Router();
const validate = require("../../utils/middleware/validate");

router.post("/signup",validate(schema["auth"]["signup"]),require("./signup"));

router.post("/verify",validate(schema["auth"]["verify"]),require("./verify.js"));

router.post("/signin",validate(schema["auth"]["signin"]),require("./signin.js"));

router.post("/forgot-password",validate(schema["auth"]["forgot-password"]),require("./forgot-password.js"));

router.post("/reset-password",validate(schema["auth"]["reset-password"]),require("./reset-password.js"));

router.post("/signout",require("./signout.js"));

module.exports = router;