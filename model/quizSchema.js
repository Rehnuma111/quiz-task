const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define quiz schema
const quizSchema = new Schema({
  question: String,
  options: [String],
  rightAnswer: Number,
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ["inactive", "active", "finished"],
    default: "inactive",
  },
});
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
