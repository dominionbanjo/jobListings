const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title must be provided"],
    trim: true,
    // maxlength: [20, "Title cannot be more than 20 characters!"],
  },
  organization: {
    type: String,
    required: [true, "organization must be provided"],
    trim: true,
    // maxlength: [20, "organization cannot be more than 20 characters!"],
  },
  location: {
    type: String,
    required: [true, "Location must be provided"],
    trim: true,
    // maxlength: [20, "Location cannot be more than 20 characters!"],
  },
  description: {
    type: String,
    required: [true, "Description must be provided"],
    trim: true,
    // maxlength: [80, "Description cannot be more than 40 characters!"],
  },
});

module.exports = mongoose.model("Internships", internshipSchema);
