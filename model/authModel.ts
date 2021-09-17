import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  id: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userName: { type: String },
  avatar: { type: String, default: "" },
  birthDay: { type: Date },
  location: { type: String },
});

export default mongoose.model("User", authSchema);
