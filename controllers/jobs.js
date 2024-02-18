const Jobs = require("../model/jobs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { StatusCodes } = require("http-status-codes");
const { badRequest } = require("../errors");

const addJob = async (req, res) => {
  const { title, company, location, description } = req.body;

  if (!title || !company || !location || !description) {
    throw new badRequest("Please provide all fields!");
  }

  const job = Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Job created succesfully" });
};

module.exports = { addJob };
