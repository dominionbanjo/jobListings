const express = require("express");
const { addJob, deleteJob, getJobs } = require("../controllers/jobs");
const router = express.Router();

router.route("/addjob").post(addJob);
router.route("/").get(getJobs);
router.route("/delete/:id").delete(deleteJob);
module.exports = router;
