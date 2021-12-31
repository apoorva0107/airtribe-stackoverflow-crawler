const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  quesUrl: {
    type: String,
    unique: true,
    required: true,
  },
  quesRefCount: {
    type: Number,
    required: true,
  },
  quesName: {
    type: String,
    unique: true,
    required: true,
  },
  quesTotalUpvotes: {
    type: Number,
    required: true,
  },
  quesTotalAnswers: {
    type: Number,
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;