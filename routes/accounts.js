const express = require("express");
const router = express.Router();

const { login, signUp, dashBoard } = require("../controllers/accounts");

const auth = require("../middleware/auth");

router.route("/dashboard").get(auth, dashBoard);
router.route("/login").post(login);
router.route("/signup").post(signUp);

module.exports = router;
