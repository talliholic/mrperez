const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://talliholic:kay20071@cluster0.ttnid.mongodb.net/quizzes?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
