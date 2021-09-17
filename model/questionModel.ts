import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tag: { type: [String] },
  author: { type: String },
  rate: { type: Number, default: 0 },
  like: { type: [String], default: [] },
  comment: { type: [[String]], default: [] },
  createdAt: { type: Date, default: new Date() },
});

export default mongoose.model("Questions", questionSchema);
