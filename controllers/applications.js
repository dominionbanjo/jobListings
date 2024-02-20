const Applications = require("../model/applications");
const { StatusCodes } = require("http-status-codes");
const { badRequest } = require("../errors");

const newApplication = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: jobId } = req.params;
  const { email } = req.body;

  if (!userId || !jobId || !email)
    throw new badRequest("Please provide all fields!");

  const application = Applications.create({ userId, jobId, email });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Application added succesfully" });
};

module.exports = { newApplication };
