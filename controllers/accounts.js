const Accounts = require("../model/accounts");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { badRequest } = require("../errors");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !password || !email) {
    throw new badRequest("Please provide all fields!");
  }

  if (!validator.isEmail(email)) {
    throw new badRequest("Invalid email address!");
  }

  const checkAccount = await Accounts.findOne({
    email: email,
  });
  if (checkAccount) {
    throw new badRequest("User already exists for this email!!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const account = Accounts.create({ name, email, password: hash });
  res.status(StatusCodes.CREATED).json({ msg: "Account created succesfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new badRequest("Please provide email and password");
  }

  if (!validator.isEmail(email)) {
    throw new badRequest("Invalid email address!");
  }

  const account = await Accounts.findOne({
    email: email,
  });

  if (!account) throw new badRequest("Account does not exist");

  const match = await bcrypt.compare(password, account.password);

  if (!match) {
    throw new badRequest("Incorrect password");
  }

  const { _id, name } = account;
  const token = jwt.sign({ _id, username: name }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });
  res.status(StatusCodes.ACCEPTED).json({ msg: "Login Successful", token });
};

const dashBoard = async (req, res) => {
  const { username } = req.user;
  res.status(200).json({ name: username });
};

module.exports = { signUp, login, dashBoard };
