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

const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Jobs.findOneAndDelete({ _id: id });
  if (!job) throw new badRequest("Job does not Exist");
  res.status(StatusCodes.ACCEPTED).json({ msg: "Job deleted Successfully" });
};

// const getJobs = async (req, res) => {
//   const { title, location } = req.query;
//   queryObject = {};
//   if (title) {
//     queryObject.title = { $regex: title, $options: "i" };
//   }

//   if (location) {
//     queryObject.location = { $regex: location, $options: "i" };
//   }

//   let job = Jobs.find(queryObject);

//   if (sort) {
//     const sortList = sort.split(",").join("");
//     job = job.sort(sortList);
//   } else {
//     result = result.sort("-createdAt");
//   }

//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 15;
//   const skip = (page - 1) * limit;
//   job = job.skip(skip).limit(limit);

//   const results = await job;
//   res.status(StatusCodes.ACCEPTED).json({ results });
// };
const getJobs = async (req, res) => {
  const { title, location, sort } = req.query;
  let queryObject = {};

  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  if (location) {
    queryObject.location = { $regex: location, $options: "i" };
  }

  let job = Jobs.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    job = job.sort(sortList);
  } else {
    job = job.sort("-createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;
  job = job.skip(skip).limit(limit);

  const results = await job.exec();
  res.status(StatusCodes.ACCEPTED).json({ results });
};

module.exports = { addJob, deleteJob, getJobs };
