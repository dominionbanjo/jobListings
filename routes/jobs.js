const express = require("express");
const { addJob } = require("../controllers/jobs");
const router = express.Router();

router.route("/addjob").post(addJob);
module.exports = router;
