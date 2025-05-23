import express from "express";
import cors from "cors";
import "dotenv/config";

// routes
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

// db
import { connectDB } from "./lib/db.js";

// rate limiter
import { globalRateLimiter } from "./lib/ratelimit.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(globalRateLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
