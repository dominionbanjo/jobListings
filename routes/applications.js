const express = require("express");
const router = express.Router();

const { newApplication } = require("../controllers/applications");

const auth = require("../middleware/auth");

router.route("/:id").post(auth, newApplication);

module.exports = router;
