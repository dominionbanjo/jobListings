require("dotenv").config();
const connectDB = require("./db/connect");
const Jobs = require("./model/jobs");
const Internships = require("./model/internships");
const Scholarships = require("./model/scholarship");
const jsonJobs = require("./dummyDatas/jobs.json");
const jsonInternships = require("./dummyDatas/internship.json");
const jsonScholarships = require("./dummyDatas/scholarship.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Jobs.deleteMany();
    await Jobs.create(jsonJobs);
    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     await Internships.deleteMany();
//     await Internships.create(jsonInternships);
//     console.log("success");
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     await Scholarships.deleteMany();
//     await Scholarships.create(jsonScholarships);
//     console.log("success");
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

start();
