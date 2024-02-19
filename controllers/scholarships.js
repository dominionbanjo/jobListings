const Scholarships = require("../model/scholarship");
const { StatusCodes } = require("http-status-codes");
const { badRequest } = require("../errors");

const addScholarship = async (req, res) => {
  const { title, organization, location, description } = req.body;

  if (!title || !organization || !location || !description) {
    throw new badRequest("Please provide all fields!");
  }

  const scholarship = Scholarships.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Scholarship created succesfully" });
};

const deleteScholarship = async (req, res) => {
  const { id } = req.params;
  if (!id) throw new badRequest("Please provide id");
  const scholarship = await Scholarships.findOneAndDelete({ _id: id });
  if (!scholarship) throw new badRequest("Scholarship does not Exist");
  res
    .status(StatusCodes.ACCEPTED)
    .json({ msg: "Scholarship deleted Successfully" });
};

const getScholarships = async (req, res) => {
  const { title, location, sort } = req.query;
  let queryObject = {};

  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  if (location) {
    queryObject.location = { $regex: location, $options: "i" };
  }

  let scholarship = Scholarships.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    scholarship = scholarship.sort(sortList);
  } else {
    scholarship = scholarship.sort("-createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;
  scholarship = scholarship.skip(skip).limit(limit);

  const results = await scholarship;
  res.status(StatusCodes.ACCEPTED).json({ results });
};

module.exports = { addScholarship, deleteScholarship, getScholarships };
