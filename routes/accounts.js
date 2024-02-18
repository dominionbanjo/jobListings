const express = require("express");
const router = express.Router();

const {
  login,
  signUp,
  dashBoard,
  updateAccount,
} = require("../controllers/accounts");

const auth = require("../middleware/auth");

router.route("/dashboard").get(auth, dashBoard);
router.route("/updateaccount").patch(auth, updateAccount);
router.route("/login").post(login);
router.route("/signup").post(signUp);

module.exports = router;
