const Internships = require("../model/internships");
const { StatusCodes } = require("http-status-codes");
const { badRequest } = require("../errors");

const addInternship = async (req, res) => {
  const { title, organization, location, description } = req.body;

  if (!title || !organization || !location || !description) {
    throw new badRequest("Please provide all fields!");
  }

  const internship = Internships.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Internship created succesfully" });
};

const deleteInternship = async (req, res) => {
  const { id } = req.params;
  if (!id) throw new badRequest("Please provide id");
  const internship = await Internships.findOneAndDelete({ _id: id });
  if (!internship) throw new badRequest("Internship does not Exist");
  res
    .status(StatusCodes.ACCEPTED)
    .json({ msg: "Internship deleted Successfully" });
};

const getInternships = async (req, res) => {
  const { title, location, sort } = req.query;
  let queryObject = {};

  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  if (location) {
    queryObject.location = { $regex: location, $options: "i" };
  }

  let internship = Internships.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    internship = internship.sort(sortList);
  } else {
    internship = internship.sort("-createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;
  internship = internship.skip(skip).limit(limit);

  const results = await internship;
  res.status(StatusCodes.ACCEPTED).json({ results });
};

module.exports = { addInternship, deleteInternship, getInternships };
