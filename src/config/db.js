import mongoose from "mongoose";

export async function connectDB(uri) {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri, { dbName: "Portfolio" });
    console.log("✅ MongoDB connected");
  } catch (e) {
    console.error("❌ MongoDB connection error:", e.message);
    process.exit(1);
  }
}
