const express = require("express");
const {
  addInternship,
  getInternships,
  deleteInternship,
} = require("../controllers/internships");
const router = express.Router();

router.route("/addinternship").post(addInternship);
router.route("/").get(getInternships);
router.route("/delete/:id").delete(deleteInternship);
module.exports = router;
