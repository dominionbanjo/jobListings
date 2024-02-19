const express = require("express");

const {
  addScholarship,
  getScholarships,
  deleteScholarship,
} = require("../controllers/scholarships");
const router = express.Router();

router.route("/addscholarship").post(addScholarship);
router.route("/").get(getScholarships);
router.route("/delete/:id").delete(deleteScholarship);
module.exports = router;
