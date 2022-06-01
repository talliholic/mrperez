const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
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
    path: {
      type: String,
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
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
