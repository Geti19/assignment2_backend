import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  completion:  { type: Date, required: true },
  description: { type: String, required: true, trim: true }
}, { versionKey: false });
export default mongoose.model("Project", schema, "projects");
