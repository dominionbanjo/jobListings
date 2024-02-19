const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Applications", applicationSchema);
