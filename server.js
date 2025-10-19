// server.js
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import { connectDB } from "./src/config/db.js";
import contactRoutes from "./src/routes/contact.routes.js";
import projectRoutes from "./src/routes/project.routes.js";
import serviceRoutes from "./src/routes/service.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import { notFound, errorHandler } from "./src/middleware/error.js";

const app = express();                    // ← ÖNCE app'i oluştur
const PORT = process.env.PORT || 4000;

// (İsteğe bağlı teşhis – .env okundu mu?)
console.log("CWD:", process.cwd());
console.log("MONGO_URI present?", !!process.env.MONGO_URI);
if (!process.env.MONGO_URI) {
  console.error("❌ Missing MONGO_URI in .env (Assignment2-web/.env)");
  process.exit(1);
}

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Root
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Geti's Assignment2 Portfolio API (Node.js + Express + MongoDB)" });
});

// API routes
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

// 404 & errors (en sonda)
app.use(notFound);
app.use(errorHandler);

// Start (ÖNCE DB, SONRA listen)
await connectDB(process.env.MONGO_URI);
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
