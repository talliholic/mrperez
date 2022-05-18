const mongoose = require("mongoose");

const Quiz = mongoose.model("Quiz", {
  context: {
    type: String,
    trim: true,
  },
  structure: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = Quiz;
