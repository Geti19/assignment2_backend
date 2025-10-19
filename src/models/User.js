import mongoose from "mongoose";
const schema = new mongoose.Schema({
  firstname: { type: String, required: true, trim: true },
  lastname:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true },
  password:  { type: String, required: true },
  created:   { type: Date, default: Date.now, immutable: true },
  updated:   { type: Date, default: Date.now }
}, { versionKey: false });
export default mongoose.model("User", schema, "users");
