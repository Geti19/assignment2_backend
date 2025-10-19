import mongoose from "mongoose";
const schema = new mongoose.Schema({
  firstname: { type: String, required: true, trim: true },
  lastname:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true }
}, { versionKey: false });
export default mongoose.model("Contact", schema, "contacts");
