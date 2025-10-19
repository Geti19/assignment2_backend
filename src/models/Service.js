import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true }
}, { versionKey: false });
export default mongoose.model("Service", schema, "services");
